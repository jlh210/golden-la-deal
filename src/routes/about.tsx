import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Scale, Zap, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Penthouse Advisors Inc. | LA Restaurant Advisory Firm" },
      {
        name: "description",
        content:
          "Penthouse Advisors is a full-service restaurant advisory and brokerage firm in Los Angeles County. Restaurant real estate, licensing, permitting, escrows, and distressed-asset resolution — under one roof.",
      },
      { property: "og:title", content: "About — Penthouse Advisors Inc." },
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
  { icon: Scale, title: "Fair & Honest", body: "All parties — buyer, seller, landlord, tenant — represented with discretion and integrity." },
  { icon: Award, title: "Full-Service", body: "Brokerage, licensing, health, leases, blueprints — under one roof." },
];


const corpBrief = [
  "Buying and selling restaurants with full disclosure",
  "Alcohol licensing (Type 41 Beer & Wine, Type 47 Hard Liquor)",
  "Health Department pre-inspections and red-tag removal",
  "Lease and rent negotiation, assignments, and abatement",
  "Hood cleaning, hood inspection, and hood repair coordination",
  "Hand-drafted blueprints for plan check (floor plan, site plan, elevations, equipment schedule)",
  "Fast resolutions for restaurants in legal, code, or financial dilemma",
];

const owners = [
  {
    name: "Roschard Paticchio-Stein",
    title: "CEO · Owner · Business Agent",
    dre: "DRE #02203003",
    bio: "Day-to-day leader at Penthouse Advisors and the primary agent on transactions. Roschard runs brokerage engagements end-to-end — from off-market sourcing and packaging to escrow close — and also handles the firm's select residential listings.",
  },
  {
    name: "Richard Stein",
    title: "COO · Business Advisor · Owner",
    dre: null,
    bio: "Operations and advisory backbone of the firm. Richard structures complex deals, advises owners in distress, and oversees the firm's vendor network across hood cleaning, repair, and emergency reopen work.",
  },
  {
    name: "Rosanna Paticchio",
    title: "CFO · Broker of Record",
    dre: "DRE #02332697",
    bio: "Broker of Record and head of finance. Rosanna is responsible for compliance, trust accounting, and licensure oversight across the firm's brokerage and ABC licensing activity.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="LA's full-service restaurant"
        accent="advisory firm."
        subtitle="Penthouse Advisors Inc. is a sophisticated, modern one-stop firm for restaurant owners, buyers, sellers, landlords, tenants, and operators. We handle restaurant real estate, licensing, permits, escrows, lease issues, alcohol licensing, health department matters, and distressed-restaurant resolutions. Established 2021. Servicing Los Angeles County."
      />


      {/* Values */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card p-6 shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-display font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corp Brief */}
      <section className="border-y border-border bg-card">
        <div className="container-x py-16 md:py-20 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Corp Brief</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">
              What Penthouse Advisors actually does.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We solve restaurant problems fast. Below is the firm in one list — everything
              we handle in-house for LA County restaurant owners, buyers, and landlords.
            </p>
          </div>
          <ul className="space-y-3">
            {corpBrief.map((line) => (
              <li key={line} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-sm">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Owners */}
      <section className="container-x py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Leadership</p>
        <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Restaurant advisory, licensing, and deal support — under one roof.</h2>


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

      <CTASection title="Work with a team that knows restaurant deals from every angle." body="Principal-led advisory. Brokerage, licensing, permitting, and resolution — coordinated by one firm." />
    </SiteLayout>
  );
}
