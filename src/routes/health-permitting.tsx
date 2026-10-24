import { createFileRoute } from "@tanstack/react-router";
import {
  Ruler,
  FileCheck2,
  Stamp,
  HardHat,
  DollarSign,
  Flame,
  Droplets,
  Thermometer,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import {
  ServiceAuthorityFaq,
  ServiceAuthorityHero,
  ServiceAuthorityDetails,
} from "@/components/site/ServiceAuthority";
import { serviceAuthority, specialistFaqs } from "@/content/service-authority";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript, serviceScript, faqScript } from "@/lib/seo";
export const Route = createFileRoute("/health-permitting")({
  head: () => ({
    meta: [
      { title: "Restaurant Health Permitting Los Angeles | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Restaurant health permitting and plan-check coordination in Los Angeles: scaled plans, submissions, corrections, and inspection preparation. $4,750 service fee.",
      },
      { property: "og:title", content: "Health Dept Permitting & Plan Check - $4,750" },
      {
        property: "og:description",
        content:
          "Restaurant plans, plan-check coordination, and inspection preparation. $4,750 service fee.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/health-permitting" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/health-permitting" }],
    scripts: [
      faqScript(specialistFaqs.health),
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Health Permitting", path: "/health-permitting" },
      ]),
      serviceScript({
        name: "Health Department Permitting",
        description:
          "LA County Health Department permitting, plan check, and hand-drafted restaurant blueprints.",
        path: "/health-permitting",
        serviceType: "Health Department Permitting",
      }),
    ],
  }),
  component: PermittingPage,
});

const scope = [
  {
    icon: Ruler,
    title: "Hand-drafted blueprints",
    body: "Floor plan, proposed floor plan, site plan, reflected ceiling plan, hood and cook-line elevations, prep sink and drain elevations, scope of work, equipment schedule - all drafted to scale.",
  },
  {
    icon: FileCheck2,
    title: "Plan check submittal",
    body: "Full package submitted to LA County Health Dept Plan Check. We respond to corrections, coordinate with Building & Safety, and shepherd the file to approval.",
  },
  {
    icon: Stamp,
    title: "Stamped approvals",
    body: "Stamped blueprints must be in place before any restaurant remodeling, alterations, or gas-equipment installation under the hood. We get the stamp first.",
  },
  {
    icon: HardHat,
    title: "Permits to open",
    body: "After required construction sign-offs, we coordinate the health inspection and any remaining corrections. The responsible agencies determine final approval and permit issuance.",
  },
  {
    icon: Droplets,
    title: "Grease interceptor / trap review",
    body: "We estimate interceptor sizing and installation scope, including the missing 3-compartment-sink grease trap where required.",
  },
  {
    icon: Flame,
    title: "Hood Fire Inspection coordination",
    body: "Velocity testing and smoke testing of the hood system - coordinated through certified vendors under a separate agreement.",
  },
  {
    icon: Thermometer,
    title: "Operational compliance check",
    body: "CUB permit status verification, HVAC review, hot water temperature check, NSF label verification on every piece of equipment.",
  },
  {
    icon: FileCheck2,
    title: "Sellers Permit & POS",
    body: "Sellers Permit application and POS system setup supplied as part of the engagement.",
  },
];

const recentPermits = [
  { addr: "Sunset Blvd, Silver Lake", status: "Permit Approved Open" },
  { addr: "Pico Blvd, West LA", status: "Red Tag Corrected" },
  { addr: "Ventura Blvd, Sherman Oaks", status: "Permit Approved Open" },
  { addr: "Melrose Ave, Hollywood", status: "Plan Check Review Completed" },
  { addr: "Beverly Blvd, Mid-City", status: "Permit Approved Open" },
  { addr: "Main St, Santa Monica", status: "Red Tag Corrected" },
  { addr: "Echo Park, Coffee Shop", status: "Equipment Review Pending" },
  { addr: "Burbank, Restaurant", status: "Equipment Review Pending" },
  { addr: "Santa Monica, Restaurant", status: "Red Tag Removed, Health Dept Permit Issued" },
  { addr: "Woodland Hills, Meat Market", status: '"Change of Use" & Health Dept Permit, Pending' },
  { addr: "West Los Angeles, Restaurant", status: "Red Tag Removed, Health Dept Permit Issuance Complete" },
  {
    addr: "Wilshire Blvd., West Los Angeles, Restaurant",
    status: "Red Tagged, Work Completed, Restaurant Open",
  },
  {
    addr: "West Los Angeles, Restaurant",
    status: "Red Tag Closed, Blueprint Corrections, Reopened",
  },
  {
    addr: 'Sunset Blvd., Hollywood, "Commissary Kitchen"',
    status: "Brought to Code Compliance, Change of Ownership, Permit Issuance",
  },
  { addr: "Mar Vista, Los Angeles, Restaurant", status: "Health Dept Inspection Pending Approval" },
];

const statusStyle: Record<string, string> = {
  "Permit Approved Open": "bg-gold/15 text-gold border-gold/40",
  "Red Tag Corrected": "bg-foreground/10 text-foreground/85 border-border",
  "Plan Check Review Completed": "bg-gold/15 text-gold border-gold/40",
  "Equipment Review Pending": "bg-foreground/10 text-foreground/85 border-border",
  "Red Tag Removed, Health Dept Permit Issued": "bg-gold/15 text-gold border-gold/40",
  '"Change of Use" & Health Dept Permit, Pending':
    "bg-foreground/10 text-foreground/85 border-border",
  "Red Tag Removed, Health Dept Permit Issuance Complete": "bg-gold/15 text-gold border-gold/40",
  "Red Tagged, Work Completed, Restaurant Open": "bg-gold/15 text-gold border-gold/40",
  "Red Tag Closed, Blueprint Corrections, Reopened": "bg-gold/15 text-gold border-gold/40",
  "Brought to Code Compliance, Change of Ownership, Permit Issuance":
    "bg-gold/15 text-gold border-gold/40",
  "Health Dept Inspection Pending Approval": "bg-foreground/10 text-foreground/85 border-border",
};

function PermittingPage() {
  return (
    <SiteLayout>
      <ServiceAuthorityHero content={serviceAuthority.health} />

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
              $4,750 flat - Blueprints, Health Dept Plan-Check, and Permitting
            </h2>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20 grid gap-6 lg:grid-cols-2">
        {scope.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-border bg-card p-7 shadow-elegant"
          >
            <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
              <c.icon className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-xl font-display font-bold">{c.title}</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{c.body}</p>
          </div>
        ))}
      </section>

      {/* Recent permits */}
      <section className="border-t border-border bg-card">
        <div className="container-x py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Selected Permit Work
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
            Files we've shepherded through.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Examples retained from our published service history. Status labels describe the
            recorded project stage and are not a live agency feed. Addresses are abbreviated.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {recentPermits.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
              >
                <div className="font-semibold text-sm">{r.addr}</div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[r.status]}`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceAuthorityDetails content={serviceAuthority.health} />

      <ServiceAuthorityFaq faqs={specialistFaqs.health} />

      <CTASection
        serviceNeeded={"Health Dept permitting / plan check"}
        title="Need stamped blueprints or a permit pushed through?"
        body="Discuss your plans and the $4,750 service scope, including the agency reviews your project may require."
      />
    </SiteLayout>
  );
}
