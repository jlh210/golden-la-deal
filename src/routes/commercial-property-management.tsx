import { ORG_ID } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  ShieldCheck,
  Wrench,
  FileText,
  Phone,
  Users,
  Clock,
  Home,
  CheckCircle2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";

const URL = "https://www.penthouseadvisors.com/commercial-property-management";

export const Route = createFileRoute("/commercial-property-management")({
  head: () => ({
    meta: [
      { title: "Commercial Property Management Los Angeles | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Full-service commercial property management in Los Angeles. $600 per door or 10% of gross monthly rent. Leasing, compliance, maintenance, tenant screening, and 24/7 emergency service.",
      },
      { property: "og:title", content: "Commercial Property Management Los Angeles" },
      {
        property: "og:description",
        content:
          "Los Angeles commercial property management: leasing, compliance, maintenance, tenant relations, and 24/7 emergency call service.",
      },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Commercial Property Management",
          serviceType: "Property Management",
          description:
            "Full-service commercial property management and property management solutions in Los Angeles County.",
          url: URL,
          areaServed: { "@type": "AdministrativeArea", name: "Los Angeles County" },
          provider: { "@id": ORG_ID },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.penthouseadvisors.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://www.penthouseadvisors.com/services",
            },
            { "@type": "ListItem", position: 3, name: "Commercial Property Management", item: URL },
          ],
        }),
      },
    ],
  }),
  component: CommercialPropertyManagementPage,
});

const managementServices = [
  {
    icon: ShieldCheck,
    text: "Managing the commercial property with rules and regulations that keep you in compliance with local ordinances.",
  },
  {
    icon: Users,
    text: "Fewer vacancies. We market, show, and fill commercial spaces across Los Angeles.",
  },
  {
    icon: Building2,
    text: "Oversee the buildings, tenants, and invitees working on or inside the property.",
  },
  {
    icon: FileText,
    text: "Move-in and move-out property inspections with documented condition reports.",
  },
  { icon: CheckCircle2, text: "Rigorous tenant screening including background checks." },
  { icon: FileText, text: "Prepare new leases and draft assignments." },
  {
    icon: HandshakeIcon,
    text: "Negotiate prior and current month-to-month lease obligations, written or verbal business agreements, and agreed financial obligations.",
  },
  {
    icon: ShieldCheck,
    text: "Secure and reimburse security deposits in accordance with the lease.",
  },
  { icon: ShieldCheck, text: "Maintaining property insurance coverage." },
  { icon: Phone, text: "Prompt rent collection with options to pay online." },
  { icon: FileText, text: "Supply late rent notices and 3-day pay or quit slips." },
  { icon: Wrench, text: "Arrange legal action to prepare an unlawful detainer when necessary." },
  {
    icon: Wrench,
    text: "Contract negotiations with our in-house licensed, bonded, and insured general contractor, including competitive bids for property services paid through NNN charges.",
  },
  {
    icon: Home,
    text: "Pay monthly property tax, power, water, gas, and common-area maintenance from the NNN collected — exterior, interior, and roof repair included.",
  },
  {
    icon: Wrench,
    text: "Manage maintenance and repair requests from tenants and tenant complaints.",
  },
  {
    icon: ShieldCheck,
    text: "Inspect for vermin control within all leased restaurant spaces and coach tenants on corrective steps to maintain public safety compliance.",
  },
  { icon: FileText, text: "Manage accounts payable." },
  { icon: ShieldCheck, text: "Ensure compliance with local ordinances." },
  { icon: Home, text: "Homeless permanent removal and protection of the location." },
  { icon: Clock, text: "Provide 24/7 emergency call service." },
];

function HandshakeIcon(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="m11 17 5-5 1.5 1.5a1.35 1.35 0 1 1-3 3L11 17" />
      <path d="m15 13 5-5a1.35 1.35 0 1 0-3-3l-5 5" />
      <path d="m11 17-5-5 1.5-1.5a1.35 1.35 0 1 0 3 3Z" />
      <path d="m8 14-6 6" />
      <path d="m21 3-6 6" />
    </svg>
  );
}

function CommercialPropertyManagementPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Commercial Property Management"
        title="Los Angeles"
        accent="property management."
        subtitle="Full-service commercial management and property management solutions for landlords, investors, and restaurant property owners throughout LA County."
      />

      <section className="container-x py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Overview</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold leading-tight">
            Full-service management for commercial assets.
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            Penthouse Advisors provides a full range of commercial management services and property
            management solutions. Our fee is based on $600 per door, or if the building has limited
            doors, 10% of the total monthly gross rent collected.
          </p>
        </div>
      </section>

      <section className="container-x py-10 md:py-14 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">What we manage</p>
        <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">
          Penthouse Advisors Inc. services include.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {managementServices.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-elegant"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-12 md:py-16 border-t border-border">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Partnership</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold leading-tight">
            Property management starts with relationships.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            We understand that successful property management starts with a workable relationship
            with the property owners. We maintain such relationships as a top priority.
          </p>
        </div>
      </section>

      <section className="container-x py-12 md:py-16 border-t border-border">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <LeadForm
            serviceNeeded="Commercial property management"
            title="Get a Management Quote"
            subtitle="Tell us about your property and we'll respond with a fee proposal and next steps."
            messagePlaceholder="Property address, unit count, current rent roll, and any immediate needs…"
          />
          <div className="space-y-5">
            <div className="rounded-2xl border border-gold/40 bg-card p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold border border-gold/30">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Call us
                  </div>
                  <div className="text-xl font-display font-bold text-gold">310-663-3521</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-display font-bold">Management fee structure</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>$600 per door</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  <span>Limited-door buildings: 10% of total monthly gross rent collected</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
