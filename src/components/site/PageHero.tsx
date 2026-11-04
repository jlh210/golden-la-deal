import type { ReactNode } from "react";
import { HeadingCTA } from "@/components/site/HeadingCTA";

export function PageHero({
  eyebrow,
  lead,
  title,
  accent,
  subtitle,
  children,
  hideHeadingCta = false,
}: {
  hideHeadingCta?: boolean;
  eyebrow: string;
  lead?: string;
  title: string;
  accent?: string;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero border-b border-border">
      <div className="container-x py-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-display font-extrabold leading-[1.05]">
          {lead && (
            <span className="block mb-3 text-xl md:text-3xl uppercase tracking-[0.12em] leading-snug text-gold">
              {lead}
            </span>
          )}
          {title} {accent && <span className="text-gold">{accent}</span>}
        </h1>
        {!hideHeadingCta && <HeadingCTA />}
        {subtitle && <p className="mt-5 max-w-2xl text-muted-foreground">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
