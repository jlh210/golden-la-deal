import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CTASection } from "@/components/site/CTASection";
import { blogPages, blogHead } from "@/content/blog";
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const page = blogPages.find((page) => page.slug === params.slug && page.hasCTA);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => (loaderData ? blogHead(loaderData) : {}),
  component: BlogPost,
});
function BlogPost() {
  const page = Route.useLoaderData();
  return (
    <SiteLayout>
      <div className="pa-preserved-blog" dangerouslySetInnerHTML={{ __html: page.html }} />
      <CTASection
        title="Thinking about buying, selling, or leasing?"
        body="Speak directly with a Penthouse Advisors specialist about your situation."
      />
    </SiteLayout>
  );
}
