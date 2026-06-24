import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/residential")({
  head: () => ({
    meta: [
      { title: "Residential Requests - Penthouse Advisors LA" },
      {
        name: "description",
        content:
          "Select residential listings in Los Angeles handled by Roschard Paticchio-Stein, CEO and licensed Business Agent. Inquire for availability.",
      },
      { property: "og:title", content: "Residential Requests - Penthouse Advisors" },
      {
        property: "og:description",
        content: "Select residential listings in LA. Inquire for availability.",
      },
    ],
  }),
  component: ResidentialPage,
});

function ResidentialPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Residential Requests"
        title="Select residential listings"
        accent="in Los Angeles."
        subtitle="Alongside our restaurant and commercial work, we handle a small number of residential listings each year - personally managed by Roschard Paticchio-Stein, CEO. Inquire for current availability."
      />

      <section className="container-x py-12 md:py-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Home className="h-6 w-6" />
          </div>
          <h2 className="mt-5 text-2xl font-display font-bold">Quiet listings, personal service.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We don't publish our residential inventory. Each listing is handled directly
            by the CEO with the same disclosure standards as our commercial work. Contact
            us with what you're looking for - buying, selling, or leasing - and we'll
            tell you what's currently available.
          </p>
          <div className="mt-6 rounded-lg border border-border bg-background p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Handled by</div>
            <div className="mt-1 font-semibold">Roschard Paticchio-Stein</div>
            <div className="text-sm text-muted-foreground">CEO · Owner · Business Agent</div>
            <div className="text-xs text-gold mt-1">DRE #02203003</div>
          </div>
        </div>

        <LeadForm
          defaultTopic="Residential listing"
          title="Residential Inquiry"
          subtitle="Tell us what you're looking for. We respond same business day."
        />
      </section>
    </SiteLayout>
  );
}
