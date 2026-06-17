import { createFileRoute, Link } from "@tanstack/react-router";
import { Store, MapPin, Calendar, ArrowRight, FileText } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/hardware-store-for-sale")({
  head: () => ({
    meta: [
      { title: "Hardware Store For Sale — Westwood Blvd, West LA | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Established hardware store for sale on Westwood Blvd, West LA. $190,000 negotiable plus inventory. Revenue $402,000/yr. Established 2020.",
      },
      { property: "og:title", content: "Hardware Store For Sale — West LA" },
      {
        property: "og:description",
        content: "Established hardware store on Westwood Blvd. $190k + inventory.",
      },
    ],
  }),
  component: HardwarePage,
});

const specs = [
  { label: "Asking Price", value: "$190,000", note: "Negotiable + inventory" },
  { label: "Annual Revenue", value: "$402,000 / yr" },
  { label: "Year Established", value: "2020" },
  { label: "Employees", value: "1 Full-Time" },
  { label: "Location", value: "Westwood Blvd, West LA" },
  { label: "Lease Commenced", value: "Oct 9, 2020" },
];

const leaseTerms = [
  "Base rent (commencement): $3,082.56 / mo",
  "Year 6 monthly base rent: $4,840.89 + CAM",
  "Three (3) 3-year options to extend",
  "Security deposit reimbursed by buyer through escrow",
  "FF&E sold as-is",
  "4 weeks of support & training included",
];

const escrowDetails = [
  "Tower Escrow — 3400 W Olympic Blvd, Ste 201, Los Angeles",
  "Escrow fees split 50/50 between buyer and seller",
];

const buyerReqs = [
  "3 recent bank statements showing liquidity",
  "One-page credit report",
  "Resume of related business experience",
  "Proof of funds for purchase + working capital",
  "Signed NDA before financials and exact address are released",
];

function HardwarePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Business For Sale"
        title="Hardware Store —"
        accent="West LA."
        subtitle="Established neighborhood hardware store on Westwood Blvd. Consistent revenue, loyal customer base, turnkey operation."
      />

      <section className="container-x py-12 md:py-16 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="rounded-2xl border border-gold/40 bg-card overflow-hidden shadow-elegant">
            <div className="bg-gradient-to-br from-charcoal-deep to-charcoal p-8 border-b border-border flex items-start gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30 shrink-0">
                <Store className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">Hardware Store</h2>
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
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="mt-1 font-display font-extrabold text-gold text-2xl">{s.value}</div>
                  {s.note && <div className="text-xs text-gold/70 mt-1">{s.note}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-elegant">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-gold" />
              <h3 className="text-lg font-display font-bold">Lease Terms</h3>
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

        <aside className="rounded-2xl border border-gold/40 bg-charcoal-deep p-7 h-fit lg:sticky lg:top-28">
          <h3 className="text-xl font-display font-bold">Interested?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Full financials, lease terms, and exact address released after NDA.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
          >
            Contact Agent <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>

      <CTASection title="Selling a non-restaurant business?" body="We broker hardware, retail, and select small businesses across LA." />
    </SiteLayout>
  );
}
