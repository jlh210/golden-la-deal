import { createFileRoute } from "@tanstack/react-router";
import { Plane, Check, FileText } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/e2-visa-europe")({
  head: () => ({
    meta: [
      { title: "E-2 Visa Europe — Investor-Ready Restaurant Acquisitions | Penthouse Advisors" },
      {
        name: "description",
        content:
          "E-2 investor visa support for European entrepreneurs acquiring U.S. restaurants. LOI, lease assignment, business plan, and lease contingency negotiation.",
      },
      { property: "og:title", content: "E-2 Visa Europe — Penthouse Advisors" },
      {
        property: "og:description",
        content: "E-2 investor visa restaurant acquisitions for European entrepreneurs.",
      },
    ],
  }),
  component: E2Page,
});

const requirements = [
  "Investment must be substantial relative to the cost of the business",
  "Investment must be at risk — committed, irrevocable, and subject to loss",
  "The business must be active and operating (not passive holding)",
  "Applicant must have a controlling interest and intent to direct the enterprise",
];

const docs = [
  "Letter of Intent (LOI) — drafted by Penthouse Advisors",
  "Purchase Agreement — drafted by Penthouse Advisors",
  "Lease assignment or new lease with E-2 contingency",
  "Current business licenses and permits",
  "Bank statements showing source and traceability of funds",
  "Business plan with five-year projections",
];

function E2Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="E-2 Visa · Europe"
        title="Investor-ready restaurant"
        accent="acquisitions in LA."
        subtitle="For European entrepreneurs pursuing the E-2 investor visa, the U.S. restaurant acquisition has to be structured to satisfy the consulate from day one. We handle the mechanics."
      />

      <section className="container-x py-16 md:py-20 grid gap-10 lg:grid-cols-2">
        <article>
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Plane className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl md:text-3xl font-display font-bold">Visa requirements (in plain English)</h2>
          <ul className="mt-6 space-y-3">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-gold shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </article>

        <article>
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl md:text-3xl font-display font-bold">Required documentation</h2>
          <ul className="mt-6 space-y-3">
            {docs.map((d) => (
              <li key={d} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 text-gold shrink-0" /> {d}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-x py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Our Role</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">What Penthouse handles directly.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: "Drafting", b: "We draft the Letter of Intent and Purchase Agreement aligned with E-2 standards." },
              { t: "Lease Contingency", b: "We negotiate lease language that ties signing or rent commencement to visa issuance." },
              { t: "Mechanics", b: "Escrow, license transfer coordination, and operational handoff once the visa is granted." },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-display font-bold text-gold">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.b}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground max-w-2xl">
            Penthouse Advisors is not an immigration law firm. We coordinate with your
            U.S. immigration counsel on the transaction side of the file.
          </p>
        </div>
      </section>

      <CTASection title="Coming to LA to acquire a restaurant?" body="Start with a deal brief. We'll structure the acquisition to support the E-2 application." />
    </SiteLayout>
  );
}
