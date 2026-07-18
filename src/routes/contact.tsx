import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, HOURS } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { serviceTopics } from "@/lib/services";

import { breadcrumbScript } from "@/lib/seo";
export const Route = createFileRoute("/contact")({
  validateSearch: (search) =>
    z.object({ service: z.string().optional() }).parse(search),
  head: () => ({
    meta: [
      { title: "Contact / Book a Consultation - Penthouse Advisors LA" },
      {
        name: "description",
        content:
          "Book a consultation with Penthouse Advisors. Call 310-663-3521, email PenthouseAdvisors@gmail.com, or send a message. Servicing Los Angeles County.",
      },
      { property: "og:title", content: "Contact Penthouse Advisors" },
      {
        property: "og:description",
        content: "Book a consultation with LA's restaurant experts.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/contact" }],
    scripts: [
      breadcrumbScript([{name:"Home",path:"/"},{name:'Contact',path:'/contact'}]),
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { service } = Route.useSearch();
  const prefill = service && serviceTopics.includes(service) ? service : undefined;
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Get In Touch"
        title="Lock in your paid consultation with"
        accent="COO Richard Stein for $35."
        subtitle="A guaranteed, non-refundable one-on-one meeting. Your $35 secures direct time with our Chief Operating Officer and ensures you get immediate relief and expert business consultation for your restaurant, property, or city-related situation."
      />

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-card p-6 shadow-elegant">
              <div className="text-xs uppercase tracking-widest text-gold font-semibold">Paid consultation — non-refundable</div>
              <div className="mt-2 text-2xl md:text-3xl font-display font-bold">
                Lock in your guaranteed meeting with COO Richard Stein for $35
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                This $35 locks in your appointment and guarantees you speak directly with Richard Stein, our Chief Operating Officer. You’ll get immediate relief, real answers, and focused business consultation — not a sales pitch.
              </p>
            </div>
            <LeadForm
              serviceNeeded={prefill}
              title="Book Your $35 Consultation"
              subtitle="Secure your guaranteed meeting with COO Richard Stein. Your $35 non-refundable payment locks in your time and ensures immediate, expert business consultation."
              messagePlaceholder={prefill ? "Address of my current restaurant" : "A few details on your situation…"}
              note="This is a paid, non-refundable $35 consultation that guarantees a one-on-one meeting with COO Richard Stein. Immediate relief and expert business consultation included."
            />
          </div>

          <div className="space-y-5">
            <a
              href={PHONE_HREF}
              className="block rounded-2xl border border-gold/40 bg-card p-7 hover:border-gold transition"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold border border-gold/30">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Office</div>
                  <div className="text-xl font-display font-bold text-gold">{PHONE}</div>
                </div>
              </div>
            </a>

            <a
              href={EMAIL_HREF}
              className="block rounded-2xl border border-border bg-card p-7 hover:border-gold/60 transition"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold border border-gold/30">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="text-base font-semibold break-all">{EMAIL}</div>
                </div>
              </div>
            </a>

            <div className="rounded-2xl border border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold border border-gold/30">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Hours</div>
                  <div className="text-base font-semibold">{HOURS}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold border border-gold/30">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Service area</div>
                    <div className="text-base font-semibold">Los Angeles County, CA</div>
                  </div>
                </div>
              </div>
              <iframe
                title="Los Angeles County map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-118.9448%2C33.7037%2C-117.6462%2C34.8233&layer=mapnik"
                className="w-full h-72 border-0 grayscale-[40%] opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
