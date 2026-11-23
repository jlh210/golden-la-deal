import { createFileRoute } from "@tanstack/react-router";
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
        <div className="max-w-3xl space-y-5 text-muted-foreground leading-relaxed">
          <p>
            Penthouse Advisors Inc, a General Corporation, is a business entity located in Santa
            Monica, CA. Officially filed on June 29, 2021, this corporation is recognized under the
            document number 4759388. Governed by the California Secretary of State, the corporation
            maintains an active filing status.
          </p>
          <p>
            The corporation is led by a team of key individuals: Richard Stein from Santa Monica CA,
            holding the position of COO Director; Roschard Paticchio Stein from Santa Monica CA,
            serving as the Chief Financial Officer; Rosanna Paticchio from Santa Monica CA, serving
            as the Broker of Record; and Roschard Paticchio-Stein from Santa Monica CA, serving as
            the Chief Executive Officer.
          </p>
        </div>
      </PageHero>
    </SiteLayout>
  );
}
