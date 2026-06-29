import { createFileRoute } from "@tanstack/react-router";
import { Search, FileWarning, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/business-investigations")({
  head: () => ({
    meta: [
      { title: "Restaurant Business Investigations | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Pre-purchase restaurant due diligence: lease terms, permit history, sales verification, ABC status, code violations, hidden landlord and disclosure issues - before you sign.",
      },
      { property: "og:title", content: "Restaurant Business Investigations - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Verify the deal before you sign. Full pre-purchase restaurant investigation.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/business-investigations" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/business-investigations" }],
  }),
  component: InvestigationsPage,
});

function InvestigationsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Restaurant Business Investigations"
        title="Know exactly what you're buying."
        accent="Before you sign."
        subtitle="Sellers and landlords don't always tell you everything. We dig - lease terms, permit history, code violations, sales numbers, ABC status, equipment condition - so you walk into the deal with eyes open."
      />

      <section className="container-x py-16 md:py-20 grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: Search,
            title: "What we investigate",
            body: "Lease and sublease terms, landlord disclosures, permit and Building & Safety history, Health Dept violations and red tags, ABC licensing status, CUB conditions, sales claims vs. POS / tax records, equipment age and condition, hood and grease compliance.",
          },
          {
            icon: FileWarning,
            title: "Hidden deal-killers we surface",
            body: "Undisclosed code violations, expired permits, unpermitted construction, CUB conditions that block your concept, grandfather-protection traps, rent escalators, personal guaranty language, equipment that's leased not owned.",
          },
          {
            icon: ShieldCheck,
            title: "What you walk away with",
            body: "A clear written report on the property, the business, and the seller's representations - plus a recommendation: proceed, renegotiate, or walk. One call can save six figures.",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-card p-7 shadow-elegant">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
              <c.icon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-display font-bold">{c.title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{c.body}</p>
          </div>
        ))}
      </section>

      <CTASection serviceNeeded={"Pre-purchase business investigation"}
        title="Thinking about buying a restaurant?"
        body="Get a full pre-purchase investigation before escrow opens. We move fast."
      />
    </SiteLayout>
  );
}
