import { createFileRoute } from "@tanstack/react-router";
import { Ruler, FileCheck2, Stamp, HardHat, DollarSign, Flame, Droplets, Thermometer } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript, serviceScript } from "@/lib/seo";
export const Route = createFileRoute("/health-permitting")({
  head: () => ({
    meta: [
      { title: "Restaurant Health Dept Permitting & Plan Check - $3,700 | Penthouse Advisors" },
      {
        name: "description",
        content:
          "$3,700 flat - hand-drafted blueprints, Health Dept plan-check submittal, stamped approvals, permit issuance. Good for 1 year or until restaurant is leased.",
      },
      { property: "og:title", content: "Health Dept Permitting & Plan Check - $3,700" },
      {
        property: "og:description",
        content: "$3,700 flat. Blueprints, plan check, stamps, permit. Good 1 year.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/health-permitting" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/health-permitting" }],
    scripts: [
      breadcrumbScript([{name:"Home",path:"/"},{name:'Health Permitting',path:'/health-permitting'}]),
      serviceScript({ name: 'Health Department Permitting', description: 'LA County Health Department permitting, plan check, and hand-drafted restaurant blueprints.', path: '/health-permitting', serviceType: 'Health Department Permitting' }),
    ],
  }),
  component: PermittingPage,
});

const scope = [
  { icon: Ruler, title: "Hand-drafted blueprints", body: "Floor plan, proposed floor plan, site plan, reflected ceiling plan, hood and cook-line elevations, prep sink and drain elevations, scope of work, equipment schedule - all drafted to scale." },
  { icon: FileCheck2, title: "Plan check submittal", body: "Full package submitted to LA County Health Dept Plan Check. We respond to corrections, coordinate with Building & Safety, and shepherd the file to approval." },
  { icon: Stamp, title: "Stamped approvals", body: "Stamped blueprints must be in place before any restaurant remodeling, alterations, or gas-equipment installation under the hood. We get the stamp first." },
  { icon: HardHat, title: "Permits to open", body: "Once construction is signed off by Building & Safety, we set the Health Dept site appointment, get final permitting, and walk out with the ID that lets you open." },
  { icon: Droplets, title: "Grease interceptor / trap review", body: "We estimate interceptor sizing and installation scope, including the missing 3-compartment-sink grease trap where required." },
  { icon: Flame, title: "Hood Fire Inspection coordination", body: "Velocity testing and smoke testing of the hood system - coordinated through certified vendors under a separate agreement." },
  { icon: Thermometer, title: "Operational compliance check", body: "CUB permit status verification, HVAC review, hot water temperature check, NSF label verification on every piece of equipment." },
  { icon: FileCheck2, title: "Sellers Permit & POS", body: "Sellers Permit application and POS system setup supplied as part of the engagement." },
];

const recentPermits = [
  { addr: "Sunset Blvd, Silver Lake", status: "Permit Approved Open" },
  { addr: "Pico Blvd, West LA", status: "Red Tag Corrected" },
  { addr: "Ventura Blvd, Sherman Oaks", status: "Permit Approved Open" },
  { addr: "Melrose Ave, Hollywood", status: "Plan Check In Review" },
  { addr: "Beverly Blvd, Mid-City", status: "Permit Approved Open" },
  { addr: "Main St, Santa Monica", status: "Red Tag Corrected" },
];

const statusStyle: Record<string, string> = {
  "Permit Approved Open": "bg-gold/15 text-gold border-gold/40",
  "Red Tag Corrected": "bg-foreground/10 text-foreground/85 border-border",
  "Plan Check In Review": "bg-destructive/10 text-destructive border-destructive/30",
};

function PermittingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Health Dept Permitting & Plan Check"
        title="Blueprints, plan check, permits."
        accent="$3,700 flat."
        subtitle="If your restaurant has been closed over 90 days, you're remodeling, or you've had equipment red-tagged - you need stamped Health Dept blueprints before a single gas line moves. We draft them by hand and push them through plan check."
      />

      {/* Pricing band */}
      <section className="border-b border-border bg-card">
        <div className="container-x py-10 md:py-12 flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30 shrink-0">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">Transparent Pricing</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-display font-bold">
              $3,700 flat - blueprints, plan check, and permit shepherding.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Good for 1 year, or until the restaurant is leased - whichever comes first.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20 grid gap-6 lg:grid-cols-2">
        {scope.map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-card p-7 shadow-elegant">
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
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Recent Permit Activity</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Files we've shepherded through.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A rolling view of recent plan-check and permit work. Addresses abbreviated for confidentiality.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {recentPermits.map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                <div className="font-semibold text-sm">{r.addr}</div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle[r.status]}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection serviceNeeded={"Health Dept permitting / plan check"}
        title="Need stamped blueprints or a permit pushed through?"
        body="$3,700 flat. We draft, submit, and walk it through plan check - start to permit issuance."
      />
    </SiteLayout>
  );
}
