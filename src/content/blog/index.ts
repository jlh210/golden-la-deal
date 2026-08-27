import type { BlogPost } from "./types";
import { post as valuation } from "./posts/restaurant-valuation-los-angeles-2026";
import { post as liquorLicense } from "./posts/type-41-vs-type-47-liquor-license-california";
import { post as neighborhoods } from "./posts/best-la-neighborhoods-open-restaurant-2026";
import { post as dueDiligence } from "./posts/restaurant-buyer-due-diligence-checklist";
import { post as secondGen } from "./posts/second-generation-restaurant-space-explained";

/** All blog posts, newest first. Add new posts here as they're written. */
export const posts: BlogPost[] = [
  valuation,
  liquorLicense,
  neighborhoods,
  dueDiligence,
  secondGen,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Flat list for sitemap generation and related-post lookups. */
export function allPosts(): BlogPost[] {
  return posts;
}
