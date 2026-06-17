import { createFileRoute } from "@tanstack/react-router";
import { FileSignature, Scale, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/assignments-rent-abatement")({
  head: () => ({
    meta: [
      { title: "Lease Assignments & Rent Abatement — Penthouse Advisors" },
      {
        name: "description",
        content:
          "Lease assignment risk explained and rent abatement negotiation tied to permit issuance or opening day. Retainer $2,750.",
      },
      { property: "og:title", content: "Assignments & Rent Abatement" },
      {
        property: "og:description",
        content: "Lease assignments, guarantor positions, and rent abatement.",
      },
    ],
  }),
  component: AssignmentsPage,
});

function AssignmentsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Assignments & Rent Abatement"
        title="Know your guarantor position."
        accent="Negotiate real abatement."
        subtitle="Lease assignments and rent abatement are two of the most misunderstood pieces of a restaurant deal — and two of the most expensive when handled wrong."
      />

      <section className="container-x py-16 md:py-20 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Scale className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">Lease Assignment Risk</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            When a lease is assigned, the original tenant <span className="text-gold font-semibold">remains the first guarantor</span>.
            The incoming tenant becomes the <span className="text-gold font-semibold">second guarantor</span>. If the new operator defaults,
            the landlord can still pursue the original tenant — for years. We structure
            assignments to protect both sides and, where possible, negotiate full releases
            of the original guarantor.
          </p>
        </article>

        <article className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">Rent Abatement</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Rent doesn't have to start the day you sign. We tie abatement to real
            milestones — Health permit issuance, ABC license activation, or the day the
            doors actually open. That alignment can save a new operator 3–6 months of
            rent during a build-out or licensing period.
          </p>
        </article>
      </section>

      <section className="container-x pb-16">
        <div className="rounded-2xl border border-gold/40 bg-charcoal-deep p-8 md:p-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30 shrink-0">
              <FileSignature className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">Engagement Retainer</h2>
              <p className="mt-2 text-muted-foreground">
                Flat retainer to open the file, review the lease, and start negotiating
                with the landlord and counterparty.
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-extrabold text-gold">$2,750</div>
            <div className="text-xs uppercase tracking-wider text-gold/70 mt-1">Retainer Fee</div>
          </div>
        </div>
      </section>

      <CTASection title="Signing or assigning a lease?" body="Get it reviewed before you sign. We move on the same business day." />
    </SiteLayout>
  );
}
