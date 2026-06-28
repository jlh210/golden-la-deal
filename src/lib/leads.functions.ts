import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1XxSXkc43h9qV4CeSgYzudsAbPfGDXk2rQn24y7_0Yhg";
const RANGE = "'Website leads'!A:K";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

// Columns: A Name | B Phone | C Email | D Source | E Role | F Service Needed | G Status | H Timeline | I Financing | J Timestamp | K Notes
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
] as const;


const leadSchema = z.object({
  source: z.string().min(1).max(120),
  serviceNeeded: z.string().max(160).optional(),
  fields: z.record(z.string(), z.string()).default({}),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!apiKey || !connKey) {
      throw new Error("Google Sheets is not configured.");
    }

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
      new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }),
      f.message ?? f.notes ?? "",
    ];



    const url = `${GATEWAY}/spreadsheets/${SHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-Connection-Api-Key": connKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row], majorDimension: "ROWS" }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Sheets append failed", res.status, body);
      throw new Error(`Sheets append failed: ${res.status}`);
    }

    return { ok: true };
  });
