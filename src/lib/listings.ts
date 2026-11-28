import santaMonica1 from "@/assets/santa-monica-1.png";
import santaMonica2 from "@/assets/santa-monica-2.png";
import restaurantFullyEquipped1 from "@/assets/restaurant-fully-equipped-1.jpeg";
import restaurantFullyEquipped2 from "@/assets/restaurant-fully-equipped-2.jpeg";
import restaurantFullyEquipped3 from "@/assets/restaurant-fully-equipped-3.jpeg";
import restaurantFullyEquipped4 from "@/assets/restaurant-fully-equipped-4.jpeg";
import melroseMassageSpa1 from "@/assets/melrose-massage-spa-1.jpeg";
import melroseMassageSpa2 from "@/assets/melrose-massage-spa-2.jpeg";
import melroseMassageSpa3 from "@/assets/melrose-massage-spa-3.jpeg";
import melroseMassageSpa4 from "@/assets/melrose-massage-spa-4.jpeg";
import coffeeShopAssetSale1 from "@/assets/coffee-shop-asset-sale-1.webp";
import coffeeCafeRestaurantCombined1 from "@/assets/coffee-cafe-restaurant-combined-1.webp";

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
  /** Numeric public asking price for structured data; omit when the page shows a range. */
  offerPrice?: number;
  /** Lease listings use LeaseOut rather than a sale offer in structured data. */
  offerType?: "sale" | "lease";
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
    id: "R-004",
    slug: "melrose-massage-spa-asset-sale",
    type: "Asset Sale",
    title: "FIRE SALE - Massage Spa located on Melrose Ave",
    location: "7420 Melrose Ave, Los Angeles, CA 90046",
    coords: [34.0835145, -118.3516022],
    price: "$37,000",
    offerPrice: 37000,
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
    images: [melroseMassageSpa1, melroseMassageSpa2, melroseMassageSpa3, melroseMassageSpa4],
  },
  {
    id: "R-006",
    slug: "restaurant-fully-equipped-asset-sale",
    type: "Asset Sale",
    title: "Restaurant Fully Equipped Top of the Line Asset Sale",
    location: "6535 Melrose Ave, Los Angeles, CA 90038",
    coords: [34.0835425, -118.3378551],
    price: "$375,000",
    offerPrice: 375000,
    priceNote: "Asset Sale · Total Rent $17,158.50 / month",
    sqft: "2,542 sq ft",
    leaseType: "Restaurant · Fully equipped",
    badge: "Available Now",
    description:
      "Restaurant Fully Equipped Top of the Line Asset Sale. Base Rent: $14,616.50. NNN: $2,542. Total Rent: $17,158.50. Square Footage: 2,542. $375,000.",
    longDescription: [
      "Restaurant Fully Equipped Top of the Line Asset Sale.",
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
    images: [
      restaurantFullyEquipped1,
      restaurantFullyEquipped2,
      restaurantFullyEquipped3,
      restaurantFullyEquipped4,
    ],
  },
  {
    id: "R-007",
    slug: "coffee-cafe-and-restaurant-combined-sale",
    type: "Asset Sale",
    title: "Coffee Cafe and Restaurant Combined For Sale",
    location:
      "1612 Santa Monica Blvd, Santa Monica, CA 90404 & 12200 Wilshire Blvd, Los Angeles, CA 90025",
    coords: [34.0257669, -118.4834686],
    price: "$585,000",
    offerPrice: 585000,
    priceNote: "2 Restaurants sold together",
    leaseType: "Restaurant + Coffee Cafe · Combined sale",
    badge: "2 Locations",
    description:
      "Coffee Cafe and Restaurant combined for sale. The Restaurant at 1612 Santa Monica Blvd in Santa Monica does the cooking and baking for the Cafe at 12200 Wilshire Blvd in West Los Angeles. We are selling 2 Restaurants combined. $585,000.",
    longDescription: [
      "Coffee Cafe and Restaurant combined for sale.",
      "The Restaurant at 1612 Santa Monica Blvd in Santa Monica does the cooking and baking for the Cafe at 12200 Wilshire Blvd in West Los Angeles.",
      "We are selling 2 Restaurants combined.",
      "$585,000.",
    ],
    sections: [
      {
        heading: "Full Dine-In Restaurant — 1612 Santa Monica Blvd, Santa Monica",
        body: "Fully Equipped and Permitted. Does the cooking and baking for the Coffee Cafe.",
        bullets: [
          "Fully Equipped and Permitted",
          "Large Walk-In fridge",
          "18 foot hood",
          "Shopping Center Parking Lot and Off-street parking",
          "Rent approximately $6,500",
        ],
      },
      {
        heading: "Coffee Cafe — 12200 Wilshire Blvd, Los Angeles, CA 90025",
        body: "Turn Key, Permitted & ready in West Los Angeles.",
        bullets: [
          "Large walk-in refrigerator and Freezer",
          "No Hood",
          "Turn Key",
          "Permitted & ready",
          "Rent approximately $7,600",
        ],
      },
    ],
    features: [
      "$585,000 for both locations",
      "2 Restaurants sold together",
      "Santa Monica Restaurant: Fully Equipped and Permitted",
      "Santa Monica Restaurant: Large Walk-In fridge, 18 foot hood",
      "Santa Monica Restaurant: Rent approximately $6,500",
      "Santa Monica Restaurant: Shopping Center Parking Lot and Off-street parking",
      "Wilshire Coffee Cafe: Turn Key, Permitted & ready",
      "Wilshire Coffee Cafe: Large walk-in refrigerator and Freezer",
      "Wilshire Coffee Cafe: No Hood, Rent approximately $7,600",
    ],
    images: [santaMonica1, coffeeShopAssetSale1, santaMonica2, coffeeCafeRestaurantCombined1],
  },
];

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}
