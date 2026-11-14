import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, FileText, Flame, DoorOpen, DollarSign } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript, serviceScript } from "@/lib/seo";
import { HeadingCTA } from "@/components/site/HeadingCTA";
export const Route = createFileRoute("/restaurant-equipment-review")({
  head: () => ({
    meta: [
      { title: "Restaurant Equipment Review - $2,750 Flat Fee | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Restaurant equipment review with Health Dept plan-check for cook-line equipment added under the hood. $2,750 flat fee, including final site inspection coordination.",
      },
      { property: "og:title", content: "Restaurant Equipment Review - $2,750 Flat Fee" },
      {
        property: "og:description",
        content:
          "Adding equipment to a cook line under the hood? We establish an equipment review with plan-check. $2,750 flat.",
      },
      {
        property: "og:url",
        content: "https://www.penthouseadvisors.com/restaurant-equipment-review",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.penthouseadvisors.com/restaurant-equipment-review" },
    ],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Health Permitting", path: "/health-permitting" },
        { name: "Restaurant Equipment Review", path: "/restaurant-equipment-review" },
      ]),
      serviceScript({
        name: "Restaurant Equipment Review",
        description:
          "Health Dept plan-check equipment review for restaurant cook-line equipment added under the hood, with final site inspection coordination.",
        path: "/restaurant-equipment-review",
        serviceType: "Health Department Compliance",
      }),
    ],
  }),
  component: EquipmentReviewPage,
});

const steps = [
  {
    icon: ClipboardCheck,
    title: "Equipment Review with Plan-Check",
    body: "Adding Equipment to a cook line under the Hood, we establish with Plan-Check an “equipment review” to ensure health and safety standards and local building codes are in place.",
  },
  {
    icon: FileText,
    title: "Specification Sheets",
    body: "Specification sheets detailing the Equipment dimensions, power requirements are required.",
  },
  {
    icon: Flame,
    title: "Gas Equipment Installation",
    body: "Installation of Gas Equipment with a C36 Licensed Plumber.",
  },
  {
    icon: DoorOpen,
    title: "Final Site Inspection",
    body: "A final site inspection is arranged.",
  },
];

function EquipmentReviewPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Health Permitting"
        title="Restaurant Equipment Review."
        accent="$2,750 flat fee."
        subtitle="Adding equipment to a cook line under the hood? We establish the equipment review with Health Dept plan-check and arrange the final site inspection."
      />

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
              $2,750 Flat Fee - Restaurant Equipment Review.
            </h2>
            <HeadingCTA />
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">The Process</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">
          How the equipment review works.
        </h2>
        <HeadingCTA />

        <ol className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-elegant"
            >
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

      <CTASection
        serviceNeeded={"Restaurant equipment review"}
        title="Adding equipment to your cook line?"
        body="Discuss your equipment plans and the $2,750 equipment review scope."
      />
    </SiteLayout>
  );
}
