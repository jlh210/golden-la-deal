// Shared SEO / JSON-LD helpers.
// Site canonical origin — must match sitemap.xml BASE_URL and __root.tsx.
export const SITE_URL = "https://www.penthouseadvisors.com";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Canonical origin and path; query parameters do not define indexable pages. */
export function canonicalUrl(path: string) {
  const url = new URL(path, `${SITE_URL}/`);
  if (url.origin !== SITE_URL) throw new Error("Canonical URL must belong to this site");
  const pathname = url.pathname.replace(/\/+$/, "");
  return `${SITE_URL}${pathname}`;
}

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
        item: canonicalUrl(c.path),
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
      url: canonicalUrl(opts.path),
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
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  image?: string;
}) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: opts.headline,
      description: opts.description,
      mainEntityOfPage: canonicalUrl(opts.path),
      url: canonicalUrl(opts.path),
      ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
      ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
      ...(opts.authorName
        ? {
            author: {
              "@type": "Person",
              name: opts.authorName,
              ...(opts.authorUrl ? { url: opts.authorUrl } : {}),
              worksFor: { "@id": ORG_ID },
            },
          }
        : {}),
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
      url: canonicalUrl(opts.path),
      isPartOf: { "@id": WEBSITE_ID },
    }),
  } as const;
}

/** Shared service graph: one provider identity and one visible FAQ source. */
export function buildServiceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  breadcrumbs: { name: string; url: string }[];
  faqs: { q: string; a: string }[];
}) {
  return [
    serviceScript({ ...opts, path: opts.url }),
    breadcrumbScript(opts.breadcrumbs.map((b) => ({ name: b.name, path: b.url }))),
    ...(opts.faqs.length ? [faqScript(opts.faqs)] : []),
  ];
}
