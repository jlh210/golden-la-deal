import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  accent,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-hero border-b border-border">
      <div className="container-x py-14 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-display font-extrabold leading-[1.05]">
          {title} {accent && <span className="text-gold whitespace-nowrap">{accent}</span>}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-muted-foreground">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
