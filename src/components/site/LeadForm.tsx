import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2, Phone, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { PHONE, PHONE_HREF } from "./Layout";
import { serviceTopics } from "@/lib/services";
import { submitLead } from "@/lib/leads.functions";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  topic: z.string().min(1, "Pick what you need"),
  role: z.string().min(1, "Select your role"),
  message: z.string().trim().max(1000).optional(),
});

export function LeadForm({
  defaultTopic,
  title = "Book a Consultation",
  subtitle = "Tell us what you need. We respond same business day.",
  extraFields,
}: {
  defaultTopic?: string;
  title?: string;
  subtitle?: string;
  extraFields?: React.ReactNode;
}) {
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

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-10 text-center shadow-elegant">
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
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-7 md:p-10 shadow-elegant">
      <h3 className="text-2xl font-display font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        <Field label="Name" name="name" error={errors.name} placeholder="Your full name" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone" name="phone" type="tel" error={errors.phone} placeholder="310-555-0123" />
          <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@email.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Service Needed</label>
          <select
            name="topic"
            defaultValue={defaultTopic ?? ""}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
          >
            <option value="" disabled>Select one…</option>
            {serviceTopics.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.topic && <p className="mt-1.5 text-xs text-destructive">{errors.topic}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Are you a</label>
          <select
            name="role"
            defaultValue=""
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
          >
            <option value="" disabled>Select one…</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="restaurant-operator">Restaurant Operator</option>
          </select>
          {errors.role && <p className="mt-1.5 text-xs text-destructive">{errors.role}</p>}
        </div>
        {extraFields}
        <div>
          <label className="block text-sm font-semibold mb-2">Additional details</label>
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
    </div>
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
