import { createFileRoute } from "@tanstack/react-router";
import { DoorOpen } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/search-door-knocking")({
  head: () => ({
    meta: [
      { title: "Search Off-Market Restaurant - Penthouse Advisors LA" },
      {
        name: "description",
        content:
          "Restaurant door-knocking off-market campaign. We locate vacant, equipped second-generation restaurant spaces, negotiate the lease, and handle health department plan-check.",
      },
      { property: "og:title", content: "Search Off-Market Restaurant - Penthouse Advisors" },
      {
        property: "og:description",
        content:
          "Door-knocking off-market campaign for restaurant operators. We locate the space, negotiate lease terms, and handle permitting so you can focus on opening.",
      },
    ],
  }),
  component: SearchDoorKnockingPage,
});

function SearchDoorKnockingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Search Off-Market Restaurant"
        title="Restaurant door-knocking"
        accent="off-market campaign."
        subtitle="We locate the space, negotiate new lease terms and conditions, Options, Rent Abatement Allowances and set up the Health Department permit so you can focus on opening. We'll go over pricing during your consultation."
      />

      <section className="container-x py-10 md:py-14 border-b border-border">
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          Most of the best LA restaurant deals never get listed. Operators sell quietly, landlords push deals to a short list, and privately held businesses transfer hand-to-hand. Tell us what you're hunting - we'll find it.
        </p>
      </section>

      <section className="container-x py-12 md:py-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <DoorOpen className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">What the campaign includes</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Upon reviewing the location to service, the menu and affordable rent, Zelle Penthouse
            Advisors Inc. $3,775. Upon receiving the funds we will email an invoice with balance
            zero.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              {
                step: "STEP 1",
                text: "The start of our restaurant door-knocking off-market campaign. We contact open restaurant owners and landlords stuck with vacant, equipped second-generation restaurants in your desired area. We only speak with the restaurant owners (never a manager or employee) about relocating, not exercising a lease option if coming due, and assuming lease obligations through an assignment of lease. If month-to-month and ready to quit, we request permission to contact the property owner and explain their lease situation before requesting a new lease application for our qualified restaurant operator.",
              },
              {
                step: "STEP 2",
                text: "Once a restaurant is located and approved by our client, we perform a Health Department pre-inspection for code compliance issues.",
              },
              {
                step: "STEP 3",
                text: "We lead lease negotiations with the landlord or property manager.",
              },
              {
                step: "STEP 4",
                text: "Hand-drafted blueprints required by Health Department plan-check are included in the $3,775 fee.",
              },
              {
                step: "STEP 5",
                text: "All repairs, code compliance upgrades, and permits are performed by our licensed general contractor.",
              },
              {
                step: "STEP 6",
                text: "We follow up with Health Department site inspection appointments by the assigned inspector for permit issuance.",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/90 leading-relaxed">
                  <strong className="font-semibold text-foreground">{item.step}.</strong>{" "}
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <LeadForm
          serviceNeeded="Search off-market restaurant"
          title="Start Your Off-Market Search"
          subtitle="Tell us the area and concept. We respond same business day."
          messagePlaceholder="Address of my current restaurant"
        />
      </section>
    </SiteLayout>
  );
}
