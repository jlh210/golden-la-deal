import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import * as Lucide from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Breadcrumbs } from "@/components/help/Breadcrumbs";
import { CTASection } from "@/components/site/CTASection";
import { getCategory, categories } from "@/content/help";
import type { Article } from "@/content/help/types";
import {
  breadcrumbScript,
  collectionScript,
  SITE_URL,
} from "@/lib/seo";

export const Route = createFileRoute("/help/$category/")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    const category = loaderData?.category;
    const path = `/help/${params.category}`;
    if (!category) {
      return {
        meta: [
          { title: "Category not found | Penthouse Advisors Help" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return {
      meta: [
        { title: category.seoTitle },
        { name: "description", content: category.description },
        { property: "og:title", content: category.seoTitle },
        { property: "og:description", content: category.description },
        { property: "og:url", content: `${SITE_URL}${path}` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
      scripts: [
        breadcrumbScript([
          { name: "Home", path: "/" },
          { name: "Help Center", path: "/help" },
          { name: category.title, path },
        ]),
        collectionScript({
          name: category.title,
          description: category.description,
          path,
        }),
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: CategoryNotFound,
});

function CategoryNotFound() {
  return (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-display font-bold">Category not found</h1>
        <p className="mt-3 text-muted-foreground">
          That help topic doesn't exist. Try the{" "}
          <Link to="/help" className="text-gold underline">
            Help Center home
          </Link>
          .
        </p>
      </div>
    </SiteLayout>
  );
}

function getIcon(name: string): Lucide.LucideIcon {
  const Icon = (Lucide as unknown as Record<string, Lucide.LucideIcon>)[name];
  return Icon ?? Lucide.BookOpen;
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const Icon = getIcon(category.iconName);
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <SiteLayout>
      <div className="container-x py-10 md:py-14">
        <Breadcrumbs
          crumbs={[
            { label: "Help Center", to: "/help" },
            { label: category.title },
          ]}
        />

        <header className="mt-6 flex items-start gap-5 max-w-3xl">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md border border-gold/30 bg-gold/10 text-gold">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">{category.title}</h1>
            <p className="mt-3 text-base md:text-lg text-muted-foreground leading-relaxed">
              {category.intro}
            </p>
          </div>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
          {/* Articles */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Articles in this topic
            </p>
            {category.articles.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Guides on this topic are being published. In the meantime, our team is
                  the fastest way to get answers.
                </p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-2.5 text-sm font-bold text-charcoal-deep shadow-gold"
                >
                  Book a Consultation
                </Link>
              </div>
            ) : (
              <div className="mt-4 grid gap-3">
                {category.articles.map((a: Article) => (
                  <Link
                    key={a.slug}
                    to="/help/$category/$slug"
                    params={{ category: category.slug, slug: a.slug }}
                    className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 hover:border-gold/60 transition"
                  >
                    <div className="min-w-0">
                      <h2 className="text-base font-display font-bold">{a.title}</h2>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                        {a.description}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {a.readMinutes} min read
                      </p>
                    </div>
                    <Lucide.ArrowRight className="h-4 w-4 shrink-0 mt-1 text-gold transition group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Other topics
            </p>
            <ul className="mt-3 space-y-1 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to="/help/$category"
                    params={{ category: o.slug }}
                    className="block rounded-md px-3 py-2 text-muted-foreground hover:bg-gold/5 hover:text-foreground transition"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <CTASection
        title="Need an answer that isn't in a guide?"
        body="Book a consultation with the Penthouse Advisors team."
      />
    </SiteLayout>
  );
}
