import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ArticleTemplate } from "@/components/help/ArticleTemplate";
import { getArticle } from "@/content/help";
import {
  articleScript,
  breadcrumbScript,
  faqScript,
  SITE_URL,
} from "@/lib/seo";

export const Route = createFileRoute("/help/$category/$slug")({
  loader: ({ params }) => {
    const found = getArticle(params.category, params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData, params }) => {
    const path = `/help/${params.category}/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found | Penthouse Advisors Help" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { article, category } = loaderData;
    return {
      meta: [
        { title: article.seoTitle },
        { name: "description", content: article.description },
        { name: "keywords", content: article.keywords.join(", ") },
        { property: "og:title", content: article.seoTitle },
        { property: "og:description", content: article.description },
        { property: "og:url", content: `${SITE_URL}${path}` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
      scripts: [
        breadcrumbScript([
          { name: "Home", path: "/" },
          { name: "Help Center", path: "/help" },
          { name: category.title, path: `/help/${category.slug}` },
          { name: article.title, path },
        ]),
        articleScript({
          headline: article.title,
          description: article.description,
          path,
          datePublished: article.updatedAt,
        }),
        ...(article.faqs.length ? [faqScript(article.faqs)] : []),
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticleNotFound() {
  return (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-display font-bold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">
          That article doesn't exist. Return to the{" "}
          <Link to="/help" className="text-gold underline">
            Help Center
          </Link>
          .
        </p>
      </div>
    </SiteLayout>
  );
}

function ArticlePage() {
  const { article, category } = Route.useLoaderData();
  return (
    <SiteLayout>
      <ArticleTemplate article={article} category={category} />
    </SiteLayout>
  );
}
