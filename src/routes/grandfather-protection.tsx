import { createFileRoute } from "@tanstack/react-router";
import { Lock, AlertTriangle } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/grandfather-protection")({
  head: () => ({
    meta: [
      { title: "Grandfather Protection — Older Restaurant Spaces | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Older restaurant spaces under Grandfather Protection can't be altered or upgraded without losing protected status and triggering full code compliance costs.",
      },
      { property: "og:title", content: "Grandfather Protection — Penthouse Advisors" },
      {
        property: "og:description",
        content: "Protect older restaurant spaces from triggering full code compliance.",
      },
    ],
  }),
  component: GrandfatherPage,
});

function GrandfatherPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Grandfather Protection"
        title="Don't touch the wrong wall."
        accent="Keep your status."
        subtitle="Older LA restaurant spaces are often operating under Grandfather Protection — meaning current code doesn't apply unless you trigger it. Trigger it once and the entire space owes full compliance."
      />

      <section className="container-x py-16 md:py-20 grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">What it means</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Grandfather Protection is a legacy allowance that lets older restaurant spaces
            continue operating under the codes in effect when they were built — not today's
            stricter Building & Safety, Health, ADA, Title 24, hood, and grease
            interceptor requirements. It's a real financial asset of the space.
          </p>
        </div>

        <div className="rounded-2xl border border-destructive/40 bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-destructive/15 text-destructive border border-destructive/30">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">How owners lose it</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Alter the space — move a wall, swap a hood, change occupancy, add seating,
            permit a remodel — and you can lose protected status. The moment status is
            lost, the entire space owes current code: ADA, Title 24, hood and exhaust,
            grease interceptor, fire suppression, restrooms. The bill is often six figures.
          </p>
        </div>
      </section>

      <section className="container-x pb-16">
        <div className="rounded-2xl border border-gold/40 bg-charcoal-deep p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold">Before you remodel — call us.</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            We review the property's permit history, identify what's protected, and tell
            you exactly what work you can do without triggering full code compliance.
            One conversation can save the deal.
          </p>
        </div>
      </section>

      <CTASection title="Thinking about altering an older space?" body="Get a 15-minute Grandfather review before you spend a dollar on construction." />
    </SiteLayout>
  );
}
