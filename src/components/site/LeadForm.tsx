import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2, Phone, Loader2, Calendar } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { PHONE, PHONE_HREF } from "./Layout";
import { serviceTopics } from "@/lib/services";
import { submitLead, markLeadBooked } from "@/lib/leads.functions";

const CALENDLY_URL = "https://calendly.com/penthouseadvisors/30min";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(7, "Valid phone required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  serviceNeeded: z.string().min(1, "Pick what you need"),
  role: z.string().min(1, "Select your role"),
  message: z.string().trim().max(1000).optional(),
});

type Stage = "form" | "calendly" | "booked";

export function LeadForm({
  serviceNeeded,
  title = "Book a Consultation",
  subtitle = "Tell us what you need. We respond same business day.",
  messagePlaceholder = "A few details on your situation…",
  extraFields,
}: {
  serviceNeeded?: string;
  title?: string;
  subtitle?: string;
  messagePlaceholder?: string;
  extraFields?: React.ReactNode;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("form");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  const [embedReady, setEmbedReady] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const send = useServerFn(submitLead);
  const mark = useServerFn(markLeadBooked);

  // Inject Calendly widget script + listen for booking event
  useEffect(() => {
    if (stage !== "calendly" || !submitted) return;

    // Load widget script once
    const SCRIPT_ID = "calendly-widget-script";
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.body.appendChild(s);
    }

    // Fallback timer: if iframe never paints, show CTA button
    const fallback = window.setTimeout(() => {
      const hasIframe = calendlyRef.current?.querySelector("iframe");
      if (!hasIframe) setEmbedReady(false);
    }, 6000);

    const readyCheck = window.setInterval(() => {
      if (calendlyRef.current?.querySelector("iframe")) {
        setEmbedReady(true);
        window.clearInterval(readyCheck);
      }
    }, 400);

    function isCalendlyEvent(e: MessageEvent) {
      return (
        typeof e.data === "object" &&
        e.data !== null &&
        "event" in e.data &&
        typeof (e.data as { event?: string }).event === "string" &&
        (e.data as { event: string }).event.indexOf("calendly.") === 0
      );
    }

    async function onMessage(e: MessageEvent) {
      if (!isCalendlyEvent(e)) return;
      const payload = e.data as {
        event: string;
        payload?: {
          event?: { uri?: string; start_time?: string };
          invitee?: { uri?: string };
        };
      };
      if (payload.event === "calendly.event_scheduled" && submitted) {
        try {
          await mark({
            data: {
              email: submitted.email,
              eventUri: payload.payload?.event?.uri ?? "",
              startTime: payload.payload?.event?.start_time ?? "",
            },
          });
        } catch (err) {
          console.error("Failed to mark lead booked", err);
        }
        setStage("booked");
      }
    }

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(fallback);
      window.clearInterval(readyCheck);
    };
  }, [stage, submitted, mark]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    setServerError(null);
    setLoading(true);
    try {
      await send({ data: { source: title, serviceNeeded: serviceNeeded ?? data.serviceNeeded, fields: data } });
      setSubmitted({ name: data.name, email: data.email });
      setStage("calendly");
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong sending your message. Please call us.");
    } finally {
      setLoading(false);
    }
  }

  if (stage === "booked") {
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-10 text-center shadow-elegant animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h3 className="mt-4 text-3xl font-display font-bold">Your Advisory Call Has Been Scheduled.</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Thank you. Your private advisory call has been booked, and our team will review your inquiry before the meeting.
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

  if (stage === "calendly" && submitted) {
    const prefillUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&name=${encodeURIComponent(submitted.name)}&email=${encodeURIComponent(submitted.email)}`;
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-7 md:p-10 shadow-elegant animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
          <h3 className="mt-3 text-3xl font-display font-bold">Thank You for Your Inquiry.</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Your information has been received successfully.
          </p>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            The next step is to schedule your 30-minute private advisory call so we can discuss your restaurant goals, answer your questions, and determine the best path forward.
          </p>
        </div>

        <div
          ref={calendlyRef}
          className="calendly-inline-widget mt-8 rounded-lg overflow-hidden border border-border"
          data-url={prefillUrl}
          style={{ minWidth: 320, height: 700 }}
        />

        {!embedReady && (
          <div className="mt-6 text-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold hover:opacity-95 transition"
            >
              <Calendar className="h-4 w-4" /> Schedule Your Advisory Call
            </a>
          </div>
        )}
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
          {serviceNeeded ? (
            <>
              <input type="hidden" name="serviceNeeded" value={serviceNeeded} />
              <div className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm">
                {serviceNeeded}
              </div>
            </>
          ) : (
            <select
              name="serviceNeeded"
              defaultValue=""
              className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
            >
              <option value="" disabled>Select one…</option>
              {serviceTopics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
          {errors.serviceNeeded && <p className="mt-1.5 text-xs text-destructive">{errors.serviceNeeded}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Are you a</label>
          <select
            name="role"
            defaultValue=""
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none"
          >
            <option value="" disabled>Select one…</option>
            <option value="Owner">Owner</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Operator">Operator</option>
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
            placeholder={messagePlaceholder}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold hover:opacity-95 transition disabled:opacity-60"
        >
          {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : (<>Send Message <Send className="h-4 w-4" /></>)}
        </button>
        {serverError && <p className="text-xs text-destructive text-center">{serverError}</p>}
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
