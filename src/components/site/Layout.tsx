import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, ArrowUpRight, Accessibility } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CONSULTATION_LABEL,
  CONSULTATION_OFFER,
  CONSULTATION_TAB_DETAIL,
  CONSULTATION_TAB_TITLE,
} from "@/lib/consultation";

const PHONE = "310-663-3521";
const PHONE_HREF = "tel:+13106633521";
const EMAIL = "PenthouseAdvisors@gmail.com";
const EMAIL_HREF = "mailto:PenthouseAdvisors@gmail.com";
const HOURS = "8:00am – 7:00pm · Mon–Sun";
const primaryNav = [
  { to: "/alcohol-licensing", label: "Restaurant Alcohol Licensing" },
  { to: "/health-permitting", label: "Health Permitting" },
  { to: "/sell-your-restaurant", label: "Sell a Restaurant" },
  { to: "/buy-a-restaurant", label: "Buy a Restaurant" },
  { to: "/services", label: "Services" },
  { to: "/help", label: "Help Center" },
  { to: "/about", label: "About" },
];
const serviceGroups = [
  {
    title: "Transactions",
    links: [
      ["/buy-a-restaurant", "Restaurant Acquisitions"],
      ["/sell-your-restaurant", "Restaurant Dispositions"],
      ["/restaurants-for-sale", "Restaurants & Businesses for Sale"],
      ["/business-investigations", "Due Diligence"],
      ["/off-market-sourcing", "Off-Market Sourcing"],
      ["/restaurant-consulting", "Restaurant Consulting"],
    ],
  },
  {
    title: "Leases",
    links: [
      ["/restaurant-leasing", "Restaurant Leasing"],
      ["/assignments-rent-abatement", "Lease Assignments"],
      ["/leasing-vacant-restaurants", "Second-Generation Spaces"],
    ],
  },
  {
    title: "Licensing & Permits",
    links: [
      ["/alcohol-licensing", "ABC / Liquor Licensing"],
      ["/health-permitting", "Health Permitting"],
      ["/health-inspection", "Health Inspection"],
      ["/licensing-and-permits", "Licensing & Permits Overview"],
    ],
  },
];
function Brand() {
  return (
    <Link to="/" className="pa-brand" aria-label="Penthouse Advisors — Home">
      <img src="/images/brand-mark.webp" width={96} height={96} alt="" />
      <span>
        Penthouse <span>Advisors</span>
      </span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const servicesToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) mobilePanel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1200px)");
    const close = () => {
      setOpen(false);
      setServicesOpen(false);
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);
  return (
    <header className="pa-header">
      <div className="pa-shell pa-header-inner">
        <Brand />
        <nav aria-label="Primary" className="pa-desktop-nav">
          {primaryNav.map((n) =>
            n.to === "/services" ? (
              <div
                key={n.to}
                className="pa-disclosure"
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setServicesOpen(false);
                    servicesToggle.current?.focus();
                  }
                }}
              >
                <Link to={n.to}>{n.label}</Link>
                <button
                  ref={servicesToggle}
                  type="button"
                  aria-label="Toggle services navigation"
                  aria-expanded={servicesOpen}
                  aria-controls="services-navigation"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  <ChevronDown size={14} />
                </button>
                <div id="services-navigation" hidden={!servicesOpen} className="pa-mega">
                  {serviceGroups.map((group) => (
                    <div key={group.title}>
                      <p className="pa-kicker">{group.title}</p>
                      <ul>
                        {group.links.map(([to, label]) => (
                          <li key={to}>
                            <Link to={to} onClick={() => setServicesOpen(false)}>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={n.to} to={n.to}>
                {n.label}
              </Link>
            ),
          )}
        </nav>
        <Link
          to="/contact"
          className="pa-header-book"
          aria-label={CONSULTATION_LABEL}
        >
          <span>{CONSULTATION_TAB_TITLE}</span>
          <small>{CONSULTATION_TAB_DETAIL}</small>
        </Link>
        <button
          ref={mobileToggle}
          className="pa-menu-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        ref={mobilePanel}
        id="mobile-navigation"
        hidden={!open}
        className="pa-mobile-panel"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            mobileToggle.current?.focus();
          }
        }}
      >
        <nav aria-label="Mobile" className="pa-shell">
          {primaryNav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
          <details>
            <summary>Browse services</summary>
            {serviceGroups.map((group) => (
              <div key={group.title}>
                <p className="pa-kicker">{group.title}</p>
                {group.links.map(([to, label]) => (
                  <Link key={to} to={to} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </details>
          <Link to="/contact" onClick={() => setOpen(false)} className="pa-button">
            {CONSULTATION_LABEL}
          </Link>
          <a href={PHONE_HREF}>{PHONE}</a>
        </nav>
      </div>
    </header>
  );
}
function TopBar() {
  return (
    <div className="pa-topbar">
      <div className="pa-shell pa-topbar-inner">
        <p>
          <strong>
            Book a Fast Resolution: Restaurant &amp; Food Market Health Dept., Permitting, Red Tags,
            Code Compliance Issues, Alcohol Licensing, Lease, Rent and Abatement Allowances, Retail
            Business Situations.
          </strong>
        </p>
        <p>
          <Link to="/contact">
            <strong>Book Now: $35</strong> Mobile-to-Mobile 30 Minute Call For Resolutions.
          </Link>
        </p>
        <p>
          All Other Matters: Call/Text: Richard Stein COO · Roschard Paticchio-Stein CEO{" "}
          <a href={PHONE_HREF}>{PHONE}</a>
          {" · "}
          <a href={EMAIL_HREF}>Email: {EMAIL}</a>
          {" · "}
          {HOURS}
        </p>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <footer className="pa-footer">
      <div className="pa-shell">
        <div className="pa-footer-grid">
          <div>
            <Brand />
            <p className="pa-footer-position">
              Los Angeles Restaurant
              <br />
              Brokerage &amp; Advisory.
            </p>
            <p className="pa-footer-book">
              <strong>Need Restaurant solutions Fast? Book Now</strong>{" "}
              <Link to="/contact">
                a 30-minute mobile-to-mobile call for real answers on restaurants, properties, and
                city matters.
              </Link>
            </p>
            <a href={PHONE_HREF}>Other Matters: Call or Text: {PHONE}</a>
            <a className="pa-email" href={EMAIL_HREF}>
              {EMAIL}
            </a>
            <p className="pa-hours">{HOURS}</p>
            <div className="pa-footer-owner">
              <p>
                <strong>Thank you, Richard Stein COO · Roschard Paticchio-Stein CEO</strong>
              </p>
            </div>
          </div>
          <div>
            <h2>Restaurant Transactions</h2>
            <ul>
              {[
                ["/buy-a-restaurant", "Buy a Restaurant"],
                ["/sell-your-restaurant", "Sell a Restaurant"],
                ["/restaurants-for-sale", "Restaurants & Businesses for Sale"],
                ["/restaurant-leasing", "Restaurant Leasing"],
                ["/alcohol-licensing", "ABC Licensing"],
                ["/health-permitting", "Restaurant Permitting"],
                ["/services", "All Advisory Services"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Firm &amp; Resources</h2>
            <ul>
              {[
                ["/about", "About Penthouse Advisors"],
                ["/agents", "Meet the Advisors"],
                ["/help", "Help Center"],
                ["/contact", "Contact & Consultation"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
              <li>
                <a href="/blog">
                  Restaurant Insights / Blog <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
            <h2 className="pa-footer-subhead">Additional Expertise</h2>
            <ul>
              <li>
                <Link to="/commercial-property-management">Commercial Property Management</Link>
              </li>
              <li>
                <Link to="/e2-visa-europe">International Restaurant Buyers</Link>
              </li>
              <li>
                <Link to="/hardware-store-for-sale">Selected Business Opportunities</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pa-footer-bottom">
          <span>© {new Date().getFullYear()} Penthouse Advisors Inc.</span>
          <span>Serving Los Angeles County</span>
          <span className="pa-ada-badge">
            <Accessibility size={16} aria-hidden="true" />
            ADA Accessible Website
          </span>
          <Link to="/contact">{CONSULTATION_OFFER}</Link>
        </div>
      </div>
    </footer>
  );
}
export function SiteLayout({ children }: { children: ReactNode; transparentHeader?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <TopBar />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
export { PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, HOURS };
