import type { ServiceAuthorityContent } from "@/components/site/ServiceAuthority";

const abc = {
  href: "https://www.abc.ca.gov/licensing/license-types/",
  label: "California ABC: license types",
};
const city = {
  href: "https://planning.lacity.gov/restaurant-beverage-program",
  label: "LA City Planning: Restaurant Beverage Program",
};
const health = {
  href: "https://publichealth.lacounty.gov/eh/inspection/how-to-obtain-restaurant-food-facility-permit.htm",
  label: "LA County: obtaining a restaurant permit",
};

export const serviceAuthority = {
  buy: {
    title: "Buy a Restaurant in Los Angeles County",
    answer:
      "Penthouse Advisors represents restaurant buyers across Los Angeles County, from defining the search to coordinating a purchase. The work connects on-market and off-market sourcing with financial, lease, equipment, and permit review. Before committing to a location, establish which assets are included, whether the lease supports your concept, and what approvals the new operation will need.",
    service: "Buying a restaurant",
    prepare: [
      "Target neighborhoods, restaurant concept, and preferred size.",
      "Purchase budget, working capital, and any financing constraints.",
      "Listing or address, proposed terms, and available lease and operating records.",
    ],
    guides: [
      {
        to: "/help/buying-a-restaurant/how-to-buy-a-restaurant-in-los-angeles",
        label: "How to buy a restaurant in Los Angeles",
      },
      { to: "/business-investigations", label: "Commission a pre-purchase investigation" },
    ],
  },
  sell: {
    title: "Sell Your Restaurant in Los Angeles",
    answer:
      "Penthouse Advisors helps Los Angeles County restaurant owners prepare, market, and negotiate a business sale. The process starts with financial records, the remaining lease term, equipment ownership, and license status to develop a supported asking range. Confidential marketing and buyer qualification then lead into negotiations, landlord consent, escrow, and the approvals required for the buyer's operation.",
    service: "Selling my restaurant",
    prepare: [
      "Recent profit-and-loss statements, tax records, and sales reports.",
      "Lease, amendments, renewal options, and any landlord correspondence.",
      "Equipment inventory, outstanding finance or lease obligations, and license details.",
    ],
    guides: [
      {
        to: "/help/selling-a-restaurant/how-to-sell-a-restaurant-in-los-angeles",
        label: "Preparing your restaurant for sale",
      },
      {
        to: "/blog/restaurant-valuation-los-angeles-2026",
        label: "Restaurant valuation: factors to review",
      },
    ],
  },
  lease: {
    title: "Restaurant Leasing in Los Angeles County",
    answer:
      "Restaurant leasing requires more than matching square footage to a budget. Penthouse Advisors helps operators and landlords assess equipped spaces, negotiate commercial terms, and coordinate the path toward opening. Existing hoods, grease systems, and kitchen layouts can be useful starting points, but their condition and approval for the proposed menu must be checked before relying on them.",
    service: "Leasing vacant restaurant",
    prepare: [
      "Proposed menu, seating, operating hours, and alcohol plans.",
      "Preferred area, size, rent budget, and build-out budget.",
      "Property address, existing equipment list, draft lease, and prior approvals if available.",
    ],
    guides: [
      {
        to: "/blog/second-generation-restaurant-space-explained",
        label: "Understanding second-generation restaurant space",
      },
      {
        to: "/help/lease-assignments/restaurant-lease-assignment-guide",
        label: "Restaurant lease assignment guide",
      },
      { to: "/leasing-vacant-restaurants", label: "Representation for vacant restaurant space" },
    ],
    sources: [health],
  },
  consult: {
    title: "Restaurant Consulting in Los Angeles",
    answer:
      "Penthouse Advisors provides transaction-focused restaurant consulting for operators, buyers, and owners across Los Angeles County. Engagements can address a stalled acquisition, lease assignment strategy, unresolved diligence questions, or coordination around licensing and permits. An initial consultation identifies the decision, the available documents, and the appropriate scope of advisory work or referral to a specialist.",
    service: "Something else",
    prepare: [
      "The decision you need to make and any contractual deadlines.",
      "Relevant lease, purchase agreement, agency notices, or correspondence.",
      "A short account of the issue, parties involved, and work already completed.",
    ],
    guides: [
      { to: "/business-investigations", label: "Detailed pre-purchase investigations" },
      { to: "/buyer-tenant-resolutions", label: "Buyer and tenant resolution services" },
      { to: "/assignments-rent-abatement", label: "Lease assignments and rent abatement" },
    ],
  },
  alcohol: {
    title: "Restaurant Alcohol Licensing in Los Angeles",
    answer:
      "Penthouse Advisors coordinates restaurant alcohol license applications and transfers, including California Type 41 beer-and-wine and Type 47 general licenses. The starting point is the proposed operation, address, and existing license record. State ABC approval and local land-use authorization are separate reviews; the appropriate local process depends on the jurisdiction, site, and operating conditions.",
    service: "Alcohol licensing (Type 41 / 47)",
    prepare: [
      "Restaurant address, proposed hours, menu, and alcohol service plans.",
      "Existing ABC license number and any license conditions.",
      "Lease or purchase agreement and available local alcohol approval documents.",
    ],
    guides: [
      {
        to: "/blog/type-41-vs-type-47-liquor-license-california",
        label: "Type 41 and Type 47 comparison",
      },
      { to: "/liquor-license-for-sale", label: "Liquor license sale and acquisition services" },
    ],
    sources: [
      abc,
      city,
      {
        href: "https://www.abc.ca.gov/licensing/license-fees/application-fee-schedules/",
        label: "California ABC: current application fees",
      },
    ],
    jurisdiction:
      "In the City of Los Angeles, eligible restaurants may use the Restaurant Beverage Program instead of a CUB. Other cities and unincorporated areas have their own local requirements. Approval, conditions, and timing are determined by the relevant agencies.",
  },
  investigate: {
    title: "Restaurant Due Diligence in Los Angeles",
    answer:
      "A restaurant business investigation compares the seller's representations with the records supporting the deal. Penthouse Advisors reviews lease terms, sales evidence, equipment, and available permit and license history, then documents findings for the buyer. The purpose is to identify unresolved questions and practical risks before the buyer decides whether to proceed, renegotiate, or end negotiations.",
    service: "Pre-purchase business investigation",
    prepare: [
      "Listing, offer or purchase agreement, and diligence deadlines.",
      "Lease and amendments, financial statements, POS reports, and tax records made available by the seller.",
      "Equipment schedule, permit records, license information, and inspection reports.",
    ],
    guides: [
      {
        to: "/help/buying-a-restaurant/restaurant-due-diligence-checklist",
        label: "Restaurant due diligence checklist",
      },
      { to: "/buy-a-restaurant", label: "Buyer representation from search through closing" },
      { to: "/restaurant-consulting", label: "Advisory support for an unresolved transaction" },
    ],
  },
} satisfies Record<string, ServiceAuthorityContent>;

export const specialistFaqs = {
  alcohol: [
    {
      q: "What is the difference between Type 41 and Type 47?",
      a: "Type 41 authorizes beer and wine at a bona fide eating place; Type 47 includes distilled spirits as well. Both are restaurant license types. The choice should match your proposed service, while the application or transfer and the site's local alcohol authorization are reviewed separately.",
    },
    {
      q: "Does every Los Angeles restaurant need a CUB?",
      a: "The local approval path depends on the jurisdiction and property. Within the City of Los Angeles, qualifying restaurants may use the Restaurant Beverage Program instead of a CUB. Review the existing approval, proposed hours, and operating conditions with the planning authority before assuming a prior restaurant's authorization covers your concept.",
    },
  ],
  investigate: [
    {
      q: "What does restaurant due diligence examine?",
      a: "The agreed investigation can cover lease and assignment terms, seller financial records, equipment ownership and condition, and available license, permit, and inspection history. Findings are documented with outstanding questions. The depth of review depends on access to records and the scope agreed before work starts.",
    },
    {
      q: "When should I arrange a business investigation?",
      a: "Arrange the scope as early as practical, using the offer, purchase agreement, and diligence deadlines to determine priorities. Identify which records the seller will provide and which need agency or specialist review. The investigation should inform your decision before the relevant contractual contingency or commitment deadline.",
    },
  ],
};
