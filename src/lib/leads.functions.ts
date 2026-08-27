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

// DER length octets for a given content length (short or long form).
function derLength(len: number): number[] {
  if (len < 0x80) return [len];
  const bytes: number[] = [];
  let n = len;
  while (n > 0) {
    bytes.unshift(n & 0xff);
    n >>= 8;
  }
  return [0x80 | bytes.length, ...bytes];
}

// Web Crypto's importKey(format: "pkcs8", ...) only accepts a PKCS8
// PrivateKeyInfo structure. A traditional "-----BEGIN RSA PRIVATE KEY-----"
// PEM (PKCS1) is a bare RSAPrivateKey DER, not PKCS8, and Google service
// account JSON keys are normally PKCS8 already — but if this key came from
// somewhere else (e.g. `openssl genrsa`) it may be PKCS1. Wrap it in the
// fixed PKCS8 envelope (version + rsaEncryption AlgorithmIdentifier + the
// PKCS1 bytes as an OCTET STRING) so either format works transparently.
function wrapPkcs1AsPkcs8(pkcs1Der: Uint8Array): Uint8Array {
  const version = new Uint8Array([0x02, 0x01, 0x00]); // INTEGER 0
  // SEQUENCE { OID 1.2.840.113549.1.1.1 (rsaEncryption), NULL }
  const algId = new Uint8Array([
    0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00,
  ]);
  const octetHeader = new Uint8Array([0x04, ...derLength(pkcs1Der.length)]);
  const octetString = new Uint8Array(octetHeader.length + pkcs1Der.length);
  octetString.set(octetHeader, 0);
  octetString.set(pkcs1Der, octetHeader.length);

  const bodyLength = version.length + algId.length + octetString.length;
  const bodyHeader = new Uint8Array([0x30, ...derLength(bodyLength)]);

  const result = new Uint8Array(bodyHeader.length + bodyLength);
  let offset = 0;
  result.set(bodyHeader, offset);
  offset += bodyHeader.length;
  result.set(version, offset);
  offset += version.length;
  result.set(algId, offset);
  offset += algId.length;
  result.set(octetString, offset);
  return result;
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const headerMatch = pem.match(/-----BEGIN ([A-Z0-9 ]+)-----/);
  const isPkcs1 = headerMatch?.[1] === "RSA PRIVATE KEY";

  const clean = pem
    .replace(/-----BEGIN [A-Z0-9 ]+-----/g, "")
    .replace(/-----END [A-Z0-9 ]+-----/g, "")
    .replace(/[^A-Za-z0-9+/=]/g, "");

  let bytes: Uint8Array;
  try {
    const binary = atob(clean);
    bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  } catch (err) {
    const equalsPositions: number[] = [];
    for (let i = 0; i < clean.length; i++) if (clean[i] === "=") equalsPositions.push(i);
    console.error("pemToArrayBuffer: atob failed on cleaned key", {
      originalLength: pem.length,
      cleanedLength: clean.length,
      cleanedLengthMod4: clean.length % 4,
      strippedCharCount: pem.length - clean.length,
      detectedHeaderLabel: headerMatch?.[1] ?? null,
      equalsCount: equalsPositions.length,
      equalsPositions,
      err: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }

  return (isPkcs1 ? wrapPkcs1AsPkcs8(bytes) : bytes).buffer as ArrayBuffer;
}

// Cached per-isolate; harmless if it doesn't survive a cold start.
let cachedToken: { token: string; expiresAt: number } | null = null;

function getRuntimeEnv(): Record<string, string | undefined> {
  const g = globalThis as unknown as { __env__?: Record<string, string | undefined> };
  return g.__env__ ?? (process.env as Record<string, string | undefined>);
}

async function getGoogleAccessToken(): Promise<string> {
  const env = getRuntimeEnv();

  // Preferred path: one base64-encoded blob of the whole service-account
  // JSON file, set as GOOGLE_SERVICE_ACCOUNT_JSON_B64. Pasting a multi-line
  // PEM key into a dashboard text field is what kept corrupting the old
  // GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY secret ("Invalid PKCS8 input") — a
  // one-line base64 string can't be mangled the way a raw multi-line PEM can.
  let email: string | undefined;
  let rawKey: string | undefined;

  const jsonB64 = env.GOOGLE_SERVICE_ACCOUNT_JSON_B64;
  if (jsonB64) {
    try {
      const decoded = JSON.parse(atob(jsonB64.trim()));
      email = decoded.client_email;
      rawKey = decoded.private_key;
    } catch (err) {
      console.error("Failed to decode GOOGLE_SERVICE_ACCOUNT_JSON_B64", err);
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON_B64 is set but isn't valid base64 JSON.");
    }
  } else {
    // Legacy fallback.
    email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    rawKey = env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  }

  if (!email || !rawKey) {
    throw new Error(
      "Google Sheets is not configured (missing GOOGLE_SERVICE_ACCOUNT_JSON_B64 or the legacy email/key pair).",
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

  const keyBuffer = pemToArrayBuffer(privateKeyPem);
  let cryptoKey: CryptoKey;
  try {
    cryptoKey = await crypto.subtle.importKey(
      "pkcs8",
      keyBuffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"],
    );
  } catch (err) {
    const bytes = new Uint8Array(keyBuffer);
    const headerMatch = privateKeyPem.match(/-----BEGIN ([A-Z0-9 ]+)-----/);
    const scanWindow = Array.from(bytes.slice(0, Math.min(64, bytes.length)));
    const sequenceTagOffset = scanWindow.indexOf(0x30);
    console.error("getGoogleAccessToken: importKey(pkcs8) failed", {
      err: err instanceof Error ? err.message : String(err),
      decodedByteLength: bytes.length,
      first64BytesHex: scanWindow.map((b) => b.toString(16).padStart(2, "0")).join(" "),
      last16BytesHex: Array.from(bytes.slice(-16))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" "),
      sequenceTagOffsetIn64ByteWindow: sequenceTagOffset === -1 ? "not found" : sequenceTagOffset,
      detectedHeaderLabel: headerMatch?.[1] ?? null,
      rawKeyLength: rawKey.length,
      privateKeyPemLength: privateKeyPem.length,
      rawKeyHadLiteralBackslashN: rawKey.includes("\\n"),
      rawKeyDashCount: (rawKey.match(/-/g) ?? []).length,
      rawKeyQuoteCount: (rawKey.match(/["']/g) ?? []).length,
    });
    throw err;
  }
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

    if (f.hp_field_9f2) {
      return { ok: true };
    }

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

    const readUrl = `${SHEETS_API}/${SHEET_ID}/values/'${SHEET_NAME}'!C:C`;
    const readRes = await fetch(readUrl, { headers });
    if (!readRes.ok) {
      const body = await readRes.text();
      console.error("Sheets read failed", readRes.status, body);
      throw new Error(`Sheets read failed: ${readRes.status}`);
    }
    const readJson = (await readRes.json()) as { values?: string[][] };
    const values = readJson.values ?? [];

    let rowIndex = -1;
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
