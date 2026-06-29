import { createFileRoute } from "@tanstack/react-router";
import { Handshake, Scale, AlertTriangle } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/buyer-tenant-resolutions")({
  head: () => ({
    meta: [
      { title: "Restaurant Buyer & Tenant Resolutions | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Stuck mid-deal? Landlord non-disclosure, lease disputes, failed escrow, permit hold-ups, surprise code issues. We resolve restaurant buyer and tenant dilemmas fast.",
      },
      { property: "og:title", content: "Buyer & Tenant Resolutions - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Stuck mid-deal? We resolve restaurant buyer and tenant dilemmas fast.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/buyer-tenant-resolutions" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/buyer-tenant-resolutions" }],
  }),
  component: ResolutionsPage,
});

function ResolutionsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Buyer / Tenant Resolutions"
        title="Stuck mid-deal? We unstick it."
        accent="Fast, workable solutions."
        subtitle="Landlord non-disclosure, lease disputes, frozen escrow, permit hold-ups, surprise code violations, broken seller promises - restaurant buyers and tenants get blindsided every day. We step in and resolve it."
      />

      <section className="container-x py-16 md:py-20 grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-destructive/40 bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-destructive/15 text-destructive border border-destructive/30">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">Common dilemmas</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed">
            <li>• Landlord or agent failed to disclose code, permit, or violation history</li>
            <li>• Seller's sales numbers don't match POS or tax records</li>
            <li>• Lease language blocks your concept, signage, or hours</li>
            <li>• Escrow stalled over deposit, security, or assignment terms</li>
            <li>• Permits won't issue - Building & Safety, Health, or ABC hold-up</li>
            <li>• Equipment turned out leased, broken, or red-tagged after closing</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Handshake className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">How we resolve it</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed">
            <li>• Direct landlord and agent negotiation - written, on the record</li>
            <li>• Lease re-trade: rent abatement, TI swaps, term changes</li>
            <li>• Deposit / escrow recovery and re-papering of agreements</li>
            <li>• Permit unblock through Building & Safety and Health Dept liaison</li>
            <li>• Equipment and code remediation through our licensed contractor</li>
            <li>• Walk-away strategy when the deal can't be saved</li>
          </ul>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="rounded-2xl border border-gold/40 bg-card p-8 md:p-10 flex items-start gap-4">
          <Scale className="h-7 w-7 text-gold shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Treated fairly, equally, honestly.</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              We don't pick sides for sport - we get the deal to a workable close,
              or we tell you straight when to walk. Either way, you stop bleeding time and money.
            </p>
          </div>
        </div>
      </section>

      <CTASection serviceNeeded={"Buyer / tenant resolution (deal stuck)"}
        title="Caught in a restaurant deal that's gone sideways?"
        body="Call us today. We answer the phone, assess the dilemma, and move on it now."
      />
    </SiteLayout>
  );
}
