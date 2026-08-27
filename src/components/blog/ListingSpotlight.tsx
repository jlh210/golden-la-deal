import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { listings } from "@/lib/listings";

/**
 * A mid-article promo block that highlights currently available listings.
 * Placed inside blog posts (see BlogPostTemplate) so readers researching
 * the market see live inventory without leaving the article.
 */
export function ListingSpotlight() {
  const featured = [...listings]
    .sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0))
    .slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <div className="my-10 rounded-2xl border border-gold/40 bg-gold/[0.04] p-6 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
          <Sparkles className="h-3.5 w-3.5" /> Available Now
        </span>
        <Link
          to="/restaurants-for-sale"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
        >
          View all listings <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <p className="mt-2 text-sm text-foreground/70">
        While you're researching the market, here's what Penthouse Advisors has live right now.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {featured.map((l) => (
          <Link
            key={l.id}
            to="/restaurants-for-sale/$slug"
            params={{ slug: l.slug }}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:border-gold/60"
          >
            {l.images && l.images.length > 0 && (
              <div className="h-32 w-full overflow-hidden border-b border-border">
                <img
                  src={l.images[0]}
                  alt={l.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
            <div className="p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                {l.type}
              </span>
              <h4 className="mt-1 text-sm font-display font-bold leading-snug transition group-hover:text-gold">
                {l.title}
              </h4>
              <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-gold" /> {l.location}
              </div>
              {l.price && (
                <div className="mt-2 text-base font-display font-extrabold text-gold tabular-nums">
                  {l.price}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
