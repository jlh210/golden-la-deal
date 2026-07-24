import type { Article } from "../types";

export const article: Article = {
  slug: "abc-license-transfer-guide",
  title: "ABC License Transfer Guide (California)",
  seoTitle: "ABC License Transfer Guide — California Restaurant Buyers",
  description:
    "How the California ABC license transfer works: person-to-person transfers, timelines, temporary permits, CUB conditions, and what triggers escrow release.",
  keywords: [
    "ABC license transfer",
    "liquor license transfer LA",
    "California ABC person to person transfer",
    "restaurant liquor license",
    "type 47 transfer",
  ],
  updatedAt: "2026-07-24",
  readMinutes: 6,
  keyTakeaways: [
    "Person-to-person ABC transfers typically take 60–90 days from application to issuance.",
    "A temporary retail permit lets the buyer operate during the transfer window.",
    "The escrow can't release funds until the ABC formally approves the transfer.",
    "CUB (Conditional Use Beverage) restrictions on the license transfer with it — read them before you buy.",
    "Certain criminal history, prior license discipline, or fictitious ownership will disqualify a buyer.",
  ],
  sections: [
    { type: "h2", text: "The three types of ABC transfers" },
    {
      type: "ul",
      items: [
        "Person-to-person — the license moves from one owner to another at the same premises. Most restaurant sales.",
        "Premises-to-premises — the same owner moves the license to a new address.",
        "Double transfer — person and premises change together.",
      ],
    },
    { type: "h2", text: "Timeline you should expect" },
    {
      type: "ol",
      items: [
        "Application filed with the local ABC district office — day 0.",
        "30-day posting period on the premises begins.",
        "Investigator assigned; interviews owners, reviews financials, checks premises.",
        "Any protests reviewed; CUB conditions confirmed.",
        "Issuance — typically day 60–90.",
      ],
    },
    { type: "h2", text: "Temporary retail permit" },
    {
      type: "p",
      text:
        "The buyer can apply for a temporary retail permit at the same time as the transfer. Cost is modest, timeline is fast (often within a week), and it lets you operate under your name during the transfer window. Almost every LA restaurant closing uses one.",
    },
    { type: "h2", text: "What can block or slow the transfer" },
    {
      type: "ul",
      items: [
        "Undisclosed CUB conditions that conflict with the buyer's intended operation.",
        "Buyer criminal history — certain felonies are automatic disqualifiers.",
        "Prior ABC license discipline against the buyer.",
        "Protests from neighbors, PTA, or nearby churches (rare on person-to-person).",
        "Seller tax liens or unpaid alcohol excise taxes.",
        "Incomplete or inconsistent ownership disclosure — the ABC takes fictitious-ownership violations seriously.",
      ],
    },
    { type: "h2", text: "CUB conditions — read them" },
    {
      type: "p",
      text:
        "A Conditional Use Beverage permit is a list of local restrictions attached to the license: hours of sale, whether entertainment is allowed, food-service-to-alcohol ratio, no karaoke, no happy hour, and so on. CUBs travel with the license. Before you close, pull the ABC file and read the full CUB — a restriction you didn't know about can gut your concept.",
    },
    { type: "h2", text: "Escrow release" },
    {
      type: "p",
      text:
        "California requires the license transfer to be complete (or in defined final steps) before escrow funds are released to the seller. This protects both sides — the seller doesn't lose the license without payment, the buyer doesn't pay for a license they don't own.",
    },
  ],
  faqs: [
    {
      q: "How much does it cost to transfer an ABC license in California?",
      a: "State ABC fees are modest (typically under $1,500). The bigger costs are legal or licensing consultant fees, plus any premium the seller charges for the license itself when scarcity applies (Type 47s in some LA neighborhoods trade at a premium).",
    },
    {
      q: "Can I operate the bar during the ABC transfer?",
      a: "Yes, under a temporary retail permit issued to the buyer. It's active until the full transfer issues or expires.",
    },
    {
      q: "What is a Type 41 vs Type 47 license?",
      a: "Type 41 is beer and wine only, on-premises consumption, at a bona fide eating place. Type 47 is beer, wine, and distilled spirits, on-premises, at a bona fide eating place. A Type 47 is more valuable and more scarce in most LA neighborhoods.",
    },
    {
      q: "Do I need a licensing consultant?",
      a: "For a clean person-to-person transfer with no CUB complications, many buyers file themselves. For anything involving CUB modifications, new licenses, disciplinary history, or protests, a specialized consultant is worth the fee.",
    },
  ],
  related: [
    { category: "alcohol-licensing", slug: "abc-license-transfer-guide", title: "ABC License Transfer Guide" },
    { category: "buying-a-restaurant", slug: "how-to-buy-a-restaurant-in-los-angeles", title: "How to Buy a Restaurant in Los Angeles" },
    { category: "health-permitting", slug: "restaurant-health-permit-transfer", title: "Restaurant Health Permit Transfer" },
  ],
};
