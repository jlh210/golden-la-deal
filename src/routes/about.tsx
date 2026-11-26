import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";

import { breadcrumbScript } from "@/lib/seo";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Penthouse Advisors Inc. | LA Restaurant Advisory Firm" },
      {
        name: "description",
        content:
          "Penthouse Advisors is a full-service restaurant advisory and brokerage firm in Los Angeles County. Restaurant real estate, licensing, permitting, escrows, and distressed-asset resolution - under one roof.",
      },
      { property: "og:title", content: "About - Penthouse Advisors Inc." },
      {
        property: "og:description",
        content:
          "Sophisticated, full-service restaurant advisory and brokerage firm. Servicing Los Angeles County since 2021.",
      },
      { property: "og:url", content: "https://www.penthouseadvisors.com/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/about" }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  }),

  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About Us" title="Penthouse Advisors Inc" hideHeadingCta>
        <div className="max-w-3xl space-y-5 text-foreground leading-relaxed">
          <p>
            Penthouse Advisors Inc is a California Corporation and Family Business created by Richard
            Stein, Roschard Paticchio-Stein and Rosanna Paticchio, focusing throughout Los Angeles
            County entirely on the Legal, Transactional matters involving Restaurant and Retail Food
            Establishments Health Department Code Compliant pre inspections, submission of all
            required documentation and Blueprints to Health Department Plan-Check for review and
            stamping followed by supervised work preparation for and to any required upgrades and or
            remodeling for authorized site inspections and permit issuance. ABC CA., Alcohol
            Licensing and License Transfer documentation for Restaurants, Markets, and Bars. New,
            Retail Tenant and Landlord negotiations on the monthly Rent, Abatement Allowances,
            Assignments, New Lease. Regulatory Sides of Restaurant Business and Assets,
            Sales/Acquisitions, Retail/Commercial Rent Collections, Tenant Management, Sales and
            Acquisitions. The business entity is located in Santa Monica, CA. Officially filed on
            June 29, 2021 and maintains an active filing status.
          </p>
          <p>
            The corporation is led by a team of key individuals: See Below.
          </p>
        </div>
        <div className="pa-ownership" aria-labelledby="ownership-title">
          <p className="pa-kicker" id="ownership-title">Ownership</p>
          <div className="pa-ownership-card">
            <span className="pa-ownership-mark" aria-hidden="true">
              RP
            </span>
            <div>
              <h3 className="font-display text-[26px] font-medium leading-tight">Roschard Paticchio-Stein</h3>
              <p className="pa-ownership-role">
                CEO · Owner · Business Agent
                <br />
                DRE #02203003
              </p>
              <p>
                As CEO (Chief Executive Officer), Roschard works with Richard COO setting up the company’s vision and strategy, making major decisions that
                affect the organization’s direction, supervises the executive team, ensures that
                the company’s operations align with its goals.
              </p>
            </div>
          </div>
          <div className="pa-ownership-card">
            <span className="pa-ownership-mark" aria-hidden="true">
              RS
            </span>
            <div>
              <h3 className="font-display text-[26px] font-medium leading-tight">Richard Stein</h3>
              <p className="pa-ownership-role">
                Creator · COO · Owner · Business Consultant
              </p>
              <p>
                As COO (Chief Operating Officer), Richard works with Roschard CEO,
                managing the day-to-day operations of the company ensuring that business processes
                run efficiently and effectively, maintaining organizational stability, and driving
                growth through effective management of resources and processes.
              </p>
            </div>
          </div>
        </div>
        <div className="pa-authority-links">
          <Link to="/agents" className="pa-text-link">
            Meet the Advisors
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </PageHero>
    </SiteLayout>
  );
}
