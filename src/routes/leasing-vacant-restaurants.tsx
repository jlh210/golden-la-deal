import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/leasing-vacant-restaurants")({
  head: () => ({
    meta: [
      { title: "Leasing Vacant Restaurants - No Fee Representation | Penthouse Advisors LA" },
      {
        name: "description",
        content:
          "Contact Penthouse Advisors Inc. to represent you in leasing vacant, equipped, second-generation restaurants. No fee. We protect tenants from unlawful key money demands and hidden fees.",
      },
      { property: "og:title", content: "Leasing Vacant Restaurants - Penthouse Advisors" },
      {
        property: "og:description",
        content:
          "No-fee representation for vacant, equipped, second-generation restaurant leases. Call 310-663-3521.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/leasing-vacant-restaurants" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/leasing-vacant-restaurants" }],
  }),
  component: LeasingVacantRestaurantsPage,
});

function LeasingVacantRestaurantsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Leasing Vacant Restaurants"
        title="Contact Penthouse Advisors INC."
        accent="To represent you."
        subtitle="No fee. We handle vacant, equipped, second-generation restaurant leases and protect you from unlawful key money demands and hidden charges."
      />

      <section className="container-x py-12 md:py-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Building2 className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">NO FEE representation</h2>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Vacant, equipped, second-generation restaurants are lease-only deals. Property
            owners are not in the business of selling used restaurant furniture, fixtures, and
            equipment. Plus, the Health Department deems such equipment worthless if it does not
            display visible labels: <span className="text-gold font-semibold">NSF</span>{" "}
            (Sanitized) or <span className="text-gold font-semibold">ETL</span> (Listed).
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Restaurant tenants before vacating the premises can sell the “non-attached” FF&E
            (furniture, fixtures, equipment) as key money while still holding legal possession
            under a lease.
          </p>

          <div className="mt-6 rounded-lg border border-gold/30 bg-gold/5 p-5">
            <h3 className="font-display font-bold text-foreground">Key money is illegal.</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              It is basically illegal for property owners or their hired hands — called real estate
              agents — to collect “key money payments,” defined as any demand for payment beyond
              lawful rent and security deposits as a condition for initiating or renewing a lease,
              or to prioritize a tenant’s application. Key money is often an “under the table”
              payment, which is against California and federal law.
            </p>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            If a property owner wants to charge for items left in the unit, it must be included in
            the written, lawful lease agreement and cannot be demanded as a precondition for
            renting. Leases should include language and instructions about personal property in the
            unit.
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Property owners may be liable for actual damages in a civil action. They are also
            prohibited from charging extra fees such as:
          </p>

          <ul className="mt-3 space-y-2">
            {[
              "Paying rent or security deposits by check",
              "Serving and posting 3-day Pay or Quit notices on front doors",
              "Any charge beyond lawful rent and security deposits",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            prior to filing a UD (Unlawful Detainer).
          </p>

          <div className="mt-6 rounded-lg border border-border bg-background p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Office</div>
            <div className="mt-1 font-semibold text-foreground">M: 310-663-3521</div>
            <a
              href="mailto:PenthouseAdvisors@gmail.com"
              className="mt-1 block text-sm text-gold hover:underline"
            >
              PenthouseAdvisors@gmail.com
            </a>
          </div>
        </div>

        <LeadForm
          serviceNeeded="Leasing vacant restaurant"
          title="Lease a Vacant Restaurant"
          subtitle="Tell us about the space or your search. We respond same business day."
          messagePlaceholder="Address of my current restaurant"
        />
      </section>
    </SiteLayout>
  );
}
