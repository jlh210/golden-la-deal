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
      { title: "Book a $35 Consultation - Penthouse Advisors LA" },
      {
        name: "description",
        content:
          "Book a paid consultation with Penthouse Advisors. Speak directly with Richard Stein or Roschard Paticchio Stein about your restaurant, business, or property in Los Angeles County.",
      },
      { property: "og:title", content: "Book a Consultation - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Lock in your guaranteed advisory call with LA's restaurant experts.",
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
        eyebrow="Reserve your advisory call"
        title="Speak directly with our COO, Richard Stein or CEO Roschard Paticchio Stein."
        accent="Lock in your $35 consultation."
        subtitle="A guaranteed 30-minute mobile-to-mobile call for real answers on restaurants, properties, and city matters."
      />

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-card p-6 shadow-elegant">
              <div className="text-xs uppercase tracking-widest text-gold font-semibold">Paid consultation — non-refundable</div>
              <div className="mt-2 text-2xl md:text-3xl font-display font-bold">
                $35 secures your guaranteed advisory call.
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Submit your details below and we'll confirm your appointment.
              </p>
            </div>
            <LeadForm
              serviceNeeded={prefill}
              title="Book your $35 consultation"
              subtitle="Fill in your details. Once payment is confirmed, we’ll lock in your time with Richard Stein or Roschard Paticchio Stein."
              messagePlaceholder={prefill ? "Address of my current restaurant" : "A few details on your situation…"}
              note="$35 non-refundable. Zelle 310-460-9757 before submitting."
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
