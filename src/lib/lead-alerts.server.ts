// New-lead alerts (replaces the Make.com "Penthouse New Lead" scenario).
//
// Called by submitLead right AFTER the row is saved to Google Sheets, so the
// lead is never lost even if an alert fails. This function never throws.
//
// Channels (each one is active only when its secrets are set on the
// `penthouse` Worker, Settings → Variables and Secrets):
//   Email (Resend): RESEND_API_KEY, LEAD_ALERT_FROM (e.g. "Penthouse Leads <leads@penthouseadvisors.com>",
//                   domain must be verified in Resend), optional LEAD_ALERT_TO (comma-separated).
//   Slack:          SLACK_BOT_TOKEN (xoxb-…, same bot as the website-update workflow).
//                   Optional SLACK_LEAD_CHANNEL_ID; defaults to the website-editor channel.

export type LeadAlert = {
  name: string;
  phone: string;
  email: string;
  source: string;
  role: string;
  serviceNeeded: string;
  timeline: string;
  financing: string;
  timestamp: string;
  notes: string;
};

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1XxSXkc43h9qV4CeSgYzudsAbPfGDXk2rQn24y7_0Yhg/edit";
const DEFAULT_SLACK_CHANNEL = "C0BKQNZLSD8"; // same channel as the website editor
const DEFAULT_TO = ["penthouseadvisors@gmail.com", "jlh21001@gmail.com"];

function env(): Record<string, string | undefined> {
  return (globalThis as { __env__?: Record<string, string | undefined> }).__env__ ?? process.env;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lines(lead: LeadAlert): [string, string][] {
  return (
    [
      ["Name", lead.name],
      ["Phone", lead.phone],
      ["Email", lead.email],
      ["Source", lead.source],
      ["Role", lead.role],
      ["Service needed", lead.serviceNeeded],
      ["Timeline", lead.timeline],
      ["Financing", lead.financing],
      ["Submitted", lead.timestamp],
      ["Notes", lead.notes],
    ] as [string, string][]
  ).filter(([, v]) => v && v.trim());
}

async function sendEmail(lead: LeadAlert): Promise<string> {
  const e = env();
  if (!e.RESEND_API_KEY || !e.LEAD_ALERT_FROM) return "email skipped (not configured)";
  const to = (e.LEAD_ALERT_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const rows = lines(lead)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top"><b>${k}</b></td><td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px">
<p>New inquiry from penthouseadvisors.com. Reply to this email to respond to the lead directly.</p>
<table>${rows}</table>
<p><a href="${SHEET_URL}">Open the Inbound Leads sheet</a></p></div>`;
  const text = `${lines(lead)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n\nSheet: ${SHEET_URL}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${e.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: e.LEAD_ALERT_FROM,
      to: to.length ? to : DEFAULT_TO,
      reply_to: lead.email,
      subject: `New Penthouse lead: ${lead.name} (${lead.source})`,
      html,
      text,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}`);
  return "email sent";
}

async function sendSlack(lead: LeadAlert): Promise<string> {
  const e = env();
  if (!e.SLACK_BOT_TOKEN) return "slack skipped (not configured)";
  const body = lines(lead)
    .map(([k, v]) => `*${k}:* ${v}`)
    .join("\n");
  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${e.SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      channel: e.SLACK_LEAD_CHANNEL_ID || DEFAULT_SLACK_CHANNEL,
      text: `:bell: New Penthouse lead: ${lead.name}\n${body}\n<${SHEET_URL}|Open the leads sheet>`,
      unfurl_links: false,
    }),
    signal: AbortSignal.timeout(8000),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !json.ok) throw new Error(`Slack ${json.error ?? res.status}`);
  return "slack sent";
}

export async function sendLeadAlert(lead: LeadAlert): Promise<void> {
  const results = await Promise.allSettled([sendEmail(lead), sendSlack(lead)]);
  for (const r of results) {
    if (r.status === "rejected") console.error("Lead alert failed:", String(r.reason));
    else if (r.value.includes("skipped")) console.warn("Lead alert", r.value);
  }
}
