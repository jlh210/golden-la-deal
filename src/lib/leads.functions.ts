import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ID = "1XxSXkc43h9qV4CeSgYzudsAbPfGDXk2rQn24y7_0Yhg";
const RANGE = "Sheet1!A:M";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

// Columns: timestamp | source | name | phone | email | topic | role | budget | location | businessType | timeline | message | extra
const COLUMNS = [
  "timestamp",
  "source",
  "name",
  "phone",
  "email",
  "topic",
  "role",
  "budget",
  "location",
  "businessType",
  "timeline",
  "message",
  "extra",
] as const;

const leadSchema = z.object({
  source: z.string().min(1).max(120),
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
    const known = new Set([
      "name", "phone", "email", "topic", "role",
      "budget", "location", "businessType", "timeline", "message", "notes",
    ]);
    const extra: Record<string, string> = {};
    for (const [k, v] of Object.entries(f)) {
      if (!known.has(k)) extra[k] = v;
    }

    const row = [
      new Date().toISOString(),
      data.source,
      f.name ?? "",
      f.phone ?? "",
      f.email ?? "",
      f.topic ?? "",
      f.role ?? "",
      f.budget ?? "",
      f.location ?? "",
      f.businessType ?? "",
      f.timeline ?? "",
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

    return { ok: true, columns: COLUMNS };
  });
