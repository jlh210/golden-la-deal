import { CONSULTATION_OFFER } from "@/lib/consultation";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2, Phone, Loader2, Calendar } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { PHONE, PHONE_HREF } from "./Layout";
import { serviceTopics } from "@/lib/services";
import { submitLead, markLeadBooked } from "@/lib/leads.functions";

const CALENDLY_URL = "https://calendly.com/penthouseadvisors/30min";

// Cloudflare Turnstile (public site key). When unset, the widget is not
// rendered and the server skips verification, so the form keeps working.
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;
const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
      theme?: "auto" | "light" | "dark";
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

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
  title = CONSULTATION_OFFER,
  subtitle = "Tell us what you need. We respond same business day.",
  messagePlaceholder = "A few details on your situation…",
  extraFields,
  note,
}: {
  serviceNeeded?: string;
  title?: string;
  subtitle?: string;
  messagePlaceholder?: string;
  extraFields?: React.ReactNode;
  note?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("form");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{
    name: string;
    email: string;
    phone: string;
    bookingReference?: string;
  } | null>(null);
  const [embedReady, setEmbedReady] = useState(false);
  const [bookingSyncFailed, setBookingSyncFailed] = useState(false);
  const bookingHandled = useRef(false);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

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
        e.origin === "https://calendly.com" &&
        e.source === calendlyRef.current?.querySelector("iframe")?.contentWindow &&
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
      if (
        payload.event === "calendly.event_scheduled" &&
        submitted?.bookingReference &&
        payload.payload?.event?.uri &&
        !bookingHandled.current
      ) {
        bookingHandled.current = true;
        try {
          const result = await mark({
            data: {
              email: submitted.email,
              bookingReference: submitted.bookingReference,
              eventUri: payload.payload?.event?.uri ?? "",
              startTime: payload.payload?.event?.start_time ?? "",
            },
          });
          setBookingSyncFailed(!result.ok);
        } catch (err) {
          console.error("Failed to mark lead booked", err);
          setBookingSyncFailed(true);
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

  // Render the Turnstile widget while the form is showing.
  useEffect(() => {
    if (stage !== "form" || !TURNSTILE_SITE_KEY) return;
    let cancelled = false;

    function mount() {
      const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (cancelled || !api || !turnstileRef.current || turnstileWidgetId.current) return;
      turnstileWidgetId.current = api.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY as string,
        theme: "auto",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(null),
        "error-callback": () => setTurnstileToken(null),
      });
    }

    const existing = document.getElementById(TURNSTILE_SCRIPT_ID) as HTMLScriptElement | null;
    if ((window as unknown as { turnstile?: TurnstileApi }).turnstile) {
      mount();
    } else if (existing) {
      existing.addEventListener("load", mount);
    } else {
      const s = document.createElement("script");
      s.id = TURNSTILE_SCRIPT_ID;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.addEventListener("load", mount);
      document.head.appendChild(s);
    }

    return () => {
      cancelled = true;
      const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (api && turnstileWidgetId.current) api.remove(turnstileWidgetId.current);
      turnstileWidgetId.current = null;
      setTurnstileToken(null);
    };
  }, [stage]);

  function resetTurnstile() {
    const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (api && turnstileWidgetId.current) api.reset(turnstileWidgetId.current);
    setTurnstileToken(null);
  }

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
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrors({});
      setServerError("Please wait for the security check to finish, then try again.");
      return;
    }
    setErrors({});
    setServerError(null);
    setLoading(true);
    try {
      const response = await send({
        data: {
          source: title,
          serviceNeeded: serviceNeeded ?? data.serviceNeeded,
          fields: data,
          turnstileToken: turnstileToken ?? undefined,
        },
      });
      if (!response.ok) {
        setServerError("Security check failed. Please try again, or call us.");
        resetTurnstile();
        return;
      }
      setSubmitted({
        name: data.name,
        email: data.email,
        phone: data.phone,
        bookingReference: response.bookingReference,
      });
      setStage("calendly");
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong sending your message. Please call us.");
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  }

  if (stage === "booked") {
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-10 text-center shadow-elegant animate-in fade-in slide-in-from-bottom-2 duration-500">
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
        <h2 className="mt-4 text-3xl font-display font-bold">
          Calendly Has Confirmed Your Appointment.
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Check your Calendly confirmation for appointment details. Scheduling does not confirm
          payment; this website cannot verify a payment.
        </p>
        {bookingSyncFailed && (
          <p role="status" className="mt-4 text-sm">
            Your appointment was scheduled in Calendly, but we could not update the inquiry record.
            Please call us to confirm the team has your appointment details.
          </p>
        )}
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
    const prefillUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&name=${encodeURIComponent(submitted.name)}&email=${encodeURIComponent(submitted.email)}&phone_number=${encodeURIComponent(submitted.phone)}`;
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-7 md:p-10 shadow-elegant animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
          <h2 className="mt-3 text-3xl font-display font-bold">Thank You for Your Inquiry.</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Your inquiry has been received. An appointment has not yet been booked.
          </p>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Choose an available appointment in Calendly for your $35, 30-minute consultation. Follow
            the payment instructions provided by Penthouse Advisors. This website does not verify
            payment.
          </p>
        </div>

        <div
          ref={calendlyRef}
          className="calendly-inline-widget mt-8 rounded-lg overflow-hidden border border-border"
          data-url={prefillUrl}
          style={{ width: "100%", minWidth: 0, height: 700 }}
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
      <h2 className="text-2xl font-display font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        {/* Honeypot — visually and functionally hidden (clipped to 1px, not
            display:none, so bots that skip hidden fields still fill it). A
            bot filling every field trips it; a real visitor never sees it. */}
        <div
          className="absolute h-px w-px overflow-hidden whitespace-nowrap p-0 m-0 border-0"
          style={{ clip: "rect(0,0,0,0)" }}
          aria-hidden="true"
        >
          <label htmlFor="website">Leave this field blank</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <Field label="Name" name="name" error={errors.name} placeholder="Your full name" />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Phone"
            name="phone"
            type="tel"
            error={errors.phone}
            placeholder="310-555-0123"
          />
          <Field
            label="Email"
            name="email"
            type="email"
            error={errors.email}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label htmlFor="serviceNeeded" className="block text-sm font-semibold mb-2">
            Service Needed
          </label>
          {serviceNeeded ? (
            <>
              <input type="hidden" name="serviceNeeded" value={serviceNeeded} />
              <div className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm">
                {serviceNeeded}
              </div>
            </>
          ) : (
            <select
              id="serviceNeeded"
              name="serviceNeeded"
              defaultValue=""
              aria-invalid={errors.serviceNeeded ? "true" : undefined}
              aria-describedby={errors.serviceNeeded ? "serviceNeeded-error" : undefined}
              className={`w-full rounded-md border bg-background px-4 py-3 text-sm focus:outline-none ${
                errors.serviceNeeded
                  ? "border-destructive focus:border-destructive"
                  : "border-border focus:border-gold"
              }`}
            >
              <option value="" disabled>
                Select one…
              </option>
              {serviceTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
          {errors.serviceNeeded && (
            <p id="serviceNeeded-error" role="alert" className="mt-1.5 text-xs text-destructive">
              {errors.serviceNeeded}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-semibold mb-2">
            Are you a
          </label>
          <select
            id="role"
            name="role"
            defaultValue=""
            aria-invalid={errors.role ? "true" : undefined}
            aria-describedby={errors.role ? "role-error" : undefined}
            className={`w-full rounded-md border bg-background px-4 py-3 text-sm focus:outline-none ${
              errors.role
                ? "border-destructive focus:border-destructive"
                : "border-border focus:border-gold"
            }`}
          >
            <option value="" disabled>
              Select one…
            </option>
            <option value="Property owner">Property owner</option>
            <option value="Restaurant operator">Restaurant operator</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
          {errors.role && (
            <p id="role-error" role="alert" className="mt-1.5 text-xs text-destructive">
              {errors.role}
            </p>
          )}
        </div>
        {extraFields}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2">
            Additional details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            placeholder={messagePlaceholder}
            className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none resize-none"
          />
        </div>
        {note && (
          <p className="text-xs text-gold text-center font-semibold leading-relaxed">{note}</p>
        )}
        {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="flex justify-center" />}
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-6 py-3.5 text-sm font-bold text-charcoal-deep shadow-gold hover:opacity-95 transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send Message <Send className="h-4 w-4" />
            </>
          )}
        </button>
        {serverError && (
          <p role="alert" className="text-xs text-destructive text-center">
            {serverError}
          </p>
        )}
        <p className="text-xs text-muted-foreground text-center">
          By submitting, you agree to be contacted by Penthouse Advisors.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={type === "email" ? "email" : type === "tel" ? "tel" : "name"}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-md border bg-background px-4 py-3 text-sm focus:outline-none ${
          error ? "border-destructive focus:border-destructive" : "border-border focus:border-gold"
        }`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
