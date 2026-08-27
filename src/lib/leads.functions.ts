import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1XxSXkc43h9qV4CeSgYzudsAbPfGDXk2rQn24y7_0Yhg";
const SHEET_NAME = "Website leads";
const RANGE = `'${SHEET_NAME}'!A:O`;
const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

// Columns: A Name | B Phone | C Email | D Source | E Role | F Service Needed | G Status |
//          H Timeline | I Financing | J Timestamp | K Notes |
//          L Calendly Booking Date | M Calendly Booking Time | N Calendly Event URI | O Last Updated
export const COLUMNS = [
  "Name",
  "Phone",
  "Email",
  "Source",
  "Role",
  "Service Needed",
  "Status",
  "Timeline",
  "Financing",
  "Timestamp",
  "Notes",
  "Calendly Booking Date",
  "Calendly Booking Time",
  "Calendly Event URI",
  "Last Updated",
] as const;

function laNow() {
  return new Date()
    .toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
    .replace(", ", " - ");
}

// --- Google service-account auth (Web Crypto, works on Cloudflare Workers
// and Node — no Lovable proxy, no Node-only Buffer/crypto APIs) -----------

function base64UrlFromBytes(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlFromString(str: string): string {
  return base64UrlFromBytes(new TextEncoder().encode(str));
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  // Strip PEM markers, then defensively strip anything outside the base64
  // alphabet (not just whitespace). Dashboard secret UIs and copy/paste from
  // a JSON key file can introduce stray characters — surrounding quotes, a
  // trailing comma, smart quotes, etc — that survive a whitespace-only clean
  // and break atob(). Any real PEM body only ever contains [A-Za-z0-9+/=],
  // so stripping everything else is safe and makes this robust to whatever
  // got pasted.
  const clean = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/[^A-Za-z0-9+/=]/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// Cached per-isolate; harmless if it doesn't survive a cold start.
let cachedToken: { token: string; expiresAt: number } | null = null;

// Cloudflare Workers (via Nitro's cloudflare_module preset) expose Worker
// secrets/vars through globalThis.__env__ — set on every request in the
// Cloudflare handler (see node_modules/nitro/dist/presets/cloudflare/runtime/
// _module-handler.mjs). nodejs_compat provides a process.env *object*, but
// Cloudflare/Nitro never populates it with binding values, so
// process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL etc. are always undefined in
// production regardless of what secrets are configured in the dashboard.
// Falling back to process.env keeps local dev / non-Workers runs working.
function getRuntimeEnv(): Record<string, string | undefined> {
  const g = globalThis as unknown as { __env__?: Record<string, string | undefined> };
  return g.__env__ ?? (process.env as Record<string, string | undefined>);
}

async function getGoogleAccessToken(): Promise<string> {
  const env = getRuntimeEnv();
  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) {
    throw new Error(
      "Google Sheets is not configured (missing GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY).",
    );
  }

  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.token;
  }

  // Env-var UIs often store multi-line PEM keys with literal "\n" escapes.
  const privateKeyPem = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const signingInput = `${base64UrlFromString(JSON.stringify(header))}.${base64UrlFromString(JSON.stringify(claims))}`;

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput),
  );

  const jwt = `${signingInput}.${base64UrlFromBytes(new Uint8Array(signature))}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Google token exchange failed", res.status, body);
    throw new Error("Failed to authenticate with Google Sheets.");
  }

  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return json.access_token;
}

async function sheetsHeaders() {
  const token = await getGoogleAccessToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

const leadSchema = z.object({
  source: z.string().min(1).max(120),
  serviceNeeded: z.string().max(160).optional(),
  fields: z.record(z.string(), z.string()).default({}),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const f = data.fields;

    // Honeypot: this input is visually hidden on the form, so real visitors
    // leave it blank; bots that blindly fill every field trip it. Deliberately
    // named something autofill/password managers won't recognize (a field
    // literally named "website" gets silently filled by Chrome/LastPass/etc,
    // which caused real leads to be dropped as false-positive bot traffic).
    // Pretend success so bots don't learn anything, but skip the write.
    if (f.hp_field_9f2) {
      return { ok: true };
    }

    // Wrapped end-to-end so every failure mode (missing config, bad auth,
    // sheet write rejected) surfaces a console.error with real detail — the
    // per-fetch checks below don't cover a throw from getGoogleAccessToken
    // (e.g. missing env vars), which previously failed silently from a
    // logging standpoint.
    try {
      const headers = await sheetsHeaders();

      const row = [
        f.name ?? "",
        f.phone ?? "",
        f.email ?? "",
        data.source,
        f.role ?? "",
        data.serviceNeeded ?? f.serviceNeeded ?? "",
        "New Lead",
        f.timeline ?? "",
        f.financing ?? "",
        laNow(),
        f.message ?? f.notes ?? "",
        "",
        "",
        "",
        "",
      ];

      const url = `${SHEETS_API}/${SHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ values: [row], majorDimension: "ROWS" }),
      });

      const bodyText = await res.text();

      if (!res.ok) {
        console.error("Sheets append failed", res.status, bodyText);
        throw new Error(`Sheets append failed: ${res.status}`);
      }

      console.log("Sheets append succeeded", res.status, bodyText.slice(0, 300));
      return { ok: true };
    } catch (err) {
      console.error(
        "submitLead failed",
        err instanceof Error ? err.message : String(err),
        err instanceof Error ? err.stack : undefined,
      );
      throw err;
    }
  });

const bookingSchema = z.object({
  email: z.string().email().max(255),
  eventUri: z.string().max(500).optional().default(""),
  startTime: z.string().max(100).optional().default(""),
});

export const markLeadBooked = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const headers = await sheetsHeaders();

    // Find the most recent row matching this email (column C).
    const readUrl = `${SHEETS_API}/${SHEET_ID}/values/'${SHEET_NAME}'!C:C`;
    const readRes = await fetch(readUrl, { headers });
    if (!readRes.ok) {
      const body = await readRes.text();
      console.error("Sheets read failed", readRes.status, body);
      throw new Error(`Sheets read failed: ${readRes.status}`);
    }
    const readJson = (await readRes.json()) as { values?: string[][] };
    const values = readJson.values ?? [];

    let rowIndex = -1; // 1-based sheet row
    const target = data.email.trim().toLowerCase();
    for (let i = values.length - 1; i >= 0; i--) {
      const cell = (values[i]?.[0] ?? "").trim().toLowerCase();
      if (cell === target) {
        rowIndex = i + 1;
        break;
      }
    }

    if (rowIndex < 1) {
      console.warn("markLeadBooked: no matching email row", data.email);
      return { ok: false, reason: "not_found" as const };
    }

    let bookingDate = "";
    let bookingTime = "";
    if (data.startTime) {
      const d = new Date(data.startTime);
      if (!Number.isNaN(d.getTime())) {
        bookingDate = d.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles" });
        bookingTime = d.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" });
      } else {
        bookingDate = data.startTime;
      }
    }

    const updateUrl = `${SHEETS_API}/${SHEET_ID}/values:batchUpdate`;
    const updateRes = await fetch(updateUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        valueInputOption: "USER_ENTERED",
        data: [
          {
            range: `'${SHEET_NAME}'!G${rowIndex}`,
            values: [["Consultation Booked"]],
          },
          {
            range: `'${SHEET_NAME}'!L${rowIndex}:O${rowIndex}`,
            values: [[bookingDate, bookingTime, data.eventUri, laNow()]],
          },
        ],
      }),
    });

    if (!updateRes.ok) {
      const body = await updateRes.text();
      console.error("Sheets update failed", updateRes.status, body);
      throw new Error(`Sheets update failed: ${updateRes.status}`);
    }

    return { ok: true };
  });
