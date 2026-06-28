import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Scale, Zap, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

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
    ],
  }),

  component: AboutPage,
});

const values = [
  { icon: Zap, title: "Do It Now", body: "We move on day one. Restaurants don't have time to wait for callbacks." },
  { icon: Users, title: "Principal-Led", body: "Direct access to the partners on every engagement. No layers, no handoffs." },
  { icon: Scale, title: "Fair & Honest", body: "All parties - buyer, seller, landlord, tenant - represented with discretion and integrity." },
  { icon: Award, title: "Full-Service", body: "Brokerage, licensing, health, leases, blueprints - under one roof." },
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


      {/* Owners */}
      <section className="container-x py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Leadership</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Restaurant advisory, licensing, and deal support - under one roof.</h2>


        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {owners.map((o) => (
            <article key={o.name} className="rounded-2xl border border-border bg-card p-7 shadow-elegant">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-charcoal-deep font-display text-2xl font-black">
                {o.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <h3 className="mt-5 text-xl font-display font-bold">{o.name}</h3>
              <p className="mt-1 text-sm font-semibold text-gold">{o.title}</p>
              {o.dre && <p className="mt-1 text-xs text-muted-foreground">{o.dre}</p>}
              <p className="mt-4 text-sm text-foreground/85 leading-relaxed">{o.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection title="Work with a team that knows restaurant deals from every angle." body="Principal-led advisory. Brokerage, licensing, permitting, and resolution - coordinated by one firm." />
    </SiteLayout>
  );
}
