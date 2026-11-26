import { createFileRoute } from "@tanstack/react-router";
import { Search, FileWarning, ShieldCheck, DollarSign } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import {
  ServiceAuthorityFaq,
  ServiceAuthorityHero,
  ServiceAuthorityDetails,
} from "@/components/site/ServiceAuthority";
import { serviceAuthority, specialistFaqs } from "@/content/service-authority";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript, serviceScript, faqScript } from "@/lib/seo";
import { HeadingCTA } from "@/components/site/HeadingCTA";
export const Route = createFileRoute("/business-investigations")({
  head: () => ({
    meta: [
      { title: "Restaurant Business Investigations - $2,990 Flat Fee | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Pre-purchase restaurant due diligence: lease terms, permit history, sales verification, ABC status, code violations, hidden landlord and disclosure issues - before you sign. $2,990 flat fee.",
      },
      { property: "og:title", content: "Restaurant Business Investigations - $2,990 Flat Fee" },
      {
        property: "og:description",
        content:
          "Verify the deal before you sign. Full pre-purchase restaurant investigation. $2,990 flat fee.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/business-investigations" },
    ],
    links: [
      { rel: "canonical", href: "https://www.penthouseadvisors.com/business-investigations" },
    ],
    scripts: [
      serviceScript({
        name: "Restaurant Business Investigations",
        description: serviceAuthority.investigate.answer,
        path: "/business-investigations",
        serviceType: "Restaurant Due Diligence",
      }),
      faqScript(specialistFaqs.investigate),
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Business Investigations", path: "/business-investigations" },
      ]),
    ],
  }),
  component: InvestigationsPage,
});

function InvestigationsPage() {
  return (
    <SiteLayout>
      <ServiceAuthorityHero content={serviceAuthority.investigate} />

      {/* Pricing band */}
      <section className="border-b border-border bg-card">
        <div className="container-x py-10 md:py-12 flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30 shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">
              Transparent Pricing
            </div>
            <h2 className="mt-1 text-2xl md:text-3xl font-display font-bold">
              Restaurant Business Investigations - $2,990 Flat Fee
            </h2>
            <HeadingCTA />
          </div>
        </div>
      </section>

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
            body: "A clear written report on the property, the business, and the seller's representations - plus a recommendation: proceed, renegotiate, or walk. Findings distinguish available evidence from questions requiring further review.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-border bg-card p-7 shadow-elegant"
          >
            <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
              <c.icon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-display font-bold">{c.title}</h2>
            <HeadingCTA />
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{c.body}</p>
          </div>
        ))}
      </section>

      <ServiceAuthorityDetails content={serviceAuthority.investigate} />

      <ServiceAuthorityFaq faqs={specialistFaqs.investigate} />

      <CTASection
        serviceNeeded={"Pre-purchase business investigation"}
        title="Thinking about buying a restaurant?"
        body="Discuss the available documents, diligence deadlines, and investigation scope before making your next commitment."
      />
    </SiteLayout>
  );
}
