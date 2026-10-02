import articles from "./articles.json";
import type { Article } from "@/content/help/types";
import { articleScript, breadcrumbScript, faqScript, SITE_URL } from "@/lib/seo";
export const blogPages = (articles as (Article & { categoryLabel: string })[]).map((article) => ({
  ...article,
  path: `/blog/${article.slug}`,
}));
export function blogHead(page: (typeof blogPages)[number]) {
  const url = `${SITE_URL}${page.path}`;
  return {
    meta: [
      { title: page.seoTitle },
      { name: "description", content: page.description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: page.seoTitle },
      { property: "og:description", content: page.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Insights", path: "/blog" },
        { name: page.title, path: page.path },
      ]),
      articleScript({
        headline: page.title,
        description: page.description,
        path: page.path,
        datePublished: page.publishedAt,
        dateModified: page.updatedAt,
        authorName: page.originalAuthor?.name,
        authorUrl: page.originalAuthor ? `${SITE_URL}${page.originalAuthor.to}` : undefined,
      }),
      ...(page.faqs.length ? [faqScript(page.faqs)] : []),
    ],
  };
}
