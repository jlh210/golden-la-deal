import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PHONE, PHONE_HREF } from "./Layout";
import { CONSULTATION_LABEL } from "@/lib/consultation";

export function CTASection({
  title = "Discuss your restaurant plans.",
  body = "Speak with Penthouse Advisors about your restaurant and the next steps.",
  serviceNeeded,
}: {
  title?: string;
  body?: string;
  serviceNeeded?: string;
}) {
  return (
    <section className="pa-shell pa-shared-cta">
      <div>
        <p className="pa-kicker">A conversation is the first step</p>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="pa-cta-actions">
        <Link
          to="/contact"
          search={serviceNeeded ? { service: serviceNeeded } : undefined}
          className="pa-button"
        >
          {CONSULTATION_LABEL}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
        <a href={PHONE_HREF} className="pa-text-link">
          Or call {PHONE}
        </a>
      </div>
    </section>
  );
}
