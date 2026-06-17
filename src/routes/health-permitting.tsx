import { createFileRoute } from "@tanstack/react-router";
import { Ruler, FileCheck2, Stamp, HardHat } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/health-permitting")({
  head: () => ({
    meta: [
      { title: "Restaurant Health Dept Permitting & Plan Check | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Hand-drafted blueprints, Health Dept plan-check submittals, stamped approvals, permit issuance. For restaurants closed 90+ days, remodels, and red-tagged equipment in LA County.",
      },
      { property: "og:title", content: "Health Dept Permitting & Plan Check — Penthouse Advisors" },
      {
        property: "og:description",
        content: "Blueprints, plan check, stamped approvals, and permit issuance — done.",
      },
    ],
  }),
  component: PermittingPage,
});

function PermittingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Health Dept Permitting & Plan Check"
        title="Blueprints, plan check, permits."
        accent="Stamped and issued."
        subtitle="If your restaurant has been closed over 90 days, you're remodeling, or you've had equipment red-tagged — you need stamped Health Dept blueprints before a single gas line moves. We draft them by hand and push them through plan check."
      />

      <section className="container-x py-16 md:py-20 grid gap-6 lg:grid-cols-2">
        {[
          {
            icon: Ruler,
            title: "Hand-drafted blueprints",
            body: "Floor plan, proposed floor plan, site plan, reflected ceiling plan, hood and cook-line elevations, prep sink and drain elevations, scope of work, equipment schedule — all drafted to scale, ready for submittal.",
          },
          {
            icon: FileCheck2,
            title: "Plan check submittal",
            body: "Full package submitted to LA County Health Dept Plan Check. We respond to corrections, coordinate with Building & Safety, and shepherd the file to approval.",
          },
          {
            icon: Stamp,
            title: "Stamped approvals",
            body: "Stamped blueprints must be in place before any restaurant remodeling, alterations, or gas-equipment installation under the hood. We get the stamp first — protecting your construction and your timeline.",
          },
          {
            icon: HardHat,
            title: "Permits to open",
            body: "Once construction is signed off by Building & Safety, we set the Health Dept site appointment, get final permitting, and walk out with the ID that lets you open for business.",
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

      <CTASection
        title="Need stamped blueprints or a permit pushed through?"
        body="We draft, submit, and walk it through plan check. Start to permit issuance."
      />
    </SiteLayout>
  );
}
