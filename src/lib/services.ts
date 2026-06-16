import {
  ArrowRightLeft,
  Wine,
  ShieldCheck,
  FileSignature,
  Ruler,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  bullets: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "brokerage",
    title: "Restaurant Buy/Sell Brokerage",
    short: "Confidential listings, qualified buyers, deals that actually close.",
    long:
      "We represent buyers and sellers of LA restaurants with discretion, accurate valuations, and a closing-first mindset. From taquerías to fine dining, we move deals through escrow without leaks to staff or vendors.",
    bullets: [
      "Off-market and listed opportunities",
      "Valuation, packaging & buyer screening",
      "Escrow & landlord coordination end-to-end",
    ],
    icon: ArrowRightLeft,
  },
  {
    slug: "alcohol-licensing",
    title: "Alcohol Licensing",
    short: "Beer & Wine (Type 41) and Hard Liquor (Type 47/48) — done right.",
    long:
      "ABC license transfers, new licenses, and conditional approvals across LA County. We handle the paperwork, the posting, the protests, and the timeline so you can open on schedule.",
    bullets: [
      "Type 41 / 47 / 48 transfers and new licenses",
      "Conditional Use Permits (CUP) where required",
      "Protest response & ABC investigator liaison",
    ],
    icon: Wine,
  },
  {
    slug: "health-permitting",
    title: "Health Dept Permitting & Pre-Inspections",
    short: "Pass your LA County Health inspection on the first walk-through.",
    long:
      "We run pre-inspections, fix what the inspector will flag, and shepherd your Public Health permit from plan check to operating approval.",
    bullets: [
      "Plan check submittals & corrections",
      "Pre-inspection punch lists",
      "LA County Public Health permit issuance",
    ],
    icon: ShieldCheck,
  },
  {
    slug: "lease-negotiation",
    title: "Lease Negotiation & Rent Abatement",
    short: "Better terms, real abatement, landlord-side leverage.",
    long:
      "New leases, renewals, assignments, and rent-relief negotiations. We know LA landlords, comparable rents, and how to structure TI, free-rent, and percentage rent that actually pencils.",
    bullets: [
      "New lease & assignment negotiations",
      "Back-rent settlements & abatement",
      "TI allowances and option-period strategy",
    ],
    icon: FileSignature,
  },
  {
    slug: "blueprints",
    title: "Blueprint Drafting for Plan Check",
    short: "Code-ready drawings for Building & Safety and Health plan check.",
    long:
      "MEP, equipment, and floor-plan drawings drafted to LA County and City of LA standards — the first set the plan checker sees should be the one that gets stamped.",
    bullets: [
      "Floor plans, equipment & MEP sheets",
      "Title 24, hood, and grease interceptor compliance",
      "Plan check submittal & corrections cycle",
    ],
    icon: Ruler,
  },
  {
    slug: "rescue",
    title: "Business Rescue & Red Tag Removal",
    short: "Red tag? Failed inspection? Lease default? We move today.",
    long:
      "When your restaurant is one notice away from closing, we triage fast — Health, ABC, Building & Safety, landlord, lender — and get the doors open again.",
    bullets: [
      "Red tag & closure notice response",
      "Cease-and-desist and code violation cure",
      "Emergency landlord & lender negotiations",
    ],
    icon: AlertTriangle,
  },
];
