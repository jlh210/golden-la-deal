import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Phone } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF } from "@/components/site/Layout";
import { services } from "@/lib/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Penthouse Advisors | LA Restaurant Brokerage & Advisory" },
      {
        name: "description",
        content:
          "Brokerage, alcohol licensing, health permitting, lease negotiation, plan check drafting, and business rescue for LA restaurant owners.",
      },
      { property: "og:title", content: "Services — Penthouse Advisors" },
      {
        property: "og:description",
        content: "Full-service restaurant advisory for Los Angeles operators.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-hero border-b border-border">
        <div className="container-x py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Services</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display font-extrabold leading-[1.05]">
            Everything a restaurant <span className="text-gradient-gold">owner</span> needs.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Six services, one firm, one phone call. Built for LA restaurant operators who
            need answers — and execution — fast.
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:py-24 space-y-6">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className="scroll-mt-24 grid gap-8 md:grid-cols-[1.1fr_2fr] rounded-2xl border border-border bg-card p-7 md:p-10 shadow-elegant"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-xs font-bold text-gold/60">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-4 grid h-14 w-14 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <s.icon className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-2xl md:text-3xl font-display font-bold">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.short}</p>
            </div>
            <div>
              <p className="text-base leading-relaxed">{s.long}</p>
              <ul className="mt-6 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
                >
                  Get a plan <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-3 text-sm font-semibold hover:bg-gold/10"
                >
                  <Phone className="h-4 w-4 text-gold" /> {PHONE}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}
