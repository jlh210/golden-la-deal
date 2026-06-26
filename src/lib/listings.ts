import tujunga1 from "@/assets/tujunga-1.jpg.asset.json";
import tujunga2 from "@/assets/tujunga-2.jpg.asset.json";
import tujunga3 from "@/assets/tujunga-3.jpg.asset.json";
import tujunga4 from "@/assets/tujunga-4.jpg.asset.json";

export type SaleType = "Business Sale" | "Asset Sale" | "Real Estate";

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
    id: "RE-001",
    slug: "jazzve-garden-tujunga",
    type: "Real Estate",
    title: "Jazzve Garden — Banquet Facility + Real Estate",
    location: "6500 Foothill Blvd, Tujunga, CA 91042",
    price: "Starting at $6,000,000",
    priceNote: "Reviewing All Offers",
    leaseType: "Real estate sale · APN 2564-012012",
    badge: "Just Listed",
    description:
      "Built to host weddings and celebrations with a sense of ease and elegance. Turn-key banquet facility with multiple commercial kitchens, dining areas, and bars — sophistication and warmth in one venue.",
    longDescription: [
      "Built to host weddings and celebrations with a sense of ease, and elegance.",
      "Turn-Key Ready banquet facility with multiple commercial kitchens, dining areas, and bars — designed to bring people together in a setting that feels both elevated and welcoming.",
      "The premises offers a harmonious balance between sophistication and warmth — making every occasion feel deeply personal and truly memorable.",
    ],
    sections: [
      {
        heading: "Top Floor (Street Level) — ±4,200 sq ft",
        body: "Second-generation, vacant, equipped restaurant inside the Jazzve Garden. Great visibility for branding and perfect for hosting up to 300 customers.",
        bullets: [
          "Fully equipped commercial kitchen",
          "Walk-in refrigerator and freezer",
          "Dry storage area",
          "Dining area",
          "Permissible hookah lounge area",
          "Outdoor kitchen at front for serving passing guests",
          "Parking for up to 30 vehicles",
        ],
      },
      {
        heading: "Lower Level — ±9,000 sq ft",
        body: "Event arena perfect for hosting up to 800 customers. Valet parking ensures customer convenience.",
        bullets: [
          "Office with private restroom",
          "Two fully equipped commercial kitchens",
          "Prep room",
          "Large walk-in refrigerator and freezer",
          "Dry storage area",
          "Event arena (capacity up to 800)",
          "Valet parking",
        ],
      },
    ],
    features: [
      "±13,200 sq ft total (two levels)",
      "Multiple commercial kitchens",
      "Indoor + garden dining areas",
      "Hosts up to 800 guests",
      "Turn-key wedding & event venue",
      "Premium real estate included",
    ],
    images: [tujunga1.url, tujunga2.url, tujunga3.url, tujunga4.url],
  },
  {
    id: "R-001",
    slug: "silver-lake-pizzeria",
    type: "Business Sale",
    title: "Pizzeria - Turnkey",
    location: "Silver Lake (near Glendale)",
    price: "$75,975",
    priceNote: "Non-Negotiable",
    sqft: "≈ 1,200 sq ft",
    leaseType: "Lease assignment",
    features: ["Health Dept permitted", "12-ft hood", "Walk-in cooler", "Open and operating"],
  },
  {
    id: "R-002",
    slug: "santa-monica-asset-sale",
    type: "Asset Sale",
    title: "Restaurant Asset Sale",
    location: "Santa Monica",
    price: "$145,000",
    sqft: "≈ 2,000 sq ft",
    leaseType: "Assignment of lease",
    features: ["18-ft hood", "Full kitchen FF&E", "Dining room build-out", "Equipment NSF labeled"],
  },
  {
    id: "R-003",
    slug: "wilshire-second-gen-lease",
    type: "Business Sale",
    title: "Second-Generation Equipped Restaurant — Stand-Alone Building For Lease",
    location: "2408 Wilshire Blvd, Santa Monica, CA",
    price: "Call for Price",
    priceNote: "For Lease",
    leaseType: "Stand-alone building · Lease",
    description:
      "Rare stand-alone building on Wilshire Blvd in Santa Monica. Fully equipped second-generation restaurant with a gated outdoor rear area — ideal for patio dining, private events, or expanded service.",
    features: [
      "Stand-alone building",
      "Second-generation restaurant",
      "Fully equipped kitchen",
      "Gated outdoor rear area",
      "Prime Wilshire Blvd frontage",
      "Available for lease",
    ],
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}
