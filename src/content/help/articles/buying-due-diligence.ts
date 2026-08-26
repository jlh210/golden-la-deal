import type { Article } from "../types";

export const article: Article = {
  slug: "restaurant-due-diligence-checklist",
  title: "Restaurant Due Diligence Checklist",
  seoTitle: "Restaurant Due Diligence Checklist for LA Buyers",
  description:
    "The complete pre-purchase due diligence checklist for Los Angeles restaurant buyers: lease, financials, ABC license, Health Dept history, equipment, and permits.",
  keywords: [
    "restaurant due diligence checklist",
    "restaurant due diligence Los Angeles",
    "buying an existing restaurant due diligence",
    "restaurant acquisition checklist",
  ],
  updatedAt: "2026-07-24",
  readMinutes: 8,
  keyTakeaways: [
    "Never accept a seller's P&L at face value — reconcile against POS, bank, and sales-tax filings.",
    "The lease review is the single most valuable line item in a restaurant due diligence.",
    "Pull the ABC license file directly from the state — sellers routinely omit CUB restrictions.",
    "Health Dept red-tag history and open plan-check items follow the location, not the operator.",
    "Get every leased equipment contract in writing before you assume you own the hood.",
  ],
  sections: [
    { type: "h2", text: "Why due diligence matters" },
    {
      type: "p",
      text:
        "A restaurant looks the same from the sidewalk whether it's clean or riddled with liabilities. Due diligence is the process of getting behind the sidewalk view — verifying the lease, the license, the permits, the numbers, and the equipment — before your deposit becomes non-refundable.",
    },
    { type: "h2", text: "1. Lease review" },
    {
      type: "ul",
      items: [
        "Full lease with every amendment and estoppel.",
        "Remaining term and every renewal option (in writing, not verbal).",
        "Base rent, CAM, insurance, taxes, and how they escalate.",
        "Assignment and change-of-control clauses — who has to approve, and what standards can they apply?",
        "Personal guaranty language — is it good-guy, full recourse, or burn-off?",
        "Use clause — does it permit your intended concept or restrict alcohol/hours?",
        "Exclusives, radius restrictions, co-tenancy, kick-out rights.",
        "Landlord's current standing with the property (foreclosure, tax liens).",
      ],
    },
    { type: "h2", text: "2. Financial verification" },
    {
      type: "ul",
      items: [
        "24 months of monthly POS sales reports (Toast, Square, Aloha exports).",
        "24 months of bank statements — reconcile deposits against POS.",
        "24 months of merchant processor statements.",
        "Trailing four sales-tax returns (California CDTFA / BOE-401).",
        "Federal tax returns for the operating entity (last two).",
        "P&L, balance sheet, and A/R aging.",
        "Payroll register — verify tip reporting and workers' comp classifications.",
        "Vendor invoices for the last three months (food cost verification).",
      ],
    },
    { type: "h2", text: "3. ABC license status" },
    {
      type: "ul",
      items: [
        "License type (41, 47, 48, etc.) and premises address.",
        "Every Conditional Use Beverage (CUB) restriction — hours, entertainment, food-service ratios.",
        "Disciplinary history from the ABC file.",
        "Any pending accusations or license holds.",
        "Confirmation the license is transferable person-to-person.",
      ],
    },
    { type: "h2", text: "4. Health Department history" },
    {
      type: "ul",
      items: [
        "Current grade card and last 24 months of inspection reports.",
        "Red-tag history and any current open violations.",
        "Whether the current permit covers your planned menu and equipment.",
        "Open plan-check items or required corrections tied to the address.",
      ],
    },
    { type: "h2", text: "5. Building & Safety" },
    {
      type: "ul",
      items: [
        "Certificate of Occupancy — confirms legal use of the premises.",
        "Permit history — any unpermitted construction becomes your liability.",
        "ADA exposure — restrooms, path of travel, parking.",
        "Fire Dept clearance and current extinguisher/hood-suppression tags.",
      ],
    },
    { type: "h2", text: "6. Equipment and personal property" },
    {
      type: "ul",
      items: [
        "Itemized equipment list with age and condition.",
        "Which items are owned outright vs. leased (POS, ice machine, dish machine, soda system).",
        "Copies of every equipment lease with payoff or transfer terms.",
        "Serial numbers on hood, walk-in, ovens — confirm they match the bill of sale.",
      ],
    },
    { type: "h2", text: "7. Contracts and staff" },
    {
      type: "ul",
      items: [
        "Every service contract: pest, grease, hood cleaning, linen, waste, POS, music.",
        "Employee census with wage, position, tenure, and I-9 status.",
        "Any union or collective bargaining coverage.",
        "Open workers' comp claims or wage-and-hour actions.",
      ],
    },
  ],
  faqs: [
    {
      q: "How long should due diligence take on a restaurant purchase?",
      a: "Standard LA due-diligence windows are 21–45 days. Complex deals with a full plan check, ABC investigation, or unusual lease terms often need 60.",
    },
    {
      q: "What is the biggest hidden risk in a restaurant purchase?",
      a: "Unpermitted construction. If the previous owner added a bar, extended the hood, or converted storage into seating without permits, the liability transfers to you the moment you close.",
    },
    {
      q: "Can I do due diligence myself?",
      a: "You can pull most public records yourself, but the interpretation — what a CUB condition actually forbids, whether a lease's assignment clause is workable, whether the sales numbers reconcile — is where experienced advisors save buyers six figures.",
    },
  ],
  related: [
    { category: "buying-a-restaurant", slug: "how-to-buy-a-restaurant-in-los-angeles", title: "How to Buy a Restaurant in Los Angeles" },
    { category: "business-investigations", slug: "what-is-a-restaurant-business-investigation", title: "What Is a Restaurant Business Investigation?" },
    { category: "lease-assignments", slug: "restaurant-lease-assignment-guide", title: "Restaurant Lease Assignment Guide" },
  ],
};
