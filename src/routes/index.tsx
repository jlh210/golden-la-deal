import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Star, ShieldCheck, MapPin, Calendar } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF } from "@/components/site/Layout";
import { CTASection } from "@/components/site/CTASection";
import { featuredServices } from "@/lib/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Penthouse Advisors — LA Restaurant Brokerage. Buy. Sell. License. Rescue." },
      {
        name: "description",
        content:
          "LA County's sophisticated, full-service restaurant brokerage and advisory firm. Restaurant real estate, licensing, permits, leases, escrows, and distressed-asset resolution. Call 310-663-3521.",
      },
      { property: "og:title", content: "Penthouse Advisors — LA Restaurant Experts" },
      {
        property: "og:description",
        content: "Buy. Sell. License. Rescue. A modern, full-service LA restaurant advisory firm.",
      },
    ],

  }),
  component: HomePage,
});

const trust = [
  { icon: Calendar, label: "Est. 2021" },
  { icon: ShieldCheck, label: "Licensed Brokers" },
  { icon: MapPin, label: "LA County" },
  { icon: Star, label: "Principal-Led" },
];

const steps = [
  {
    n: "01",
    title: "Consult",
    body: "Tell us where you are — buying, selling, opening, or in trouble. We listen, we diagnose, we quote a plan.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "We build the move: valuation, licensing path, lease angle, or rescue plan. Clear timeline. Real numbers.",
  },
  {
    n: "03",
    title: "Done",
    body: "We execute. Escrow closes, license issues, doors open, red tag comes down. You run your restaurant.",
  },
];

const testimonials = [
  {
    quote:
      "They got my Type 47 transferred and walked the landlord through every step. Doors opened on schedule.",
    name: "Marco D.",
    role: "Owner, Westside concept",
  },
  {
    quote:
      "Health Department red-tagged us on a Friday. Penthouse had us re-inspected and reopened by Wednesday.",
    name: "Priya S.",
    role: "Operator, San Gabriel Valley",
  },
  {
    quote:
      "Sold a 12-year-old café off-market in under 60 days. Staff never knew until we handed over the keys.",
    name: "James R.",
    role: "Seller, Silver Lake",
  },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, oklch(0.78 0.13 85) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-x relative pt-16 pb-24 md:pt-28 md:pb-36">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Los Angeles County · Est. 2021
            </div>
            <h1 className="mt-6 font-display font-extrabold text-4xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight">
              LA's Restaurant Experts.
              <br />
              <span className="text-gradient-gold">Buy. Sell. License. Rescue.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">
              Restaurant buying, selling, leasing, licensing, rescuing and permitting — all handled by one team, start to close.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold hover:opacity-95 transition"
              >
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-gold/10 transition"
              >
                <Phone className="h-4 w-4 text-gold" /> {PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t border-border/80 bg-card">
          <div className="container-x py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <t.icon className="h-5 w-5 text-gold shrink-0" />
                <span className="text-sm font-semibold uppercase tracking-wider text-foreground/85">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">What We Do</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold">
              Every move a restaurant owner needs.
            </h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-gold hover:underline">
            See all services →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s) => (
            <Link
              key={s.slug}
              to={s.to}
              className="group relative rounded-xl border border-border bg-card p-7 hover:border-gold/60 hover:-translate-y-0.5 transition shadow-elegant"
            >
              <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-display font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold opacity-0 group-hover:opacity-100 transition">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border bg-card">
        <div className="container-x py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">How It Works</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold">
              Three steps. No runaround.
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="text-6xl font-display font-extrabold text-gold/25">{s.n}</div>
                <h3 className="mt-3 text-2xl font-display font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold"
            >
              Book a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>


      <CTASection
        title="Are you a restaurant owner in need of assistance with a real restaurant problem?"
        body="We buy, sell, lease, license, and rescue restaurants across LA County. One call. One team. Start to close."
      />
    </SiteLayout>
  );
}
