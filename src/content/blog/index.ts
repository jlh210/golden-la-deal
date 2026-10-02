import metadata from "./metadata.json";
import html0 from "./best-la-neighborhoods-open-restaurant-2026.html?raw";
import html1 from "./blog.html?raw";
import html2 from "./restaurant-buyer-due-diligence-checklist.html?raw";
import html3 from "./restaurant-valuation-los-angeles-2026.html?raw";
import html4 from "./second-generation-restaurant-space-explained.html?raw";
import html5 from "./type-41-vs-type-47-liquor-license-california.html?raw";
const html = [html0, html1, html2, html3, html4, html5];
export const blogPages = metadata.map((page, i) => ({ ...page, html: html[i] }));
export function blogHead(page: (typeof blogPages)[number]) {
  return {
    meta: [{ title: page.title }, ...page.meta],
    links: [{ rel: "canonical", href: page.canonical }],
    scripts: page.schemas.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}
