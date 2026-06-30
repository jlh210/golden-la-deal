import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF } from "./Layout";
import { PageHero } from "./PageHero";
import { CTASection } from "./CTASection";

export type FAQ = { q: string; a: string };
export type RelatedLink = { to: string; label: string };

export interface ServiceLandingProps {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  h1: string;
  overview: string;
  benefits: { icon: LucideIcon; title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  faqs: FAQ[];
  related: RelatedLink[];
  serviceNeeded?: string;
  ctaTitle?: string;
  ctaBody?: string;
}

export function ServiceLanding(props: ServiceLandingProps) {
  const {
    eyebrow, title, accent, subtitle, h1, overview,
    benefits, process, faqs, related, serviceNeeded, ctaTitle, ctaBody,
  } = props;

  return (
    <SiteLayout>
      <PageHero eyebrow={eyebrow} title={title} accent={accent} subtitle={subtitle} />

      {/* Overview / H1 */}
      <section className="container-x py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="sr-only">{h1}</h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Overview</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold leading-tight">{h1}</h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{overview}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-x py-10 md:py-14 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Why Penthouse Advisors</p>
        <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">What you get.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-border bg-card p-7 shadow-elegant">
              <div className="grid h-11 w-11 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-display font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-12 md:py-16 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Our Process</p>
        <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">How we move.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {process.map((s) => (
            <div key={s.step}>
              <div className="text-5xl font-display font-extrabold text-gold/25">{s.step}</div>
              <h3 className="mt-2 text-xl font-display font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-12 md:py-16 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">FAQ</p>
        <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">Questions answered.</h2>
        <div className="mt-8 grid gap-4 max-w-3xl">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-base font-semibold">
                {f.q}
                <span className="text-gold transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related services - internal linking */}
      <section className="container-x py-12 md:py-16 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Related Services</p>
        <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">Explore more.</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {related.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-3 text-sm font-semibold hover:bg-gold/10 hover:border-gold transition"
            >
              <CheckCircle2 className="h-4 w-4 text-gold" /> {r.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact"
            search={serviceNeeded ? { service: serviceNeeded } : undefined}
            className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold hover:bg-gold/10"
          >
            <Phone className="h-4 w-4 text-gold" /> Call {PHONE}
          </a>
        </div>
      </section>

      <CTASection title={ctaTitle ?? "Ready to move?"} body={ctaBody ?? "We answer the phone. We move today."} serviceNeeded={serviceNeeded} />
    </SiteLayout>
  );
}

export function buildServiceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  breadcrumbs: { name: string; url: string }[];
  faqs: FAQ[];
}) {
  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: opts.name,
        serviceType: opts.serviceType,
        description: opts.description,
        url: opts.url,
        areaServed: { "@type": "AdministrativeArea", name: "Los Angeles County" },
        provider: {
          "@type": "ProfessionalService",
          name: "Penthouse Advisors Inc.",
          telephone: "+1-310-663-3521",
          url: "https://www.penthouseadvisors.com",
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: opts.breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      }),
    },
  ];
  if (opts.faqs.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: opts.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }
  return scripts;
}
