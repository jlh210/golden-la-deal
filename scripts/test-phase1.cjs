/* Component regression checks with mocked router/server boundaries; no live leads.
 * Install temporary tooling: npm install --prefix /tmp/penthouse-phase1-tests --no-package-lock jsdom@26 esbuild@0.25
 * Run: PHASE1_TEST_TOOLS=/tmp/penthouse-phase1-tests node scripts/test-phase1.cjs
 */
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");
const { pathToFileURL } = require("node:url");
const root = path.resolve(__dirname, "..");
const tooling = process.env.PHASE1_TEST_TOOLS || "/private/tmp/penthouse-phase1-tests";
const { JSDOM } = require(path.join(tooling, "node_modules/jsdom"));
const esbuild = require(path.join(tooling, "node_modules/esbuild"));
const dom = new JSDOM('<!doctype html><div id="test-root"></div>', { url: "http://localhost/" });
for (const key of [
  "window",
  "document",
  "HTMLElement",
  "HTMLInputElement",
  "Node",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "MessageEvent",
  "FormData",
])
  global[key] = dom.window[key];
global.IS_REACT_ACT_ENVIRONMENT = true;
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
const output = path.join(os.tmpdir(), "penthouse-phase1-components.mjs");
const entry = `
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import assert from 'node:assert/strict';
import { SiteLayout } from './src/components/site/Layout';
import { LeadForm } from './src/components/site/LeadForm';
const container = document.getElementById('test-root');
const root = createRoot(container);
const render = async (component) => { await act(async()=>root.render(component)); };
const press = async (element,key) => { await act(async()=>element.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true}))); };
const click = async (element) => { await act(async()=>element.click()); };
await render(<SiteLayout><p>Test content</p></SiteLayout>);
const desktop = document.querySelector('[aria-controls="services-navigation"]');
assert.equal(desktop.getAttribute('aria-expanded'),'false');
// Native button activation produces click; Escape is handled by disclosure parent.
desktop.focus(); await click(desktop);
assert.equal(desktop.getAttribute('aria-expanded'),'true');
assert.equal(document.getElementById('services-navigation').hidden,false);
const firstService = document.querySelector('#services-navigation a');
firstService.focus(); await press(firstService,'Escape');
assert.equal(desktop.getAttribute('aria-expanded'),'false');
assert.equal(document.activeElement,desktop);
const mobile = document.querySelector('[aria-controls="mobile-navigation"]');
await click(mobile);
assert.equal(mobile.getAttribute('aria-expanded'),'true');
assert.equal(document.activeElement,document.querySelector('#mobile-navigation a'));
await press(document.activeElement,'Escape');
assert.equal(mobile.getAttribute('aria-expanded'),'false');
assert.equal(document.activeElement,mobile);
assert.equal(document.querySelector('.skip-link').getAttribute('href'),'#main-content');
assert.equal(document.getElementById('main-content').tabIndex,-1);
let leads=[],bookings=[];
globalThis.phase1Submit = async(data)=>{ leads.push(data); return {ok:true,bookingReference:"00000000-0000-4000-8000-000000000001"}; };
globalThis.phase1Mark = async(data)=>{ bookings.push(data); return {ok:true}; };
const submit = async()=>{await act(async()=>document.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));};
const fill = ()=>{
 for(const [name,value] of Object.entries({name:'Test Buyer',phone:'3105550100',email:'test@example.invalid',role:'Buyer'})) document.querySelector('[name="'+name+'"]').value=value;
};
await render(<LeadForm key="success" serviceNeeded="Buying a restaurant" />);
await submit(); assert.equal(leads.length,0); assert.match(container.textContent,/Name is required/);
fill(); await submit(); assert.equal(leads.length,1);
assert.equal(leads[0].data.serviceNeeded,'Buying a restaurant');
assert.equal(leads[0].data.fields.serviceNeeded,'Buying a restaurant');
assert.match(container.textContent,/An appointment has not yet been booked/);
let frame = document.createElement('iframe'); document.querySelector('.calendly-inline-widget').append(frame);
const message = async(origin,source)=>{ await act(async()=>window.dispatchEvent(new MessageEvent('message',{origin,source,data:{event:'calendly.event_scheduled',payload:{event:{uri:'https://api.calendly.com/scheduled_events/test'}}}}))); };
await message('https://example.invalid',frame.contentWindow); assert.equal(bookings.length,0);
await message('https://calendly.com',window); assert.equal(bookings.length,0);
await message('https://calendly.com',frame.contentWindow); assert.equal(bookings.length,1);
assert.match(container.textContent,/Calendly Has Confirmed/); assert.match(container.textContent,/cannot verify a payment/);
await render(<LeadForm key="sync-failure" serviceNeeded="Buying a restaurant" />);
globalThis.phase1Mark = async()=>({ok:false,reason:'not_found'});
fill(); await submit();frame=document.createElement('iframe');document.querySelector('.calendly-inline-widget').append(frame);
await message('https://calendly.com',frame.contentWindow);
assert.match(container.textContent,/could not update the inquiry record/);
await render(<LeadForm key="submit-failure" serviceNeeded="Buying a restaurant" />);
globalThis.phase1Submit = async()=>{throw new Error('mock failure');};
fill(); const originalError=console.error; console.error=()=>{}; await submit(); console.error=originalError; assert.match(container.textContent,/Something went wrong sending/);assert.ok(document.querySelector('form'));
await act(async()=>root.unmount());
console.log('PASS: navigation disclosure/ARIA/focus/Escape/skip target; empty form validation; service prefill; inquiry state; Calendly origin/source guard; scheduled vs payment state; Sheets sync failure; submission failure. No network submission.');
`;
(async () => {
  await esbuild.build({
    stdin: { contents: entry, resolveDir: root, loader: "tsx" },
    bundle: true,
    platform: "node",
    format: "esm",
    jsx: "automatic",
    outfile: output,
    plugins: [
      {
        name: "test-boundaries",
        setup(build) {
          build.onResolve({ filter: /^@tanstack\/react-router$/ }, () => ({
            path: "router",
            namespace: "mock",
          }));
          build.onResolve({ filter: /^@tanstack\/react-start$/ }, () => ({
            path: "server",
            namespace: "mock",
          }));
          build.onResolve({ filter: /leads\.functions$/ }, () => ({
            path: "leads",
            namespace: "mock",
          }));
          build.onResolve({ filter: /@\/routes\/agents$/ }, () => ({
            path: "agents",
            namespace: "mock",
          }));
          build.onResolve({ filter: /^@\// }, (args) => ({
            path:
              path.join(root, "src", args.path.slice(2)) + (path.extname(args.path) ? "" : ".ts"),
          }));
          build.onLoad({ filter: /.*/, namespace: "mock" }, (args) => ({
            loader: "jsx",
            resolveDir: root,
            contents:
              args.path === "router"
                ? "import React from 'react';export const Link=({to,children,activeProps,activeOptions,search,...props})=><a href={to} {...props}>{children}</a>;"
                : args.path === "server"
                  ? "export const useServerFn=(fn)=>fn;"
                  : args.path === "agents"
                    ? "export const agents=[];"
                    : "export const submitLead=(data)=>globalThis.phase1Submit(data);export const markLeadBooked=(data)=>globalThis.phase1Mark(data);",
          }));
        },
      },
    ],
    loader: { ".png": "dataurl" },
  });
  await import(pathToFileURL(output));
  dom.window.close();
  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
  dom.window.close();
});
