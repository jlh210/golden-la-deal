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
  const clean = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// Cached per-isolate; harmless if it doesn't survive a cold start.
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getGoogleAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
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

    // Honeypot: the "website" input is visually hidden on the form, so real
    // visitors leave it blank; bots that blindly fill every field trip it.
    // Pretend success so bots don't learn anything, but skip the write.
    if (f.website) {
      return { ok: true };
    }

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

    if (!res.ok) {
      const body = await res.text();
      console.error("Sheets append failed", res.status, body);
      throw new Error(`Sheets append failed: ${res.status}`);
    }

    return { ok: true };
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
