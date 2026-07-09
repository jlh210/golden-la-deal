// Shared SEO / JSON-LD helpers.
// Site canonical origin — must match sitemap.xml BASE_URL and __root.tsx.
export const SITE_URL = "https://www.penthouseadvisors.com";
export const ORG_ID = `${SITE_URL}/#organization`;

export type Crumb = { name: string; path: string };

/** BreadcrumbList JSON-LD script entry for a route's head().scripts. */
export function breadcrumbScript(crumbs: Crumb[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    }),
  } as const;
}

/** Service JSON-LD tied to the Penthouse Advisors organization. */
export function serviceScript(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: opts.name,
      description: opts.description,
      url: `${SITE_URL}${opts.path}`,
      serviceType: opts.serviceType ?? opts.name,
      provider: { "@id": ORG_ID },
      areaServed: {
        "@type": "AdministrativeArea",
        name: opts.areaServed ?? "Los Angeles County",
      },
    }),
  } as const;
}
