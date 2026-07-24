import wilshire1 from "@/assets/wilshire-1.png.asset.json";
import wilshire2 from "@/assets/wilshire-2.png.asset.json";
import wilshire3 from "@/assets/wilshire-3.png.asset.json";
import wilshire4 from "@/assets/wilshire-4.png.asset.json";
import santaMonica1 from "@/assets/santa-monica-1.png.asset.json";
import santaMonica2 from "@/assets/santa-monica-2.png.asset.json";
import hardwareStorefront from "@/assets/hardware-storefront.png.asset.json";
import hardwareAisle from "@/assets/hardware-aisle.png.asset.json";
import dentalOffice from "@/assets/dental-office-for-lease.png.asset.json";
import jazzveCollage from "@/assets/jazzve-venue-collage.png.asset.json";
import jazzveStorefront from "@/assets/jazzve-storefront.png.asset.json";
import jazzveFlorals from "@/assets/jazzve-florals.png.asset.json";

export type SaleType = "Business Sale" | "Asset Sale" | "Real Estate" | "Medical / Dental";

export type ListingSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type Listing = {
  id: string;
  slug: string;
  type: SaleType;
  title: string;
  location: string;
  coords?: [number, number]; // [lat, lng]
  price?: string;
  priceNote?: string;
  sqft?: string;
  leaseType: string;
  features: string[];
  images?: string[];
  badge?: string;
  description?: string;
  longDescription?: string[];
  sections?: ListingSection[];
};

export const listings: Listing[] = [
  {
    id: "RE-005",
    slug: "dental-office-for-lease",
    type: "Medical / Dental",
    title: "Dental Office For Lease",
    location: "Los Angeles County, CA",
    price: "$4,800 / month",
    priceNote: "Rent approximately",
    leaseType: "Dental office lease · Medical use zoned",
    badge: "New Listing",
    description:
      "Medical use zoned property. Ready-to-go dental office with several rooms supplied with air and water lines. Rent approximately $4,800 per month.",
    longDescription: [
      "Medical use zoned property available for lease. Ready-to-go dental office with several operator rooms already supplied with air and water lines.",
      "Rent is approximately $4,800 per month. Ideal for a dentist or dental group looking for a compliant, move-in-ready medical space in Los Angeles County.",
    ],
    features: [
      "Medical use zoned",
      "Ready-to-go dental office",
      "Air and water lines in rooms",
      "Several operator rooms",
      "Approx. $4,800/month rent",
      "Los Angeles County location",
    ],
    images: [dentalOffice.url],
  },
  {
    id: "RE-001",
    slug: "jazzve-garden-tujunga",
    type: "Business Sale",
    title: "Jazzve Garden — Banquet Facility With Real Estate",
    location: "6500 Foothill Blvd, Tujunga, CA 91042",
    coords: [34.244886, -118.273479],
    price: "Starting at $6,000,000",
    priceNote: "Reviewing all offers",
    sqft: "≈ 13,200 sq ft",
    leaseType: "Business sale with real estate · APN 2564-012012",
    badge: "Available",
    description:
      "Turn-key banquet facility built to host weddings and celebrations. Two-level venue with multiple commercial kitchens, dining areas, bars, and event arenas for up to 800 guests.",
    longDescription: [
      "Built to host weddings and celebrations with ease and elegance. The premises offers a harmonious balance between sophistication and warmth—making every occasion feel deeply personal and truly memorable.",
      "Turn-key ready with multiple commercial kitchens, dining areas, bars, and flexible event spaces designed to bring people together in an elevated yet welcoming setting.",
    ],
    sections: [
      {
        heading: "Top Floor — Street Level",
        body: "±4,200 sq ft of second-generation, vacant, equipped restaurant space inside Jazzve Garden with front-of-property outdoor kitchen.",
        bullets: [
          "Fully equipped commercial kitchen",
          "Walk-in refrigerator and freezer",
          "Dry storage area",
          "Dining area and permissible hookah lounge area",
          "Outdoor kitchen for front-of-property service",
          "Great visibility for branding",
          "Hosts up to 300 customers",
          "Parking for up to 30 vehicles",
        ],
      },
      {
        heading: "Lower Level",
        body: "±9,000 sq ft of office, prep, and large event arena space with valet parking.",
        bullets: [
          "Office with private restroom",
          "2 fully equipped commercial kitchens",
          "Prep room",
          "Large walk-in refrigerator and freezer",
          "Dry storage area",
          "Event arena for up to 800 customers",
          "Valet parking for customer convenience",
        ],
      },
      {
        heading: "Sale Highlights",
        body: "Business sale with real estate. APN 2564-012012. Reviewing all offers.",
        bullets: [
          "Starting at $6,000,000",
          "Business sale with real estate",
          "APN 2564-012012",
          "Combined ±13,200 sq ft",
          "Total capacity up to 1,100 guests",
        ],
      },
    ],
    features: [
      "Turn-key banquet facility",
      "Business sale with real estate",
      "6500 Foothill Blvd, Tujunga",
      "±13,200 sq ft across two levels",
      "Multiple commercial kitchens",
      "Event capacity up to 800 guests",
      "Valet and on-site parking",
      "Starting at $6,000,000",
    ],
    images: [jazzveCollage.url, jazzveStorefront.url, jazzveFlorals.url],
  },
  {
    id: "R-002",
    slug: "santa-monica-asset-sale",
    type: "Asset Sale",
    title: "Santa Monica Restaurant — Turnkey Asset Sale",
    location: "Santa Monica (Los Angeles County)",
    coords: [34.0195, -118.4912],
    price: "$145,000",
    priceNote: "Available — Open & Active",
    sqft: "≈ 950 sq ft",
    leaseType: "Assignment of lease · Shopping center",
    badge: "Available",
    description:
      "Health Department permitted, turnkey restaurant in a Santa Monica shopping center. Open and operating with a fully equipped kitchen, 18-foot hood, and extra-large walk-in refrigerator.",
    longDescription: [
      "Turn-key, open-to-the-public, fully operational restaurant in a Santa Monica shopping center. Health Department permitted with an assignment of lease available to a qualified buyer.",
      "The 950 sq ft space is fitted out with a full commercial cooking line under an 18-foot hood and an extra-large walk-in refrigerator — ready for day-one service with no buildout delay.",
    ],
    sections: [
      {
        heading: "Deal Structure",
        body: "Asset sale with assignment of lease. Allocation supports the $145,000 purchase price.",
        bullets: [
          "Furniture, Fixtures & Equipment value: $35,000",
          "Buildout value: $60,000",
          "Goodwill: $50,000",
          "Health Department permitted",
          "Open and active operation",
        ],
      },
      {
        heading: "Lease Terms",
        body: "Assignment of lease in an established Santa Monica shopping center with steady foot traffic.",
        bullets: [
          "Base rent: $4,369.70 (first month)",
          "CAM: $1,771.50",
          "Total rent: $6,141.20",
          "3% annual increases",
          "Shopping center location",
        ],
      },
      {
        heading: "Included Equipment",
        body: "Complete commercial cooking line and cold storage in place — turnkey for the next operator.",
        bullets: [
          "18-foot Type 1 hood",
          "In-ground grease interceptor",
          "Extra-large walk-in refrigerator",
          "Convection oven",
          "Vertical broiler",
          "6-burner stove",
          "Flat grill",
          "Deep fryer",
          "Multi shelving and assorted racks",
        ],
      },
    ],
    features: [
      "≈ 950 sq ft turnkey restaurant",
      "Health Department permitted",
      "18-foot hood with full cooking line",
      "Extra-large walk-in refrigerator",
      "Open and active",
      "Shopping center location",
    ],
    images: [santaMonica1.url, santaMonica2.url],
  },
  {
    id: "R-003",
    slug: "wilshire-second-gen-lease",
    type: "Asset Sale",
    title: "New Lease — Second-Generation Equipped Restaurant",
    location: "2408 Wilshire Blvd, Santa Monica, CA",
    coords: [34.032541, -118.484189],
    price: "$10,000 / month",
    priceNote: "New lease · Negotiable · Zero $0 key money",
    leaseType: "Stand-alone building · New lease",
    description:
      "Second-generation equipped restaurant in a stand-alone building on Wilshire Blvd with a gated outdoor rear area for pop-ups, dining, birthday parties, and weddings.",
    longDescription: [
      "Second-generation equipped restaurant. Stand-alone building for lease with gated outdoor area at 2408 Wilshire Blvd., Santa Monica.",
      "New lease and rent starting at $10,000 per month, negotiable to ensure a smooth change of possession.",
      "Compelling Santa Monica opportunity at 24th Street, positioned to serve the area north of Santa Monica Blvd. with strong visibility and flexible event-driven use.",
    ],
    sections: [
      {
        heading: "Lease Opportunity",
        body: "For lease with a gated outdoor area suited for pop-ups, dining, birthday parties, and weddings, plus a fully equipped kitchen ready for service.",
        bullets: [
          "Stand-alone building",
          "New lease structure",
          "Negotiable rent for smooth possession",
          "Rear outdoor service and event area",
          "Strong Wilshire Blvd visibility",
        ],
      },
      {
        heading: "Included Equipment",
        body: "Type 1 commercial hood and a full cooking line already in place, along with the major refrigeration and prep pieces needed to operate.",
        bullets: [
          "12-foot Type 1 commercial hood",
          "Full cooking line under hood",
          "Walk-in refrigerator",
          "Freezer + additional refrigerators",
          "Refrigerated prep tables",
          "Stainless tables and counters",
          "Dishwasher and ice machine",
          "Dining area tables and chairs",
        ],
      },
    ],
    features: [
      "Stand-alone building",
      "Second-generation restaurant",
      "12-foot Type 1 hood",
      "Fully equipped kitchen",
      "Gated outdoor rear area",
      "Ideal for pop-ups, dining, and events",
    ],
    images: [wilshire3.url, wilshire1.url, wilshire2.url, wilshire4.url],
  },
  {
    id: "B-001",
    slug: "hardware-store-for-sale",
    type: "Business Sale",
    title: "Hardware Store for Sale",
    location: "Westwood Blvd, West LA",
    price: "$190,000",
    priceNote: "Negotiable + inventory",
    leaseType: "Business sale · Retail",
    badge: "Available",
    description:
      "Established hardware store for sale on Westwood Blvd, West LA. $190,000 negotiable plus inventory. Annual revenue $402,000. Established 2020.",
    longDescription: [
      "Established hardware store for sale on Westwood Blvd in West Los Angeles.",
      "Asking $190,000 negotiable plus inventory. Annual revenue of approximately $402,000. Business established in 2020 with one full-time employee.",
      "New lease to be negotiated with three 3-year extension options. Product categories include key duplication, tools, gardening, plumbing, electrical, home hardware, and more.",
    ],
    sections: [
      {
        heading: "Deal Highlights",
        body: "Straightforward business sale with training and escrow support included.",
        bullets: [
          "Asking price: $190,000 negotiable + inventory",
          "Annual revenue: approximately $402,000",
          "Established: 2020",
          "Employees: 1 full-time",
          "4 weeks of support & training included",
          "Co-brokering welcome",
        ],
      },
      {
        heading: "Lease Terms",
        body: "Lease commenced October 9, 2020. New lease terms to be negotiated with the landlord.",
        bullets: [
          "Base rent at commencement: $3,082.56 / mo",
          "Year 6 monthly base rent: $4,840.89 + CAM",
          "Three (3) 3-year options to extend",
          "Buyer reimburses Seller's security deposit through escrow",
          "FF&E sold in as-is condition",
        ],
      },
    ],
    features: [
      "Established hardware store",
      "Westwood Blvd, West LA location",
      "$190,000 + inventory",
      "$402,000 annual revenue",
      "Key duplication, tools, plumbing, electrical",
      "New lease negotiable",
    ],
    images: [hardwareStorefront.url, hardwareAisle.url],
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}
