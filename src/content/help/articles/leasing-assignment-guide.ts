import type { Article } from "../types";

export const article: Article = {
  slug: "restaurant-lease-assignment-guide",
  title: "Restaurant Lease Assignment Guide (Los Angeles)",
  seoTitle: "Restaurant Lease Assignment Guide — LA County",
  description:
    "How restaurant lease assignments work in Los Angeles: landlord consent, guaranty structure, rent bumps, and negotiation tactics that get deals closed.",
  keywords: [
    "restaurant lease assignment",
    "restaurant lease transfer",
    "commercial restaurant lease",
    "restaurant lease negotiation",
    "restaurant tenant representation",
  ],
  updatedAt: "2026-07-24",
  readMinutes: 7,
  keyTakeaways: [
    "Almost every LA restaurant lease requires landlord consent to assign.",
    "Landlords use assignment consent as leverage to raise rent, extend term, or tighten guaranty.",
    "Start the landlord conversation in week one of escrow — waiting kills deals.",
    "A well-drafted LOI makes landlord consent an explicit contingency.",
    "Rent abatement during permit build-out is negotiable and often granted.",
  ],
  sections: [
    { type: "h2", text: "What a lease assignment actually is" },
    {
      type: "p",
      text: "An assignment transfers the existing lease from the seller (assignor) to the buyer (assignee). The lease terms usually stay the same — rent, term, use clause, options — but the tenant on the paper changes. Assignments are different from a sublease (where the seller stays on the hook) and different from a brand-new lease (where you negotiate everything from scratch).",
    },
    { type: "h2", text: "Why landlords slow assignments down" },
    {
      type: "p",
      text: "Consent gives the landlord a rare chance to reprice or reshape the lease mid-term. Expect requests for a rent increase, an extended term, a stronger personal guaranty, additional security deposit, or a share of the sale proceeds ('recapture' or 'profit participation'). Every one of these is negotiable.",
    },
    { type: "h2", text: "The assignment package" },
    {
      type: "p",
      text: "Landlords will ask for a package on the assignee. A tight package speeds consent:",
    },
    {
      type: "ul",
      items: [
        "Personal financial statement and last two years of tax returns.",
        "Two years of business tax returns for the operating entity.",
        "Résumés showing hospitality experience.",
        "Business plan or concept summary.",
        "Proof of funds for purchase price plus 90-day working capital.",
        "Bank and trade references.",
      ],
    },
    { type: "h2", text: "Guaranty structures to negotiate" },
    {
      type: "ul",
      items: [
        "Good-guy guaranty — personal liability ends when you return the space in agreed condition.",
        "Burn-off guaranty — personal exposure decreases over time as you pay rent on time.",
        "Capped guaranty — total personal exposure is capped at a dollar amount or number of months.",
        "Full-recourse guaranty — you're personally on the hook for the full term. Avoid when possible.",
      ],
    },
    { type: "h2", text: "Rent abatement during build-out" },
    {
      type: "p",
      text: "If you're renovating, permitting, or waiting on ABC, negotiate abated or reduced rent tied to real milestones — Health Dept permit issuance, ABC license issuance, or doors-open day. Landlords grant abatement more readily than a permanent rent reduction because the loss is defined.",
    },
    { type: "h2", text: "Consent conditions to watch" },
    {
      type: "ul",
      items: [
        "Automatic recapture of options.",
        "Waiver of the tenant's right to further assign.",
        "Requirement that the seller-tenant remain secondarily liable.",
        "Landlord approval of any future menu, hours, or concept change.",
      ],
    },
  ],
  faqs: [
    {
      q: "Can a landlord refuse to consent to a restaurant lease assignment?",
      a: "It depends on the lease. Most California commercial leases say consent 'shall not be unreasonably withheld.' A financially qualified, experienced operator is generally reasonable; a first-time buyer with weak reserves is where landlords push back hardest.",
    },
    {
      q: "How long does landlord consent take?",
      a: "Two to eight weeks is typical. Institutional landlords with committee approval processes take longer; owner-operators can consent in days if they know the buyer.",
    },
    {
      q: "Do I have to pay the landlord an assignment fee?",
      a: "Sometimes. Leases often carry an assignment fee ($1,000–$5,000) plus reimbursement of the landlord's legal review. Anything beyond that is negotiation.",
    },
    {
      q: "Can I get rent abatement even if the lease doesn't mention it?",
      a: "Yes. Abatement is granted in the assignment consent document, not the original lease. If you're bringing a qualified tenant to a landlord who wants the deal done, abatement tied to permit milestones is one of the most successful asks we make.",
    },
  ],
  commercialParent: {
    to: "/assignments-rent-abatement",
    title: "Lease assignment and rent abatement support",
  },
  related: [
    {
      to: "/help/buying-a-restaurant/how-to-buy-a-restaurant-in-los-angeles",
      title: "How to Buy a Restaurant in Los Angeles",
    },

    { to: "/restaurant-leasing", title: "Restaurant Leasing in Los Angeles" },
  ],
};
