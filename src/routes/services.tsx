import { CONSULTATION_LABEL } from "@/lib/consultation";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { services } from "@/lib/services";

import { breadcrumbScript } from "@/lib/seo";
export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "All Services - Penthouse Advisors | LA Restaurant Brokerage & Advisory" },
      {
        name: "description",
        content:
          "Brokerage, alcohol licensing, health permitting, lease assignments, vermin inspections, off-market sourcing, E-2 visa support, 2nd gen spaces and more.",
      },
      { property: "og:title", content: "Services - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Full-service restaurant advisory for Los Angeles County operators.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/services" }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Penthouse Advisors Inc."
        subtitle={
          <strong className="text-foreground">Brief of our Services below:</strong>
        }
      />

      <section className="container-x py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-xl border border-border bg-card p-7 hover:border-gold/60 transition shadow-elegant flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="font-display text-xs font-bold text-gold/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-display font-bold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground flex-1">{s.short}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                Open page <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card p-7 shadow-elegant">
          <h2 className="text-xl font-display font-bold">
            Door Knocking for Retail Film Locations Throughout Los Angeles County
          </h2>
          <p className="mt-1 text-sm font-semibold text-gold">One-Time Fee per Script, good for one year, $2,750</p>
          <h3 className="mt-4 text-base font-display font-bold">Research the Location</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>We need to understand the significance of the location in the film.</li>
            <li>
              Familiarize ourselves with any filming history or notable scenes associated with
              the site.
            </li>
            <li>
              Choose the appropriate times to go door knocking, avoiding early mornings or late
              evenings.
            </li>
            <li>Be ready to answer questions about the interest in the location.</li>
            <li>Share any relevant details about the film project.</li>
            <li>
              Check if there are any regulations regarding filming or photography in the area.
            </li>
            <li>
              If the above is clear, we set up a Location Tour for the Director and Producer.
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold"
          >
            Film Location Door Knocking - $2,750 per Script <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-border bg-card p-7 shadow-elegant">
          <h2 className="text-xl font-display font-bold">
            Door Knocking for Restaurants and Retail Businesses for Lease, for Sale, Throughout
            Los Angeles County
          </h2>
          <p className="mt-1 text-sm font-semibold text-gold">
            One-Time Fee per Signed Lease $2,750
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Restaurant Asset Sales leased by the Landlord cannot require Key Money. This is a
              lease-only deal; therefore, the new tenant must supply us with a bank statement
              showing liquidity, with the account number crossed out for security.
            </li>
            <li>
              Under Restaurant Business Sales for Sale, the Buyer must supply a bank statement and
              credit report, and go over their work-related experience.
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gold"
          >
            Restaurant &amp; Retail Door Knocking - $2,750 per Signed Lease{" "}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/contact" className="pa-button">
            {CONSULTATION_LABEL} <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold hover:bg-gold/10"
          >
            <Phone className="h-4 w-4 text-gold" /> {PHONE}
          </a>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
