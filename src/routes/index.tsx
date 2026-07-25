import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, ShieldCheck, MapPin, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { CTASection } from "@/components/site/CTASection";
import { featuredServices } from "@/lib/services";
import heroImage from "@/assets/hero-downtown-la.jpg";
import { useEffect, useState } from "react";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LA Restaurant Brokerage, Consulting & Licensing | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Los Angeles restaurant brokerage, consulting, permitting, licensing, and ADA compliance. Buy, sell, lease, and license restaurants across LA County under one roof.",
      },
      { property: "og:title", content: "LA Restaurant Brokerage, Consulting & Licensing | Penthouse Advisors" },
      {
        property: "og:description",
        content:
          "Restaurant brokerage, consulting, licensing, permitting, and ADA compliance for Los Angeles County. One firm, full service.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "LA Restaurant Brokerage, Consulting & Licensing | Penthouse Advisors" },
      { name: "twitter:description", content: "Restaurant brokerage, consulting, licensing, permitting & ADA compliance for LA County." },
    ],
    links: [
      { rel: "canonical", href: "https://www.penthouseadvisors.com" },
      { rel: "preload", as: "image", href: heroImage, fetchpriority: "high" } as unknown as { rel: string; href: string },
    ],
  }),

  component: HomePage,
});

const trustMetrics = [
  { value: "2021", label: "Established" },
  { value: "3", label: "Principal Owners" },
  { value: "LA County", label: "Exclusively Served" },
  { value: "One Roof", label: "Full-Service Firm" },
];

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
    body: "Tell us where you are - buying, selling, opening, or in trouble. We listen, we diagnose, we quote a plan.",
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


function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SiteLayout transparentHeader>
      {/* HERO */}
      <section className="relative bg-cream -mt-16 md:-mt-20 pt-16 md:pt-20 overflow-hidden">
        <div className="container-x relative grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)] py-16 lg:py-24">
          {/* LEFT */}
          <div className="relative z-10 max-w-xl">
            <div
              className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal-deep/70 animate-fade-in"
              style={{ animationDelay: "0ms", animationFillMode: "both" }}
            >
              <span className="h-px w-8 bg-gold" />
              Serving Los Angeles County
            </div>

            <h1
              className="mt-8 font-display text-[2.75rem] sm:text-6xl lg:text-[4.5rem] font-normal leading-[1.02] tracking-[-0.01em] text-charcoal-deep animate-fade-in"
              style={{ animationDelay: "120ms", animationFillMode: "both" }}
            >
              Los Angeles County's
              <br />
              <span className="italic text-gradient-gold">Premier Restaurant &amp; Business</span>
              <br />
              Advisory Firm.
            </h1>

            <p
              className="mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-charcoal/75 animate-fade-in"
              style={{ animationDelay: "320ms", animationFillMode: "both" }}
            >
              Serving Los Angeles County with expert restaurant brokerage, licensing, leasing,
              permitting, consulting, and transaction management—from first opportunity to final closing.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 animate-fade-in"
              style={{ animationDelay: "480ms", animationFillMode: "both" }}
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-charcoal-deep px-7 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-cream hover:bg-gold hover:text-charcoal-deep transition-all duration-500"
              >
                Speak Directly to an Expert Now!
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-2 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-charcoal-deep border-b border-charcoal-deep/30 hover:border-gold hover:text-gold transition-colors duration-500"
              >
                Explore Our Services
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Trust metrics */}
            <div
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 pt-10 border-t border-charcoal-deep/10 animate-fade-in"
              style={{ animationDelay: "640ms", animationFillMode: "both" }}
            >
              {trustMetrics.map((m) => (
                <div key={m.label} className="group">
                  <div className="font-display text-2xl sm:text-[1.7rem] font-normal text-charcoal-deep leading-none">
                    {m.value}
                  </div>
                  <div className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-charcoal/55 leading-snug">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — cinematic visual */}
          <div className="relative h-[60vh] lg:h-[78vh] w-full">
            <div
              className="absolute inset-0 overflow-hidden shadow-elegant"
              style={{ transform: `translateY(${scrollY * 0.08}px)` }}
            >
              <img
                src={heroImage}
                alt="Downtown Los Angeles skyline at golden hour with warm architectural light"
                width={1024}
                height={1536}
                className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-[1500ms]"
                style={{ transform: `scale(1.05) translateY(${scrollY * -0.04}px)` }}
              />
              {/* brand gold overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/30 via-gold/10 to-amber-500/15 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cream/60 via-cream/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-cream/35 via-transparent to-cream/45 pointer-events-none" />
            </div>

            {/* floating credential card */}
            <div className="absolute -bottom-6 -left-6 lg:bottom-10 lg:-left-10 max-w-[260px] bg-cream/95 backdrop-blur-sm border border-gold/20 p-6 shadow-elegant animate-fade-in" style={{ animationDelay: "900ms", animationFillMode: "both" }}>
              <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-gold">Trusted Advisory</div>
              <p className="mt-3 font-display text-lg leading-snug text-charcoal-deep">
                "One trusted partner for every stage of the restaurant lifecycle."
              </p>
            </div>

            {/* corner ornaments */}
            <div className="absolute top-0 right-0 h-16 w-16 border-t border-r border-gold/60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-16 w-16 border-b border-l border-gold/60 pointer-events-none hidden lg:block" />
          </div>
        </div>

        {/* faint trust strip */}
        <div className="relative border-t border-charcoal-deep/10">
          <div className="container-x py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2.5">
                <t.icon className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-charcoal/65">
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
