import { Link } from "@tanstack/react-router";

/** Consultation prompt shown beneath page and section headings site-wide. */
export function HeadingCTA({ className = "" }: { className?: string }) {
  return (
    <p className={`pa-heading-cta mt-2 text-sm font-semibold ${className}`.trim()}>
      <Link to="/contact" className="text-gold underline underline-offset-4 hover:opacity-80">
        Have Questions?
      </Link>{" "}
      Book a consultation
    </p>
  );
}
