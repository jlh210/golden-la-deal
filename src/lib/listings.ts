import wilshire1 from "@/assets/wilshire-1.png";
import wilshire2 from "@/assets/wilshire-2.png";
import wilshire3 from "@/assets/wilshire-3.png";
import wilshire4 from "@/assets/wilshire-4.png";
import santaMonica1 from "@/assets/santa-monica-1.png";
import santaMonica2 from "@/assets/santa-monica-2.png";
import dentalOffice from "@/assets/dental-office-for-lease.png";

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
    title: "Therapy & Dental Space For Lease",
    location: "West LA",
    price: "$4,800 – $5,850 / month",
    priceNote: "All-in · First & last month and security deposit",
    leaseType: "Doctor, therapy & dental offices · Building zoned medical use",
    badge: "Available Now",
    description:
      "Doctor, therapy and dental offices in a building zoned medical use, West LA. Available inside a beautiful building. The second floor offices for lease are a 7 room doctor/therapy office at $5,850 per month all-in, plus a 4 room, plumbed dental office at $4,800 per month all-in. Available now.",
    longDescription: [
      "Doctor, Therapy & Dental Offices West LA — offices in a building zoned medical use, West LA, available inside a beautiful building.",
      "The second floor offices for lease are a 7 room doctor/therapy office at $5,850 per month all-in, plus a 4 room, plumbed dental office at $4,800 per month all-in. Available now.",
      "First & last month and security deposit.",
    ],
    sections: [
      {
        heading: "Second Floor — Doctor/Therapy Office",
        body: "Doctor/therapy office with 7 rooms. Rent $5,850 per month, all-in. Available now.",
        bullets: ["7 rooms", "$5,850 per month, all-in", "First & last month and security deposit"],
      },
      {
        heading: "Second Floor — Plumbed Dental Office",
        body: "4 room, plumbed dental office. Rent $4,800 per month, all-in. Available now.",
        bullets: [
          "4 rooms, plumbed",
          "$4,800 per month, all-in",
          "First & last month and security deposit",
        ],
      },
    ],
    features: [
      "Building zoned medical use",
      "Doctor, therapy & dental offices",
      "Beautiful building, West LA",
      "Second floor 7 room doctor/therapy office",
      "$5,850/month, all-in",
      "4 room, plumbed dental office",
      "$4,800/month, all-in",
      "Available now",
      "First & last month and security deposit",
    ],
    images: [dentalOffice],
  },
  {
    id: "R-002",
    slug: "santa-monica-asset-sale",
    type: "Asset Sale",
    title: "Santa Monica Restaurant — Turnkey Asset Sale",
    location: "Santa Monica (Los Angeles County)",
    coords: [34.0195, -118.4912],
    price: "$80,000",
    priceNote: "Available — Open & Active",
    sqft: "≈ 950 sq ft",
    leaseType: "Assignment of lease · Shopping center",
    badge: "Available Now",
    description:
      "Health Department permitted, turnkey restaurant in a Santa Monica shopping center. Open and operating with a fully equipped kitchen, 18-foot hood, and extra-large walk-in refrigerator.",
    longDescription: [
      "Turn-key, open-to-the-public, fully operational restaurant in a Santa Monica shopping center. Health Department permitted with an assignment of lease available to a qualified buyer.",
      "The 950 sq ft space is fitted out with a full commercial cooking line under an 18-foot hood and an extra-large walk-in refrigerator — ready for day-one service with no buildout delay.",
    ],
    sections: [
      {
        heading: "Deal Structure",
        body: "Asset sale with assignment of lease. Allocation supports the $80,000 purchase price.",
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
    images: [santaMonica1, santaMonica2],
  },
  {
    id: "R-003",
    slug: "wilshire-second-gen-lease",
    type: "Asset Sale",
    title: "Gym and Coffee Shop Facility on the entire Property Lot",
    location: "2408 Wilshire Blvd, Santa Monica, CA",
    coords: [34.032541, -118.484189],
    price: "$10,000 / month All-In",
    priceNote: "Rent starts at $8,825 plus NNN · Long lease available",
    sqft: "1,150 sq ft",
    leaseType: "Single story, stand-alone building · Use: Gym & Coffee Shop",
    badge: "Available Now",
    description:
      "Gym and Coffee Shop Facility on the entire Property Lot. The Lot has a 1,150 sqft., Single Story, Stand-alone air conditioned building for Gym and Coffee Shop, equipped with a commercial kitchen to prepare high quality coffee and Smoothies, plus a walk-in refrigerator.",
    longDescription: [
      "Gym and Coffee Shop Facility on the entire Property Lot.",
      "The Lot has a 1,150 sqft., Single Story, Stand-alone air conditioned building for Gym and Coffee Shop, equipped with a commercial kitchen to prepare high quality coffee and Smoothies, plus a walk-in refrigerator.",
      "Key: The Property has a large, covered rear area gated for outdoor Gym. Private Employee Rear Parking.",
      "Long lease is available. Rent starts at $8,825 plus NNN, TOTAL $10,000 per month all-in.",
      "Call to Visit this Santa Monica opportunity at 2408 Wilshire Blvd., and 24th Street.",
    ],
    sections: [
      {
        heading: "Lease Opportunity",
        body: "Gym and Coffee Shop Facility on the entire Property Lot, with a large, covered, gated rear area for an outdoor Gym and private employee rear parking.",
        bullets: [
          "1,150 sqft., single story, stand-alone building",
          "Air conditioned",
          "Commercial kitchen for high quality coffee and smoothies",
          "Walk-in refrigerator",
          "Large, covered rear area gated for outdoor Gym",
          "Private employee rear parking",
          "Long lease is available",
          "Rent starts at $8,825 plus NNN",
          "TOTAL $10,000 per month all-in",
        ],
      },
    ],
    features: [
      "1,150 sqft. stand-alone building",
      "Single story, air conditioned",
      "Use: Gym & Coffee Shop",
      "Commercial kitchen & walk-in refrigerator",
      "Covered, gated rear area for outdoor Gym",
      "Private employee rear parking",
      "Long lease available",
      "$8,825 plus NNN · $10,000 per month all-in",
      "Wilshire at 24th Street, Santa Monica",
    ],
    images: [wilshire3, wilshire1, wilshire2, wilshire4],
  },
  {
    id: "R-004",
    slug: "melrose-massage-spa-asset-sale",
    type: "Asset Sale",
    title: "FIRE SALE - Massage Spa located on Melrose Ave",
    location: "Melrose Ave, Los Angeles",
    price: "$37,000",
    priceNote: "Asking · Make an offer",
    sqft: "850 sq ft",
    leaseType: "Retail massage · Full buildout · New lease negotiable",
    badge: "Fire Sale",
    description:
      "FIRE SALE - Massage Spa located on Melrose Ave. Fully Built Out - Turn Key. Asking $37,000 - Make an offer. New Lease Negotiable. Base Rent $3,000, NNN $500, 850 square feet. Current customer list goes to Buyer and the Massage Specialist is willing to stay.",
    longDescription: [
      "FIRE SALE - Massage Spa located on Melrose Ave. Fully Built Out - Turn Key.",
      "Asking $37,000 - Make an offer.",
      "New Lease Negotiable. Base Rent: $3,000. NNN: $500. 850 Square Footage.",
      "Current Customer list goes to Buyer. Massage Specialist willing to stay.",
      "New Lease upon landlord approval.",
    ],
    sections: [
      {
        heading: "Deal Structure",
        body: "Retail massage full buildout asset sale. Asking $37,000 - make an offer.",
        bullets: [
          "Fully Built Out - Turn Key",
          "Asking $37,000 - Make an offer",
          "Current Customer list goes to Buyer",
          "Massage Specialist willing to stay",
        ],
      },
      {
        heading: "Lease Terms",
        body: "New Lease Negotiable, upon landlord approval.",
        bullets: [
          "Base Rent: $3,000",
          "NNN: $500",
          "850 Square Footage",
          "New Lease upon landlord approval",
        ],
      },
    ],
    features: [
      "Fully Built Out - Turn Key",
      "Asking $37,000 - Make an offer",
      "New Lease Negotiable",
      "Base Rent: $3,000",
      "NNN: $500",
      "850 Square Footage",
      "Current Customer list goes to Buyer",
      "Massage Specialist willing to stay",
      "New Lease upon landlord approval",
    ],
  },
  {
    id: "R-005",
    slug: "coffee-shop-asset-sale",
    type: "Asset Sale",
    title: "Coffee Shop Asset Sale",
    location: "Los Angeles County",
    price: "$585,000",
    priceNote: "Turn Key ready",
    leaseType: "Coffee shop · Shopping center",
    badge: "Turn Key",
    description:
      "Coffee Shop Asset Sale. Turn Key ready. Fully Equipped and Permitted. Large Walk-In. Shopping Center Parking Lot and Off-street parking. $585,000.",
    longDescription: [
      "Coffee Shop Asset Sale. Turn Key ready.",
      "Fully Equipped and Permitted. Large Walk-In.",
      "Shopping Center Parking Lot and Off-street parking.",
      "$585,000.",
    ],
    sections: [
      {
        heading: "Deal Structure",
        body: "Coffee shop asset sale. Turn Key ready. $585,000.",
        bullets: [
          "Turn Key ready",
          "Fully Equipped and Permitted",
          "Large Walk-In",
          "Shopping Center Parking Lot and Off-street parking",
          "$585,000",
        ],
      },
    ],
    features: [
      "Turn Key ready",
      "Fully Equipped and Permitted",
      "Large Walk-In",
      "Shopping Center Parking Lot and Off-street parking",
      "$585,000",
    ],
  },
  {
    id: "R-006",
    slug: "restaurant-fully-equipped-asset-sale",
    type: "Asset Sale",
    title: "Restaurant Fully Equipped Top of the Line, Asset Sale",
    location: "Los Angeles County",
    price: "$375,000",
    priceNote: "Asset Sale · Total Rent $17,158.50 / month",
    sqft: "2,542 sq ft",
    leaseType: "Restaurant · Fully equipped",
    badge: "Available Now",
    description:
      "Restaurant Fully Equipped Top of the Line, Asset Sale. Base Rent: $14,616.50. NNN: $2,542. Total Rent: $17,158.50. Square Footage: 2,542. $375,000.",
    longDescription: [
      "Restaurant Fully Equipped Top of the Line, Asset Sale.",
      "Base Rent: $14,616.50. NNN: $2,542. Total Rent: $17,158.50.",
      "Square Footage: 2,542.",
      "$375,000.",
    ],
    sections: [
      {
        heading: "Deal Structure",
        body: "Restaurant asset sale. Fully Equipped Top of the Line. $375,000.",
        bullets: ["Fully Equipped Top of the Line", "Asset Sale", "$375,000"],
      },
      {
        heading: "Lease Terms",
        body: "Base Rent $14,616.50 plus NNN $2,542, Total Rent $17,158.50.",
        bullets: [
          "Base Rent: $14,616.50",
          "NNN: $2,542",
          "Total Rent: $17,158.50",
          "Square Footage: 2,542",
        ],
      },
    ],
    features: [
      "Fully Equipped Top of the Line",
      "Asset Sale",
      "Base Rent: $14,616.50",
      "NNN: $2,542",
      "Total Rent: $17,158.50",
      "Square Footage: 2,542",
      "$375,000",
    ],
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}
