import { createFileRoute } from "@tanstack/react-router";
import { Wine, Check, Info } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import {
  ServiceAuthorityFaq,
  ServiceAuthorityHero,
  ServiceAuthorityDetails,
} from "@/components/site/ServiceAuthority";
import { serviceAuthority, specialistFaqs } from "@/content/service-authority";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript, serviceScript, faqScript } from "@/lib/seo";
export const Route = createFileRoute("/alcohol-licensing")({
  head: () => ({
    meta: [
      {
        title: "Restaurant Alcohol Licensing - Type 41 & Type 47 ABC Licenses | Penthouse Advisors",
      },
      {
        name: "description",
        content:
          "Type 41 and Type 47 restaurant alcohol licensing in Los Angeles. Application and transfer coordination, local approval review, and itemized service scope.",
      },
      { property: "og:title", content: "Restaurant Alcohol Licensing - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Type 41 and Type 47 ABC licensing in LA County. Transparent pricing.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/alcohol-licensing" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/alcohol-licensing" }],
    scripts: [
      faqScript(specialistFaqs.alcohol),
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Restaurant Alcohol Licensing", path: "/alcohol-licensing" },
      ]),
      serviceScript({
        name: "Alcohol Licensing (ABC)",
        description:
          "Type 41 and Type 47 restaurant ABC license applications and transfers in Los Angeles County.",
        path: "/alcohol-licensing",
        serviceType: "Alcohol Licensing",
      }),
    ],
  }),
  component: LicensingPage,
});

const types = [
  {
    name: "Type 41 - Beer & Wine",
    body: "On-sale beer and wine for a bona fide eating place. This restaurant license does not authorize distilled spirits; the restaurant must meet the applicable eating-place requirements.",
    bullets: [
      "Bona fide eating place with suitable kitchen facilities",
      "Meals regularly served; review any license-specific conditions",
      "Beer and wine, on-premise",
      "Application, public notice, and agency review requirements apply",
      "Local alcohol authorization depends on the property and jurisdiction",
    ],
  },
  {
    name: "Type 47 - Hard Liquor",
    body: "On-sale general licensing for a bona fide eating place, including beer, wine, and distilled spirits. License availability, transfer eligibility, and local land-use approval are separate questions.",
    bullets: [
      "Bona fide eating place with suitable kitchen facilities",
      "Meals regularly served; review any license-specific conditions",
      "Distilled spirits, Beer and Wine",
      "Often acquired by transfer from a held license",
      "Local alcohol authorization depends on the property and jurisdiction",
    ],
  },
];

const fees = [
  { label: "Deposit (non-refundable)", amount: "$8,000" },
  { label: "California ABC application fees", amount: "Per current ABC schedule" },
  { label: "ABC Mailing / Notification", amount: "$2,900" },
  { label: "Live Scan per person", amount: "Confirm current provider charge" },
  { label: "Notary", amount: "Confirm scope and charge" },
];

const recent = [
  { addr: "7275 Melrose Ave", type: "Type 41", status: "Approved-Active" },
  { addr: "6535 Melrose Ave", type: "Type 47", status: "Pending" },
  { addr: "5710 E Los Angeles Ave, Simi Valley", type: "Type 41", status: "Pending" },
  { addr: "8406 Topanga Canyon Blvd, Canoga Park", type: "Type 41", status: "Pending" },
  { addr: "1831 S La Cienega", type: "Type 41", status: "Pending" },
  {
    addr: "14120 Ventura Blvd. Unit E, Sherman Oaks",
    type: "Type 41",
    status: "Issuance Activated",
  },
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
  "Approved-Active": "bg-gold/15 text-gold border-gold/40",
  Pending: "bg-foreground/10 text-foreground/85 border-border",
};

function LicensingPage() {
  return (
    <SiteLayout>
      <ServiceAuthorityHero content={serviceAuthority.alcohol} />

      {/* Types */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {types.map((t) => (
            <article
              key={t.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-elegant"
            >
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
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Transparent Pricing
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
            Service pricing and agency charges.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Our published deposit and notification amounts are retained below. Confirm the written
            scope, total service fee, and refund terms before engagement. Government charges vary by
            application and pass through at cost; the ABC fee schedule is linked below.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-card border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold uppercase tracking-wider text-xs text-gold">
                    Line Item
                  </th>
                  <th className="text-right p-4 font-semibold uppercase tracking-wider text-xs text-gold">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.label} className="border-b border-border last:border-0">
                    <td className="p-4">{f.label}</td>
                    <td className="p-4 text-right font-display text-2xl font-bold text-gold tabular-nums tracking-wide">
                      {f.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-gold/40 bg-gold/5 p-5">
              <Info className="mt-0.5 h-5 w-5 text-gold shrink-0" />
              <p className="text-sm">
                <span className="font-semibold text-gold">Local alcohol approval:</span> Review the
                property's approval documents and operating conditions with the local planning
                authority. An inactive or changed operation may require further review; there is no
                single countywide reinstatement fee, approval window, or closing hour.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
              <Info className="mt-0.5 h-5 w-5 text-gold shrink-0" />
              <p className="text-sm">
                <span className="font-semibold text-gold">Application notices:</span> Confirm the
                posting, mailing, and publication requirements for the specific application with
                ABC. The $2,900 published notification service line is not presented as a government
                fee.
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground italic leading-relaxed max-w-3xl">
            Buyers and tenants should review local alcohol approval documents before committing to a
            location. Have counsel review contractual disclosure obligations and responsibility for
            obtaining approvals.
          </p>
        </div>
      </section>

      {/* Recent activity */}
      <section className="container-x py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Selected Licensing Work
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
          Published project history.
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Examples retained from our published service history. Status labels describe the recorded
          project stage and are not a live ABC feed. Confirm current license status directly with
          ABC.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {recent.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div>
                <div className="font-semibold text-sm">{r.addr}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.type}</div>
              </div>
              <span
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[r.status]}`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <ServiceAuthorityDetails content={serviceAuthority.alcohol} />

      <ServiceAuthorityFaq faqs={specialistFaqs.alcohol} />

      <CTASection
        serviceNeeded={"Alcohol licensing (Type 41 / 47)"}
        title="Need a Type 41 or Type 47?"
        body="Bring the address and any existing license details so we can discuss the application path, scope, and cost factors."
      />
    </SiteLayout>
  );
}
