import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Ruler, Flame, ArrowRight, Phone, Sparkles } from "lucide-react";
import { PHONE, PHONE_HREF } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { listings, type SaleType } from "@/lib/listings";
import { ListingsMap } from "@/components/site/ListingsMap";

export const Route = createFileRoute("/restaurants-for-sale/")({
  head: () => ({
    meta: [
      { title: "Restaurants For Sale in Los Angeles - Penthouse Advisors" },
      {
        name: "description",
        content:
          "Current LA restaurants for sale and restaurant asset sales. Turnkey concepts, hoods, lease assignments. Updated weekly.",
      },
      { property: "og:title", content: "LA Restaurants For Sale - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Turnkey restaurants and asset sales across Los Angeles County.",
      },
    ],
  }),
  component: ListingsPage,
});

const filters: Array<"All" | SaleType> = ["All", "Business Sale", "Asset Sale", "Real Estate"];

function ListingsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const filtered = filter === "All" ? listings : listings.filter((l) => l.type === filter);

  return (
    <>
      <PageHero
        eyebrow="Current Inventory"
        title="Restaurants for sale"
        accent="in Los Angeles."
        subtitle="A snapshot of what we're moving right now. Call for off-market opportunities not shown here."
      />

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

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <article
              key={l.id}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:border-gold/60 transition shadow-elegant flex flex-col"
            >
              <Link
                to="/restaurants-for-sale/$slug"
                params={{ slug: l.slug }}
                className="relative h-52 border-b border-border overflow-hidden block"
              >
                {l.images && l.images.length > 0 ? (
                  <img
                    src={l.images[0]}
                    alt={l.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-muted to-card flex items-center justify-center">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, oklch(0.78 0.13 85) 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <Flame className="relative h-12 w-12 text-gold/50" />
                  </div>
                )}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-1 text-xs font-semibold text-gold backdrop-blur">
                  {l.type}
                </span>
                {l.badge && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-gold-gradient text-charcoal-deep px-2.5 py-1 text-xs font-bold shadow-gold">
                    <Sparkles className="h-3 w-3" /> {l.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 text-xs font-mono text-white/90 bg-black/40 px-1.5 py-0.5 rounded">
                  {l.id}
                </span>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-display font-bold">
                  <Link
                    to="/restaurants-for-sale/$slug"
                    params={{ slug: l.slug }}
                    className="hover:text-gold transition"
                  >
                    {l.title}
                  </Link>
                </h3>
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> {l.location}
                </div>
                {l.sqft && (
                  <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Ruler className="h-3.5 w-3.5 text-gold" /> {l.sqft} · {l.leaseType}
                  </div>
                )}
                {!l.sqft && (
                  <div className="mt-1 text-sm text-muted-foreground">{l.leaseType}</div>
                )}
                {l.description && (
                  <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{l.description}</p>
                )}
                {l.price && (
                  <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl font-display font-extrabold text-gold tabular-nums">
                      {l.price}
                    </span>
                    {l.priceNote && (
                      <span className="text-xs uppercase tracking-wider text-gold/70">
                        {l.priceNote}
                      </span>
                    )}
                  </div>
                )}
                <ul className="mt-4 grid grid-cols-2 gap-1.5 text-xs text-foreground/85">
                  {l.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-gold" /> {f}
                    </li>
                  ))}
                </ul>
                {l.images && l.images.length > 1 && (
                  <div className="mt-4 grid grid-cols-3 gap-1.5">
                    {l.images.slice(1, 4).map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${l.title} ${i + 2}`}
                        className="h-16 w-full object-cover rounded border border-border"
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}
                <div className="mt-6 flex flex-col gap-2">
                  <Link
                    to="/restaurants-for-sale/$slug"
                    params={{ slug: l.slug }}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-gradient px-4 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
                  >
                    View Full Listing <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/40 px-4 py-2.5 text-sm font-semibold hover:bg-gold/10"
                  >
                    Contact Agent
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-gold/80 font-semibold">
                Map View
              </div>
              <h2 className="mt-1 text-2xl md:text-3xl font-display font-bold">
                Listings across Los Angeles
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Click a gold pin to preview a listing and jump to full details.
            </p>
          </div>
          <ListingsMap />
        </div>

        <div className="mt-14 rounded-2xl border border-gold/40 bg-card p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold">
            Looking for something specific?
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tell us your budget, area, and concept - we'll source it off-market.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold hover:bg-gold/10"
            >
              <Phone className="h-4 w-4 text-gold" /> {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
