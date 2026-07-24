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

/** Article JSON-LD for help-center content. */
export function articleScript(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: opts.headline,
      description: opts.description,
      mainEntityOfPage: `${SITE_URL}${opts.path}`,
      url: `${SITE_URL}${opts.path}`,
      datePublished: opts.datePublished,
      dateModified: opts.dateModified ?? opts.datePublished,
      author: {
        "@type": "Person",
        name: opts.authorName ?? "Richard Stein",
        jobTitle: "COO, Penthouse Advisors",
        worksFor: { "@id": ORG_ID },
      },
      publisher: { "@id": ORG_ID },
      ...(opts.image ? { image: opts.image } : {}),
    }),
  } as const;
}

/** FAQPage JSON-LD from a Q/A list. */
export function faqScript(faqs: { q: string; a: string }[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }),
  } as const;
}

/** CollectionPage JSON-LD for a help category index. */
export function collectionScript(opts: { name: string; description: string; path: string }) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: opts.name,
      description: opts.description,
      url: `${SITE_URL}${opts.path}`,
      isPartOf: { "@id": ORG_ID },
    }),
  } as const;
}
