import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { breadcrumbScript } from "@/lib/seo";

const title = "Liquor License For Sale - Type 47 Hard Liquor | Penthouse Advisors";
const description =
  "Type 47 Hard Liquor license for sale inquiries in Los Angeles. Discuss availability, your proposed location and transfer questions with Penthouse Advisors.";

export const Route = createFileRoute("/liquor-license-for-sale")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://www.penthouseadvisors.com/liquor-license-for-sale" },
    ],
    links: [
      { rel: "canonical", href: "https://www.penthouseadvisors.com/liquor-license-for-sale" },
    ],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Liquor License For Sale", path: "/liquor-license-for-sale" },
      ]),
    ],
  }),
  component: LiquorLicenseForSale,
});

function LiquorLicenseForSale() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Liquor License For Sale"
        title="Type 47 Hard Liquor"
        accent="License For Sale"
        subtitle="Discuss your proposed restaurant location, license needs and purchase questions with Penthouse Advisors. Confirm current availability and terms before relying on a quoted opportunity."
      />
      <section className="container-x py-12 md:py-16">
        <div className="rounded-2xl border border-gold/40 bg-card p-7 md:p-10">
          <h2 className="text-2xl font-display font-bold">Confirm current license availability</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            We are not displaying a verified license-for-sale offer on this page at present. Contact
            us with your proposed address or area, restaurant concept and target timing to discuss
            your search and the information needed to evaluate an opportunity.
          </p>
          <Link
            to="/contact"
            search={{ service: "Type 47 liquor license inquiry" }}
            className="mt-5 inline-flex rounded-md bg-gold-gradient px-5 py-3 text-sm font-bold text-charcoal-deep"
          >
            Ask about Type 47 license availability
          </Link>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-display font-bold">What is a Type 47 liquor license?</h2>
            <p className="mt-3 text-muted-foreground">
              California ABC classifies Type 47 as On-Sale General — Eating Place. It is a
              restaurant license permitting beer, wine and distilled spirits for consumption on the
              licensed premises. The business must operate as a bona fide eating place.
            </p>
            <a
              href="https://www.abc.ca.gov/licensing/license-types/"
              className="mt-4 inline-block underline"
            >
              Read California ABC’s official license-type descriptions
            </a>
          </section>
          <section>
            <h2 className="text-2xl font-display font-bold">
              How do I check a license before buying?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start with the exact license number. Review its current status and record in ABC’s
              official lookup, and ask about the proposed premises, conditions, transfer process and
              itemized costs. A purchase inquiry does not establish transfer approval.
            </p>
            <a
              href="https://www.abc.ca.gov/licensing/license-lookup/"
              className="mt-4 inline-block underline"
            >
              Check the official ABC license record
            </a>
          </section>
          <section>
            <h2 className="text-2xl font-display font-bold">What does a Type 47 license cost?</h2>
            <p className="mt-3 text-muted-foreground">
              Request a current written quote for the specific opportunity. Ask what the quoted
              amount includes, which fees are separate and what conditions apply. No current license
              purchase price is confirmed on this page.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-display font-bold">
              Planning a restaurant purchase or transfer?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Connect your license questions with the restaurant and location you are considering.
              These resources explain the topics to discuss with your advisor.
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/alcohol-licensing" className="underline">
                  Restaurant ABC licensing services
                </Link>
              </li>
              <li>
                <Link
                  to="/help/$category/$slug"
                  params={{ category: "alcohol-licensing", slug: "abc-license-transfer-guide" }}
                  className="underline"
                >
                  ABC license transfer guide
                </Link>
              </li>
              <li>
                <Link to="/restaurants-for-sale" className="underline">
                  Restaurants and businesses for sale
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </section>
      <CTASection
        serviceNeeded="Type 47 liquor license inquiry"
        title="Discuss your restaurant’s license needs."
        body="Share your proposed location, concept and timing so we can identify the questions to review."
      />
    </SiteLayout>
  );
}
