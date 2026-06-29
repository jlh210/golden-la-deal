import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.penthouseadvisors.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/agents", changefreq: "monthly", priority: "0.7" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
          { path: "/restaurants-for-sale", changefreq: "weekly", priority: "0.9" },
          { path: "/leasing-vacant-restaurants", changefreq: "monthly", priority: "0.8" },
          { path: "/alcohol-licensing", changefreq: "monthly", priority: "0.8" },
          { path: "/liquor-license-for-sale", changefreq: "weekly", priority: "0.8" },
          { path: "/health-inspection", changefreq: "monthly", priority: "0.7" },
          { path: "/health-permitting", changefreq: "monthly", priority: "0.7" },
          { path: "/vermin-inspections", changefreq: "monthly", priority: "0.6" },
          { path: "/grandfather-protection", changefreq: "monthly", priority: "0.6" },
          { path: "/assignments-rent-abatement", changefreq: "monthly", priority: "0.7" },
          { path: "/business-investigations", changefreq: "monthly", priority: "0.7" },
          { path: "/buyer-tenant-resolutions", changefreq: "monthly", priority: "0.7" },
          { path: "/off-market-sourcing", changefreq: "monthly", priority: "0.7" },
          { path: "/search-door-knocking", changefreq: "monthly", priority: "0.6" },
          { path: "/e2-visa-europe", changefreq: "monthly", priority: "0.6" },
          { path: "/hardware-store-for-sale", changefreq: "weekly", priority: "0.6" },
          { path: "/house-condo-servicing", changefreq: "monthly", priority: "0.5" },
          { path: "/residential", changefreq: "monthly", priority: "0.5" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
