import { buildServiceJsonLd } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { FileSearch, Handshake, Plane } from "lucide-react";
import { ServiceLanding } from "@/components/site/ServiceLanding";

const URL = "https://www.penthouseadvisors.com/restaurant-consulting";
const FAQS = [
  {
    q: "What is a restaurant business investigation?",
    a: "A pre-purchase diligence package: lease and assignment review, ABC license history, code and permit status, sales verification, equipment condition, vendor contracts, and prior Health inspection records — delivered before you wire a deposit.",
  },
  {
    q: "My deal is stuck. Can you help?",
    a: "Yes. Buyer/tenant resolutions are a core practice — landlord disputes, escrow holds, license-transfer snags, permit denials. We diagnose the blocker and negotiate to a close.",
  },
  {
    q: "Do you advise European investors using the E-2 visa?",
    a: "Yes. We package E-2-ready restaurant acquisitions for European entrepreneurs — see our E-2 Visa (Europe) page.",
  },
  {
    q: "How do you charge for advisory work?",
    a: "Either a flat retainer for a defined scope or hourly. Quoted on the consultation call after we've reviewed the situation.",
  },
];

export const Route = createFileRoute("/restaurant-consulting")({
  head: () => ({
    meta: [
      { title: "Restaurant Consulting Los Angeles | Hospitality Advisory" },
      {
        name: "description",
        content:
          "Restaurant consulting in Los Angeles: pre-purchase business investigations, buyer/tenant resolutions, lease assignment strategy, and E-2 visa advisory for hospitality.",
      },
      { property: "og:title", content: "Restaurant Consulting in Los Angeles" },
      {
        property: "og:description",
        content: "Hospitality advisory and restaurant consulting across LA County.",
      },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: buildServiceJsonLd({
      name: "Restaurant Consulting — Los Angeles",
      serviceType: "Hospitality Consulting",
      description: "Restaurant and hospitality consulting across Los Angeles County.",
      url: URL,
      breadcrumbs: [
        { name: "Home", url: "https://www.penthouseadvisors.com" },
        { name: "Services", url: "https://www.penthouseadvisors.com/services" },
        { name: "Restaurant Consulting", url: URL },
      ],
      faqs: FAQS,
    }),
  }),
  component: ConsultingPage,
});

function ConsultingPage() {
  return (
    <ServiceLanding
      eyebrow="Restaurant Consulting"
      title="Hospitality advisory"
      accent="for serious operators."
      subtitle="Pre-purchase investigations, buyer/tenant resolutions, lease strategy, and E-2 visa advisory."
      h1="Restaurant Consulting in Los Angeles"
      overview="Beyond brokerage, Penthouse Advisors operates as a working hospitality advisory firm. We're hired to run pre-purchase diligence on restaurants buyers are about to acquire, to resolve deals that have stalled mid-escrow, to structure lease assignments and guarantor terms, and to package E-2-ready acquisitions for European entrepreneurs."
      benefits={[
        {
          icon: FileSearch,
          title: "Pre-Purchase Diligence",
          body: "Lease, license, code, sales, and equipment — investigated before money moves.",
        },
        {
          icon: Handshake,
          title: "Deal Resolution",
          body: "Stuck escrows, landlord disputes, license-transfer denials, permit blockers — diagnosed and negotiated.",
        },
        {
          icon: Plane,
          title: "E-2 Visa Advisory",
          body: "Investment-visa-ready restaurant acquisitions for European entrepreneurs.",
        },
      ]}
      process={[
        {
          step: "01",
          title: "Consult",
          body: "We listen, we diagnose, we quote a defined scope and fee.",
        },
        {
          step: "02",
          title: "Investigate",
          body: "Documents pulled, parties interviewed, options modeled.",
        },
        {
          step: "03",
          title: "Resolve",
          body: "Written recommendation, negotiation, or hand-off to the right specialist.",
        },
      ]}
      faqs={FAQS}
      related={[
        { to: "/business-investigations", label: "Restaurant Business Investigations" },
        { to: "/buyer-tenant-resolutions", label: "Buyer / Tenant Resolutions" },
        { to: "/assignments-rent-abatement", label: "Lease Assignments & Abatement" },
        { to: "/e2-visa-europe", label: "E-2 Visa (Europe)" },
        { to: "/grandfather-protection", label: "Grandfather Protection" },
      ]}
      serviceNeeded="Something else"
      ctaTitle="Need an advisor in your corner?"
      ctaBody="One conversation. We'll tell you straight what the play is."
    />
  );
}
