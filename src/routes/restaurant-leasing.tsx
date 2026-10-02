import { buildServiceJsonLd } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { DoorOpen, FileSignature, Building2 } from "lucide-react";
import { ServiceLanding } from "@/components/site/ServiceLanding";

const URL = "https://www.penthouseadvisors.com/restaurant-leasing";
const FAQS = [
  {
    q: "What is a second-generation restaurant space?",
    a: "A space that was previously built out as a restaurant — hood, grease trap, plumbing, gas, and Health-approved layout already in place. Reopening a 2nd gen space typically saves 6–12 months and hundreds of thousands of dollars vs. a vanilla shell.",
  },
  {
    q: "Do tenants pay you a fee?",
    a: "No. Tenant representation is paid by the landlord at lease execution — there is no fee to the tenant.",
  },
  {
    q: "Can you negotiate free rent during build-out?",
    a: "Yes. We tie rent abatement to real milestones — Health permit issuance, ABC license, or doors-open day — see our Lease Assignments & Rent Abatement page.",
  },
  {
    q: "Do you handle landlord representation too?",
    a: "Yes. We lease vacant equipped restaurants for commercial property owners across LA County — no fee, qualified-operator-only.",
  },
];

export const Route = createFileRoute("/restaurant-leasing")({
  head: () => ({
    meta: [
      { title: "Commercial Restaurant Leasing Los Angeles | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Restaurant leasing in Los Angeles County: second-generation equipped spaces, lease negotiation, rent abatement, and landlord representation for restaurant operators.",
      },
      {
        property: "og:title",
        content: "Commercial Restaurant Leasing Los Angeles | Penthouse Advisors",
      },
      {
        property: "og:description",
        content: "Tenant and landlord restaurant leasing across LA County.",
      },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: buildServiceJsonLd({
      name: "Restaurant Leasing — Los Angeles",
      serviceType: "Commercial Restaurant Real Estate",
      description:
        "Restaurant leasing and tenant/landlord representation across Los Angeles County.",
      url: URL,
      breadcrumbs: [
        { name: "Home", url: "https://www.penthouseadvisors.com" },
        { name: "Services", url: "https://www.penthouseadvisors.com/services" },
        { name: "Restaurant Leasing", url: URL },
      ],
      faqs: FAQS,
    }),
  }),
  component: RestaurantLeasingPage,
});

function RestaurantLeasingPage() {
  return (
    <ServiceLanding
      eyebrow="Restaurant Leasing"
      title="Restaurant leasing"
      accent="across LA County."
      subtitle="Second-generation equipped spaces, lease negotiation, and rent abatement — for tenants and landlords."
      h1="Commercial Restaurant Leasing in Los Angeles"
      overview="We represent restaurant tenants and commercial landlords across Los Angeles County. For operators, we surface vacant, equipped, second-generation restaurant spaces — the kind that let you open in months instead of years. For landlords, we provide no-fee tenant placement with qualified operators only."
      benefits={[
        {
          icon: DoorOpen,
          title: "2nd-Gen Inventory",
          body: "Equipped restaurant spaces with hood, grease trap, and Health-approved layout already in place.",
        },
        {
          icon: FileSignature,
          title: "Lease Negotiation",
          body: "Rent abatement tied to permit issuance or opening day. Guarantor terms structured to protect both sides.",
        },
        {
          icon: Building2,
          title: "Landlord Representation",
          body: "No-fee placement for property owners — qualified operators, signed leases, verified guarantors.",
        },
      ]}
      process={[
        {
          step: "01",
          title: "Define the Space",
          body: "Neighborhood, size, license overlay, capex tolerance. We map the available 2nd-gen inventory.",
        },
        {
          step: "02",
          title: "Tour & Negotiate",
          body: "Walkthrough, LOI, abatement structure, guarantor terms, TI allowance.",
        },
        {
          step: "03",
          title: "Permit & Open",
          body: "Health permit, ABC license, landlord consent — sequenced through doors-open day.",
        },
      ]}
      faqs={FAQS}
      related={[
        { to: "/leasing-vacant-restaurants", label: "Leasing Vacant Restaurants" },
        { to: "/assignments-rent-abatement", label: "Assignments & Rent Abatement" },
        { to: "/grandfather-protection", label: "Grandfather Protection" },
        { to: "/health-permitting", label: "Health Permitting & Plan Check" },
      ]}
      serviceNeeded="Leasing vacant restaurant"
      ctaTitle="Looking for a restaurant lease — or a qualified tenant?"
      ctaBody="One call. We move on the same business day."
    />
  );
}
