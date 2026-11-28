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
            Stein, Roschard Paticchio-Stein and Rosanna Paticchio, focusing entirely throughout Los
            Angeles County. The business entity is located in Santa Monica, CA., Officially filed on
            June 29, 2021 and maintains an active filing status.
          </p>
          <div className="space-y-6 pt-8">
            <h2 className="font-display text-[26px] font-bold italic leading-tight">
              Brief What We Do:
            </h2>
            <p className="italic">
              Penthouse Advisors INC., focuses on Legal, Transactional matters involving the
              regulatory sides of Restaurant and Retail Food Establishments throughout Los Angeles
              County as follows:
            </p>
            <ul className="space-y-5 border-l-2 border-primary/40 pl-5">
              <li>
                <h3 className="font-display text-lg font-semibold italic leading-snug">
                  Restaurant Brokerage &amp; Off-Market Search
                </h3>
                <p>
                  Buy and Sell Restaurants under exclusive listing agreements. Search by door
                  knocking Off Market Restaurants and Food Establishments for sale.
                </p>
              </li>
              <li>
                <h3 className="font-display text-lg font-semibold italic leading-snug">
                  Health Department Compliance &amp; Permitting
                </h3>
                <p>
                  Perform Health Department code compliant Restaurant pre-inspections resolving any
                  and all Permitting issues, which involves the preparation of all required
                  documentation, including Drafting Hand Drawn Blueprints i.e., Floor Plan
                  “existing and proposed” with equipment schedules and scope of work for Health
                  Dept. Plan-Check review and permit issuance.
                </p>
              </li>
              <li>
                <h3 className="font-display text-lg font-semibold italic leading-snug">
                  Business &amp; Asset Valuations
                </h3>
                <p>
                  When selling a Restaurant Business, we perform valuations based off the Gross
                  Monthly Net Returns, condition of the attached and non-attached equipment,
                  Health Department Permit pre-inspections for non-compliance, Menu, Cooks and
                  Servers dress and attitudes, shifts, location and parking.
                </p>
                <p className="pt-2">
                  Restaurant Asset sale valuations are based off the condition of the attached
                  equipment and Non Attached Furniture, Fixtures, Equipment (FF&amp;E), Health
                  Department Permit compliance, location and parking. The existing Buildout and
                  decorations are exempt from the valuation.
                </p>
              </li>
              <li>
                <h3 className="font-display text-lg font-semibold italic leading-snug">
                  Buyer Protection - Second Generation Restaurants
                </h3>
                <p>
                  We protect Buyers when retained to look into Second Generation Restaurants,
                  equipped and vacant, when Landlords or Property Management are charging “Key
                  Money” illegally for such equipment as a condition to lease signing.
                </p>
              </li>
              <li>
                <h3 className="font-display text-lg font-semibold italic leading-snug">
                  Retail Lease &amp; Assignment Negotiations
                </h3>
                <p>
                  We are strong negotiators with Retail Leases and Assignments: the monthly Rent,
                  terms and conditions, Options, Annual increases, and Rent Abatement allowances.
                </p>
              </li>
              <li>
                <h3 className="font-display text-lg font-semibold italic leading-snug">
                  Restaurant Business Advisors
                </h3>
                <p>Giving fast, workable solutions.</p>
              </li>
            </ul>
            <p className="text-sm italic text-muted-foreground">We don’t give legal advice.</p>
          </div>
          <div className="space-y-4 pt-6">
            <h2 className="font-display text-[26px] font-bold italic leading-tight">
              Example of Purchasing a Restaurant without Seller Disclosures of Code Violations:
            </h2>
            <ul className="list-disc space-y-2 pl-6 marker:text-primary">
              <li>Installing of new gas equipment under the Hood without Building &amp; Safety sign off</li>
              <li>Cooking with non-permitted Countertop Ventless Hoods</li>
              <li>Added Sink and plumbing connections not to code</li>
              <li>Red tag equipment (tags removed)</li>
              <li>Expired permits</li>
              <li>Unpermitted construction</li>
              <li>
                Non-existent or expired Conditional Use Beverage Permit (CUB) while serving alcohol
              </li>
              <li>Conditions that block your concept</li>
              <li>Grandfather-protection traps</li>
              <li>Equipment that’s leased, not owned</li>
            </ul>
          </div>
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
