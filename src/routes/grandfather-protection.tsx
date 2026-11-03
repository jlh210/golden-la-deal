import { createFileRoute } from "@tanstack/react-router";
import { Lock, AlertTriangle, Clock, Accessibility } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript } from "@/lib/seo";
import { HeadingCTA } from "@/components/site/HeadingCTA";
export const Route = createFileRoute("/grandfather-protection")({
  head: () => ({
    meta: [
      { title: "Grandfather Protection - 90-Day Rule & ADA Carve-Outs | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Grandfather Protection on older LA restaurants auto-expires after 90 days closed with Health. ADA, grease trap, and floor-plan rules still apply. Know what you can touch.",
      },
      { property: "og:title", content: "Grandfather Protection - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Protect older restaurant spaces. 90-day rule. ADA carve-outs. Don't move the floor plan.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/grandfather-protection" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/grandfather-protection" }],
    scripts: [
      breadcrumbScript([{name:"Home",path:"/"},{name:'Grandfather Protection',path:'/grandfather-protection'}]),
    ],
  }),
  component: GrandfatherPage,
});

const adaItems = [
  "Front entrance ramp (required if any visible steps)",
  "Restrooms must be ADA-compliant",
  "Serving counter must be ADA-compliant",
  "At least one (1) dining table must be ADA-compliant",
];

function GrandfatherPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Grandfather Protection"
        title="Don't touch the wrong wall."
        accent="Keep your status."
        subtitle="Older LA restaurant spaces are often operating under Grandfather Protection - meaning current code doesn't apply unless you trigger it. Trigger it once and the entire space owes full compliance."
      />

      {/* 90-day rule - critical */}
      <section className="border-b border-border bg-card">
        <div className="container-x py-12 md:py-14 flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-destructive/15 text-destructive border border-destructive/30 shrink-0">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-destructive">Critical 90-Day Rule</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-display font-bold">
              Closed with the Health Department for over 90 days?
            </h2>
            <HeadingCTA />
            <p className="mt-2 text-muted-foreground max-w-2xl">
              Grandfather Protection automatically expires. The space owes full current code from day 91 onward -
              no waivers, no negotiation. This is the single fastest way owners lose protected status.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20 grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">What it means</h2>
          <HeadingCTA />
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Grandfather Protection is a legacy allowance that lets older restaurant spaces
            continue operating under the codes in effect when they were built - not today's
            stricter Building & Safety, Health, Title 24, hood, and grease interceptor
            requirements. It's a real financial asset of the space.
          </p>
        </div>

        <div className="rounded-2xl border border-destructive/40 bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-destructive/15 text-destructive border border-destructive/30">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">How owners lose it</h2>
          <HeadingCTA />
          <ul className="mt-3 space-y-2 text-muted-foreground leading-relaxed text-sm">
            <li>• Closed with Health Dept for over 90 days (auto-expires)</li>
            <li>• Remodeling that <span className="font-semibold text-foreground">changes the floor plan</span></li>
            <li>• Moving or removing walls</li>
            <li>• Swapping the hood or relocating gas equipment</li>
            <li>• Changing occupancy or adding seating beyond permitted count</li>
            <li>• Pulling a permit that triggers a full plan-check review</li>
          </ul>
        </div>
      </section>

      {/* ADA carve-outs */}
      <section className="border-y border-border bg-card">
        <div className="container-x py-16 md:py-20">
          <div className="flex items-center gap-3">
            <Accessibility className="h-6 w-6 text-gold" />
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Still Required After a 90-Day Closure</p>
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">ADA carve-outs apply after a Restaurant 90 closure, even with protection.</h2>
          <HeadingCTA />
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Prior Grandfather Protection does <span className="font-semibold text-foreground">not</span> exempt a restaurant (if and when the original floor plan is slightly altered or notification of closure with the Health Department exceeds the 90 day allowance) from baseline ADA compliance. These four items must be put in place regardless of any past protected status:
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {adaItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-gold/30 bg-card p-4 text-sm">
                <Accessibility className="mt-0.5 h-4 w-4 text-gold shrink-0" /> {item}
              </li>
            ))}
          </ul>

        </div>
      </section>

      <section className="container-x py-16">
        <div className="rounded-2xl border border-gold/40 bg-card p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold">Before you remodel - call us.</h2>
          <HeadingCTA />
          <p className="mt-3 text-muted-foreground max-w-2xl">
            We review the property's permit history, identify what's protected, and tell
            you exactly what work you can do without triggering full code compliance.
            One conversation can save the deal.
          </p>
        </div>
      </section>

      <CTASection serviceNeeded={"Grandfather protection question"} title="Thinking about altering an older space?" body="Get a 15-minute Grandfather review before you spend a dollar on construction." />
    </SiteLayout>
  );
}
