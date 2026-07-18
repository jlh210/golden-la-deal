import { createFileRoute } from "@tanstack/react-router";
import { Wine, Check, Info } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript, serviceScript } from "@/lib/seo";
export const Route = createFileRoute("/alcohol-licensing")({
  head: () => ({
    meta: [
      { title: "Alcohol Licensing - Type 41 & Type 47 ABC Licenses | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Type 41 Beer & Wine and Type 47 Hard Liquor licensing in Los Angeles. Transfers, new licenses, and CUB diversion permits. Transparent pricing.",
      },
      { property: "og:title", content: "Alcohol Licensing - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Type 41 and Type 47 ABC licensing in LA County. Transparent pricing.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/alcohol-licensing" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/alcohol-licensing" }],
    scripts: [
      breadcrumbScript([{name:"Home",path:"/"},{name:'Alcohol Licensing',path:'/alcohol-licensing'}]),
      serviceScript({ name: 'Alcohol Licensing (ABC)', description: 'Type 41, Type 47, and Type 48 ABC license applications and transfers in Los Angeles County.', path: '/alcohol-licensing', serviceType: 'Alcohol Licensing' }),
    ],
  }),
  component: LicensingPage,
});

const types = [
  {
    name: "Type 41 - Beer & Wine",
    body: "On-sale Beer & Wine for bona-fide eating places. The standard license for restaurants that don't pour hard liquor. Lower fees, faster path, fewer protests.",
    bullets: [
      "Restaurant required ADA Bathroom his/hers, (kitchen + menu)",
      "Percentage of food served with Alcohol",
      "Beer and wine, on-premise",
      "No public protests in most census tracts",
      "CUP may be required by tract. Active 'CUB' Conditional Use Beverage is a requirement within Los Angeles County",
    ],
  },
  {
    name: "Type 47 - Hard Liquor",
    body: "On-sale General for bona-fide eating places. Full bar privileges. Requires either an existing license to transfer or, in many tracts, a Conditional Use Permit (CUP).",
    bullets: [
      "Restaurant required ADA Bathroom his/hers, (kitchen + menu)",
      "Percentage of food served with Alcohol",
      "Distilled spirits, Beer and Wine",
      "Often acquired by transfer from a held license",
      "CUP may be required by tract. Active 'CUB' Conditional Use Beverage is a requirement within Los Angeles County",
    ],
  },
];

const fees = [
  { label: "Deposit (non-refundable)", amount: "$8,000" },
  { label: "California State Payment", amount: "$1,660" },
  { label: "ABC Mailing / Notification", amount: "$2,900" },
  { label: "Live Scan per person", amount: "$30–45" },
  { label: "Notary (per signature)", amount: "$15" },
];

const recent = [
  { addr: "14120 Ventura Blvd. Unit E, Sherman Oaks", type: "Type 41", status: "Pending" },
  { addr: "7275 Melrose Ave", type: "Type 41", status: "Pending" },
  { addr: "6535 Melrose Ave", type: "Type 47", status: "Pending" },
  { addr: "5710 E Los Angeles Ave, Simi Valley", type: "Type 41", status: "Pending" },
  { addr: "8406 Topanga Canyon Blvd, Canoga Park", type: "Type 41", status: "Pending" },
  { addr: "1831 S La Cienega", type: "Type 41", status: "Pending" },
  { addr: "6015 W. Third Street", type: "Type 41", status: "Issuance Activated" },
  { addr: "6136 Venice Blvd", type: "Type 41", status: "Issuance Activated" },
  { addr: "14350 Ventura Blvd, Sherman Oaks", type: "Type 41", status: "Issuance Activated" },
  { addr: "101 Fairfax Ave", type: "Type 41", status: "Issuance Activated" },
  { addr: "7300 Sunset Blvd", type: "Type 47", status: "Issuance Activated" },
  { addr: "7274-7276 Melrose Ave", type: "Type 41", status: "Issuance Activated" },
  { addr: "5910 W. Sunset Blvd", type: "Type 41", status: "Issuance Activated" },
  { addr: "5902 W. Sunset Blvd", type: "Type 41", status: "Issuance Activated" },
  { addr: "320 La Brea Ave", type: "Type 41", status: "Issuance Activated" },
  { addr: "751 Echo Park, Silver Lake", type: "Type 41", status: "Issuance Activated" },
  { addr: "7300 Sunset Blvd", type: "Type 41", status: "Issuance Activated" },
  { addr: "7422 Melrose Ave", type: "Type 41", status: "Issuance Activated" },
];

const statusStyle: Record<string, string> = {
  "Issuance Activated": "bg-gold/15 text-gold border-gold/40",
  "Pending": "bg-foreground/10 text-foreground/85 border-border",
};

function LicensingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Alcohol Licensing"
        title="Type 41 & Type 47 -"
        accent="done right."
        subtitle="ABC license transfers, new licenses, and CUB diversion in Los Angeles County. We handle paperwork, posting, protests, Live Scan, and notary - straight through to issuance."
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
      <section className="border-y border-border bg-card">
        <div className="container-x py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Transparent Pricing</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Fee schedule.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Itemized so there's no surprise. Government fees pass through at cost; our
            processing fee covers prep, filing, posting, and shepherding through ABC.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-card border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs text-gold">Line Item</th>
                  <th className="text-right p-4 font-semibold uppercase tracking-wider text-xs text-gold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.label} className="border-b border-border last:border-0">
                    <td className="p-4">{f.label}</td>
                    <td className="p-4 text-right font-display text-2xl font-bold text-gold tabular-nums tracking-wide">{f.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/5 p-5">
              <Info className="mt-0.5 h-5 w-5 text-gold shrink-0" />
              <p className="text-sm">
                <span className="font-semibold text-gold">CUB Diversion Permit:</span>{" "}
                Inactive permits require an additional <span className="font-bold">$5,500</span> CUB
                diversion permit fee to restore active status. Typical processing window:{" "}
                <span className="font-bold">6 weeks</span>. Drinking hours set Mon–Sun to 10pm or 11pm depending on location.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
              <Info className="mt-0.5 h-5 w-5 text-gold shrink-0" />
              <p className="text-sm">
                <span className="font-semibold text-gold">ABC Notification Radius:</span>{" "}
                State notification mailings cover all residents within a{" "}
                <span className="font-bold">500-foot radius</span> of the establishment. Included in the $2,900 line item above.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground italic leading-relaxed max-w-3xl">
            Disclaimer: It is the sole responsibility of the Restaurant Buyer or New Tenant to verify the status of the CUB
            (Conditional Use Beverage) permit on any prospective location. It is <span className="font-semibold">not</span> the
            responsibility of the Property Owner to disclose CUB status.
          </p>
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

      <CTASection serviceNeeded={"Alcohol licensing (Type 41 / 47)"} title="Need a Type 41 or Type 47?" body="Tell us the address and we'll quote the timeline and total cost today." />
    </SiteLayout>
  );
}
