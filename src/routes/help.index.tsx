import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { HelpSearch } from "@/components/help/HelpSearch";
import { categories } from "@/content/help";
import { knowledgeClusters } from "@/content/knowledge-clusters";
import { breadcrumbScript, collectionScript, SITE_URL } from "@/lib/seo";
export const Route = createFileRoute("/help/")({
  head: () => ({
    meta: [
      { title: "Restaurant Transaction Knowledge Center | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Evergreen restaurant buying, selling, lease assignment, ABC transfer and due diligence guides, with related insights for Los Angeles transactions.",
      },
      {
        property: "og:title",
        content: "Penthouse Advisors Restaurant Transaction Knowledge Center",
      },
      {
        property: "og:description",
        content: "Practical guides and checklists for restaurant transactions.",
      },
      { property: "og:url", content: `${SITE_URL}/help` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/help` }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Help Center", path: "/help" },
      ]),
      collectionScript({
        name: "Restaurant Transaction Knowledge Center",
        description: "Evergreen guides and checklists for restaurant transactions.",
        path: "/help",
      }),
    ],
  }),
  component: HelpHubPage,
});
function HelpHubPage() {
  return (
    <SiteLayout>
      <div className="pa-shell pa-knowledge">
        <header className="pa-knowledge-header">
          <p className="pa-kicker">Penthouse Advisors · Help Center</p>
          <h1>
            Restaurant Transaction
            <br />
            Knowledge Center.
          </h1>
          <p>
            Understand the steps, documents, and decisions behind a restaurant purchase, sale, or
            lease. Start with an evergreen guide, then explore the comparisons and explainers in
            Insights.
          </p>
          <Link to="/blog" className="pa-text-link">
            Explore restaurant transaction insights ↗
          </Link>
          <div className="pa-knowledge-search">
            <HelpSearch />
          </div>
        </header>
        <section className="pa-knowledge-grid" aria-label="Knowledge areas">
          {knowledgeClusters.map((cluster) => (
            <section key={cluster.title}>
              <h2>{cluster.title}</h2>
              <p>{cluster.description}</p>
              <ul>
                {cluster.guides.map((g) => (
                  <li key={g.to}>
                    <Link to={g.to}>{g.title}</Link>
                  </li>
                ))}
              </ul>
              <Link to={cluster.parent} className="pa-text-link">
                {cluster.parentLabel} <span aria-hidden="true">↗</span>
              </Link>
            </section>
          ))}
        </section>
        <nav className="pa-category-nav" aria-label="Populated guide collections">
          <h2>Browse guide collections.</h2>
          <ul>
            {categories
              .filter((c) => c.articles.length)
              .map((c) => (
                <li key={c.slug}>
                  <Link to="/help/$category" params={{ category: c.slug }}>
                    {c.title} · {c.articles.length} {c.articles.length === 1 ? "guide" : "guides"}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </SiteLayout>
  );
}
