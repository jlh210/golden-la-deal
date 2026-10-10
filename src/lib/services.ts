import {
  ArrowRightLeft,
  Wine,
  ShieldCheck,
  FileSignature,
  Ruler,
  AlertTriangle,
  Bug,
  Lock,
  Search,
  Plane,
  Building2,
  Home,
  FileSearch,
  Handshake,
  Stamp,
  DoorOpen,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  to: string;
  title: string;
  short: string;
  icon: LucideIcon;
  featured?: boolean;
};

/**
 * Full service catalog. `to` is the dedicated route for that service.
 * `featured` services show in the homepage grid (keep to 6 for layout balance).
 */
export const services: Service[] = [
  {
    slug: "brokerage",
    to: "/restaurants-for-sale",
    title: "Restaurant, Medical Office for Sale/Lease in Los Angeles",
    short: "Confidential buy/sell brokerage with full disclosure across LA County.",
    icon: ArrowRightLeft,
    featured: true,
  },
  {
    slug: "alcohol-licensing",
    to: "/alcohol-licensing",
    title: "Restaurant Alcohol Licensing",
    short: "Type 41 Beer & Wine, Type 47 Hard Liquor - transfers, new, CUB diversion.",
    icon: Wine,
    featured: true,
  },
  {
    slug: "liquor-license-for-sale",
    to: "/liquor-license-for-sale",
    title: "Liquor License For Sale",
    short: "Active ABC licenses available - fully vetted, priced all-in.",
    icon: Wine,
  },
  {
    slug: "health-permitting",
    to: "/health-inspection",
    title: "Health Dept Inspection & Permitting",
    short: "Pre-inspections, red-tag removal, blueprints, hood cleaning, reopen.",
    icon: ShieldCheck,
    featured: true,
  },
  {
    slug: "vermin-inspections",
    to: "/vermin-inspections",
    title: "Vermin Infestation Inspections",
    short: "Monthly compliance inspections for commercial property owners.",
    icon: Bug,
  },
  {
    slug: "grandfather-protection",
    to: "/grandfather-protection",
    title: "Grandfather Protection",
    short: "Protect older restaurant spaces from triggering full code compliance.",
    icon: Lock,
  },
  {
    slug: "assignments-abatement",
    to: "/assignments-rent-abatement",
    title: "Assignments & Rent Abatement",
    short: "Lease assignments and rent-relief tied to permits or opening day.",
    icon: FileSignature,
    featured: true,
  },
  {
    slug: "door-knocking",
    to: "/search-door-knocking",
    title: "Search Off-Market Restaurant",
    short: "Restaurant door-knocking off-market campaign — locate, negotiate, and permit.",
    icon: DoorOpen,
  },
  {
    slug: "e2-visa",
    to: "/e2-visa-europe",
    title: "E-2 Visa Europe",
    short: "Investment-visa-ready acquisitions for European entrepreneurs.",
    icon: Plane,
  },
  {
    slug: "leasing-vacant-restaurants",
    to: "/leasing-vacant-restaurants",
    title: "Leasing Vacant Restaurants",
    short: "No-fee representation for vacant, equipped, second-generation restaurant leases.",
    icon: DoorOpen,
  },
  {
    slug: "business-investigations",
    to: "/business-investigations",
    title: "Restaurant Business Investigations",
    short: "Pre-purchase due diligence: lease, permits, sales, ABC, code, equipment.",
    icon: FileSearch,
  },
  {
    slug: "buyer-tenant-resolutions",
    to: "/buyer-tenant-resolutions",
    title: "Buyer / Tenant Resolutions",
    short: "Stuck mid-deal? We resolve landlord, lease, escrow, and permit dilemmas.",
    icon: Handshake,
  },
  {
    slug: "commercial-property-management",
    to: "/commercial-property-management",
    title: "Commercial Property Management",
    short: "Full-service commercial management for LA landlords and investors.",
    icon: Building2,
  },
  {
    slug: "health-permitting",
    to: "/health-permitting",
    title: "Health Dept Permitting & Plan Check",
    short: "Hand-drafted blueprints, plan-check submittal, stamped approvals, permits.",
    icon: Stamp,
  },
];

export const featuredServices = services.filter((s) => s.featured);

/** Service Needed dropdown - used on every lead form. */
export const serviceTopics = [
  "Buying a restaurant",
  "Selling my restaurant",
  "Alcohol licensing (Type 41 / 47)",
  "Liquor license for sale",
  "Health department / inspection",
  "Health Dept permitting / plan check",
  "Vermin / compliance inspection",
  "Grandfather protection question",
  "Lease assignment / rent abatement",
  "Pre-purchase business investigation",
  "Buyer / tenant resolution (deal stuck)",
  
  "Search off-market restaurant",
  "Leasing vacant restaurant",
  "E-2 visa (Europe)",
  "Second generation space",
  "Hardware store inquiry",
  "Commercial property management",
  "Residential listing",
  "House/condo servicing",
  "Blueprint / plan check",
  "Red tag / emergency rescue",
  "Something else",
];
