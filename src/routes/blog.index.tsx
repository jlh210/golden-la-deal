import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { blogPages, blogHead } from "@/content/blog";
const archive = blogPages.find((page) => page.slug === "blog")!;
export const Route = createFileRoute("/blog/")({
  head: () => blogHead(archive),
  component: () => (
    <SiteLayout>
      <div className="pa-preserved-blog" dangerouslySetInnerHTML={{ __html: archive.html }} />
    </SiteLayout>
  ),
});
