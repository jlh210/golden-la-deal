import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, Ruler, Phone, ArrowRight, Sparkles, Check } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF } from "@/components/site/Layout";
import { getListingBySlug, listings, type Listing } from "@/lib/listings";

export const Route = createFileRoute("/restaurants-for-sale/$slug")({
  loader: ({ params }) => {
    const listing = getListingBySlug(params.slug);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => {
    const l = loaderData?.listing;
    if (!l) return { meta: [{ title: "Listing — Penthouse Advisors" }] };
    const desc = l.description ?? l.longDescription?.[0] ?? l.title;
    const image = l.images?.[0];
    return {
      meta: [
        { title: `${l.title} — Penthouse Advisors` },
        { name: "description", content: desc },
        { property: "og:title", content: l.title },
        { property: "og:description", content: desc },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl font-display font-bold">Listing not found</h1>
        <p className="mt-3 text-muted-foreground">This listing may have been sold or removed.</p>
        <Link
          to="/restaurants-for-sale"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-gold-gradient px-6 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-display font-bold">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold hover:bg-gold/10"
        >
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
  component: ListingDetail,
});

function ListingDetail() {
  const { listing: l } = Route.useLoaderData() as { listing: Listing };
  const [active, setActive] = useState(0);
  const other = listings.filter((x) => x.slug !== l.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="container-x pt-8 pb-4">
        <Link
          to="/restaurants-for-sale"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> All listings
        </Link>
      </section>

      <section className="container-x pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-2.5 py-1 font-semibold text-gold">
            {l.type}
          </span>
          {l.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-gradient text-charcoal-deep px-2.5 py-1 font-bold shadow-gold">
              <Sparkles className="h-3 w-3" /> {l.badge}
            </span>
          )}
          <span className="font-mono text-muted-foreground">{l.id}</span>
        </div>
        <h1 className="mt-3 text-3xl md:text-5xl font-display font-bold leading-tight">
          {l.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-gold" /> {l.location}
          </span>
          {l.sqft && (
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-gold" /> {l.sqft}
            </span>
          )}
          <span>{l.leaseType}</span>
        </div>
      </section>

      {l.images && l.images.length > 0 && (
        <section className="container-x pb-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <img
              src={l.images[active]}
              alt={`${l.title} ${active + 1}`}
              className="w-full h-[280px] md:h-[560px] object-cover"
            />
          </div>
          {l.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {l.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-lg border ${
                    active === i ? "border-gold ring-2 ring-gold/40" : "border-border"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${l.title} thumb ${i + 1}`}
                    className="h-20 md:h-28 w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="container-x pb-16 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          {l.longDescription && (
            <div className="space-y-4">
              {l.longDescription.map((p, i) => (
                <p key={i} className="text-base md:text-lg text-foreground/85 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}
          {!l.longDescription && l.description && (
            <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
              {l.description}
            </p>
          )}

          {l.sections?.map((s) => (
            <div key={s.heading} className="rounded-xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-display font-bold text-gold">
                {s.heading}
              </h2>
              <p className="mt-2 text-foreground/85 leading-relaxed">{s.body}</p>
              {s.bullets && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-xl font-display font-bold">Highlights</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {l.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 self-start space-y-4">
          <div className="rounded-2xl border border-gold/40 bg-card p-6 shadow-elegant">
            {l.price && (
              <>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Price
                </div>
                <div className="mt-1 text-3xl font-display font-extrabold text-gold tabular-nums leading-tight">
                  {l.price}
                </div>
                {l.priceNote && (
                  <div className="mt-1 text-xs uppercase tracking-wider text-gold/80">
                    {l.priceNote}
                  </div>
                )}
              </>
            )}
            <div className="mt-5 space-y-2">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-gradient px-4 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
              >
                Request NDA & Details <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gold/40 px-4 py-3 text-sm font-semibold hover:bg-gold/10"
              >
                <Phone className="h-4 w-4 text-gold" /> {PHONE}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
            Full financials and showings released after a signed NDA. Off-market opportunities
            available on request.
          </div>
        </aside>
      </section>

      {other.length > 0 && (
        <section className="container-x pb-20">
          <h2 className="text-2xl font-display font-bold">More listings</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {other.map((o) => (
              <Link
                key={o.id}
                to="/restaurants-for-sale/$slug"
                params={{ slug: o.slug }}
                className="group rounded-xl border border-border bg-card overflow-hidden hover:border-gold/60 transition"
              >
                <div className="h-36 bg-muted overflow-hidden">
                  {o.images?.[0] ? (
                    <img
                      src={o.images[0]}
                      alt={o.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-muted to-card" />
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gold font-semibold">{o.type}</div>
                  <div className="mt-1 font-display font-bold text-sm group-hover:text-gold">
                    {o.title}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{o.location}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
