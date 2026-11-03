import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { blogPages } from "@/content/blog";
import { collectionScript, breadcrumbScript, SITE_URL } from "@/lib/seo";
import { HeadingCTA } from "@/components/site/HeadingCTA";
export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Restaurant Transaction Insights | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Restaurant valuation, license comparisons, premises evaluation and Los Angeles location decisions. Practical explainers from Penthouse Advisors.",
      },
      { property: "og:title", content: "Restaurant Transaction Insights" },
      {
        property: "og:description",
        content: "Comparisons and decision guides for Los Angeles restaurant transactions.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      collectionScript({
        name: "Restaurant Transaction Insights",
        description: "Comparisons and decision guides for restaurant transactions.",
        path: "/blog",
      }),
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Insights", path: "/blog" },
      ]),
    ],
  }),
  component: BlogArchive,
});
function BlogArchive() {
  return (
    <SiteLayout>
      <div className="pa-shell pa-knowledge">
        <header className="pa-knowledge-header">
          <p className="pa-kicker">Penthouse Advisors · Insights</p>
          <h1>
            Better questions.
            <br />
            More informed decisions.
          </h1>
          <HeadingCTA />
          <p>
            Comparisons, explainers, and location decisions for restaurant buyers, sellers, and
            operators in Los Angeles County.
          </p>
          <Link to="/help" className="pa-text-link">
            For transaction steps and checklists, visit the Help Center ↗
          </Link>
        </header>
        <section aria-label="Restaurant insights" className="pa-insight-list">
          {blogPages.map((page) => (
            <article key={page.slug}>
              <p className="pa-kicker">{page.categoryLabel}</p>
              <h2>
                <Link to={page.path}>{page.title}</Link>
              </h2>
              <HeadingCTA />
              <p>{page.answer}</p>
              <Link to={page.path} className="pa-text-link">
                Explore {page.categoryLabel.toLowerCase()} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </SiteLayout>
  );
}
