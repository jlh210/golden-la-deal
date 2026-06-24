import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1XxSXkc43h9qV4CeSgYzudsAbPfGDXk2rQn24y7_0Yhg";
const RANGE = "Sheet1!A:I";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

// Columns: timestamp | source | name | phone | email | role | serviceNeeded | message | extra
export const COLUMNS = [
  "timestamp",
  "source",
  "name",
  "phone",
  "email",
  "role",
  "serviceNeeded",
  "message",
  "extra",
] as const;

const leadSchema = z.object({
  source: z.string().min(1).max(120),
  serviceNeeded: z.string().max(160).optional(),
  fields: z.record(z.string(), z.string()).default({}),
});

const CORE = new Set(["name", "phone", "email", "role", "serviceNeeded", "message", "notes"]);

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    const connKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!apiKey || !connKey) {
      throw new Error("Google Sheets is not configured.");
    }

    const f = data.fields;
    const extra: Record<string, string> = {};
    for (const [k, v] of Object.entries(f)) {
      if (!CORE.has(k) && v) extra[k] = v;
    }

    const row = [
      new Date().toISOString(),
      data.source,
      f.name ?? "",
      f.phone ?? "",
      f.email ?? "",
      f.role ?? "",
      data.serviceNeeded ?? f.serviceNeeded ?? "",
      f.message ?? f.notes ?? "",
      Object.keys(extra).length ? JSON.stringify(extra) : "",
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
