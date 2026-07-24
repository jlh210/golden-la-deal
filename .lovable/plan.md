
# Penthouse Advisors — Help-Center-Style SEO Hub

Reference: squareup.com/help/us/en. That's a **help center** pattern: a search bar hero, category tiles, per-category article indexes, and clean article pages with breadcrumbs + related links. We'll adapt that pattern for SEO/AI-search authority.

Design language (black/white/gold, existing components) stays unchanged — we're mapping Square's IA onto our brand.

## 1. Information architecture (Square-style)

```
/help                                     Hub — search bar + category tiles
/help/<category>                          Category index — article list
/help/<category>/<article-slug>           Article — long-form SEO content
```

Categories mirror our services (one per service they provide, as requested):

- buying-a-restaurant
- selling-a-restaurant
- restaurant-leasing
- alcohol-licensing
- health-permitting
- grandfather-protection
- lease-assignments
- business-investigations
- buyer-tenant-resolutions
- off-market-sourcing
- e2-visa
- commercial-property-management
- medical-dental-leasing
- restaurant-consulting
- local-markets  (Beverly Hills, Glendale, Pasadena, Santa Monica, etc.)

Each category holds: the pillar overview + 4–8 focused articles + FAQ block.

## 2. Page templates (matching Square patterns)

**Hub `/help`**
- Big search input (client-side fuzzy search across article titles + tags)
- 3-column grid of category tiles: icon, title, article count, short description
- "Popular articles" strip below (top 6 hand-picked)
- Contact/consultation CTA footer

**Category `/help/<category>`**
- Breadcrumb: Help › Category
- Category hero: title + description
- Article list grouped by subtopic (Overview, How-tos, FAQs, Guides)
- Sidebar (desktop) / accordion (mobile): "Other categories"

**Article `/help/<category>/<slug>`**
- Breadcrumb: Help › Category › Article
- H1 + last-updated
- **Key Takeaways** callout (AI-extractable summary box)
- Table of contents (auto from H2s, sticky on desktop)
- Long-form body (sections, lists, tables, quotes, images)
- FAQ accordion (feeds `FAQPage` schema)
- "Related articles" cards (same category)
- Consultation CTA + "Was this helpful?" (visual only, not tracked)

## 3. Content system

Static, versioned in git. No CMS.

```
src/content/help/
  types.ts                       shared types
  index.ts                       registry (categories + articles)
  buying-a-restaurant/
    _category.ts                 title, description, order
    how-to-buy-a-restaurant-in-los-angeles.ts
    restaurant-due-diligence-checklist.ts
    ...
  selling-a-restaurant/
    _category.ts
    ...
```

Each article exports: `{ slug, title, seoTitle, description, keywords, updatedAt, keyTakeaways[], tableOfContents[], sections[], faqs[], related[] }`.

## 4. Components (new)

- `HelpLayout.tsx` — reuses `SiteLayout`, adds help-center sub-nav
- `HelpSearch.tsx` — client-side fuzzy over registry
- `CategoryTile.tsx`, `ArticleCard.tsx`
- `ArticleTemplate.tsx` — TOC + body + FAQ + related + CTA
- `KeyTakeaways.tsx` (gold accent box, AI-friendly)
- `Breadcrumbs.tsx` (visual + `BreadcrumbList` JSON-LD)
- `FAQAccordion.tsx` (visual + `FAQPage` JSON-LD)

## 5. Schema markup

Extend `src/lib/seo.ts`:
- `articleScript()` → `Article` + `Person` (Richard Stein, author)
- `faqScript()` → `FAQPage`
- Reuse `breadcrumbScript()` + `serviceScript()`

Every article page emits Article + BreadcrumbList + FAQPage. Category pages emit BreadcrumbList + `CollectionPage`.

## 6. Nav + discovery

- Header: add **Help** link (top-level, matching Square)
- Footer: add **Help Center** column with top categories
- Sitemap: auto-include every category + article
- Homepage: add "Popular guides" section linking into `/help`

## 7. Phased delivery

**Phase 1 (this turn) — foundation + proof**
- Content system + registry
- All three route files (`/help`, `/help/$category`, `/help/$category/$slug`)
- All templates + components + schema helpers
- 15 category shells (one per service) with intros written
- **5 fully-written articles** proving the format:
  - Buying: "How to Buy a Restaurant in Los Angeles"
  - Selling: "How to Sell a Restaurant in Los Angeles"
  - Leasing: "Restaurant Lease Assignment Guide"
  - Licensing: "ABC License Transfer Guide"
  - Local: "Restaurant Broker Beverly Hills"
- Nav + sitemap + footer updates

**Phase 2 (next turns, on approval)**
- Write 10 more articles per turn across categories
- Add remaining local-market pages (Glendale, Pasadena, Santa Monica, Culver City, Burbank, West Hollywood, Sherman Oaks, DTLA, Long Beach, Torrance, Woodland Hills, SFV)
- Grow to 40–60 articles total

## 8. Out of scope

- Visual redesign — reuses tokens
- Backend/CMS — content is TS modules
- Real client testimonials — will use conservative language until you supply
- Won't invent transaction counts / years — placeholders you can edit

## 9. Two things I still need

1. **Trust facts**: years in business, approx. transactions closed, sectors served. If unsure, I'll ship conservative placeholders labeled `TODO`.
2. **Confirm the 15 categories above** — trim or add before I scaffold.

Reply "go" and I'll ship Phase 1 in one batch.
