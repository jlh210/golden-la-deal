import type { BlogPost } from "../types";

export const post: BlogPost = {
  slug: "restaurant-buyer-due-diligence-checklist",
  title: "The Restaurant Buyer's Due Diligence Checklist: What to Check Before You Sign",
  seoTitle: "Restaurant Buyer Due Diligence Checklist | Penthouse Advisors",
  description:
    "What to check before your deposit becomes non-refundable: financials, lease, licenses, equipment, and health department history. A buyer's due diligence checklist for LA restaurant deals.",
  keywords: [
    "restaurant due diligence checklist",
    "buying a restaurant checklist",
    "restaurant business investigation",
    "what to check before buying a restaurant",
  ],
  category: "Buying",
  publishedAt: "2026-08-27",
  readMinutes: 8,
  keyTakeaways: [
    "Due diligence exists to protect your deposit — most of it should happen before your deposit becomes non-refundable.",
    "Financial records, the lease, and license status cause more failed deals than food quality or concept ever will.",
    "Always verify equipment ownership separately — leased equipment represented as owned is one of the most common surprises.",
    "Pull the Health Department's inspection history yourself; don't rely on the seller's summary of it.",
    "A business investigation isn't about finding a reason to walk away — it's about knowing exactly what you're buying.",
  ],
  sections: [
    { type: "h2", text: "The short answer", id: "the-short-answer" },
    {
      type: "p",
      text:
        "Before you sign anything binding, verify five things: the financials tie out, the lease can actually be assigned to you on acceptable terms, the liquor license (if any) is transferable and clean, the equipment you're buying is actually owned by the seller, and the Health Department file has no open violations you're inheriting. Everything else in due diligence supports one of those five checks.",
    },
    { type: "h2", text: "Financial records", id: "financial-records" },
    {
      type: "ul",
      items: [
        "24 months of POS reports, reconciled against bank deposits — not just summarized totals.",
        "Sales tax filings for the same period, cross-checked against reported revenue.",
        "Payroll records and current staffing costs, including any owner or family compensation you'll need to replace.",
        "Vendor and supplier statements, to confirm the cost of goods sold is representative of a normal month.",
        "Any outstanding loans, equipment leases, or liens against the business.",
      ],
    },
    {
      type: "p",
      text:
        "If a seller can't produce clean, reconciled numbers for this period, treat that as information, not an inconvenience — it usually means either the books were never kept tightly, or there's cash activity that never made it onto the books at all. Either way, it changes how much you should trust the stated SDE.",
    },
    { type: "h2", text: "The lease", id: "the-lease" },
    {
      type: "ul",
      items: [
        "Term remaining and any renewal options — read the actual renewal language, not just the summary.",
        "Assignment clause — what does the landlord require to approve you as the new tenant?",
        "Current rent versus market rent for the area, and any scheduled increases.",
        "Landlord estoppel certificate, confirming the lease terms as the seller has represented them.",
        "Any personal guaranty requirements the landlord will impose on you as the incoming tenant.",
      ],
    },
    {
      type: "p",
      text:
        "Get an estoppel from the landlord before you're deep into escrow. It's the document that confirms, in writing, that the lease terms you've been told match what the landlord will actually honor — and it surfaces landlord-side problems (unpaid CAM charges, disputed repairs) before they become your problem.",
    },
    { type: "h2", text: "License and permit status", id: "license-and-permit-status" },
    {
      type: "ul",
      items: [
        "Current ABC license status — active, in good standing, and free of pending accusations or discipline.",
        "Whether the license transfer requires ABC approval of you personally (it does), and how long that typically takes for your license type.",
        "Health Department permit status and whether a change-of-ownership permit will be required.",
        "Any local Conditional Use Beverage (CUB) conditions attached to the address, separate from the state license.",
        "Building and fire department sign-offs, particularly occupancy limits and any unpermitted construction.",
      ],
    },
    { type: "h2", text: "Equipment ownership", id: "equipment-ownership" },
    {
      type: "p",
      text:
        "This is one of the most common — and most avoidable — surprises in a restaurant sale. Walk the kitchen with an itemized equipment list and confirm, piece by piece, what's owned outright versus what's financed or leased. A seller representing leased equipment as an asset you're buying, whether intentionally or by mistake, leaves you responsible for a lease payment on equipment you thought you owned free and clear.",
    },
    { type: "h2", text: "Health Department history", id: "health-department-history" },
    {
      type: "p",
      text:
        "Pull the inspection history directly from LA County Public Health rather than relying on the seller's account of it. Look specifically for repeat violations (a pattern matters more than a single incident), any red-tag closures, and whether prior corrective actions were actually closed out or just noted and left open.",
    },
    { type: "callout", title: "One more thing worth checking", text: "Ask specifically whether the space is a second-generation restaurant build-out, and if so, confirm the hood, grease trap, and grease interceptor still pass current inspection standards — an older second-gen space can still require real money to bring current." },
  ],
  faqs: [
    {
      q: "What should I check before buying a restaurant?",
      a: "At minimum: 24 months of reconciled financials, the lease and its assignment terms, liquor license and permit status, equipment ownership, and the Health Department's full inspection history for the location.",
    },
    {
      q: "How long does restaurant due diligence usually take?",
      a: "Most thorough due diligence runs 2–4 weeks once you have full access to records, though license and permit verification through the ABC and Health Department can extend that timeline depending on current processing times.",
    },
    {
      q: "What is a business investigation in a restaurant sale?",
      a: "A business investigation is a structured pre-purchase review — pulling public records, verifying licenses and permits, and cross-checking financials — done before your deposit becomes non-refundable, so you know exactly what you're acquiring.",
    },
    {
      q: "Can I back out of a restaurant purchase after finding a problem in due diligence?",
      a: "That depends entirely on how your purchase agreement and deposit terms are written. This is exactly why due diligence contingencies and deposit refundability need to be negotiated clearly in the LOI before you sign, not figured out after you find a problem.",
    },
    {
      q: "Who should I bring in to help with due diligence?",
      a: "A restaurant-specific broker or advisor to coordinate the process, a CPA to review the financials, and an attorney to review the lease assignment and purchase agreement. General small-business templates often miss restaurant-specific issues like license transfer timing and health permit continuity.",
    },
  ],
  related: [
    { slug: "second-generation-restaurant-space-explained", title: "What Is a Second-Generation Restaurant Space?" },
    { slug: "restaurant-valuation-los-angeles-2026", title: "How Much Is My LA Restaurant Worth? A 2026 Valuation Guide" },
  ],
};
