import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Ruler, Flame, Wrench, DoorOpen, Ban, DollarSign } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/health-inspection")({
  head: () => ({
    meta: [
      { title: "Health Dept Inspection & Pre-Inspection — $2,700 Flat | Penthouse Advisors" },
      {
        name: "description",
        content:
          "LA County Health Dept pre-inspections — $2,700 flat, hand-drafted blueprints included. Red-tag removal, FORBIDDEN-equipment review, hood, and reopen process.",
      },
      { property: "og:title", content: "Health Dept Pre-Inspection — $2,700 Flat" },
      {
        property: "og:description",
        content: "$2,700 flat. Blueprints included. Red tags cleared, doors reopened.",
      },
    ],
  }),
  component: HealthPage,
});

const steps = [
  { icon: ShieldCheck, title: "Pre-Inspection", body: "We walk your space first — same checklist the LA County Public Health inspector uses. Punch list with priorities and cost estimates." },
  { icon: AlertTriangle, title: "Red-Tag Triage", body: "If you've been closed, we identify the exact violations and the remediation path. We negotiate the re-inspection window." },
  { icon: Ruler, title: "Hand-Drafted Blueprints", body: "Floor plan, site plan, reflected ceiling plan, hood and cook-line elevations — drafted to LA County standards. Included in the $2,700 fee." },
  { icon: Flame, title: "Hood Cleaning & Inspection", body: "Type I hood cleaning, certified inspection, and grease interceptor sign-off coordinated through our vendor network." },
  { icon: Wrench, title: "Repair to Reopen", body: "Plumbing, refrigeration, hand sinks, sneeze guards — whatever the inspector cited, we get it corrected and documented." },
  { icon: DoorOpen, title: "Reopen", body: "Re-inspection scheduled, permit reissued, doors open. We stay on the file until you're operating." },
];

const forbidden = [
  "Service counters used as food-prep surfaces",
  "Exposed wood (shelving, prep tables, framing)",
  "Moving or relocating walls without stamped plans",
  "Gas equipment installed outside the hood footprint",
  "Non-NSF labeled equipment in any food zone",
  "Restrooms that don't meet current ADA + Health code",
];

function HealthPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Health Dept Inspection & Pre-Inspection"
        title="Pass on the first walk-through."
        accent="$2,700 flat."
        subtitle="Pre-inspections, red-tag removal, plan-check blueprints, hood cleaning, and the full repair-to-reopen process — all in-house for LA County restaurants."
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
              $2,700 flat — pre-inspection + hand-drafted blueprints included.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Payable via Zelle or cash. Restaurant pre-inspections commence immediately upon receipt.
            </p>
          </div>
        </div>
      </section>

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

      {/* FORBIDDEN list */}
      <section className="border-y border-border bg-card">
        <div className="container-x py-16 md:py-20">
          <div className="flex items-center gap-3">
            <Ban className="h-6 w-6 text-destructive" />
            <p className="text-xs font-semibold uppercase tracking-widest text-destructive">Forbidden — Will Fail Inspection</p>
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">What LA County will red-tag on sight.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            These items fail inspection every time. If any are present in your space, we flag them during the pre-inspection
            and give you the corrective path before the County ever sees it.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {forbidden.map((f) => (
              <li key={f} className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-card p-4 text-sm">
                <Ban className="mt-0.5 h-4 w-4 text-destructive shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection title="Red tag on the door?" body="Call us today. Most red tags can be cleared within a week." />
    </SiteLayout>
  );
}
