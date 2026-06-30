
# Penthouse Advisors — SEO, IA & Sitelinks Optimization Plan

Scope: technical SEO, information architecture, schema, redirects, and conversion polish. Visual design (black/white/gold, typography, hero) stays intact.

## 1. Information Architecture & Navigation

Reorganize the header nav to the canonical sitelink-friendly set. New top-level routes will be created (thin, well-optimized pages that consolidate existing content):

```
Home                      /
Services                  /services            (existing — refine)
Restaurant Listings       /restaurants-for-sale  (existing)
Buy a Restaurant          /buy-a-restaurant    (NEW — buyer-focused landing)
Sell Your Restaurant      /sell-your-restaurant (NEW — seller-focused landing)
Restaurant Leasing        /restaurant-leasing  (NEW — wraps leasing-vacant-restaurants)
Licensing & Permits       /licensing-and-permits (NEW — wraps alcohol-licensing + health-permitting)
Restaurant Consulting     /restaurant-consulting (NEW — advisory/E2/investigations hub)
About                     /about               (existing)
Contact                   /contact             (existing)
```

The new routes will internally link out to the existing deep service pages (alcohol-licensing, health-permitting, leasing-vacant-restaurants, off-market-sourcing, etc.). The deep pages stay live and indexable.

Footer keeps the full deep-link map for crawl depth.

## 2. Homepage Metadata Rewrite

- Title: `Los Angeles County's Premier Restaurant Advisory Firm | Penthouse Advisors`
- Meta description: as specified by the user.
- One H1: `Los Angeles County's Premier Restaurant Advisory Firm`
- Add a structured "Our Services" link grid pointing at all 7 canonical service routes above.

## 3. Per-Page SEO (every route)

Every route's `head()` will define: unique `<title>` (<60 chars), `description` (<160), `og:title`, `og:description`, `og:url`, `twitter:card`, and a leaf `<link rel="canonical">`. One H1 per page enforced. Existing pages already have most of this — verify and fix any gaps.

Service pages get a consistent template: Overview → Benefits → Process → FAQ → CTA, with internal links to 2–3 related services and to Contact.

## 4. Structured Data (JSON-LD)

- `__root.tsx`: keep `ProfessionalService` schema; extend with `LocalBusiness` + `Organization` fields (sameAs, logo, openingHours, geo).
- Add `WebSite` schema with `SearchAction` on root.
- Each service page: `Service` schema + `BreadcrumbList`.
- FAQ-containing pages: `FAQPage`.
- Listings detail pages already get product-ish data — add `BreadcrumbList`.

## 5. Technical SEO

- `public/robots.txt`: already points at sitemap — verify clean.
- `sitemap.xml`: add 5 new routes, remove `/residential` (redirected), keep `lastmod`.
- Canonicals on every leaf (already done in prior pass — verify new routes).
- All `<img>` get descriptive alt text (audit).
- `loading="lazy"` on non-hero images.
- ARIA labels on icon-only buttons.

## 6. Redirects (301 / 410)

TanStack route-level redirects via `beforeLoad` throwing `redirect()`:

- `/residential` → 301 → `/` (currently an active page; per spec, deprecate)
- `/assignments-rent-abatement` → 301 → `/restaurant-consulting`
- `/house-condo-servicing` → 301 → `/` (off-brand for restaurant focus)
- `/hello-world`, `/sample-page`, `/?p=*` etc → 410 via a catch-all `/wp-legacy/$` plus an `index` check (TanStack notFoundComponent handles unknown — we'll add explicit 410 routes for the known WP slugs).

Note: WordPress `?p=123` query URLs can't be 410'd cleanly in a SPA; we'll add them to robots.txt `Disallow` and rely on canonicals.

## 7. Conversion Components (reusable)

Add a shared `<ConversionFooterCTA />` block (Book Consultation button + Call Now `tel:` button + short lead form) and include it at the bottom of every service/landing route. Floating "Book Consultation" mobile button already exists — keep it.

Add a lightweight `<TrustBar />` (credentials, est. year, area served) to all new service hubs.

## 8. Files Changed / Created

New routes:
- `src/routes/buy-a-restaurant.tsx`
- `src/routes/sell-your-restaurant.tsx`
- `src/routes/restaurant-leasing.tsx`
- `src/routes/licensing-and-permits.tsx`
- `src/routes/restaurant-consulting.tsx`

New components:
- `src/components/site/ConversionFooterCTA.tsx`
- `src/components/site/ServicePageTemplate.tsx` (Overview/Benefits/Process/FAQ wrapper with JSON-LD)
- `src/components/site/Breadcrumbs.tsx` (+ JSON-LD)

Redirect routes:
- `src/routes/residential.tsx` (replace with `beforeLoad` redirect)
- `src/routes/assignments-rent-abatement.tsx` (replace with redirect)
- `src/routes/house-condo-servicing.tsx` (replace with redirect)
- `src/routes/hello-world.tsx`, `src/routes/sample-page.tsx` (410 stubs)

Edited:
- `src/components/site/Layout.tsx` — new nav structure
- `src/routes/__root.tsx` — expand JSON-LD (LocalBusiness + WebSite)
- `src/routes/index.tsx` — title/description/H1 + service grid links
- `src/routes/sitemap[.]xml.ts` — add new routes, remove redirected ones
- `src/routes/services.tsx` — link to new hubs
- `public/robots.txt` — disallow legacy WP query patterns

## 9. Out of Scope

- Visual redesign (colors/typography unchanged).
- Backend changes (no DB/schema work).
- Real testimonials content — placeholders if needed (will ask user for real ones later).

---

This is a large multi-file change. I'll execute it in batches: nav + new routes first, then schema + metadata, then redirects + sitemap last.
