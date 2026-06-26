import { createFileRoute } from "@tanstack/react-router";
import { Plane, Check } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, HOURS } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/e2-visa-europe")({
  head: () => ({
    meta: [
      { title: "E-2 Visa Europe - Own a Restaurant in Los Angeles | Penthouse Advisors" },
      {
        name: "description",
        content:
          "Establish residency in Los Angeles, CA under E-2 visa status by owning a restaurant. Penthouse Advisors structures the acquisition, LOI, lease, and permits for European investors.",
      },
      { property: "og:title", content: "E-2 Visa Europe - Penthouse Advisors" },
      {
        property: "og:description",
        content:
          "E-2 investor visa restaurant acquisitions for European entrepreneurs. Live and work in Los Angeles County through a qualifying US business investment.",
      },
    ],
  }),
  component: E2Page,
});

const requiredDocs = [
  "Credit report",
  "Three (3) consecutive, strong bank statements showing liquidity",
  "Date of birth",
  "Place of birth",
  "Residential address",
  "Driver’s license",
  "SSN or ITIN (Individual Taxpayer Identification Number)",
  "Business plan",
  "Menu",
  "Restaurant experience",
  "Resume",
];

const consulateSteps = [
  "Research eligible restaurant businesses that qualify for E-2 visa investments.",
  "May 2026 U.S. law: file the E-2 visa application with the U.S. consulate or embassy in your home country.",
  "If exploring inside the U.S., self-deport at once. In other words, DO NOT stay in the United States while applying for an E-2 visa or any visa status for that matter.",
  "Check out applying for an E-2 visa through a change of status at USCIS (United States Citizenship and Immigration Services) at uscis.gov.",
  "Ensure you meet the investment amount requirement, typically around $100,000 or more.",
  "Prepare a comprehensive business plan outlining your investment and operational strategy.",
  "Gather necessary documentation, including proof of funds and personal background information.",
  "Attend the E-2 visa interview and present your business plan and investment details.",
];

function E2Page() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="E-2 Visa · Europe"
        title="Establish residency in Los Angeles, CA"
        accent="under E-2 visa status."
        subtitle="Own a restaurant in Los Angeles County. The E-2 visa is a nonimmigrant visa that allows foreign nationals, investors, and entrepreneurs from treaty countries to live and work in L.A. County based on an investment into an existing U.S. business."
      />

      <section className="container-x py-12 md:py-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-elegant space-y-8">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-gold/10 text-gold border border-gold/30">
            <Plane className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">CORP BRIEF — MUST READ</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Penthouse Advisors Inc., a “family owned and run business” full-service operation,
              consults and advises on restaurant deals for the many active restaurant owners,
              commercial property owners, and restaurant buyers throughout Los Angeles County.
              We provide brilliant business tips and strategies in line with our “do it now”
              approach to creating resolutions with quick, workable solutions to restaurant business
              dilemmas and expanding the restaurant’s growth — meaning the monthly net returns in the
              pocket before tax.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Making money by owning a restaurant business in Los Angeles County</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The key factor in owning a restaurant business is to be motivated and committed with
              the intent of expanding the brand into 10 chain locations. Here is why: when your
              first restaurant’s monthly gross sales (meaning all the credit card and cash collected
              during the month) average out to approximately $60,000 per month, as an example, after
              all the expenses are subtracted — the monthly rent, gas, electric, payroll, food
              costs, insurance, delivery expenses, restocking the dry storage and breakables, and
              stealing of cash called shrinkage — there should be approximately $12,000 net returns
              remaining, meaning the monthly profit the owner of the restaurant pockets before tax.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The idea is to multiply the $12,000 monthly net return 10 times by simply opening 9 new
              additional brand locations, one at a time, with the assistance, business advice, and
              supervision from Penthouse Advisors Inc. The success of each brand location follows
              the next for financial expansion protection. Once all 10 locations are up and running,
              we are looking at monthly net returns of $120,000 (in the pocket before tax), times 12
              months, $1,440,000 — one million four hundred forty thousand dollars — annual net
              profit (in the pocket before tax). That’s what we’re talking about.
            </p>
          </div>

          <div className="rounded-lg border border-gold/30 bg-gold/5 p-5">
            <h3 className="font-display font-bold text-foreground">February 14, 2026 — Munich, Germany, Security Conference</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              We believe our work helps add to Marco Rubio’s February 14, 2026, Munich, Germany,
              Security Conference speech, whereby leaders of all European countries were asked and
              agreed to actively work with the U.S. in realigning the “Transatlantic Bond” left
              abandoned for generations, to develop collective strength, revitalize a U.S.-Europe
              friendship, and renew the greatest civilization in human history.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Purchase a U.S. business under the E-2 visa</h2>
            <h3 className="mt-4 text-lg font-semibold text-foreground">About the business purchased</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              The business must be open and operating for profit. The buyer must invest a substantial
              amount in the bona fide — meaning “in good faith” — enterprise in Los Angeles County. No
              set dollar figure can be said as a substantial amount for the E-2 visa investment.
              The restaurant business cannot be idle or an enterprise on paper.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-foreground">Contact</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Richard Stein & Roschard Paticchio Stein — Private Office, Santa Monica, CA. Office: (M){" "}
              <a href={PHONE_HREF} className="text-gold hover:underline">{PHONE}</a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Applying through a U.S. consulate or embassy abroad</h2>
            <ul className="mt-4 space-y-2">
              {consulateSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-xs font-bold text-gold">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">E-2 visa through a U.S. consulate or embassy abroad</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Note that the E-2 visa is a non-immigrant visa: buyers are not eligible for permanent
              residency. Buyers must provide a written statement to the U.S. Embassy that they will
              leave the country once the E-2 status expires. The written statement is sufficient,
              although sometimes the embassy might request additional proof of ties abroad. Ties are
              the proof that binds buyers to their country of residence, such as their house, job,
              or family, etc.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              When you apply for an E-2 visa at the U.S. consulate or embassy abroad, you must
              attend an E-2 visa interview at the consulate. If you are approved, you receive an E-2
              visa stamp in your passport, which allows you to travel between the United States and
              other countries. The E-2 visa stamp is a physical stamp or sticker in your passport
              that serves as an entry document or authorization to travel to the United States. Once
              you arrive in the United States, you present the E-2 visa at U.S. Customs and Border
              Protection (CBP), where a CBP officer determines whether to admit you into the U.S.
              Upon entry into the United States, the E-2 visa stamp does not control your legal
              status; your legal status is controlled by the E-2 status as recorded on your I-94
              record.
            </p>

            <ol className="mt-4 list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>If you are not a citizen of one of the E-2 treaty countries, then you cannot pursue a change of status to E-2 in the U.S.</li>
              <li>If you are a citizen of a treaty country, you may still not be able to change status in the United States.</li>
              <li>U.S. applications will be processed at the U.S. consulate in the buyer’s country.</li>
            </ol>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Traveling to and from the U.S.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The principal investor is allowed to travel abroad and is granted an automatic 2-year
              readmission period upon entering the U.S. If family members are traveling along with
              the primary investor at that time, they can request readmission to the U.S. However, if
              family members travel abroad and return to the U.S. alone, the new readmission period
              will not be applied to them.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The family members of the E-2 treaty investors are also eligible to apply for E-2
              visas and can stay up to 2 years in the U.S. The dependents and spouses need not be
              from the same treaty country as the principal E-2 visa holder. Spouses can work;
              however, it is recommended to get a work authorization certificate. Children under
              the age of 21 cannot work under the E-2 visa, but they are allowed to study. Children
              after reaching the age of 21 under an E-2 visa need to explore other visa options to
              stay in the U.S.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Renewing the E-2 visa</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              After a two-year term, renewing the E-2 visa will require proof of achieving the
              projections mentioned at the time of application. The plan should mention the financial
              projections and details on how the business will gain sufficient funds to provide for
              the buyer and the buyer’s family. The business should also create new jobs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Timing</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The E-2 visa will allow the buyer to own a restaurant business and live in Los Angeles
              County for 2 years. All individuals covered by the E-2 visa are allowed to travel in
              and out of the U.S.A. After 2 years, buyers can extend the E-2 visa for another 2 years
              with unlimited extension on the stay.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Immigration interview</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The buyer must have a business immigration plan on how the investment affects the U.S.
              economy at the time of the interview. The buyer must verify a synergy between the buyer’s
              skills and the business being acquired. The U.S. Embassy will want a “Corp Brief” about
              the buyer’s business activities in the U.S. The nature of the business the buyer is
              investing in must be relevant to the buyer’s professional experience, qualifications,
              or skills.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Documents required</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The LOI purchase agreement, copy of the assignment or new lease, business licenses,
              S-Corp, C-Corp, LLC, federal tax employer’s identification number, BOE (Board of
              Equalization), EDD (Employment Development Department), seller’s permit, health
              department certificate, and escrow instructions are delivered to the buyer’s
              immigration attorney for processing.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-foreground">Personal documentation</h3>
            <ul className="mt-3 space-y-2">
              {requiredDocs.map((doc, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 text-gold shrink-0" /> {doc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">LOI purchase agreement</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Penthouse Advisors Inc. will draft a “LOI” letter of intent purchase agreement at the
              agreed purchase price to be signed by and between the buyer and seller. The agreement
              is subject to the property owner reviewing the strength of the guarantor’s following
              documentation:
            </p>
            <ul className="mt-3 space-y-2">
              {requiredDocs.map((doc, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {doc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Lease contingence</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our work includes complex property owner (landlord) negotiations establishing a
              contingence that a copy of an assignment of lease or a new lease will be drafted and
              given to the buyer/E-2 visa applicant prior to escrow closing, and is subject to E-2
              visa approval at the U.S. consulate or embassy abroad.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Investment</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The restaurant business investment must have a considerable impact on the U.S. economy
              and not provide a “living only” situation for the buyer and the buyer’s family. The
              investment must be a significant economic contribution to the U.S. economy and not a
              marginal enterprise — meaning it must have the capacity to generate excess funds beyond
              supporting minimal living conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Predicted future earnings</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Earnings must be met within 5 years from the date of acquiring the business activity.
              Just the intent to invest, or having uncommitted funds in a bank account, will not be
              considered an investment. The substantial investment intends to make sure that the
              buyer’s business is not a speculative or idle investment, but will become a successful
              enterprise in the future.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Funds</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The funds should be put irrevocably at risk, meaning they should be used for
              business-related expenses that cannot be recovered in the event the restaurant business
              goes into default.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Guarantor to the lease</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Only one (1) guarantor to the lease. This can be a partner or family member that holds
              the strongest bank account and will be held responsible for all lease payments, lease
              terms, and conditions. Investors must own at least 50% of the business, giving them
              operational control, including the principal investor/buyer, who can apply for E-2 as
              qualifying employees who are usually of the same nationality as the buyers (same treaty
              country). The registration takes a few months depending upon the jurisdiction. The E-2
              employee visa can be obtained within two weeks. The E-2 visa can be extended to other
              personnel if they meet the following conditions:
            </p>
            <ul className="mt-3 space-y-2">
              {[
                "Hold a managerial position",
                "Handle an entire business or a key part of the business",
                "Skilled workers or specialists",
                "Highly specialized skill capacity in some areas related to the business that is difficult to find in the U.S.",
                "The employee is necessary to run a principal trade for the investor’s business in the U.S.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Escrow opened</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Upon property owner approval of the said guarantor to the lease, escrow will be opened.
              Drafting a new lease or assignment to the existing lease will be signed by the property
              owner and delivered to escrow, followed by escrow delivering via email to the buyer a
              wire-instructions link, whereby 100% of the total consideration, the “purchase money,”
              must be wired into the escrow trust account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold">Alcohol licensing & health department permitting</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Upon receiving the E-2 visa non-immigrant status and purchasing a restaurant, Roschard
              Paticchio Stein and Richard Stein, specialists in restaurant alcohol licensing
              transfers and sales (Type 41 beer and wine, Type 47 hard alcohol) and health department
              site evaluations to approve for health department permitting and licensing, are
              available to be retained.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Private office</div>
            <div className="mt-1 font-semibold text-foreground">Richard Stein & Roschard Paticchio Stein</div>
            <div className="text-sm text-muted-foreground">Santa Monica, CA</div>
            <div className="mt-2 text-sm font-semibold">
              <a href={PHONE_HREF} className="text-gold hover:underline">{PHONE}</a>
            </div>
            <a href={`mailto:${EMAIL}`} className="text-sm text-gold hover:underline">{EMAIL}</a>
            <div className="mt-2 text-sm text-muted-foreground">{HOURS}</div>
          </div>
        </div>

        <LeadForm
          serviceNeeded="E-2 visa (Europe)"
          title="E-2 Visa Consultation"
          subtitle="Tell us about your home country and the restaurant opportunity. We respond same business day."
        />
      </section>
    </SiteLayout>
  );
}
