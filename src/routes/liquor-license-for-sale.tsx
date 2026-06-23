import { createFileRoute, Link } from "@tanstack/react-router";
import { Wine, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/liquor-license-for-sale")({
  head: () => ({
    meta: [
      { title: "Liquor License For Sale — Type 47 ABC License | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Active California ABC liquor licenses available for purchase. Vetted, transferable, all-in pricing. Type 47 Hard Liquor available now.",
      },
      { property: "og:title", content: "Liquor License For Sale — Penthouse Advisors" },
      {
        property: "og:description",
        content: "Active California ABC liquor licenses available for transfer.",
      },
    ],
  }),
  component: LiquorLicenseForSale,
});

type License = {
  id: string;
  type: string;
  licenseNumber: string;
  status: "Active" | "Inactive";
  issued: string;
  expires: string;
  restrictions: string;
  history: string;
  price: string;
  priceNote: string;
};

const licenses: License[] = [
  {
    id: "LL-001",
    type: "Type 47 — Hard Liquor",
    licenseNumber: "47-525737",
    status: "Active",
    issued: "March 14, 2014",
    expires: "March 31, 2026",
    restrictions: "None",
    history: "No disciplinary history",
    price: "$85,650",
    priceNote: "All In",
  },
];

function LiquorLicenseForSale() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Liquor License For Sale"
        title="Active ABC licenses"
        accent="available for transfer."
        subtitle="Fully vetted California ABC liquor licenses available for purchase and transfer. All-in pricing includes our processing fee, state payment, mailing, Live Scan, and notary."
      />

      <section className="container-x py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {licenses.map((l) => (
            <article key={l.id} className="rounded-2xl border border-gold/40 bg-card overflow-hidden shadow-elegant">
              <div className="bg-gradient-to-br from-muted to-card p-7 border-b border-border flex items-start justify-between">
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
                    <Wine className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 text-2xl font-display font-bold">{l.type}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">License #{l.licenseNumber}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  l.status === "Active"
                    ? "bg-gold/15 text-gold border-gold/40"
                    : "bg-destructive/15 text-destructive border-destructive/30"
                }`}>
                  {l.status}
                </span>
              </div>
              <div className="p-7 grid grid-cols-2 gap-5 text-sm">
                <Spec label="Original Issue Date" value={l.issued} />
                <Spec label="Expiration Date" value={l.expires} />
                <Spec label="Operating Restrictions" value={l.restrictions} />
                <Spec label="Disciplinary History" value={l.history} />
              </div>
              <div className="border-t border-border p-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-3xl font-display font-extrabold text-gold">{l.price}</div>
                  <div className="text-xs uppercase tracking-wider text-gold/70 mt-1">{l.priceNote}</div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-gold-gradient px-5 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
                >
                  Inquire <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection title="Looking for a specific license type?" body="Tell us your tract and we'll source a transferable license that fits." />
    </SiteLayout>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold">{value}</div>
    </div>
  );
}
