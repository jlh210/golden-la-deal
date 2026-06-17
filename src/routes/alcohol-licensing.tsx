import { createFileRoute } from "@tanstack/react-router";
import { Wine, Check, Info } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/alcohol-licensing")({
  head: () => ({
    meta: [
      { title: "Alcohol Licensing — Type 41 & Type 47 ABC Licenses | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Type 41 Beer & Wine and Type 47 Hard Liquor licensing in Los Angeles. Transfers, new licenses, and CUB diversion permits. Transparent pricing.",
      },
      { property: "og:title", content: "Alcohol Licensing — Penthouse Advisors" },
      {
        property: "og:description",
        content: "Type 41 and Type 47 ABC licensing in LA County. Transparent pricing.",
      },
    ],
  }),
  component: LicensingPage,
});

const types = [
  {
    name: "Type 41 — Beer & Wine",
    body: "On-sale Beer & Wine for bona-fide eating places. The standard license for restaurants that don't pour hard liquor. Lower fees, faster path, fewer protests.",
    bullets: ["Restaurant required (kitchen + menu)", "Beer and wine, on-premise", "No public protests in most census tracts"],
  },
  {
    name: "Type 47 — Hard Liquor",
    body: "On-sale General for bona-fide eating places. Full bar privileges. Requires either an existing license to transfer or, in many tracts, a Conditional Use Permit (CUP).",
    bullets: ["Beer, wine, and distilled spirits", "Often acquired by transfer from a held license", "CUP may be required by tract"],
  },
];

const fees = [
  { label: "Penthouse Processing Fee", amount: "$7,000" },
  { label: "California State Payment", amount: "$1,660" },
  { label: "ABC Mailing / Notification", amount: "$2,900" },
  { label: "Live Scan (per person)", amount: "≈ $250" },
  { label: "Notary (per signature)", amount: "$15" },
];

const recent = [
  { addr: "1742 Sunset Blvd, Echo Park", type: "Type 47", status: "Issuance Activated" },
  { addr: "Wilshire Blvd, Mid-Wilshire", type: "Type 41", status: "Pending Approval" },
  { addr: "Main St, Santa Monica", type: "Type 47", status: "Pending Approval" },
  { addr: "Melrose Ave, West Hollywood", type: "Type 41", status: "Issuance Activated" },
  { addr: "Lincoln Blvd, Venice", type: "Type 47", status: "Deactivated" },
  { addr: "York Blvd, Highland Park", type: "Type 41", status: "Issuance Activated" },
];

const statusStyle: Record<string, string> = {
  "Issuance Activated": "bg-gold/15 text-gold border-gold/40",
  "Pending Approval": "bg-foreground/10 text-foreground/85 border-border",
  "Deactivated": "bg-destructive/15 text-destructive border-destructive/30",
};

function LicensingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Alcohol Licensing"
        title="Type 41 & Type 47 —"
        accent="done right."
        subtitle="ABC license transfers, new licenses, and CUB diversion in Los Angeles County. We handle paperwork, posting, protests, Live Scan, and notary — straight through to issuance."
      />

      {/* Types */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {types.map((t) => (
            <article key={t.name} className="rounded-2xl border border-border bg-card p-7 shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <Wine className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-display font-bold">{t.name}</h2>
              <p className="mt-3 text-muted-foreground">{t.body}</p>
              <ul className="mt-5 space-y-2">
                {t.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-gold shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Fees */}
      <section className="border-y border-border bg-charcoal-deep">
        <div className="container-x py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Transparent Pricing</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Fee schedule.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Itemized so there's no surprise. Government fees pass through at cost; our
            processing fee covers prep, filing, posting, and shepherding through ABC.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-charcoal-deep/60 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs text-gold">Line Item</th>
                  <th className="text-right p-4 font-semibold uppercase tracking-wider text-xs text-gold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.label} className="border-b border-border last:border-0">
                    <td className="p-4">{f.label}</td>
                    <td className="p-4 text-right font-display font-bold text-gold">{f.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/5 p-5">
            <Info className="mt-0.5 h-5 w-5 text-gold shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-gold">CUB Diversion Permit:</span>{" "}
              Inactive permits require an additional <span className="font-bold">$5,500</span> CUB
              diversion permit fee to restore active status. Quoted separately when applicable.
            </p>
          </div>
        </div>
      </section>

      {/* Recent activity */}
      <section className="container-x py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Recent Licensing Activity</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Live file status.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A rolling view of files in flight. Addresses are abbreviated for confidentiality.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {recent.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
              <div>
                <div className="font-semibold text-sm">{r.addr}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.type}</div>
              </div>
              <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[r.status]}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <CTASection title="Need a Type 41 or Type 47?" body="Tell us the address and we'll quote the timeline and total cost today." />
    </SiteLayout>
  );
}
