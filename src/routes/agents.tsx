import { CONSULTATION_LABEL } from "@/lib/consultation";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { SiteLayout, EMAIL, EMAIL_HREF } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

import { breadcrumbScript } from "@/lib/seo";
import { HeadingCTA } from "@/components/site/HeadingCTA";
export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agents - Penthouse Advisors Inc. | LA Restaurant Advisory Team" },
      {
        name: "description",
        content:
          "Meet the agents and advisors at Penthouse Advisors Inc. - principal-led restaurant brokerage, licensing, and advisory for Los Angeles County.",
      },
      { property: "og:title", content: "Agents - Penthouse Advisors Inc." },
      {
        property: "og:description",
        content: "Principal-led restaurant brokerage and advisory team serving Los Angeles County.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/agents" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/agents" }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Agents", path: "/agents" },
      ]),
    ],
  }),
  component: AgentsPage,
});

// All agents share the office mobile line.
const AGENT_PHONE = "Office M 310.663.3521";
const AGENT_PHONE_HREF = "tel:+13106633521";

export const agents = [
  {
    name: "Roschard Paticchio-Stein",
    title: "CEO · Owner · Business Agent",
    dre: "DRE #02203003",
    bio: "As CEO, Roschard makes the major corporate decisions that shape Penthouse Advisors, drives the firm’s direction, supervises the executive team, and oversees growth plans.",
    focus: ["buy/seller representation", "abc licensing oversight", "restaurant sales"],
  },
  {
    name: "Richard Stein",
    title: "COO · Chief Operating Officer · Creator · Owner",
    bio: "As COO, Richard turns the firm’s strategy into everyday results, making sure execution across the company matches the direction set by leadership.",
    focus: ["operations & execution", "strategy implementation", "business advisory"],
  },
  {
    name: "Rosanna Paticchio",
    title: "CFO · Broker of Record",
    dre: "DRE #02332697",
    bio: "Broker of Record and head of finance. Rosanna is responsible for compliance, trust accounting, and licensure oversight across the firm's brokerage and ABC licensing activity.",
    focus: ["broker of record", "compliance", "residential buying/selling"],
  },
  {
    name: "Jamal Ali Joseph",
    title: "Business Agent",
    dre: "DRE #02417938",
    bio: "Licensed Business Agent supporting restaurant sales, commercial sales, seller and buyer representation across Los Angeles County.",
    focus: ["restaurant sales", "commercial sales", "seller and buyer representation"],
  },
  {
    name: "Jeremie Campbell",
    title: "Business Agent",
    dre: "DRE #02223132",
    bio: "Licensed Business Agent supporting restaurant sales, commercial sales, seller and buyer representation across Los Angeles County.",
    focus: ["restaurant sales", "commercial sales", "seller and buyer representation"],
  },
];

function AgentsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Agents"
        title="Principal-led restaurant"
        accent="advisory team."
        subtitle="Every engagement at Penthouse Advisors is led directly by an owner-partner. No layers, no handoffs - the principals on the page below are the people you'll be working with."
      />

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {agents.map((a) => (
            <article
              key={a.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-elegant flex flex-col"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-charcoal-deep font-display text-2xl font-black">
                {a.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <h2 className="mt-5 text-xl font-display font-bold">{a.name}</h2>
              <HeadingCTA />
              <p className="mt-1 text-sm font-semibold text-gold">{a.title}</p>
              {a.dre && <p className="mt-1 text-xs text-muted-foreground">{a.dre}</p>}
              <p className="mt-4 text-sm text-foreground/85 leading-relaxed">{a.bio}</p>
              <ul className="mt-5 space-y-1.5">
                {a.focus.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground">
                    - {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-border flex flex-col gap-2 text-sm">
                <a
                  href={AGENT_PHONE_HREF}
                  className="inline-flex items-center gap-2 hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-gold" /> {AGENT_PHONE}
                </a>
                <a
                  href={EMAIL_HREF}
                  className="inline-flex items-center gap-2 hover:text-gold break-all"
                >
                  <Mail className="h-4 w-4 text-gold" /> {EMAIL}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/contact" className="pa-button">
            {CONSULTATION_LABEL}
          </Link>
        </div>
      </section>

      <CTASection
        title="Speak directly with a principal."
        body="Submit your details to discuss your restaurant with an advisor."
      />
    </SiteLayout>
  );
}
