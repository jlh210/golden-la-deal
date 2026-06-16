import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

const PHONE = "310-663-3521";
const PHONE_HREF = "tel:+13106633521";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/listings", label: "Listings" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-charcoal-deep/85 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-gold-gradient text-charcoal-deep font-display font-black">
            P
          </span>
          <span className="font-display font-bold tracking-tight text-sm sm:text-base truncate">
            PENTHOUSE <span className="text-gold">ADVISORS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-gold"
          >
            <Phone className="h-4 w-4 text-gold" /> {PHONE}
          </a>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center rounded-md bg-gold-gradient px-4 py-2 text-sm font-semibold text-charcoal-deep shadow-gold hover:opacity-95 transition"
          >
            Book a Consultation
          </Link>
          <button
            aria-label="Toggle menu"
            className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-charcoal-deep">
          <div className="container-x py-4 flex flex-col gap-3">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground/90 hover:text-gold py-1"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-base font-semibold pt-2"
            >
              <Phone className="h-4 w-4 text-gold" /> {PHONE}
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-md bg-gold-gradient px-4 py-3 text-sm font-semibold text-charcoal-deep"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal-deep mt-24">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-gold-gradient text-charcoal-deep font-display font-black">
              P
            </span>
            <span className="font-display font-bold tracking-tight">
              PENTHOUSE <span className="text-gold">ADVISORS INC.</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-md">
            Los Angeles' full-service restaurant brokerage & advisory firm. We buy, sell,
            license, lease, and rescue restaurants — fast.
          </p>
          <p className="mt-6 text-xs text-muted-foreground">
            CA DRE License #02145789 · Broker License #01998234
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={PHONE_HREF} className="hover:text-gold">{PHONE}</a></li>
            <li><a href="mailto:info@penthouseadvisors.com" className="hover:text-gold">info@penthouseadvisors.com</a></li>
            <li className="text-muted-foreground">Los Angeles, CA</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/listings" className="hover:text-gold">Listings</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Book a Consultation</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-x py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Penthouse Advisors Inc. All rights reserved.</span>
          <span className="font-display tracking-widest text-gold">DO IT NOW.</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingCall() {
  return (
    <a
      href={PHONE_HREF}
      aria-label="Call Penthouse Advisors"
      className="md:hidden fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
    >
      <Phone className="h-4 w-4" /> Call Now
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCall />
    </div>
  );
}

export { PHONE, PHONE_HREF };
