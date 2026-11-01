import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout, PHONE, PHONE_HREF } from "@/components/site/Layout";
import { CONSULTATION_LABEL } from "@/lib/consultation";
import { SITE_URL, ORG_ID, WEBSITE_ID, faqScript } from "@/lib/seo";

const title = "Restaurant Business Broker Los Angeles, CA | Penthouse Advisors Inc.";
const description =
  "Penthouse Advisors Inc. is a restaurant business broker in Los Angeles, CA. Buy, sell and navigate restaurant transactions across LA County, with acquisitions, leasing, licensing and permitting coordinated by one firm.";
const faqs = [
  {
    q: "What does a restaurant broker or advisor help coordinate?",
    a: "A restaurant broker or advisor helps buyers and sellers organize the commercial details of a restaurant transaction: opportunity assessment or valuation, preparation, negotiation, due diligence and closing coordination. Penthouse Advisors also helps clients navigate the connections between the restaurant lease, licensing and permitting. The work depends on the engagement; landlords, agencies and other transaction professionals retain their own responsibilities.",
    to: "/services",
    label: "Explore restaurant advisory services",
  },
  {
    q: "How do I prepare to sell a restaurant in Los Angeles?",
    a: "Prepare to sell a restaurant by organizing financial records, the lease and amendments, equipment ownership information, and current license and permit records. Identify unresolved issues before presenting the business to buyers. Penthouse Advisors helps Los Angeles restaurant owners assess sale readiness, consider valuation and plan a confidential marketing approach with buyer qualification and transaction coordination.",
    to: "/sell-your-restaurant",
    label: "Plan your restaurant sale",
  },
  {
    q: "How is a restaurant valued?",
    a: "Restaurant valuation considers documented earnings, assets included in the sale, equipment condition, lease terms and the status of licenses and permits. An operating business and an equipment-focused asset sale may call for different approaches. Penthouse Advisors reviews these details with sellers to develop a price range that reflects the restaurant and the proposed transaction, rather than applying one universal multiple.",
    to: "/sell-your-restaurant",
    label: "Discuss restaurant valuation",
  },
  {
    q: "What happens to the lease when a restaurant is sold?",
    a: "The restaurant lease needs its own review during a sale. The parties should establish whether the proposed transaction involves a lease assignment or a new lease, what the existing agreement requires and what the landlord will need to evaluate. Penthouse Advisors helps coordinate these discussions alongside the business transaction so lease questions are addressed before closing decisions are made.",
    to: "/assignments-rent-abatement",
    label: "Explore lease assignment support",
  },
  {
    q: "Can a liquor license transfer when a restaurant is sold?",
    a: "A liquor license may be part of a restaurant transaction, but buyers and sellers should not assume it transfers automatically with the business. The proposed transfer needs review with California ABC, and local alcohol-use approvals require separate consideration. Penthouse Advisors helps coordinate the licensing work with the broader transaction; eligibility, conditions and approval depend on the specific application and authorities involved.",
    to: "/alcohol-licensing",
    label: "Explore ABC transfer support",
  },
];
const services = [
  {
    title: "Restaurant Acquisitions",
    body: "Assess opportunities, prepare as a buyer and coordinate due diligence, lease considerations and the path to closing.",
    to: "/buy-a-restaurant",
    label: "Explore acquisition advisory",
  },
  {
    title: "Restaurant Dispositions",
    body: "Prepare your restaurant for sale with valuation, confidential positioning, buyer qualification and transaction coordination.",
    to: "/sell-your-restaurant",
    label: "Explore seller advisory",
  },
  {
    title: "Restaurant Leasing",
    body: "Evaluate restaurant spaces and lease terms, from second-generation premises to landlord discussions and assignment considerations.",
    to: "/restaurant-leasing",
    label: "Explore restaurant leasing",
  },
  {
    title: "Restaurant Consulting",
    body: "Work through acquisition questions, transaction obstacles and decisions affecting your restaurant with a defined advisory scope.",
    to: "/restaurant-consulting",
    label: "Explore restaurant consulting",
  },
  {
    title: "ABC / Liquor License Transfers",
    body: "Coordinate restaurant license applications and transfers while identifying the state and local approvals relevant to your plans.",
    to: "/alcohol-licensing",
    label: "Explore licensing support",
  },
  {
    title: "Restaurant Permitting",
    body: "Navigate health permitting, ownership-change requirements, plan check and inspection coordination for restaurant premises.",
    to: "/health-permitting",
    label: "Explore permitting support",
  },
];
const capabilities = [
  {
    title: "Buyer & Seller Representation",
    body: "Acquisition and disposition guidance shaped around the restaurant, the parties and their objectives.",
    to: "/buy-a-restaurant",
    label: "Buyer representation",
  },
  {
    title: "Lease & Landlord Coordination",
    body: "Restaurant leasing, assignments and landlord requirements considered alongside the business transaction.",
    to: "/assignments-rent-abatement",
    label: "Lease coordination",
  },
  {
    title: "Licensing & Permitting",
    body: "ABC licensing, health permitting and restaurant approval processes coordinated with the wider transaction.",
    to: "/licensing-and-permits",
    label: "Licenses and permits",
  },
  {
    title: "Due Diligence & Closing Support",
    body: "Review of business records and transaction details, with the relevant parties kept connected before closing.",
    to: "/business-investigations",
    label: "Due diligence support",
  },
];
const steps = [
  [
    "Consultation & Strategy",
    "Clarify your objectives, the restaurant involved and the advisory work needed.",
  ],
  [
    "Valuation or Opportunity Assessment",
    "Review the business, its records and the factors shaping a sale or acquisition.",
  ],
  [
    "Seller Preparation or Buyer Qualification",
    "Organize seller information or establish the buyer’s criteria, resources and readiness.",
  ],
  [
    "Offer & Due Diligence",
    "Work through proposed terms and investigate the financial, lease and operating details.",
  ],
  [
    "Lease, Licensing & Permitting Coordination",
    "Coordinate landlord discussions and the applicable agency processes with other workstreams.",
  ],
  [
    "Escrow & Closing",
    "Coordinate outstanding transaction items with the parties and escrow provider toward an agreed closing.",
  ],
];
const guides = [
  {
    category: "Buying",
    title: "How to Buy a Restaurant in Los Angeles",
    body: "Understand the acquisition process, from defining your criteria to reviewing the business and preparing for closing.",
    to: "/help/buying-a-restaurant/how-to-buy-a-restaurant-in-los-angeles",
    label: "Explore the buying guide",
  },
  {
    category: "Selling",
    title: "How to Sell a Restaurant in Los Angeles",
    body: "Consider the records, preparation, confidentiality and buyer qualification involved in bringing a restaurant to market.",
    to: "/help/selling-a-restaurant/how-to-sell-a-restaurant-in-los-angeles",
    label: "Explore the selling guide",
  },
  {
    category: "Leases",
    title: "Restaurant Lease Assignment Guide",
    body: "Understand the lease questions and landlord discussions that can shape a restaurant sale or acquisition.",
    to: "/help/lease-assignments/restaurant-lease-assignment-guide",
    label: "Learn how lease assignments work",
  },
  {
    category: "Licensing",
    title: "ABC License Transfer Guide",
    body: "Explore the licensing considerations buyers and sellers should review as part of a restaurant transaction.",
    to: "/help/alcohol-licensing/abc-license-transfer-guide",
    label: "Understand the ABC transfer process",
  },
];
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/android-chrome-512x512.png` },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { property: "og:image:alt", content: "Penthouse Advisors brand mark" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${SITE_URL}/android-chrome-512x512.png` },
      { name: "twitter:image:alt", content: "Penthouse Advisors brand mark" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/#webpage`,
          url: SITE_URL,
          name: title,
          description,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": ORG_ID },
          mainEntity: { "@id": ORG_ID },
        }),
      },
      faqScript(faqs),
    ],
  }),
  component: HomePage,
});
function EditorialLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="pa-text-link">
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
function HomePage() {
  return (
    <SiteLayout>
      <div className="pa-home">
        <section className="pa-hero" aria-labelledby="home-title">
          <div className="pa-shell pa-hero-grid">
            <div className="pa-hero-copy">
              <p className="pa-kicker">Retail Business Advisor and Broker · Los Angeles, CA</p>
              <h1 id="home-title">
                Retail Business Transactions, Restaurant Sales &amp; Acquisitions, Health
                Department Permitting &amp; Violation Corrections, Alcohol Licensing <br />
                <em>
                  Handled <span className="pa-no-break">End-to-End.</span>
                </em>
              </h1>
              <p className="pa-hero-description">
                Penthouse Advisors Helps Retail Business Owners, Restaurant Operators, Restaurant
                Buyers &amp; Sellers throughout Los Angeles County, navigate; Valuation Price
                Points, Sales/Acquisitions Agreements, Lease/Rent negotiation, Alcohol Licensing,
                Health Department permitting, violation corrections.{" "}
                <Link to="/contact">
                  <strong>Need Business Solutions Fast? Book</strong> a 30-minute mobile-to-mobile
                  call for real answers on restaurants, properties, and city matters.
                </Link>
              </p>
              <div className="pa-hero-actions">
                <Link to="/contact" className="pa-button">
                  {CONSULTATION_LABEL}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <EditorialLink to="/services">Explore Services</EditorialLink>
              </div>
              <p className="pa-hero-note">From the first decision to the details of closing.</p>
            </div>
            <figure className="pa-hero-image">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/los-angeles-640.avif 426w, /images/los-angeles-960.avif 640w"
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 38vw, 440px"
                />
                <img
                  src="/images/los-angeles-960.webp"
                  srcSet="/images/los-angeles-640.webp 426w, /images/los-angeles-960.webp 640w"
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 38vw, 440px"
                  width={640}
                  height={960}
                  fetchPriority="high"
                  alt="Downtown Los Angeles skyline in warm evening light"
                />
              </picture>
              <figcaption>
                Los Angeles County <span>Our market. Your next chapter.</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="pa-section pa-shell" aria-labelledby="authority-title">
          <div className="pa-section-head">
            <p className="pa-kicker">01 / The advisory perspective</p>
            <h2 id="authority-title">Advisory grounded in restaurant transaction details</h2>
          </div>
          <div className="pa-capabilities">
            {capabilities.map((c, i) => (
              <article key={c.title}>
                <span className="pa-index">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <EditorialLink to={c.to}>{c.label}</EditorialLink>
              </article>
            ))}
          </div>
          <div className="pa-ownership" aria-labelledby="ownership-title">
            <p className="pa-kicker" id="ownership-title">Ownership</p>
            <div className="pa-ownership-card">
              <span className="pa-ownership-mark" aria-hidden="true">
                RP
              </span>
              <div>
                <h3>Roschard Paticchio-Stein</h3>
                <p className="pa-ownership-role">
                  CEO · Owner · Business Agent
                  <br />
                  DRE #02203003
                </p>
                <p>
                  As CEO, Roschard makes the major corporate decisions that shape Penthouse Advisors,
                  drives the firm’s direction, supervises the executive team, and oversees growth
                  plans.
                </p>
              </div>
            </div>
            <div className="pa-ownership-card">
              <span className="pa-ownership-mark" aria-hidden="true">
                RS
              </span>
              <div>
                <h3>Richard Stein</h3>
                <p className="pa-ownership-role">
                  COO · Chief Operating Officer · Owner · Deal Supervisor · Closer
                </p>
                <p>
                  As COO, Richard turns the firm’s strategy into everyday results, making sure execution
                  across the company matches the direction set by leadership.
                </p>
              </div>
            </div>
          </div>
          <div className="pa-authority-links">
            <EditorialLink to="/agents">Meet the Advisors</EditorialLink>
            <EditorialLink to="/about">About Penthouse Advisors</EditorialLink>
          </div>
        </section>
        <section className="pa-intent-section" aria-labelledby="intent-title">
          <div className="pa-shell">
            <div className="pa-section-head">
              <p className="pa-kicker">02 / Your next move</p>
              <h2 id="intent-title">Buying or selling a restaurant?</h2>
            </div>
            <div className="pa-intent-grid">
              <article>
                <p className="pa-kicker">For buyers</p>
                <h3>
                  Find the opportunity.
                  <br />
                  <em>Understand the details.</em>
                </h3>
                <p>
                  A restaurant purchase starts with the right questions. Assess opportunities,
                  prepare your buyer profile and review the business, lease and licensing
                  considerations before committing to the next step.
                </p>
                <ul>
                  <li>Opportunity assessment and buyer qualification</li>
                  <li>Due diligence, lease and licensing coordination</li>
                  <li>Transaction and closing support</li>
                </ul>
                <EditorialLink to="/buy-a-restaurant">Explore Buying a Restaurant</EditorialLink>
                <Link to="/restaurants-for-sale" className="pa-secondary-link">
                  View restaurants and businesses for sale
                </Link>
              </article>
              <article>
                <p className="pa-kicker">For sellers</p>
                <h3>
                  Prepare your exit.
                  <br />
                  <em>Protect the process.</em>
                </h3>
                <p>
                  Bring your restaurant to market with a considered valuation and a clear plan.
                  Prepare the information buyers need, approach marketing confidentially and
                  coordinate the details that connect an offer to closing.
                </p>
                <ul>
                  <li>Valuation and sale preparation</li>
                  <li>Confidential positioning and buyer qualification</li>
                  <li>Lease assignment, licensing and closing coordination</li>
                </ul>
                <EditorialLink to="/sell-your-restaurant">
                  Explore Selling a Restaurant
                </EditorialLink>
                <Link
                  to="/contact"
                  search={{ service: "Selling my restaurant" }}
                  className="pa-secondary-link"
                >
                  Discuss selling your restaurant
                </Link>
              </article>
            </div>
          </div>
        </section>
        <section className="pa-section pa-shell" aria-labelledby="services-title">
          <div className="pa-section-head pa-split-head">
            <div>
              <p className="pa-kicker">03 / Areas of focus</p>
              <h2 id="services-title">Restaurant Advisory Services</h2>
            </div>
            <p>
              A restaurant transaction is a collection of connected decisions. Get support where the
              details matter.
            </p>
          </div>
          <div className="pa-service-index">
            {services.map((s, i) => (
              <article key={s.to}>
                <span className="pa-index">0{i + 1}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <EditorialLink to={s.to}>{s.label}</EditorialLink>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="pa-process-section" aria-labelledby="process-title">
          <div className="pa-shell">
            <div className="pa-section-head pa-split-head">
              <div>
                <p className="pa-kicker">04 / From strategy to closing</p>
                <h2 id="process-title">What happens during a restaurant transaction?</h2>
              </div>
              <p>
                Each transaction has its own sequence. Due diligence, landlord discussions and
                agency processes can overlap, and third-party approvals influence the path forward.
              </p>
            </div>
            <ol className="pa-process">
              {steps.map(([name, body], i) => (
                <li key={name}>
                  <span className="pa-index">0{i + 1}</span>
                  <h3>{name}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="pa-section pa-shell pa-local" aria-labelledby="local-title">
          <div>
            <p className="pa-kicker">05 / Los Angeles, in detail</p>
            <h2 id="local-title">The Details That Shape a Los Angeles Restaurant Deal</h2>
            <span className="pa-local-rule" aria-hidden="true" />
          </div>
          <div className="pa-prose">
            <p>
              A restaurant transaction in Los Angeles is more than an agreement on price. The
              business, the premises and the buyer’s plans need to be considered together. Financial
              records help explain how the restaurant operates; equipment ownership helps define
              what is actually included in the sale.{" "}
              <Link to="/business-investigations">Restaurant due diligence</Link> brings those
              details into the conversation early.
            </p>
            <p>
              The lease is another workstream. Remaining term, assignment provisions and landlord
              requirements can influence the transaction.{" "}
              <Link to="/assignments-rent-abatement">Lease assignment coordination</Link> helps the
              parties identify the questions to address with the landlord before relying on a
              proposed arrangement.
            </p>
            <p>
              Licensing and permitting deserve their own attention. California ABC handles state
              alcohol licensing, while city or other local authorities may have separate alcohol-use
              approvals. <Link to="/alcohol-licensing">ABC transfer support</Link> should account
              for those distinct processes. Health permitting and ownership-change requirements also
              depend on the premises and the responsible agency;{" "}
              <Link to="/health-permitting">restaurant permitting support</Link> helps organize that
              review.
            </p>
            <p>
              Penthouse Advisors connects these workstreams with the business negotiations, escrow
              and closing coordination. The aim is a clearer picture of the restaurant transaction:
              what is known, what needs review and which party is responsible for the next step.
            </p>
          </div>
        </section>
        <section className="pa-guides-section" aria-labelledby="guides-title">
          <div className="pa-shell">
            <div className="pa-section-head">
              <p className="pa-kicker">06 / Informed decisions</p>
              <h2 id="guides-title">Restaurant Transaction Guides</h2>
            </div>
            <div className="pa-guides">
              {guides.map((g) => (
                <article key={g.to}>
                  <p className="pa-kicker">{g.category}</p>
                  <h3>{g.title}</h3>
                  <p>{g.body}</p>
                  <EditorialLink to={g.to}>{g.label}</EditorialLink>
                </article>
              ))}
            </div>
            <EditorialLink to="/help">Explore the Help Center</EditorialLink>
          </div>
        </section>
        <section className="pa-section pa-shell pa-faq-section" aria-labelledby="faq-title">
          <div>
            <p className="pa-kicker">07 / Questions worth asking</p>
            <h2 id="faq-title">Questions About Buying and Selling Restaurants</h2>
          </div>
          <div className="pa-faq">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  <h3>{f.q}</h3>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{f.a}</p>
                <EditorialLink to={f.to}>{f.label}</EditorialLink>
              </details>
            ))}
          </div>
        </section>
        <section className="pa-final" aria-labelledby="final-title">
          <div className="pa-shell">
            <p className="pa-kicker">Your restaurant. Your next decision.</p>
            <h2 id="final-title">Planning to Buy, Sell or Navigate a Restaurant Transaction?</h2>
            <p>
              Discuss your restaurant, acquisition, sale, lease or transaction obstacle with
              Penthouse Advisors.
            </p>
            <Link to="/contact" className="pa-button">
              {CONSULTATION_LABEL}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a href={PHONE_HREF} className="pa-final-phone">
              Or call {PHONE}
            </a>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
