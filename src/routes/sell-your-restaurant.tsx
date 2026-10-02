import { serviceAuthority } from "@/content/service-authority";
import { buildServiceJsonLd } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Lock, Handshake } from "lucide-react";
import { ServiceLanding } from "@/components/site/ServiceLanding";

const URL = "https://www.penthouseadvisors.com/sell-your-restaurant";
const FAQS = [
  {
    q: "How do you value my restaurant?",
    a: "We review sales and earnings, equipment value, remaining lease term, transfer conditions, and comparable evidence where available. The appropriate method depends on whether the sale is a going concern or primarily an asset sale. License and lease value depend on their terms and the approvals required.",
  },
  {
    q: "Will my staff and customers find out it's for sale?",
    a: "We use confidential marketing: blind teasers, NDAs before releasing identifying information, and qualified-buyer showings arranged around operations. These measures reduce disclosure risk, although no sale process can guarantee that staff, customers, or other parties will never learn about it.",
  },
  {
    q: "What's your commission?",
    a: "Discussed on the consultation call once we've reviewed your lease, P&L, and license posture. We quote a flat, transparent fee structure.",
  },
  {
    q: "Can you sell the liquor license separately?",
    a: "Often yes. If the business doesn't sell as a whole, a Type 41/47 can be transferred to a separate buyer — see our Liquor License For Sale page.",
  },
];

export const Route = createFileRoute("/sell-your-restaurant")({
  head: () => ({
    meta: [
      { title: "Sell My Restaurant in Los Angeles | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Sell your restaurant in Los Angeles County confidentially. Valuation, qualified-buyer marketing, lease assignment, ABC transfer, and escrow — handled end to end.",
      },
      { property: "og:title", content: "Sell My Restaurant in Los Angeles | Penthouse Advisors" },
      {
        property: "og:description",
        content: "Confidential restaurant dispositions across LA County.",
      },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: buildServiceJsonLd({
      name: "Sell Your Restaurant — Los Angeles",
      serviceType: "Restaurant Business Broker",
      description: "Confidential restaurant seller representation across Los Angeles County.",
      url: URL,
      breadcrumbs: [
        { name: "Home", url: "https://www.penthouseadvisors.com" },
        { name: "Services", url: "https://www.penthouseadvisors.com/services" },
        { name: "Sell Your Restaurant", url: URL },
      ],
      faqs: FAQS,
    }),
  }),
  component: SellPage,
});

function SellPage() {
  return (
    <ServiceLanding
      authority={serviceAuthority.sell}
      eyebrow="Sell Your Restaurant"
      title="Sell your restaurant confidentially with"
      accent="Penthouse Advisors Inc."
      subtitle="A premium disposition process built for operators who want to maximize value without disrupting service."
      h1="Sell My Restaurant in Los Angeles"
      overview="Selling a restaurant is not a yard-sign exercise. We position your business with a defensible valuation, market it confidentially to qualified operators and investors, and manage every moving piece — lease assignment, ABC license transfer, equipment schedules, escrow — all the way to funded close."
      benefits={[
        {
          icon: TrendingUp,
          title: "Defensible Valuation",
          body: "Multiple methodologies blended — not a single number pulled out of the air.",
        },
        {
          icon: Lock,
          title: "Confidential Marketing",
          body: "Blind teasers, NDAs, qualified-buyer showings. Your staff and customers stay focused on running the business.",
        },
        {
          icon: Handshake,
          title: "Clean Close",
          body: "Lease assignment, ABC transfer, escrow, and Health clearance — sequenced in parallel.",
        },
      ]}
      process={[
        {
          step: "01",
          title: "Valuation",
          body: "We review lease, P&L, license posture, equipment, and lease term remaining. You get a defensible price range.",
        },
        {
          step: "02",
          title: "Confidential Marketing",
          body: "Blind teaser to our buyer network. NDA-gated information memorandum. Qualified showings only.",
        },
        {
          step: "03",
          title: "Close",
          body: "Negotiate, escrow, transfer license, assign lease, deliver keys — funded.",
        },
      ]}
      faqs={FAQS}
      related={[
        { to: "/liquor-license-for-sale", label: "Sell Your Liquor License" },
        { to: "/assignments-rent-abatement", label: "Lease Assignment" },
        { to: "/grandfather-protection", label: "Grandfather Protection" },
        { to: "/business-investigations", label: "Buyer Diligence" },
      ]}
      serviceNeeded="Selling my restaurant"
      ctaTitle="Thinking about selling your restaurant?"
      ctaBody="One conversation. Defensible valuation, confidential process, real buyers."
    />
  );
}
