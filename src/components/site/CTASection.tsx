import { Link } from "@tanstack/react-router";
import { Phone, ArrowRight } from "lucide-react";
import { PHONE, PHONE_HREF } from "./Layout";

export function CTASection({
  title = "Ready to move?",
  body = "We answer the phone. We move today.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-x pb-20 pt-4">
      <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-muted via-charcoal to-card p-8 md:p-12 shadow-elegant">
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
        />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl md:text-4xl font-display font-bold leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-muted-foreground">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold whitespace-nowrap"
            >
              Book a Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/50 px-6 py-3.5 text-sm font-bold text-foreground hover:bg-gold/10 whitespace-nowrap"
            >
              <Phone className="h-4 w-4 text-gold" /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
