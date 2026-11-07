import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { SiteLayout, PHONE, PHONE_HREF } from "./Layout";
import { PageHero } from "./PageHero";
import { CTASection } from "./CTASection";
import { CONSULTATION_LABEL } from "@/lib/consultation";

import {
  ServiceAuthorityHero,
  ServiceAuthorityDetails,
  type ServiceAuthorityContent,
} from "./ServiceAuthority";
import { HeadingCTA } from "@/components/site/HeadingCTA";

export type FAQ = { q: string; a: string };
export type RelatedLink = { to: string; label: string };

export interface ServiceLandingProps {
  authority?: ServiceAuthorityContent;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  h1: string;
  /** One string, or several strings rendered as separate paragraphs. */
  overview: string | string[];
  benefits: { icon: LucideIcon; title: string; body: string }[];
  process: { step: string; title: string; body: string }[];
  faqs: FAQ[];
  related: RelatedLink[];
  serviceNeeded?: string;
  ctaTitle?: string;
  ctaBody?: string;
  /** Optional content rendered at the very bottom of the page, after the CTA. */
  footerSection?: ReactNode;
  /** When true, the Related Services links render directly under the hero's consultation button. */
  relatedAtTop?: boolean;
  /** Optional box button rendered next to the hero's consultation button. */
  heroSecondaryAction?: { to: string; label: string };
}

export function ServiceLanding(props: ServiceLandingProps) {
  const {
    eyebrow,
    title,
    accent,
    subtitle,
    h1,
    overview,
    benefits,
    process,
    faqs,
    related,
    serviceNeeded,
    ctaTitle,
    ctaBody,
    relatedAtTop,
  } = props;

  const relatedLinks = (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">Related Services</p>
      <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">Explore more.</h2>
      <HeadingCTA />
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
    </>
  );

  return (
    <SiteLayout>
      {props.authority ? (
        <ServiceAuthorityHero
          content={props.authority}
          secondaryAction={props.heroSecondaryAction}
        />
      ) : (
        <PageHero eyebrow={eyebrow} title={h1} subtitle={subtitle} />
      )}

      {relatedAtTop && <section className="container-x py-12 md:py-16">{relatedLinks}</section>}

      {/* Overview */}
      <section className="container-x py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Overview</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold leading-tight">
            {title} {accent}
          </h2>
          <HeadingCTA />
          {(Array.isArray(overview) ? overview : [overview]).map((para) => (
            <p
              key={para}
              className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container-x py-10 md:py-14 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Why Penthouse Advisors
        </p>
        <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">What you get.</h2>
        <HeadingCTA />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-card p-7 shadow-elegant"
            >
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
        <HeadingCTA />
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

      {props.authority && <ServiceAuthorityDetails content={props.authority} />}

      {/* FAQ */}
      <section className="container-x py-12 md:py-16 border-t border-border">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">FAQ</p>
        <h2 className="mt-2 text-2xl md:text-4xl font-display font-bold">Questions answered.</h2>
        <HeadingCTA />
        <div className="mt-8 grid gap-4 max-w-3xl">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-base font-semibold">
                {f.q}
                <span className="text-gold transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related services - internal linking */}
      <section className="container-x py-12 md:py-16 border-t border-border">
        {!relatedAtTop && relatedLinks}
        <div className={relatedAtTop ? "flex flex-wrap gap-3" : "mt-8 flex flex-wrap gap-3"}>
          <Link
            to="/contact"
            search={serviceNeeded ? { service: serviceNeeded } : undefined}
            className="pa-button"
          >
            {CONSULTATION_LABEL} <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold hover:bg-gold/10"
          >
            <Phone className="h-4 w-4 text-gold" /> Call {PHONE}
          </a>
        </div>
      </section>

      <CTASection
        title={ctaTitle ?? "Ready to move?"}
        body={ctaBody ?? "We answer the phone. We move today."}
        serviceNeeded={serviceNeeded}
      />

      {props.footerSection}
    </SiteLayout>
  );
}
