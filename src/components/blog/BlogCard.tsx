import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/content/blog/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const published = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col rounded-xl border border-border bg-card p-6 hover:border-gold/60 hover:bg-gold/[0.03] transition shadow-elegant"
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gold/80">
        {post.category}
      </p>
      <h3 className="mt-3 text-lg font-display font-bold flex-1">{post.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.description}</p>
      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gold" /> {post.readMinutes} min read
        </span>
        <span>{published}</span>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
        Read post <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
