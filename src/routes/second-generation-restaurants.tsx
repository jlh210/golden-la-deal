import { createFileRoute } from "@tanstack/react-router";
import { Building2, AlertTriangle, FileSignature } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/second-generation-restaurants")({
  head: () => ({
    meta: [
      { title: "Second Generation Restaurant Spaces - $0 Key Money | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Leasing equipped or vacant 2nd-gen restaurant spaces in Los Angeles with $0 key money. Lawful terms, NSF/ETL-labeled equipment. Retainer $2,750.",
      },
      { property: "og:title", content: "2nd Generation Restaurant Spaces" },
      {
        property: "og:description",
        content: "Equipped 2nd-gen restaurant spaces with $0 key money.",
      },
    ],
  }),
  component: SecondGenPage,
});

function SecondGenPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Second Generation Restaurants"
        title="Equipped spaces."
        accent="$0 key money."
        subtitle="We lease equipped or vacant second-generation restaurant spaces with zero key money. You take the space on the merits of the lease - not on a side payment to the previous tenant."
      />

      <section className="container-x py-16 md:py-20 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Building2 className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">What we do</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Source 2nd-gen restaurant spaces - vented, plumbed, hood-equipped - directly
            from landlords across LA County. Structure the lease, walk the space with
            health and building, and hand you operating keys.
          </p>
        </article>

        <article className="rounded-2xl border border-destructive/40 bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-destructive/15 text-destructive border border-destructive/30">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">Legal disclosure on key money</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Previous tenants <span className="text-foreground font-semibold">cannot</span> demand under-the-table key money
            for FF&E unless that compensation is written into a lawful lease and disclosed.
            Equipment without <span className="text-gold font-semibold">NSF or ETL labels</span> is worthless under health
            code - it cannot be permitted and must be replaced. Don't pay for it.
          </p>
        </article>
      </section>

      <section className="container-x pb-16">
        <div className="rounded-2xl border border-gold/40 bg-card p-8 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30 shrink-0">
              <FileSignature className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">Engagement Retainer</h2>
              <p className="mt-2 text-muted-foreground">
                Flat retainer to source, walk, and negotiate the 2nd-gen lease.
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-extrabold text-gold">$2,750</div>
            <div className="text-xs uppercase tracking-wider text-gold/70 mt-1">Retainer Fee</div>
          </div>
        </div>
      </section>

      <CTASection serviceNeeded={"Second generation space"} title="Looking for a 2nd-gen space?" body="Tell us your area and concept - we'll send live options this week." />
    </SiteLayout>
  );
}
