import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, HOURS } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { serviceTopics } from "@/lib/services";

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
        title="Speak with LA experts"
        accent="for $35."
        subtitle="A real consultation with specialists who solve business, city, and restaurant problems — buying, selling, licensing, leasing, permitting, and disputes."
      />

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <LeadForm
            serviceNeeded={prefill}
            title="Book a Consultation"
            subtitle={prefill ? "We've pre-filled your service need below. Add a few details and we'll respond same business day." : "Pick your Service Needed below - every category we offer is in the dropdown."}
            messagePlaceholder={prefill ? "Address of my current restaurant" : "A few details on your situation…"}
          />

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
                src="https://www.google.com/maps?q=Los%20Angeles%20County%2C%20CA&output=embed"
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
