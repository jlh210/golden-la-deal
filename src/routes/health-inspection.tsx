import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Ruler, Flame, Wrench, DoorOpen } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/health-inspection")({
  head: () => ({
    meta: [
      { title: "Health Dept Inspection & Permitting — LA County | Penthouse Advisors" },
      {
        name: "description",
        content:
          "LA County Health Department pre-inspections, red-tag removal, hand-drafted blueprints for plan check, hood cleaning, and reopen process.",
      },
      { property: "og:title", content: "Health Dept Inspection & Permitting" },
      {
        property: "og:description",
        content: "Pre-inspections, red-tag removal, blueprints, hood, reopen.",
      },
    ],
  }),
  component: HealthPage,
});

const steps = [
  { icon: ShieldCheck, title: "Pre-Inspection", body: "We walk your space first — same checklist the LA County Public Health inspector uses. Punch list with priorities and cost estimates." },
  { icon: AlertTriangle, title: "Red-Tag Triage", body: "If you've been closed, we identify the exact violations and the remediation path. We negotiate the re-inspection window." },
  { icon: Ruler, title: "Hand-Drafted Blueprints", body: "Floor plan, site plan, elevations, and equipment schedule — drafted to LA County standards for plan check submittal." },
  { icon: Flame, title: "Hood Cleaning & Inspection", body: "Type I hood cleaning, certified inspection, and grease interceptor sign-off coordinated through our vendor network." },
  { icon: Wrench, title: "Repair to Reopen", body: "Plumbing, refrigeration, hand sinks, sneeze guards — whatever the inspector cited, we get it corrected and documented." },
  { icon: DoorOpen, title: "Reopen", body: "Re-inspection scheduled, permit reissued, doors open. We stay on the file until you're operating." },
];

function HealthPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Health Dept Inspection & Permitting"
        title="Pass on the first walk-through."
        accent="Reopen fast."
        subtitle="Pre-inspections, red-tag removal, plan check blueprints, hood cleaning, and the full repair-to-reopen process — all in-house for LA County restaurants."
      />

      <section className="container-x py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Process</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Six steps to operating.</h2>

        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl border border-border bg-card p-7 shadow-elegant">
              <div className="absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-charcoal-deep font-display font-black text-sm shadow-gold">
                {i + 1}
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-display font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <CTASection title="Red tag on the door?" body="Call us today. Most red tags can be cleared within a week." />
    </SiteLayout>
  );
}
