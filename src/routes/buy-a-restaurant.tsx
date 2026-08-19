import { createFileRoute } from "@tanstack/react-router";
import { Search, FileSearch, ShieldCheck } from "lucide-react";
import { ServiceLanding, buildServiceJsonLd } from "@/components/site/ServiceLanding";

const URL = "https://www.penthouseadvisors.com/buy-a-restaurant";
const FAQS = [
  { q: "Do you have off-market restaurants for sale in Los Angeles?", a: "Yes. A large share of our deal flow is off-market — sourced via door-knocking, owner outreach, and broker relationships across LA County. Tell us your criteria and we'll match you against current and pending opportunities." },
  { q: "How long does it take to buy a restaurant in LA?", a: "From signed LOI to keys in hand typically runs 60–120 days depending on liquor license transfer (ABC), landlord consent, and Health Dept plan check. We sequence those in parallel to compress the timeline." },
  { q: "What due diligence do you run before I buy?", a: "Lease review, ABC license history, code/permit status, sales verification, equipment condition, vendor contracts, and prior Health inspection records. See our Restaurant Business Investigations page." },
  { q: "Can I use an E-2 investor visa to buy a restaurant?", a: "Yes. We package E-2-ready acquisitions for European entrepreneurs — see our E-2 Visa page." },
];

export const Route = createFileRoute("/buy-a-restaurant")({
  head: () => ({
    meta: [
      { title: "Buy a Restaurant in Los Angeles | Penthouse Advisors" },
      { name: "description", content: "Buy a restaurant in Los Angeles County with a full-service brokerage. Off-market sourcing, ABC license transfers, lease review, and Health Dept clearance." },
      { property: "og:title", content: "Buy a Restaurant in Los Angeles | Penthouse Advisors" },
      { property: "og:description", content: "Full-service restaurant acquisitions across LA County." },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: buildServiceJsonLd({
      name: "Restaurant Acquisitions — Los Angeles",
      serviceType: "Restaurant Business Broker",
      description: "Full-service restaurant buyer representation across Los Angeles County.",
      url: URL,
      breadcrumbs: [
        { name: "Home", url: "https://www.penthouseadvisors.com" },
        { name: "Services", url: "https://www.penthouseadvisors.com/services" },
        { name: "Buy a Restaurant", url: URL },
      ],
      faqs: FAQS,
    }),
  }),
  component: BuyARestaurantPage,
});

function BuyARestaurantPage() {
  return (
    <ServiceLanding
      eyebrow="Buy a Restaurant"
      title="Buy your next restaurant in Los Angeles with"
      accent="Penthouse Advisors Inc."
      subtitle="A disciplined acquisition process — sourcing, diligence, licensing, and lease — handled under one roof."
      h1="Buy a Restaurant in Los Angeles County"
      overview="Penthouse Advisors represents buyers across Los Angeles County — from first-time operators acquiring a single neighborhood restaurant to investors building a small portfolio. We source on-market and off-market opportunities, run full pre-purchase diligence, and shepherd liquor licensing, Health Dept clearance, lease assignment, and escrow to a clean close."
      benefits={[
        { icon: Search, title: "Off-Market Access", body: "Our door-knocking and owner-direct network surfaces opportunities you won't see on any listing portal." },
        { icon: FileSearch, title: "Full Diligence", body: "Lease, ABC license, code, sales, and equipment — investigated before you wire a dollar." },
        { icon: ShieldCheck, title: "Licensing & Permits", body: "ABC transfer, Health permit, and landlord consent run in parallel to compress timelines." },
      ]}
      process={[
        { step: "01", title: "Criteria", body: "Neighborhood, size, license type, capex tolerance. We translate your goals into a buy box." },
        { step: "02", title: "Sourcing & Diligence", body: "On- and off-market matches. Lease, license, sales, code, and equipment audit on every shortlist candidate." },
        { step: "03", title: "Close & Open", body: "Escrow, ABC transfer, Health clearance, landlord consent — managed start-to-finish." },
      ]}
      faqs={FAQS}
      related={[
        { to: "/restaurants-for-sale", label: "Browse Restaurants For Sale" },
        { to: "/search-door-knocking", label: "Off-Market Door-Knocking" },
        { to: "/business-investigations", label: "Pre-Purchase Investigations" },
        { to: "/alcohol-licensing", label: "Alcohol Licensing" },
        { to: "/e2-visa-europe", label: "E-2 Visa (Europe)" },
      ]}
      serviceNeeded="Buying a restaurant"
      ctaTitle="Ready to buy your next restaurant?"
      ctaBody="Tell us your buy box. We'll come back with real opportunities — on- and off-market."
    />
  );
}
