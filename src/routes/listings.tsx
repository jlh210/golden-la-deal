import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, DollarSign, ArrowRight, Lock } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Listings — Restaurants For Sale & 2nd Gen Spaces in LA | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Browse current LA restaurants for sale and second-generation restaurant spaces available. Confidential listings — call for full package.",
      },
      { property: "og:title", content: "LA Restaurant Listings — Penthouse Advisors" },
      {
        property: "og:description",
        content: "Restaurants for sale and 2nd gen spaces across Los Angeles.",
      },
    ],
  }),
  component: ListingsPage,
});

type ListingType = "For Sale" | "2nd Gen Space";
type Listing = {
  id: string;
  type: ListingType;
  cuisine: string;
  area: string;
  size: string;
  price: string;
  highlight: string;
};

const listings: Listing[] = [
  { id: "L-1041", type: "For Sale", cuisine: "Italian Trattoria", area: "West Hollywood", size: "2,400 sq ft", price: "$685,000", highlight: "Type 47 license included" },
  { id: "L-1042", type: "For Sale", cuisine: "Sushi / Omakase", area: "Beverly Hills", size: "1,800 sq ft", price: "$1.2M", highlight: "Established 8 years, A-rated" },
  { id: "L-1043", type: "2nd Gen Space", cuisine: "Vented Kitchen", area: "Silver Lake", size: "1,650 sq ft", price: "$8,200/mo NNN", highlight: "Type I hood, grease trap installed" },
  { id: "L-1044", type: "For Sale", cuisine: "Coffee / Cafe", area: "Culver City", size: "1,100 sq ft", price: "$240,000", highlight: "Walk-in, full FFE" },
  { id: "L-1045", type: "2nd Gen Space", cuisine: "Bar / Lounge", area: "Downtown LA", size: "3,200 sq ft", price: "$14,500/mo NNN", highlight: "CUP-eligible, late-hours zoning" },
  { id: "L-1046", type: "For Sale", cuisine: "Mexican Cocina", area: "San Gabriel Valley", size: "2,100 sq ft", price: "$415,000", highlight: "Strong cash flow, owner retiring" },
  { id: "L-1047", type: "2nd Gen Space", cuisine: "Pizza / QSR", area: "Long Beach", size: "1,400 sq ft", price: "$6,800/mo NNN", highlight: "Stone deck oven in place" },
  { id: "L-1048", type: "For Sale", cuisine: "Wine Bar", area: "Studio City", size: "1,900 sq ft", price: "$520,000", highlight: "Type 41 license, patio approved" },
];

const filters: Array<"All" | ListingType> = ["All", "For Sale", "2nd Gen Space"];

function ListingsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const filtered = filter === "All" ? listings : listings.filter((l) => l.type === filter);

  return (
    <SiteLayout>
      <section className="bg-hero border-b border-border">
        <div className="container-x py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Current Inventory</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-display font-extrabold leading-[1.05]">
            Restaurants for sale &{" "}
            <span className="text-gradient-gold">2nd-gen spaces</span> in LA.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            A snapshot of what we're moving right now. Full financials and addresses
            released after NDA. Call for off-market opportunities.
          </p>
        </div>
      </section>

      <section className="container-x py-12 md:py-16">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                filter === f
                  ? "bg-gold-gradient text-charcoal-deep border-transparent shadow-gold"
                  : "border-border text-foreground/80 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
          </span>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <div
              key={l.id}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-gold/60 transition shadow-elegant"
            >
              <div className="relative h-44 bg-gradient-to-br from-charcoal to-charcoal-deep border-b border-border flex items-center justify-center">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, oklch(0.78 0.13 85) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <span className="relative font-display text-3xl font-extrabold text-gold/40">
                  {l.id}
                </span>
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-1 text-xs font-semibold text-gold">
                  {l.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-display font-bold">{l.cuisine}</h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> {l.area} · {l.size}
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-gold font-bold">
                  <DollarSign className="h-4 w-4" /> {l.price}
                </div>
                <p className="mt-3 text-sm text-foreground/80">{l.highlight}</p>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold"
                >
                  <Lock className="h-3.5 w-3.5" /> Request details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-gold/40 bg-charcoal-deep p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Looking for something specific?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Most of our deals never hit this page. Tell us what you need.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
          >
            Get matched <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
