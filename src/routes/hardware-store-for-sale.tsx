import { createFileRoute, Link } from "@tanstack/react-router";
import { Store, MapPin, Calendar, ArrowRight, FileText, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import storefront from "@/assets/hardware-storefront.png";
import aisle from "@/assets/hardware-aisle.png";

import { breadcrumbScript } from "@/lib/seo";
export const Route = createFileRoute("/hardware-store-for-sale")({
  head: () => ({
    meta: [
      { title: "Hardware Store For Sale - Westwood Blvd, West LA | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Established hardware store for sale on Westwood Blvd, West LA. $125,000 cash. Revenue $402,000/yr. Established 2020.",
      },
      { property: "og:title", content: "Hardware Store For Sale - West LA" },
      {
        property: "og:description",
        content: "Established hardware store on Westwood Blvd. $125k cash.",
      },
      { property: "og:image", content: storefront },
      { property: "twitter:image", content: storefront },
      { property: "og:url", content: "https://www.penthouseadvisors.com/hardware-store-for-sale" },
    ],
    links: [{ rel: "canonical", href: "https://www.penthouseadvisors.com/hardware-store-for-sale" }],
    scripts: [
      breadcrumbScript([{name:"Home",path:"/"},{name:'Hardware Store For Sale',path:'/hardware-store-for-sale'}]),
    ],
  }),
  component: HardwarePage,
});

const specs = [
  { label: "Asking Price", value: "$125,000", note: "Cash" },
  { label: "Annual Revenue", value: "$402,000 / yr" },
  { label: "Year Established", value: "2020" },
  { label: "Employees", value: "1 Full-Time" },
  { label: "Location", value: "Westwood Blvd, West LA" },
  { label: "Lease Commenced", value: "Oct 9, 2020" },
];

const productCategories = [
  "Key Duplication",
  "Tools",
  "Gardening",
  "Plumbing & Accessories",
  "Electrical",
  "Light Bulbs",
  "Shower Doors",
  "Closet Doors",
  "Screens – Fabrication",
  "Faucets",
  "Toilets",
  "Home Hardware",
  "Painting Accessories",
  "Cleaning Supplies",
  "Fuses",
  "Pesticides",
  "Landscaping Tools",
  "Kitchen & Bath Hardware",
  "Batteries",
  "Ropes",
  "Spray Paints",
  "Locks",
];

const leaseTerms = [
  "New lease to be negotiated",
  "Lease commenced October 9, 2020",
  "Base rent at commencement: $3,082.56 / mo",
  "Year 6 monthly base rent: $4,840.89 + CAM",
  "Three (3) 3-year options to extend",
  "Buyer reimburses Seller's security deposit through escrow",
  "FF&E sold in as-is condition",
  "4 weeks of support & training included",
  "Co-brokering welcome",
];

const escrowDetails = [
  "Tower Escrow — 3400 W Olympic Blvd, Ste 201, Los Angeles, CA 90019",
  "Escrow balances Seller's past-due bills, loans, debts, CDTFA, EDD, FTB, property tax, and utilities through Seller's proceeds",
  "Escrow fees and closing
