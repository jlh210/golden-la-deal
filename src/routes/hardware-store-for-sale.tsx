import { listingImageProps } from "@/lib/listing-images";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Store, MapPin, Calendar, ArrowRight, FileText, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import storefront from "@/assets/hardware-storefront.png";
import aisle from "@/assets/hardware-aisle.png";

import { breadcrumbScript } from "@/lib/seo";
import { HeadingCTA } from "@/components/site/HeadingCTA";
export const Route = createFileRoute("/hardware-store-for-sale")({
  head: () => ({
    meta: [
      { title: "Hardware Store For Sale - Westwood Blvd, West LA | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Established hardware store for sale on Westwood Blvd, West LA. $175,000 cash. Revenue $402,000/yr. Established 2020.",
      },
      { property: "og:title", content: "Hardware Store For Sale - West LA" },
      {
        property: "og:description",
        content: "Established hardware store on Westwood Blvd. $125k cash.",
      },
      {
        property: "og:image",
        content: new URL(listingImageProps(storefront).src, "https://www.penthouseadvisors.com")
          .href,
      },
      { property: "og:image:alt", content: "Westwood hardware store exterior" },
      {
        name: "twitter:image",
        content: new URL(listingImageProps(storefront).src, "https://www.penthouseadvisors.com")
          .href,
      },
      { name: "twitter:image:alt", content: "Westwood hardware store exterior" },
      { property: "og:url", content: "https://www.penthouseadvisors.com/hardware-store-for-sale" },
    ],
    links: [
      { rel: "canonical", href: "https://www.penthouseadvisors.com/hardware-store-for-sale" },
    ],
    scripts: [
      breadcrumbScript([
        { name: "Home", path: "/" },
        { name: "Hardware Store For Sale", path: "/hardware-store-for-sale" },
      ]),
    ],
  }),
  component: HardwarePage,
});

const specs = [
  { label: "Asking Price", value: "$175,000", note: "Cash" },
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
  "Escrow fees and closing costs split 50/50 between Buyer and Seller",
];

const buyerReqs = [
  "3 recent bank statements showing liquidity",
  "One-page credit report",
  "Resume of related business experience",
  "Documents delivered to Roschard Paticchio-Stein",
];

function HardwarePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Business For Sale"
        title="Hardware Store for Sale"
        accent=""
        subtitle="3400 W Olympic Blvd, Ste 201, Los Angeles, CA 90019"
      />

      <section className="container-x pt-10">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-2xl border border-gold/40 shadow-elegant">
            <img
              {...listingImageProps(storefront)}
              alt="Hardware store entrance on Westwood Blvd, West LA"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[4/5] md:aspect-[4/3] overflow-hidden rounded-2xl border border-gold/40 shadow-elegant">
            <img
              {...listingImageProps(aisle)}
              alt="Hardware store aisle with tools and supplies"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-12 md:py-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="rounded-2xl border border-gold/40 bg-card overflow-hidden shadow-elegant">
            <div className="bg-gradient-to-br from-muted to-card p-8 border-b border-border flex items-start gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30 shrink-0">
                <Store className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">Hardware Store</h2>
                <HeadingCTA />
                <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-gold" /> Westwood Blvd, West LA
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-gold" /> Established 2020
                </div>
              </div>
            </div>
            <div className="p-7 grid sm:grid-cols-2 gap-5">
              {specs.map((s) => (
                <div key={s.label}>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 font-display font-extrabold text-gold text-2xl">
                    {s.value}
                  </div>
                  {s.note && <div className="text-xs text-gold/70 mt-1">{s.note}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-elegant">
            <div className="flex items-center gap-3">
              <Wrench className="h-5 w-5 text-gold" />
              <h3 className="text-lg font-display font-bold">Product Categories</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {productCategories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-7 shadow-elegant">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gold" />
              <h3 className="text-lg font-display font-bold">Lease &amp; Deal Terms</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {leaseTerms.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm">
                  <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-7 shadow-elegant">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gold" />
              <h3 className="text-lg font-display font-bold">Escrow</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {escrowDetails.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm">
                  <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-7 shadow-elegant">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gold" />
              <h3 className="text-lg font-display font-bold">Buyer Requirements</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {buyerReqs.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm">
                  <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="rounded-2xl border border-gold/40 bg-card p-7 h-fit lg:sticky lg:top-28">
          <h3 className="text-xl font-display font-bold">Interested?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Reach out for full financials, lease details, and a private tour.
          </p>
          <Link
            to="/contact"
            search={{ service: "Hardware store inquiry" }}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
          >
            Contact Agent <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>

      <CTASection
        serviceNeeded={"Hardware store inquiry"}
        title="Selling a non-restaurant business?"
        body="We broker hardware, retail, and select small businesses across LA."
      />
    </SiteLayout>
  );
}
