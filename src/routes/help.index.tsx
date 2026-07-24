import { createFileRoute, Link } from "@tanstack/react-router";
import * as Lucide from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { HelpSearch } from "@/components/help/HelpSearch";
import { categories, allArticles } from "@/content/help";
import { breadcrumbScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Restaurant Advisory Guides | Penthouse Advisors" },
      {
        name: "description",
        content:
          "The Penthouse Advisors help center: guides and FAQs on buying, selling, leasing, licensing, and consulting for Los Angeles restaurants.",
      },
      { property: "og:title", content: "Penthouse Advisors Help Center" },
      {
        property: "og:description",
        content:
          "Guides and FAQs on buying, selling, leasing, and licensing Los Angeles restaurants.",
      },
      { property: "og:url", content: `${SITE_URL}/help` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/help` }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Help Center", path: "/help" },
      ]),
    ],
  }),
  component: HelpHubPage,
});

function getIcon(name: string): Lucide.LucideIcon {
  const Icon = (Lucide as unknown as Record<string, Lucide.LucideIcon>)[name];
  return Icon ?? Lucide.BookOpen;
}

function HelpHubPage() {
  const popular = allArticles().slice(0, 6);

  return (
    <SiteLayout>
      {/* Search hero */}
      <section className="border-b border-border bg-gradient-to-b from-black to-charcoal-deep text-white">
        <div className="container-x py-16 md:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Help Center</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold">
            How can we <span className="text-gold">help you?</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/75">
            Guides, checklists, and FAQs for buying, selling, leasing, licensing,
            and running restaurants in Los Angeles County.
          </p>
          <div className="mt-8">
            <HelpSearch />
          </div>
        </div>
      </section>

      {/* Category tiles */}
      <section className="container-x py-14 md:py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Browse topics</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">
              Choose a category.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {allArticles().length} article{allArticles().length === 1 ? "" : "s"} · {categories.length} categories
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const Icon = getIcon(c.iconName);
            return (
              <Link
                key={c.slug}
                to="/help/$category"
                params={{ category: c.slug }}
                className="group rounded-xl border border-border bg-card p-6 hover:border-gold/60 hover:bg-gold/[0.03] transition shadow-elegant flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-md border border-gold/30 bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {c.articles.length} article{c.articles.length === 1 ? "" : "s"}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-display font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                  Explore <Lucide.ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular articles */}
      {popular.length > 0 && (
        <section className="container-x pb-16 md:pb-24 border-t border-border pt-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Popular guides</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">
            Where most people start.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popular.map(({ article, category }) => (
              <Link
                key={`${category.slug}/${article.slug}`}
                to="/help/$category/$slug"
                params={{ category: category.slug, slug: article.slug }}
                className="group rounded-xl border border-border bg-card p-6 hover:border-gold/60 transition flex flex-col"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold/80">
                  {category.title}
                </p>
                <h3 className="mt-2 text-base font-display font-bold flex-1">{article.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                  Read guide <Lucide.ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
