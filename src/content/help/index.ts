import type { Article, Category } from "./types";
import { article as buyingHowTo } from "./articles/buying-how-to-buy";
import { article as buyingDD } from "./articles/buying-due-diligence";
import { article as sellingHowTo } from "./articles/selling-how-to-sell";
import { article as leasingAssignment } from "./articles/leasing-assignment-guide";
import { article as abcTransfer } from "./articles/licensing-abc-transfer";
import { article as beverlyHills } from "./articles/local-beverly-hills";

/** Empty category shell — intro copy included, articles filled in over time. */
function shell(
  slug: string,
  title: string,
  seoTitle: string,
  description: string,
  intro: string,
  iconName: string,
  order: number,
  articles: Article[] = [],
): Category {
  return { slug, title, seoTitle, description, intro, iconName, order, articles };
}

export const categories: Category[] = [
  shell(
    "buying-a-restaurant",
    "Buying a Restaurant",
    "Buying a Restaurant in Los Angeles — Guides & FAQs",
    "Guides, checklists, and FAQs for buying a restaurant in Los Angeles County — from first offer to keys in hand.",
    "Understand the acquisition sequence and organize the evidence needed before the next commitment. These guides explain the process and provide a detailed diligence checklist.",
    "ShoppingBag",
    1,
    [buyingHowTo, buyingDD],
  ),
  shell(
    "selling-a-restaurant",
    "Selling a Restaurant",
    "Selling a Restaurant in Los Angeles — Owner Guides",
    "How to sell your restaurant in LA: valuation, confidential listing, buyer qualification, escrow, and closing.",
    "Prepare the records, pricing questions, buyer qualification and handover steps involved in a restaurant sale. Pair the selling guide with the valuation explainer in Insights.",
    "Store",
    2,
    [sellingHowTo],
  ),
  shell(
    "restaurant-leasing",
    "Restaurant Leasing",
    "Restaurant Leasing in Los Angeles — Tenant & Landlord Guides",
    "Restaurant leasing in Los Angeles: second-generation spaces, lease negotiation, rent abatement, and tenant representation.",
    "Restaurant leasing is a specialty, not a corollary of retail leasing. These guides cover second-generation restaurant spaces, tenant representation, rent abatement tied to permit milestones, and the landlord-side view.",
    "DoorOpen",
    3,
  ),
  shell(
    "alcohol-licensing",
    "Alcohol Licensing",
    "California ABC License Guides — Transfers, Type 41 & 47",
    "California ABC licensing: transfers, Type 41, Type 47, CUB conditions, and what buyers and sellers need to know.",
    "Understand the ABC transfer process, conditional temporary permits, and the distinction between state licensing and local alcohol authorization.",
    "Wine",
    4,
    [abcTransfer],
  ),
  shell(
    "health-permitting",
    "Health Permitting",
    "LA County Health Permitting & Plan Check Guides",
    "Los Angeles County Health Dept: permit transfers, plan check, red-tag removal, and reopening.",
    "The LA County Department of Public Health governs every restaurant's ability to open its doors. These guides cover change-of-ownership permits, plan-check submittal, red-tag responses, and the fastest path back to service after a closure.",
    "ShieldCheck",
    5,
  ),
  shell(
    "grandfather-protection",
    "Grandfather Protection",
    "Restaurant Grandfather Protection — LA County Guides",
    "How grandfather protection works for older LA restaurant spaces — and what triggers full code compliance.",
    "Older LA restaurant spaces often carry grandfathered exemptions from current code. These guides explain what triggers a loss of grandfather status, how the 90-day rule works, and how to protect the exemption during a sale or renovation.",
    "Lock",
    6,
  ),
  shell(
    "lease-assignments",
    "Lease Assignments & Abatement",
    "Restaurant Lease Assignment & Rent Abatement Guides",
    "Restaurant lease assignments, landlord consent negotiation, and rent abatement tied to permit milestones.",
    "Review assignment requirements, landlord documentation, guaranties and negotiated rent relief in the context of the actual restaurant lease.",
    "FileSignature",
    7,
    [leasingAssignment],
  ),
  shell(
    "business-investigations",
    "Restaurant Business Investigations",
    "Restaurant Business Investigation Guides — LA Due Diligence",
    "Pre-purchase restaurant business investigations: what to check, what to pull, and what to walk away from.",
    "A business investigation is the buyer's insurance policy. These guides show exactly what documents to pull, what public records to check, and how to interpret what you find before your deposit becomes non-refundable.",
    "FileSearch",
    8,
  ),
  shell(
    "buyer-tenant-resolutions",
    "Buyer / Tenant Resolutions",
    "Stuck Restaurant Deal? Buyer & Tenant Resolution Guides",
    "How to resolve stuck restaurant deals — landlord holds, escrow disputes, license snags, and permit denials.",
    "Deals stall. Landlords stop responding, ABC investigators raise unexpected issues, Health plan check comes back with corrections. These guides show how experienced advisors diagnose and unstick each kind of blocker.",
    "Handshake",
    9,
  ),
  shell(
    "off-market-sourcing",
    "Off-Market Restaurant Sourcing",
    "Off-Market Restaurant Sourcing — LA Door-Knocking Campaigns",
    "How off-market restaurant sourcing works in LA: door-knocking campaigns, owner outreach, and pre-listing negotiations.",
    "Most of LA's real restaurant inventory never hits a public listing. These guides explain how door-knocking campaigns actually work, when they're worth it, and how to structure an approach to an owner who isn't formally selling.",
    "DoorOpen",
    10,
  ),
  shell(
    "e2-visa",
    "E-2 Visa Restaurant Investments",
    "E-2 Visa Restaurant Guides for European Entrepreneurs",
    "Restaurant investments structured for the E-2 investor visa — for European entrepreneurs relocating to LA.",
    "For European entrepreneurs using a restaurant purchase as an E-2 qualifying investment, these guides cover deal structure, minimum investment thresholds, source-of-funds documentation, and the LA acquisition process.",
    "Plane",
    11,
  ),
  shell(
    "commercial-property-management",
    "Commercial Property Management",
    "Commercial Property Management Guides — LA Landlords",
    "Commercial property management in LA County: tenant management, rent collection, maintenance, and repositioning.",
    "For LA landlords and investors — how full-service commercial property management works, what a professional manager actually does day-to-day, and how repositioning turns a struggling asset into a performing one.",
    "Building2",
    12,
  ),
  shell(
    "medical-dental-leasing",
    "Medical & Dental Office Leasing",
    "Medical & Dental Office Leasing in LA — Guides",
    "Medical and dental office leasing across Los Angeles County: medical-use zoning, existing build-outs, and tenant representation.",
    "Medical and dental office leasing is a specialty market with its own zoning, plumbing, and equipment requirements. These guides cover what to look for in a medical-use space and how to structure a lease that protects the practice.",
    "Stethoscope",
    13,
  ),
  shell(
    "restaurant-consulting",
    "Restaurant Consulting",
    "Restaurant Consulting Guides — LA Operators",
    "Restaurant consulting for LA operators: turnaround strategy, profitability, expansion planning, and operations.",
    "Beyond brokerage, these guides address the advisory side — turnaround strategy for underperforming restaurants, profitability levers, and how to plan a second location without losing the first.",
    "Search",
    14,
  ),
  shell(
    "local-markets",
    "LA Local Market Guides",
    "Los Angeles Restaurant Location & Transaction Guides",
    "Property-level restaurant transaction considerations in Los Angeles County, starting with the existing Beverly Hills guide.",
    "Evaluate restaurant locations using the actual premises, lease and local approval requirements. Start with the Beverly Hills guide and use Insights for a broader neighborhood-evaluation framework.",
    "MapPin",
    15,
    [beverlyHills],
  ),
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getArticle(
  categorySlug: string,
  articleSlug: string,
): { article: Article; category: Category } | undefined {
  const category = getCategory(categorySlug);
  if (!category) return undefined;
  const article = category.articles.find((a) => a.slug === articleSlug);
  if (!article) return undefined;
  return { article, category };
}

/** Flat list of every article for search, sitemap, popular strip. */
export function allArticles(): { category: Category; article: Article }[] {
  return categories.flatMap((c) => c.articles.map((a) => ({ category: c, article: a })));
}
