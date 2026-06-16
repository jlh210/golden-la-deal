import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout, PHONE, PHONE_HREF } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Penthouse Advisors | LA Restaurant Brokerage" },
      {
        name: "description",
        content:
          "Book a consultation with Penthouse Advisors. Call 310-663-3521 or send us a message — LA's restaurant brokerage & advisory firm.",
      },
      { property: "og:title", content: "Contact Penthouse Advisors" },
      {
        property: "og:description",
        content: "Book a free consult with LA's restaurant experts.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  topic: z.string().min(1, "Pick what you need"),
  message: z.string().trim().max(1000).optional(),
});

const topics = [
  "Buying a restaurant",
  "Selling my restaurant",
  "Alcohol licensing",
  "Health permit / inspection",
  "Lease negotiation",
  "Blueprint / plan check",
  "Red tag / emergency rescue",
  "Something else",
];

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <SiteLayout>
      <section className="bg-hero border-b border-border">
        <div className="container-x py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Get In Touch</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display font-extrabold leading-[1.05]">
            Tell us what you <span className="text-gradient-gold">need.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            We answer the phone. We respond to forms within the business day. Whether
            you're buying, selling, or in trouble — start here.
          </p>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* FORM */}
          <div className="rounded-2xl border border-border bg-card p-7 md:p-10 shadow-elegant">
            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
                <h3 className="mt-4 text-2xl font-display font-bold">We've got it.</h3>
                <p className="mt-2 text-muted-foreground">
                  Expect a call from our team within one business day. Need it now?
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
                >
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <Field label="Name" name="name" error={errors.name} placeholder="Your full name" />
                <Field label="Phone" name="phone" type="tel" error={errors.phone} placeholder="310-555-0123" />
                <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@email.com" />

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    What do you need help with?
                  </label>
                  <select
                    name="topic"
                    defaultValue=""
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="" disabled>Select one…</option>
                    {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.topic && <p className="mt-1.5 text-xs text-destructive">{errors.topic}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Anything else? (optional)</label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="A few details on your situation…"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold hover:opacity-95 transition"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to be contacted by Penthouse Advisors.
                </p>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="space-y-5">
            <a
              href={PHONE_HREF}
              className="block rounded-2xl border border-gold/40 bg-charcoal-deep p-7 hover:border-gold transition"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold border border-gold/30">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Call us</div>
                  <div className="text-xl font-display font-bold text-gold">{PHONE}</div>
                </div>
              </div>
            </a>

            <a
              href="mailto:info@penthouseadvisors.com"
              className="block rounded-2xl border border-border bg-card p-7 hover:border-gold/60 transition"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/15 text-gold border border-gold/30">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="text-base font-semibold">info@penthouseadvisors.com</div>
                </div>
              </div>
            </a>

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
                title="Los Angeles map"
                src="https://www.google.com/maps?q=Los%20Angeles%2C%20CA&output=embed"
                className="w-full h-64 border-0 grayscale-[40%] opacity-90"
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

function Field({
  label, name, type = "text", error, placeholder,
}: { label: string; name: string; type?: string; error?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
