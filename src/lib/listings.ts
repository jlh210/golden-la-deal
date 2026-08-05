import wilshire1 from "@/assets/wilshire-1.png.asset.json";
import wilshire2 from "@/assets/wilshire-2.png.asset.json";
import wilshire3 from "@/assets/wilshire-3.png.asset.json";
import wilshire4 from "@/assets/wilshire-4.png.asset.json";
import santaMonica1 from "@/assets/santa-monica-1.png.asset.json";
import santaMonica2 from "@/assets/santa-monica-2.png.asset.json";
import hardwareStorefront from "@/assets/hardware-storefront.png.asset.json";
import hardwareAisle from "@/assets/hardware-aisle.png.asset.json";
import dentalOffice from "@/assets/dental-office-for-lease.png.asset.json";
import tujunga1 from "@/assets/tujunga-1.jpg.asset.json";
import tujunga2 from "@/assets/tujunga-2.jpg.asset.json";
import tujunga3 from "@/assets/tujunga-3.jpg.asset.json";
import tujunga4 from "@/assets/tujunga-4.jpg.asset.json";
import jazzveCollage from "@/assets/jazzve-venue-collage.png.asset.json";
import jazzveStorefront from "@/assets/jazzve-storefront.png.asset.json";
import jazzveFlorals from "@/assets/jazzve-florals.png.asset.json";

export type SaleType =
  | "Business Sale"
  | "Asset Sale"
  | "Real Estate"
  | "Real Estate For Sale"
  | "Medical / Dental";

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
    title: "Doctor, Therapy & Dental Offices Medical Use, West LA",
    location: "West LA",
    price: "$4,800 / month",
    priceNote: "Total, all-in · First month and security deposit",
    leaseType: "Doctor, therapy & dental offices · Building zoned medical use",
    badge: "New Listing",
    description:
      "Doctor, therapy and dental offices in a building zoned medical use, West LA. Available inside a beautiful building. The second floor has a multiple room dental office, plumbed and not plumbed, with each room supplied with air and water lines. Rent $4,800 per month total, all-in.",
    longDescription: [
      "Doctor, Therapy & Dental Offices Medical Use, West LA — offices in a building zoned medical use, West LA, available inside a beautiful building.",
      "The second floor has a multiple room dental office, plumbed and not plumbed. Each room is supplied with air and water lines.",
      "Rent $4,800 per month total, all-in. First month and security deposit.",
    ],
    features: [
      "Building zoned medical use",
      "Doctor, therapy & dental offices",
      "Beautiful building, West LA",
      "Second floor multiple room dental office",
      "Rooms plumbed and not plumbed",
      "Air and water lines in each room",
      "$4,800/month total, all-in",
      "First month and security deposit",
    ],
    images: [dentalOffice.url],
  },
  {
    id: "RE-001",
    slug: "jazzve-garden-tujunga",
    type: "Real Estate For Sale",
    title: "Restaurant and Real Estate — Tujunga, CA For Sale",
    location: "Tujunga, CA 91042",
    coords: [34.244886, -118.273479],
    price: "Starting at $5,000,000",
    sqft: "≈ 13,200 sq ft",
    leaseType: "Restaurant and real estate · Banquet facility",
    badge: "Available",
    description:
      "Exceptional banquet facility with premium real estate located in Tujunga, California 91042. Turn-key ready with multiple commercial kitchens, dining areas, and bars, built to host weddings and celebrations.",
    longDescription: [
      "Restaurant and real estate for sale in Tujunga, CA — an exceptional banquet facility with premium real estate located in Tujunga, California 91042. Built to host weddings and celebrations with a sense of ease and elegance.",
      "Call to tour this exceptional, turn-key ready banquet facility with multiple commercial kitchens, dining areas, and bars designed to bring people together in a setting that feels both elevated and welcoming.",
      "The premises offers a harmonious balance between sophistication and warmth—making every occasion feel deeply personal and truly memorable.",
    ],
    sections: [
      {
        heading: "Top Floor — Street Level",
        body: "±4,200 sq ft of second-generation, vacant, equipped restaurant space with an outdoor kitchen at the front of the property for serving guests passing by.",
        bullets: [
          "Fully equipped commercial kitchen",
          "Walk-in refrigerator and freezer",
          "Dry storage area",
          "Dining area and permissible hookah lounge area",
          "Outdoor kitchen at the front of the property",
          "Great visibility for branding",
          "Hosts up to 300 customers",
          "Parking for up to 30 vehicles",
        ],
      },
      {
        heading: "Lower Level",
        body: "±9,000 sq ft of office, kitchen, prep, and event arena space with valet parking for customer convenience.",
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
    ],
    features: [
      "Restaurant and real estate for sale",
      "Tujunga, CA 91042",
      "±4,200 sq ft top floor, street level",
      "±9,000 sq ft lower level",
      "Multiple fully equipped commercial kitchens",
      "Permissible hookah lounge area",
      "Event arena for up to 800 customers",
      "Parking for up to 30 vehicles plus valet",
      "Starting at $5,000,000",
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
    title: "Dispensary Space For Lease Inside a Second-Generation Restaurant",
    location: "2408 Wilshire Blvd, Santa Monica, CA",
    coords: [34.032541, -118.484189],
    price: "$15,000 / month All-In",
    priceNote: "Rent abatement allowance for permitting · New lease",
    leaseType:
      "Stand-alone building · Dispensary space inside an equipped, second-generation restaurant",
    description:
      "Dispensary space for lease inside an equipped, second-generation restaurant. Stand-alone building on Wilshire Blvd with a large rear open patio ideal for pop-ups, dining, and events, plus free rear parking on Wilshire Blvd and 24th Street.",
    longDescription: [
      "Dispensary space for lease, inside an equipped, second-generation restaurant. Stand-alone building with a large rear open patio located at 2408 Wilshire Blvd., Santa Monica.",
      "New lease at $15,000 per month all-in with a rent abatement allowance for permitting.",
      "Compelling Santa Monica opportunity at 24th Street, positioned to serve the area north of Santa Monica Blvd. with strong visibility, free rear parking on Wilshire Blvd and 24th Street, and flexible event-driven use.",
    ],
    sections: [
      {
        heading: "Lease Opportunity",
        body: "For lease with a large rear open patio ideal for pop-ups, dining, and events, plus a fully equipped kitchen ready for service.",
        bullets: [
          "Stand-alone building",
          "New lease structure",
          "$15,000 per month all-in",
          "Rent abatement allowance for permitting",
          "Large rear open patio",
          "Free rear parking on Wilshire Blvd and 24th Street",
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
      "Dispensary space inside an equipped, second-generation restaurant",
      "12-foot Type 1 hood",
      "Fully equipped kitchen",
      "Large rear open patio",
      "Ideal for pop-ups, dining, and events",
      "Free rear parking on Wilshire Blvd and 24th Street",
      "Rent abatement allowance for permitting",
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
