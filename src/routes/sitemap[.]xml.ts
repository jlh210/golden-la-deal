import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { categories } from "@/content/help";
import { allPosts } from "@/content/blog";
import { listings } from "@/lib/listings";

const BASE_URL = "https://www.penthouseadvisors.com";

type Entry = { path: string; changefreq: string; priority: string; lastmod?: string };

// Latest ISO date in a list — used so index pages report when their newest child changed.
const latest = (dates: string[]) => dates.reduce((a, b) => (a > b ? a : b), dates[0]);

export const Route = createFileRoute("/sitemap.xml")({
server: {
handlers: {
GET: async () => {
const posts = allPosts();
const postDate = (p: (typeof posts)[number]) => p.updatedAt ?? p.publishedAt;
const helpDates = categories.flatMap((c) => c.articles.map((a) => a.updatedAt));
const entries: Entry[] = [
{ path: "/", changefreq: "weekly", priority: "1.0" },
{ path: "/about", changefreq: "monthly", priority: "0.8" },
{ path: "/agents", changefreq: "monthly", priority: "0.7" },
{ path: "/services", changefreq: "monthly", priority: "0.9" },
{ path: "/contact", changefreq: "monthly", priority: "0.9" },

// Primary service hubs (sitelink targets)
{ path: "/restaurants-for-sale", changefreq: "weekly", priority: "0.95" },
...listings.map((l) => ({
path: `/restaurants-for-sale/${l.slug}`,
changefreq: "weekly" as const,
priority: "0.8",
})),
{ path: "/buy-a-restaurant", changefreq: "weekly", priority: "0.95" },
{ path: "/sell-your-restaurant", changefreq: "weekly", priority: "0.95" },
{ path: "/restaurant-leasing", changefreq: "monthly", priority: "0.9" },
{ path: "/licensing-and-permits", changefreq: "monthly", priority: "0.9" },
{ path: "/restaurant-consulting", changefreq: "monthly", priority: "0.9" },
{ path: "/commercial-property-management", changefreq: "monthly", priority: "0.9" },

// Deep service pages
{ path: "/leasing-vacant-restaurants", changefreq: "monthly", priority: "0.8" },
{ path: "/alcohol-licensing", changefreq: "monthly", priority: "0.8" },
{ path: "/liquor-license-for-sale", changefreq: "weekly", priority: "0.8" },
{ path: "/health-inspection", changefreq: "monthly", priority: "0.7" },
{ path: "/health-permitting", changefreq: "monthly", priority: "0.7" },
{ path: "/vermin-inspections", changefreq: "monthly", priority: "0.6" },
{ path: "/grandfather-protection", changefreq: "monthly", priority: "0.7" },
{ path: "/assignments-rent-abatement", changefreq: "monthly", priority: "0.7" },
{ path: "/business-investigations", changefreq: "monthly", priority: "0.7" },
{ path: "/buyer-tenant-resolutions", changefreq: "monthly", priority: "0.7" },
{ path: "/search-door-knocking", changefreq: "monthly", priority: "0.7" },
{ path: "/off-market-sourcing", changefreq: "monthly", priority: "0.7" },
{ path: "/e2-visa-europe", changefreq: "monthly", priority: "0.6" },
{ path: "/hardware-store-for-sale", changefreq: "weekly", priority: "0.5" },

// Help Center
{ path: "/help", changefreq: "weekly", priority: "0.8", lastmod: latest(helpDates) },
...categories.map((c) => ({
path: `/help/${c.slug}`,
changefreq: "monthly" as const,
priority: "0.7",
lastmod: c.articles.length ? latest(c.articles.map((a) => a.updatedAt)) : undefined,
})),
...categories.flatMap((c) =>
c.articles.map((a) => ({
path: `/help/${c.slug}/${a.slug}`,
changefreq: "monthly" as const,
priority: "0.6",
lastmod: a.updatedAt,
})),
),

// Blog
{ path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: latest(posts.map(postDate)) },
...posts.map((p) => ({
path: `/blog/${p.slug}`,
changefreq: "monthly" as const,
priority: "0.6",
lastmod: postDate(p),
})),
];
const urls = entries.map(
(e) =>
` <url>\n <loc>${BASE_URL}${e.path}</loc>\n${e.lastmod ? ` <lastmod>${e.lastmod.slice(0, 10)}</lastmod>\n` : ""} <changefreq>${e.changefreq}</changefreq>\n <priority>${e.priority}</priority>\n </url>`,
);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
return new Response(xml, {
headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
});
},
},
},
});
