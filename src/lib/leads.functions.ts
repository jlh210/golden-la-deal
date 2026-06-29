import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1XxSXkc43h9qV4CeSgYzudsAbPfGDXk2rQn24y7_0Yhg";
const SHEET_NAME = "Website leads";
const RANGE = `'${SHEET_NAME}'!A:O`;
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

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

function gatewayHeaders() {
  const apiKey = process.env.LOVABLE_API_KEY;
  const connKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!apiKey || !connKey) {
    throw new Error("Google Sheets is not configured.");
  }
  return {
    Authorization: `Bearer ${apiKey}`,
    "X-Connection-Api-Key": connKey,
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
    const headers = gatewayHeaders();
    const f = data.fields;

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

    const url = `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
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
    const headers = gatewayHeaders();

    // Find the most recent row matching this email (column C).
    const readUrl = `${GATEWAY}/spreadsheets/${SHEET_ID}/values/'${SHEET_NAME}'!C:C`;
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

    const updateUrl = `${GATEWAY}/spreadsheets/${SHEET_ID}/values:batchUpdate`;
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
