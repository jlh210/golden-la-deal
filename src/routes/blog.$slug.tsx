import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { BlogPostTemplate } from "@/components/blog/BlogPostTemplate";
import { getPost } from "@/content/blog";
import {
  articleScript,
  breadcrumbScript,
  faqScript,
  SITE_URL,
} from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    const path = `/blog/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [
          { title: "Post not found | Penthouse Advisors Blog" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const post = loaderData;
    return {
      meta: [
        { title: post.seoTitle },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:title", content: post.seoTitle },
        { property: "og:description", content: post.description },
        { property: "og:url", content: `${SITE_URL}${path}` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
      scripts: [
        breadcrumbScript([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path },
        ]),
        articleScript({
          headline: post.title,
          description: post.description,
          path,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
        }),
        ...(post.faqs.length ? [faqScript(post.faqs)] : []),
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: BlogPostNotFound,
});

function BlogPostNotFound() {
  return (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-display font-bold">Post not found</h1>
        <p className="mt-3 text-muted-foreground">
          That post doesn't exist. Return to the{" "}
          <Link to="/blog" className="text-gold underline">
            Blog
          </Link>
          .
        </p>
      </div>
    </SiteLayout>
  );
}

function BlogPostPage() {
  const post = Route.useLoaderData();
  return (
    <SiteLayout>
      <BlogPostTemplate post={post} />
    </SiteLayout>
  );
}
