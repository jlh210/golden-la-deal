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
  Store,
  Home,
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
    title: "Restaurants For Sale",
    short: "Confidential buy/sell brokerage with full disclosure across LA County.",
    icon: ArrowRightLeft,
    featured: true,
  },
  {
    slug: "alcohol-licensing",
    to: "/alcohol-licensing",
    title: "Alcohol Licensing",
    short: "Type 41 Beer & Wine, Type 47 Hard Liquor — transfers, new, CUB diversion.",
    icon: Wine,
    featured: true,
  },
  {
    slug: "liquor-license-for-sale",
    to: "/liquor-license-for-sale",
    title: "Liquor License For Sale",
    short: "Active ABC licenses available — fully vetted, priced all-in.",
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
    slug: "off-market",
    to: "/off-market-sourcing",
    title: "Off-Market Restaurants & Businesses",
    short: "Source restaurants and businesses that never hit the open market.",
    icon: Search,
    featured: true,
  },
  {
    slug: "e2-visa",
    to: "/e2-visa-europe",
    title: "E-2 Visa Europe",
    short: "Investment-visa-ready acquisitions for European entrepreneurs.",
    icon: Plane,
  },
  {
    slug: "second-generation",
    to: "/second-generation-restaurants",
    title: "Second Generation Restaurants",
    short: "Equipped 2nd-gen restaurant spaces — $0 key money, lawful terms.",
    icon: Building2,
    featured: true,
  },
  {
    slug: "hardware-store",
    to: "/hardware-store-for-sale",
    title: "Hardware Store For Sale",
    short: "Established West LA hardware store — full business listing.",
    icon: Store,
  },
  {
    slug: "residential",
    to: "/residential",
    title: "Residential Requests",
    short: "Select residential listings handled by Roschard Paticchio-Stein.",
    icon: Home,
  },
];

export const featuredServices = services.filter((s) => s.featured);

/** Service Needed dropdown — used on every lead form. */
export const serviceTopics = [
  "Buying a restaurant",
  "Selling my restaurant",
  "Alcohol licensing (Type 41 / 47)",
  "Liquor license for sale",
  "Health department / inspection",
  "Vermin / compliance inspection",
  "Grandfather protection question",
  "Lease assignment / rent abatement",
  "Off-market sourcing",
  "E-2 visa (Europe)",
  "Second generation space",
  "Hardware store inquiry",
  "Residential listing",
  "Blueprint / plan check",
  "Red tag / emergency rescue",
  "Something else",
];
