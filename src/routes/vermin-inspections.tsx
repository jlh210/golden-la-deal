import { createFileRoute } from "@tanstack/react-router";
import { Bug, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/vermin-inspections")({
  head: () => ({
    meta: [
      { title: "Vermin Infestation Inspections — Commercial Compliance | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Monthly vermin and food-handling compliance inspections for LA commercial property owners. Restaurants and food markets. $1,000/mo · 1-year contract.",
      },
      { property: "og:title", content: "Vermin Inspections — Penthouse Advisors" },
      {
        property: "og:description",
        content: "Monthly compliance inspections for commercial property owners.",
      },
    ],
  }),
  component: VerminPage,
});

const includes = [
  "Monthly on-site inspection of restaurants and food markets",
  "Visible signs of vermin and infestation documented with photos",
  "Food-handling violations flagged with corrective training advised",
  "Written report delivered to ownership each month",
  "Tenant accountability framework — clear record of what's the tenant's responsibility",
  "Same-month re-walk if a serious finding requires follow-up",
];

function VerminPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Vermin (Fermin) Infestation Inspections"
        title="Monthly compliance"
        accent="for property owners."
        subtitle="A recurring inspection service for commercial property owners and landlords. Tenants are responsible for vermin control within their leased space — Penthouse Advisors gives you the documented record to enforce it."
      />

      <section className="container-x py-16 md:py-20 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">What's Included</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Built for landlords, not tenants.</h2>
          <p className="mt-4 text-muted-foreground">
            Under a standard commercial lease, the tenant is responsible for vermin control
            within their leased premises. Without a monthly inspection record, that
            responsibility is hard to enforce. We give property owners a documented compliance
            trail — and we coach the tenant on the corrective food-handling steps that
            prevent infestations in the first place.
          </p>
          <ul className="mt-8 space-y-3">
            {includes.map((i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-gold/40 bg-charcoal-deep p-8 shadow-elegant h-fit lg:sticky lg:top-28">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Bug className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-2xl font-display font-bold">Service Pricing</h3>
          <div className="mt-6 space-y-4 text-sm">
            <Row label="Inspection & Report" value="$1,000 / month" />
            <Row label="Contract Term" value="1 year" />
            <Row label="Annual Total" value="$12,000" />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            One report per property, per month. Multi-property portfolios quoted on request.
          </p>
        </aside>
      </section>

      <CTASection title="Protect your property." body="Tell us how many spaces you operate — we'll send a contract today." />
    </SiteLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-display font-bold text-gold">{value}</span>
    </div>
  );
}
