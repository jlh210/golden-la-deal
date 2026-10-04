/* Isolated server-function tests. Every network call is mocked; no real leads. */
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { pathToFileURL } = require("node:url");
const esbuild = require("/private/tmp/penthouse-phase1-tests/node_modules/esbuild");
(async () => {
  const file = path.join(os.tmpdir(), "phase5-server-tests.mjs");
  await esbuild.build({
    stdin: {
      resolveDir: process.cwd(),
      loader: "ts",
      contents: `
import assert from 'node:assert/strict';
import {createPrivateKey} from 'node:crypto';
import {submitLead,markLeadBooked} from './src/lib/leads.functions';
const key=await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);
process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL='mock@example.invalid';
process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\\n'+Buffer.from(await crypto.subtle.exportKey('pkcs8',key.privateKey)).toString('base64')+'\\n-----END PRIVATE KEY-----';
const requests=[];let sheetRows=[],failAppend=false;
globalThis.fetch=async(url,options={})=>{
 requests.push({url:String(url),options});
 if(String(url)==='https://oauth2.googleapis.com/token')return Response.json({access_token:'mock-only-token',expires_in:3600});
 if(String(url).includes(':append')){if(failAppend)return new Response('',{status:503}); const row=JSON.parse(options.body).values[0];sheetRows.push(row);return Response.json({updates:{}});}
 if(String(url).includes('!C:P'))return Response.json({values:sheetRows.map(row=>row.slice(2,16))});
 if(String(url).endsWith(':batchUpdate'))return Response.json({});
 throw Error('Unexpected mocked URL');
};
const lead={source:'Test source',serviceNeeded:'Buying a restaurant',fields:{name:'Test Person',phone:'3105550100',email:'test@example.invalid',role:'Buyer',message:'=IMPORTXML("https://example.invalid","//x")',budget:'test budget',location:'Test city',businessType:'Restaurant'}};
const n=()=>requests.length;
const before=n();await assert.rejects(()=>submitLead({data:{...lead,fields:{...lead.fields,email:'bad'}}}));assert.equal(n(),before);
await assert.rejects(()=>submitLead({data:{...lead,fields:{...lead.fields,message:'x'.repeat(1001)}}}));assert.equal(n(),before);
await submitLead({data:{...lead,fields:{...lead.fields,website:'bot'}}});assert.equal(n(),before);
if(process.env.PHASE55_AUTH_MODE==='base64'){
 const validAccount=Buffer.from(JSON.stringify({client_email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,private_key:process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY})).toString('base64');
 delete process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
 for(const invalid of ['sensitive-invalid-input',Buffer.from(JSON.stringify({client_email:42,private_key:'sensitive-invalid-input'})).toString('base64')]){
  process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64=invalid;
  await assert.rejects(()=>submitLead({data:lead}),{message:'Google Sheets service-account configuration is invalid.'});assert.equal(n(),before);
 }
 process.env.GOOGLE_SERVICE_ACCOUNT_JSON_B64=validAccount;
}
if(process.env.RELEASE_AUTH_MODE?.startsWith('worker-')){
 const pem=createPrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\\\n/g,'\\n')).export({type:process.env.RELEASE_AUTH_MODE==='worker-pkcs1'?'pkcs1':'pkcs8',format:'pem'});
 globalThis.__env__={GOOGLE_SERVICE_ACCOUNT_JSON_B64:Buffer.from(JSON.stringify({client_email:'worker@example.invalid',private_key:pem})).toString('base64')};
 delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;delete process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
}
const result=await submitLead({data:lead});assert.match(result.bookingReference,/^[a-f0-9-]{36}$/);
if(process.env.RELEASE_AUTH_MODE?.startsWith('worker-')){const assertion=new URLSearchParams(requests.find(x=>x.url==='https://oauth2.googleapis.com/token').options.body).get('assertion');assert.equal(JSON.parse(Buffer.from(assertion.split('.')[1],'base64url')).iss,'worker@example.invalid');}
const append=requests.find(x=>x.url.includes(':append'));assert(append.url.includes('valueInputOption=RAW'));const row=JSON.parse(append.options.body).values[0];assert.equal(row.length,16);assert(row[10].startsWith('=IMPORTXML'));assert(row[10].includes('Budget: test budget'));assert.equal(row[15],result.bookingReference);
const booking={email:lead.fields.email,bookingReference:result.bookingReference,eventUri:'https://api.calendly.com/scheduled_events/mock-event',startTime:''};
await assert.rejects(()=>markLeadBooked({data:{...booking,bookingReference:undefined}}));
await assert.rejects(()=>markLeadBooked({data:{...booking,eventUri:'https://example.invalid/event'}}));
const mismatch=await markLeadBooked({data:{...booking,bookingReference:'00000000-0000-4000-8000-000000000001'}});assert.equal(mismatch.ok,false);assert(!requests.some(x=>x.url.endsWith(':batchUpdate')));
const ok=await markLeadBooked({data:booking});assert.equal(ok.ok,true);const update=JSON.parse(requests.find(x=>x.url.endsWith(':batchUpdate')).options.body);assert.equal(update.valueInputOption,'RAW');assert.equal(update.data[0].values[0][0],'Booking reported — verify Calendly');
failAppend=true;await assert.rejects(()=>submitLead({data:lead}));
console.log('PASS: invalid and oversized fields rejected before network; honeypot no-write; RAW cell storage; sourcing fields retained; opaque receipt and email bound to inquiry; invalid event URI rejected; browser report not provider verification; provider failures surfaced. All network mocked.');
`,
    },
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: file,
    plugins: [
      {
        name: "mock-server-boundary",
        setup(build) {
          build.onResolve({ filter: /^@tanstack\/react-start$/ }, () => ({
            path: "server",
            namespace: "mock",
          }));
          build.onLoad({ filter: /.*/, namespace: "mock" }, () => ({
            contents:
              "export const createServerFn=()=>({inputValidator:validate=>({handler:handler=>async({data})=>handler({data:validate(data)})})});",
          }));
        },
      },
    ],
  });
  await import(pathToFileURL(file));
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
