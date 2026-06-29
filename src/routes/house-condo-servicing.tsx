import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/house-condo-servicing")({
  head: () => ({
    meta: [
      { title: "House / Condo Servicing - Penthouse Advisors LA" },
      {
        name: "description",
        content:
          "We accommodate all clients requesting their house or condo to be sold. Learn our open-house rules and request a private consultation with Penthouse Advisors.",
      },
      { property: "og:title", content: "House / Condo Servicing - Penthouse Advisors" },
      {
        property: "og:description",
        content:
          "Sell your house or condo with a disciplined, professional showing process. Inquire for a consultation.",
      },
    ],
  }),
  component: HouseCondoServicingPage,
});

function HouseCondoServicingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="House / Condo Servicing"
        title="We accommodate all clients"
        accent="selling their house or condo."
        subtitle="A professional, confidential listing process with clear showing rules designed to protect your property and present it at its best."
      />

      <section className="container-x py-12 md:py-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Building2 className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">Open-House Rules</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            To keep every showing safe, respectful, and productive, we ask all guests to
            follow the rules below. Sellers can trust that their home will be shown with
            discretion and buyers receive a focused, professional tour.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "All guests are restricted from wandering around unaccompanied.",
              "Bathroom use is not permitted at any time. Toilet seats are taped closed.",
              "Bathroom toilet paper, hanging towels, and toiletries are not visible.",
              "Jewelry and cash are not visible.",
              "Beds are made.",
              "Outfits and undergarments are put away and not visible.",
              "Buyer driver's license sign-in is required.",
              "Real estate agent tour groups are restricted.",
              "Front and back doors remain locked during each walkthrough.",
            ].map((rule, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/90 leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <LeadForm
          serviceNeeded="House/condo servicing"
          title="Request a Consultation"
          subtitle="Tell us about your house or condo. We respond same business day."
          messagePlaceholder="Address of my property"
        />
      </section>
    </SiteLayout>
  );
}
