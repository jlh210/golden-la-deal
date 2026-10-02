import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/help/Breadcrumbs";
import { getCategory, categories } from "@/content/help";
import { breadcrumbScript, collectionScript, SITE_URL } from "@/lib/seo";
export const Route = createFileRoute("/help/$category/")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    const category = loaderData?.category;
    const path = `/help/${params.category}`;
    if (!category)
      return {
        meta: [
          { title: "Category not found | Penthouse Advisors" },
          { name: "robots", content: "noindex" },
        ],
      };
    const populated = category.articles.length > 0;
    const description = populated
      ? category.description
      : `No standalone ${category.title.toLowerCase()} guide is currently available. Explore the existing restaurant transaction guides in the Help Center.`;
    return {
      meta: [
        { title: category.seoTitle },
        { name: "description", content: description },
        { name: "robots", content: populated ? "index, follow" : "noindex, follow" },
        { property: "og:title", content: category.seoTitle },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}${path}` },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
      scripts: [
        breadcrumbScript([
          { name: "Home", path: "/" },
          { name: "Help Center", path: "/help" },
          { name: category.title, path },
        ]),
        collectionScript({ name: category.title, description, path }),
      ],
    };
  },
  component: CategoryPage,
});
function CategoryPage() {
  const { category } = Route.useLoaderData();
  return (
    <SiteLayout>
      <div className="pa-shell pa-knowledge">
        <Breadcrumbs crumbs={[{ label: "Help Center", to: "/help" }, { label: category.title }]} />
        <header className="pa-knowledge-header">
          <p className="pa-kicker">Transaction guides</p>
          <h1>{category.title}</h1>
          <p>
            {category.articles.length
              ? category.intro
              : "There is no standalone guide in this collection yet. The existing resources below can help you continue your research."}
          </p>
        </header>
        {category.articles.length > 0 && (
          <section className="pa-insight-list" aria-label="Guides in this collection">
            {category.articles.map((a) => (
              <article key={a.slug}>
                <h2>
                  <Link
                    to="/help/$category/$slug"
                    params={{ category: category.slug, slug: a.slug }}
                  >
                    {a.title}
                  </Link>
                </h2>
                <p>{a.answer ?? a.description}</p>
                <span>{a.readMinutes} min read</span>
              </article>
            ))}
          </section>
        )}
        <nav className="pa-category-nav" aria-label="Available guide collections">
          <h2>Explore available guides.</h2>
          <ul>
            {categories
              .filter((c) => c.articles.length && c.slug !== category.slug)
              .map((c) => (
                <li key={c.slug}>
                  <Link to="/help/$category" params={{ category: c.slug }}>
                    {c.title}
                  </Link>
                </li>
              ))}
          </ul>
          <Link to="/help" className="pa-text-link">
            Browse the complete Knowledge Center ↗
          </Link>
        </nav>
      </div>
    </SiteLayout>
  );
}
