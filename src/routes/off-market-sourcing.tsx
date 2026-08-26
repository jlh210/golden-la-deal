import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Search, CheckCircle2, Phone, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PHONE, PHONE_HREF } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { submitLead } from "@/lib/leads.functions";

import { breadcrumbScript } from "@/lib/seo";
export const Route = createFileRoute("/off-market-sourcing")({
  head: () => ({
    meta: [
      { title: "Off-Market Restaurants & Businesses - Buyer Sourcing | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Source off-market restaurants and businesses across Los Angeles County. Tell us your budget, area, type, and timeline - we'll find what isn't listed.",
      },
      { property: "og:title", content: "Off-Market Sourcing - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Source LA restaurants and businesses that never hit the open market.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/off-market-sourcing" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/off-market-sourcing" }],
    scripts: [
      breadcrumbScript([{name:"Home",path:"/"},{name:'Off-Market Sourcing',path:'/off-market-sourcing'}]),
    ],
  }),
  component: OffMarketPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email("Valid email required").max(255),
  budget: z.string().min(1, "Budget required"),
  location: z.string().trim().min(1).max(120),
  businessType: z.string().trim().min(1).max(120),
  timeline: z.string().min(1, "Timeline required"),
  notes: z.string().trim().max(1000).optional(),
});

const budgets = ["Under $100k", "$100k – $250k", "$250k – $500k", "$500k – $1M", "$1M – $3M", "$3M+"];
const timelines = ["This week", "30 days", "60–90 days", "3–6 months", "Flexible"];

function OffMarketPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const send = useServerFn(submitLead);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const r = schema.safeParse(data);
    if (!r.success) {
      const fe: Record<string, string> = {};
      for (const i of r.error.issues) fe[String(i.path[0])] = i.message;
      setErrors(fe);
      return;
    }
    setErrors({});
    setServerError(null);
    setLoading(true);
    try {
      await send({ data: { source: "Off-Market Sourcing", serviceNeeded: "Off-Market Sourcing", fields: { ...data, role: "Buyer" } } });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong. Please call us.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Off-Market Sourcing"
        title="The deals that never hit the market."
        subtitle="Most of the best LA restaurant deals never get listed. Operators sell quietly, landlords push deals to a short list, and privately held businesses transfer hand-to-hand. Tell us what you're hunting - we'll find it."
      />

      <section className="container-x py-12 md:py-20 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-7 md:p-10 shadow-elegant">
          {submitted ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
              <h3 className="mt-4 text-2xl font-display font-bold">Brief received.</h3>
              <p className="mt-2 text-muted-foreground">
                We'll start sourcing today and reach out with matches within 5 business days.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
              >
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                  <Search className="h-5 w-5" />
                </span>
                <h2 className="text-2xl font-display font-bold">Buyer Brief</h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                A few details so we know what to hunt for.
              </p>
              <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
                <Field name="name" label="Your name" error={errors.name} />
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="phone" label="Phone" type="tel" error={errors.phone} />
                  <Field name="email" label="Email" type="email" error={errors.email} />
                </div>
                <SelectField name="budget" label="Budget" options={budgets} error={errors.budget} />
                <Field name="location" label="Target location / neighborhood" placeholder="e.g. Silver Lake, West LA, Beverly Hills" error={errors.location} />
                <Field name="businessType" label="Business type" placeholder="e.g. Italian, sushi, coffee, bar with Type 47" error={errors.businessType} />
                <SelectField name="timeline" label="Timeline to close" options={timelines} error={errors.timeline} />
                <div>
                  <label className="block text-sm font-semibold mb-2">Notes (optional)</label>
                  <textarea
                    name="notes"
                    rows={4}
                    maxLength={1000}
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none resize-none"
                    placeholder="Anything else we should know? Hood requirements, lease length, financing…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold disabled:opacity-60"
                >
                  {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Send Buyer Brief"}
                </button>
                {serverError && <p className="text-xs text-destructive text-center">{serverError}</p>}
              </form>
            </>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-gold/40 bg-card p-7">
            <h3 className="font-display font-bold text-xl">How off-market works</h3>
            <ol className="mt-4 space-y-4 text-sm">
              <li><span className="text-gold font-bold">1.</span> You send the brief.</li>
              <li><span className="text-gold font-bold">2.</span> We circulate to our owner & landlord network - no public listing.</li>
              <li><span className="text-gold font-bold">3.</span> You see vetted options with financials, under NDA.</li>
              <li><span className="text-gold font-bold">4.</span> We negotiate, structure, and close.</li>
            </ol>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({ name, label, type = "text", placeholder, error }: {
  name: string; label: string; type?: string; placeholder?: string; error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SelectField({ name, label, options, error }: {
  name: string; label: string; options: string[]; error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
