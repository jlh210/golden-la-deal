import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { BlogCard } from "@/components/blog/BlogCard";
import { allPosts } from "@/content/blog";
import { breadcrumbScript, collectionScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — LA Restaurant Brokerage Insights | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Guides, market insight, and licensing explainers for buying, selling, and leasing restaurants in Los Angeles County, from the team at Penthouse Advisors.",
      },
      { property: "og:title", content: "Penthouse Advisors Blog" },
      {
        property: "og:description",
        content:
          "Guides, market insight, and licensing explainers for buying, selling, and leasing restaurants in Los Angeles.",
      },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
      collectionScript({
        name: "Penthouse Advisors Blog",
        description:
          "Guides, market insight, and licensing explainers for buying, selling, and leasing restaurants in Los Angeles County.",
        path: "/blog",
      }),
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const posts = allPosts();

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-b from-black to-charcoal-deep text-white">
        <div className="container-x py-16 md:py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Blog</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold">
            Restaurant brokerage, <span className="text-gold">explained.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/75">
            Valuation, licensing, and market insight for anyone buying, selling, or leasing a
            restaurant in Los Angeles County — written by the team that does these deals.
          </p>
        </div>
      </section>

      <section className="container-x py-14 md:py-20">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Latest</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">
              Recent posts.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {posts.length} post{posts.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
