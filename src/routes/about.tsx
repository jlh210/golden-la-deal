import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Users, Scale, Zap, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript } from "@/lib/seo";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Penthouse Advisors Inc. | LA Restaurant Advisory Firm" },
      {
        name: "description",
        content:
          "Penthouse Advisors is a full-service restaurant advisory and brokerage firm in Los Angeles County. Restaurant real estate, licensing, permitting, escrows, and distressed-asset resolution - under one roof.",
      },
      { property: "og:title", content: "About - Penthouse Advisors Inc." },
      {
        property: "og:description",
        content:
          "Sophisticated, full-service restaurant advisory and brokerage firm. Servicing Los Angeles County since 2021.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/about" }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  }),

  component: AboutPage,
});

const values = [
  {
    icon: Zap,
    title: "Do It Now",
    body: "We move on day one. Restaurants don't have time to wait for callbacks.",
  },
  {
    icon: Users,
    title: "Principal-Led",
    body: "Direct access to the partners on every engagement. No layers, no handoffs.",
  },
  {
    icon: Scale,
    title: "Fair & Honest",
    body: "All parties - buyer, seller, landlord, tenant - represented with discretion and integrity.",
  },
  {
    icon: Award,
    title: "Full-Service",
    body: "Brokerage, licensing, health, leases, blueprints - under one roof.",
  },
];

const serviceCategories = [
  {
    title: "Buying, Selling, Leasing Restaurant Brokerage",
    body: "Throughout Los Angeles County. We are highly trained in negotiating the best deal between the parties, creating fast and solid resolutions. New lease negotiating with rent abatement allowances. Solving dilemmas resulting from non-disclosure issues, before and after lease signing.",
  },
  {
    title: "Specialists in Alcohol Licensing and Transfers",
    body: "Throughout Los Angeles County: ABC licensing in conjunction with Los Angeles County CUB conditional use beverage permits and ABC State of CA. We check the status of the CUB prior to lease signing.",
  },
  {
    title: "Restaurant Health Department Permitting & Pre-Inspections",
    body: "Throughout Los Angeles County: we perform Health Department code compliance restaurant inspections, assign all found corrections and repairs to our licensed GC general contractor, follow up by making a site evaluation appointment with the Health Department Plan-Check inspector, and generate final-approval permitting to facilitate ID issuance. Restaurant open.",
  },
  {
    title: "Restaurant Red Tag Equipment (3 Step Removal)",
    body: "Step One: Penthouse Advisors submits to Health Dept Plan-Check for approval and stamping of our hand-drawn blueprints to scale. Included in our $3,700 fee. Step Two: we assign our licensed GC general contractor to make all required repairs. Step Three: we make a site evaluation appointment to remove the red tag(s).",
  },
  {
    title: "Restaurants Under Grandfather Protection",
    body: "Throughout Los Angeles County: restaurants under grandfather protection means the existing floor plan of the restaurant can never be altered or upgraded in any way at any time. The restaurant must remain in its old fashion condition, out of current Health Department and ADA code compliance. This rule must be followed to prevent costly revamping to bring the premises into current code compliance.",
  },
  {
    title: "Restaurant Repairs, Remodels & Alterations",
    body: "Throughout Los Angeles County: upgrading and remodeling restaurants by our licensed GC general contractor, after we supply Health Department Plan Check our detailed hand-drafted blueprints for stamped approval.",
  },
  {
    title: "Hood Servicing, Repairs & Cleaning",
    body: "Hood servicing, repairs, and cleaning for limited liability insurance certification. All required permits are pulled for mechanical, electrical, and plumbing work. Example: gas equipment installed and hand sink drain lines connected to the sewer.",
  },
  {
    title: "Vacant, Equipped, Second Generation Restaurants",
    body: "Restaurant tenants before vacating the premises can sell the non-attached FF&E furniture, fixtures, and equipment (as key money) while holding legal possession under a lease. Property owners are not in the business of selling used restaurant furniture, fixtures, and equipment.",
  },
  {
    title: "NSF or URL Sanitized Labeling",
    body: "A Health Department code requirement on all kitchen equipment. The equipment is deemed worthless if not displaying such visible labels.",
  },
];

const equipmentDetails = [
  "Attached and non-attached equipment throughout the kitchen",
  "Grease interceptor located in ground",
  "Grease trap located under or alongside the 3-compartment sink",
  "Grandfather protection allowances",
  "CUB conditional use beverage permits",
  "HVAC",
  "ADA bathroom & front entrance",
  "Plumbing",
  "Walling materials, ceiling materials, flooring materials, and cove molding",
  "Electric water heater kilowatt minimum allowance",
  "Gas water heater btuH allowance",
  "Visible kitchen and dining area alterations",
];

const owners = [
  {
    name: "Roschard Paticchio-Stein",
    title: "CEO · Owner · Business Agent",
    dre: "DRE #02203003",
    bio: "As CEO, Roschard makes the major corporate decisions that shape Penthouse Advisors, drives the firm’s direction, supervises the executive team, and oversees growth plans.",
  },
  {
    name: "Richard Stein",
    title: "COO · Creator and Owner, Business Advisor",
    dre: null,
    bio: "As COO, Richard turns the firm’s strategy into everyday results, making sure execution across the company matches the direction set by leadership.",
  },
  {
    name: "Rosanna Paticchio",
    title: "CFO · Broker of Record",
    dre: "DRE #02332697",
    bio: "Broker of Record and head of finance. Rosanna is responsible for compliance, trust accounting, and licensure oversight across the firm's brokerage activity.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        lead="Penthouse Advisors Inc. Los Angeles County’s Premier Restaurant & Business Advisory Firm."
        title="Servicing LA County's Restaurants & Businesses."
        subtitle={`Penthouse Advisors is a modern, full-service restaurant and business brokerage serving Los Angeles County. Established in 2021, we combine brokerage expertise, ABC licensing, Health Department Permitting, Health Dept Plan-Check Restaurant Red Rag removal and operational advisory under one roof. Protocol: All parties, Buyer, Seller, Landlord are treated equally, fairly, and honestly with our "Do It Now" services. If you don't "Do It Now", it won't get done & you'll forget all about doing it. Book a Consultation Appointment.`}
      >
        <div className="max-w-2xl space-y-1 text-muted-foreground">
          <p>
            Call or Text:{" "}
            <a href="tel:+13106633521" className="font-semibold text-gold hover:underline">
              310-663-3521
            </a>
          </p>
          <p>
            <a
              href="mailto:PenthouseAdvisors@gmail.com"
              className="font-semibold text-gold hover:underline"
            >
              PenthouseAdvisors@gmail.com
            </a>
          </p>
          <p>8:00am – 7:00pm · Mon–Sun</p>
          <p className="pt-3 font-semibold text-foreground">
            Thank you, Richard Stein COO · Roschard Paticchio-Stein CEO
          </p>
          <p className="pt-2">
            <Link to="/contact" className="text-gold hover:underline">
              <strong>Need solutions? Book now</strong> a 30-minute mobile-to-mobile call for real
              answers on restaurants, properties, and city matters.
            </Link>
          </p>
        </div>
      </PageHero>

      {/* Values */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-border bg-card p-6 shadow-elegant"
            >
              <div className="grid h-11 w-11 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <v.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-display font-bold">{v.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corp Brief */}
      <section className="border-y border-border bg-card">
        <div className="container-x py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Corp Brief</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">
              What Penthouse Advisors actually does.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We solve restaurant problems fast. Here's everything we handle in-house for LA County
              restaurant owners, buyers, and landlords.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((s) => (
              <article
                key={s.title}
                className="rounded-xl border border-border bg-card p-6 shadow-elegant"
              >
                <h3 className="text-lg font-display font-bold leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h3 className="text-lg font-display font-bold">Equipment & Code Details</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {equipmentDetails.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Owners */}
      <section className="container-x py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Leadership</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">
          Restaurant advisory, licensing, and deal support - under one roof.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {owners.map((o) => (
            <article
              key={o.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-elegant"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-charcoal-deep font-display text-2xl font-black">
                {o.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h3 className="mt-5 text-xl font-display font-bold">{o.name}</h3>
              <p className="mt-1 text-sm font-semibold text-gold">{o.title}</p>
              {o.dre && <p className="mt-1 text-xs text-muted-foreground">{o.dre}</p>}
              <p className="mt-4 text-sm text-foreground/85 leading-relaxed">{o.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        title="Work with a team that knows restaurant deals from every angle."
        body="Principal-led advisory. Brokerage, licensing, permitting, and resolution - coordinated by one firm."
      />
    </SiteLayout>
  );
}
