import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { ArticleTemplate } from "@/components/help/ArticleTemplate";
import { blogPages, blogHead } from "@/content/blog";
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const page = blogPages.find((page) => page.slug === params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) =>
    loaderData
      ? blogHead(loaderData)
      : {
          meta: [
            { title: "Article not found | Penthouse Advisors" },
            { name: "robots", content: "noindex" },
          ],
        },
  component: BlogPost,
});
function BlogPost() {
  const page = Route.useLoaderData();
  return (
    <SiteLayout>
      <ArticleTemplate article={page} blogCategory={page.categoryLabel} />
    </SiteLayout>
  );
}
