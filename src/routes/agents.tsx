import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

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
        content:
          "Principal-led restaurant brokerage and advisory team serving Los Angeles County.",
      },
    ],
  }),
  component: AgentsPage,
});

const agents = [
  {
    name: "Roschard Paticchio-Stein",
    title: "CEO · Owner · Business Agent",
    dre: "DRE #02203003",
    bio: "As CEO, Roschard makes the major corporate decisions that shape Penthouse Advisors, drives the firm’s direction, supervises the executive team, and oversees growth plans.",
    focus: ["Restaurant brokerage", "Off-market sourcing", "Residential listings"],
  },
  {
    name: "Rosanna Paticchio",
    title: "CFO · Broker of Record",
    dre: "DRE #02332697",
    bio: "Broker of Record and head of finance. Rosanna is responsible for compliance, trust accounting, and licensure oversight across the firm's brokerage and ABC licensing activity.",
    focus: ["Broker of Record", "Compliance", "ABC licensing oversight"],
  },
  {
    name: "Jamal Ali Joseph",
    title: "Business Agent",
    dre: "DRE #02417938",
    phone: "(310) 432-3014",
    phoneHref: "tel:+13104323014",
    bio: "Licensed business agent supporting restaurant sales, lease assignments, and buyer representation across Los Angeles County.",
    focus: ["Restaurant sales", "Lease assignments", "Buyer representation"],
  },
  {
    name: "Jeremie Campbell",
    title: "Business Agent",
    dre: "DRE #02223132",
    phone: "(310) 936-0854",
    phoneHref: "tel:+13109360854",
    bio: "Licensed business agent supporting restaurant sales, lease assignments, and buyer representation across Los Angeles County.",
    focus: ["Restaurant brokerage", "Asset sales", "Operator placement"],
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
            <article key={a.name} className="rounded-2xl border border-border bg-card p-7 shadow-elegant flex flex-col">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-charcoal-deep font-display text-2xl font-black">
                {a.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <h2 className="mt-5 text-xl font-display font-bold">{a.name}</h2>
              <p className="mt-1 text-sm font-semibold text-gold">{a.title}</p>
              {a.dre && <p className="mt-1 text-xs text-muted-foreground">{a.dre}</p>}
              <p className="mt-4 text-sm text-foreground/85 leading-relaxed">{a.bio}</p>
              <ul className="mt-5 space-y-1.5">
                {a.focus.map((f) => (
                  <li key={f} className="text-xs text-muted-foreground">- {f}</li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-border flex flex-col gap-2 text-sm">
                <a href={a.phoneHref || PHONE_HREF} className="inline-flex items-center gap-2 hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" /> {a.phone || PHONE}
                </a>
                <a href={EMAIL_HREF} className="inline-flex items-center gap-2 hover:text-gold break-all">
                  <Mail className="h-4 w-4 text-gold" /> {EMAIL}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold"
          >
            Book a Consultation
          </Link>
        </div>
      </section>

      <CTASection title="Speak directly with a principal." body="Every call routes to an owner-partner. No intake forms, no junior associates." />
    </SiteLayout>
  );
}
