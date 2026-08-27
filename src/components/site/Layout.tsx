import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Mail, Clock, ChevronDown, Calendar } from "lucide-react";
import { useState, type ReactNode } from "react";
import { agents } from "@/routes/agents";
import logoMarkDark from "@/assets/logo-mark-dark.png";
import logoAsset from "@/assets/logo-mark.png";

const PHONE = "310-663-3521";
const PHONE_HREF = "tel:+13106633521";
const EMAIL = "PenthouseAdvisors@gmail.com";
const EMAIL_HREF = "mailto:PenthouseAdvisors@gmail.com";
const HOURS = "8:00am – 7:00pm · Mon–Sun";

const primaryNav = [
{ to: "/", label: "Home" },
{ to: "/services", label: "Services", hasDropdown: true },
{ to: "/restaurants-for-sale", label: "Restaurants & Businesses for Sale/Lease" },
{ to: "/buy-a-restaurant", label: "Buy a Restaurant" },
{ to: "/sell-your-restaurant", label: "Sell a Restaurant" },
{ to: "/alcohol-licensing", label: "Restaurant Alcohol Licensing" },
{ to: "/help", label: "Help" },
{ to: "/blog", label: "Blog" },
{ to: "/about", label: "About" },
{ to: "/contact", label: "Contact" },
] as const;

const servicesDropdown = [
{ to: "/buy-a-restaurant", label: "Buy a Restaurant" },
{ to: "/sell-your-restaurant", label: "Sell Your Restaurant" },
{ to: "/restaurants-for-sale", label: "Restaurant, Medical Office, Hardware Store for Sale/Lease in Los Angeles" },
{ to: "/restaurant-leasing", label: "Restaurant Leasing" },
{ to: "/licensing-and-permits", label: "Licensing & Permits" },
{ to: "/restaurant-consulting", label: "Restaurant Consulting" },
{ to: "/commercial-property-management", label: "Commercial Property Management" },
{ to: "/liquor-license-for-sale", label: "Liquor License For Sale" },
{ to: "/health-inspection", label: "Health Dept Inspection" },
{ to: "/health-permitting", label: "Health Permitting & Plan Check" },
{ to: "/leasing-vacant-restaurants", label: "Leasing Vacant Restaurants" },
{ to: "/assignments-rent-abatement", label: "Assignments & Rent Abatement" },
{ to: "/business-investigations", label: "Business Investigations" },
{ to: "/buyer-tenant-resolutions", label: "Buyer / Tenant Resolutions" },
{ to: "/grandfather-protection", label: "Grandfather Protection" },
{ to: "/vermin-inspections", label: "Vermin Inspections" },
{ to: "/search-door-knocking", label: "Off-Market Door-Knocking" },
{ to: "/e2-visa-europe", label: "E-2 Visa (Europe)" },
];

const fullNav = [
{ to: "/", label: "Home" },
{ to: "/services", label: "All Services" },
{ to: "/buy-a-restaurant", label: "Buy a Restaurant" },
{ to: "/sell-your-restaurant", label: "Sell Your Restaurant" },
{ to: "/alcohol-licensing", label: "Restaurant Alcohol Licensing" },
{ to: "/restaurants-for-sale", label: "Restaurant Listings" },
{ to: "/restaurant-leasing", label: "Restaurant Leasing" },
{ to: "/licensing-and-permits", label: "Licensing & Permits" },
{ to: "/restaurant-consulting", label: "Restaurant Consulting" },
{ to: "/commercial-property-management", label: "Commercial Property Management" },
{ to: "/about", label: "About" },
{ to: "/agents", label: "Agents" },
{ to: "/help", label: "Help Center" },
{ to: "/blog", label: "Blog" },
{ to: "/contact", label: "Contact / Book Consultation" },
{ to: "/liquor-license-for-sale", label: "Liquor License For Sale" },
{ to: "/health-inspection", label: "Health Dept Inspection" },
{ to: "/health-permitting", label: "Health Permitting & Plan Check" },
{ to: "/vermin-inspections", label: "Vermin Inspections" },
{ to: "/grandfather-protection", label: "Grandfather Protection" },
{ to: "/assignments-rent-abatement", label: "Assignments & Rent Abatement" },
{ to: "/business-investigations", label: "Business Investigations" },
{ to: "/buyer-tenant-resolutions", label: "Buyer / Tenant Resolutions" },
{ to: "/search-door-knocking", label: "Off-Market Door-Knocking" },
{ to: "/e2-visa-europe", label: "E-2 Visa (Europe)" },
{ to: "/leasing-vacant-restaurants", label: "Leasing Vacant Restaurants" },
] as const;

function Header() {
const [open, setOpen] = useState(false);
return (
<header
className="sticky top-0 z-50 transition-all duration-500 bg-black border-b border-gold/40 shadow-[0_2px_24px_-12px_oklch(0.2_0.02_265/0.18)]"
>
<div className="border-b border-gold/20 bg-charcoal-deep">
<div className="container-x flex h-8 items-center justify-center gap-2">
<span className="font-display text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold text-center truncate min-w-0">
Penthouse Advisors Inc.
</span>
<span className="text-[11px] sm:text-xs text-gold/40" aria-hidden="true">·</span>
<a
href="https://penthouseadvisors.com/"
className="font-display text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold/80 hover:text-gold transition-colors text-center truncate min-w-0"
>
LA Restaurant Business Brokerage
</a>
</div>
</div>

<div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
<Link to="/" className="flex items-center gap-3 min-w-0 text-white">
<img
src={logoMarkDark}
alt="Penthouse Advisors Inc."
className="h-11 w-11 shrink-0 rounded-xl"
width={512}
height={512}
/>
<span className="font-display text-xs sm:text-lg tracking-[0.1em] sm:tracking-[0.18em] uppercase truncate text-white drop-shadow-sm">
Penthouse <span className="text-gold">Advisors</span> Inc.
</span>
</Link>

<nav className="hidden lg:flex items-center gap-6">
{primaryNav.map((n) =>
n.to === "/services" ? (
<div key={n.to} className="relative group">
<Link
to={n.to}
className="text-sm font-medium text-white/80 hover:text-gold transition-colors inline-flex items-center gap-1 py-5"
activeProps={{ className: "text-gold" }}
>
{n.label}
<ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
</Link>
<div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
<div className="w-[560px] rounded-lg border border-border bg-card/95 backdrop-blur-xl shadow-elegant p-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
{servicesDropdown.map((s) => (
<Link
key={s.to}
to={s.to}
className="text-sm text-foreground/80 hover:text-gold transition-colors py-1.5"
activeProps={{ className: "text-gold" }}
>
{s.label}
</Link>
))}
</div>
</div>
</div>
) : (
<Link
key={n.to}
to={n.to}
className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
activeProps={{ className: "text-gold" }}
>

{n.label}
</Link>
)
)}
</nav>

<div className="flex items-center gap-2">
<a
href={PHONE_HREF}
className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold"
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
className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-gold/40 text-white"
onClick={() => setOpen((v) => !v)}
>
{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
</button>
</div>
</div>

{open && (
<div className="lg:hidden border-t border-border bg-card max-h-[80vh] overflow-y-auto">
<div className="container-x py-4 flex flex-col gap-1">
{fullNav.map((n) => (
<Link
key={n.to}
to={n.to}
onClick={() => setOpen(false)}
className="text-base font-medium text-foreground/90 hover:text-gold py-2 border-b border-border/80"
activeProps={{ className: "text-gold" }}
activeOptions={{ exact: n.to === "/" }}
>
{n.label}
</Link>
))}
<a
href={PHONE_HREF}
className="inline-flex items-center gap-2 text-base font-semibold pt-4 text-foreground"
>
<Phone className="h-4 w-4 text-gold" /> {PHONE}
</a>
<Link
to="/contact"
onClick={() => setOpen(false)}
className="mt-3 mb-2 inline-flex justify-center rounded-md bg-gold-gradient px-4 py-3 text-sm font-semibold text-charcoal-deep"
>
Book a Consultation
</Link>
</div>
</div>
)}
</header>
);
}

const OWNERS = [
{
name: "Roschard Paticchio-Stein",
title: "CEO / Owner / Business Agent",
dre: "DRE #02203003",
},
{
name: "Richard Stein",
title: "COO / Business Advisor / Owner",
dre: null,
},
{
name: "Rosanna Paticchio",
title: "CFO / Broker of Record",
dre: "DRE #02332697",
},
];

function Footer() {
return (
<footer className="border-t border-border bg-card mt-24">
<div className="container-x py-14 grid gap-10 md:grid-cols-3">
<div>
<div className="flex items-center gap-3">
<img
src={logoAsset}
alt="Penthouse Advisors Inc."
className="h-11 w-auto shrink-0"
/>
<span className="font-display text-lg tracking-[0.18em] uppercase">
Penthouse <span className="text-gold">Advisors</span> Inc.
</span>
</div>

<p className="mt-4 text-sm text-muted-foreground max-w-sm">
A sophisticated, full-service restaurant advisory and brokerage firm.
Servicing Los Angeles County since 2021. <span className="text-gold font-semibold">Do It Now.</span>
</p>

<ul className="mt-5 space-y-2 text-sm">
<li className="flex items-center gap-2">
<Phone className="h-4 w-4 text-gold" />
<a href={PHONE_HREF} className="hover:text-gold">{PHONE}</a>
</li>
<li className="flex items-center gap-2">
<Mail className="h-4 w-4 text-gold" />
<a href={EMAIL_HREF} className="hover:text-gold break-all">{EMAIL}</a>
</li>
<li className="flex items-center gap-2 text-muted-foreground">
<Clock className="h-4 w-4 text-gold" /> {HOURS}
</li>
</ul>
</div>

<div>
<h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Ownership</h4>
<ul className="mt-4 space-y-4 text-sm">
{OWNERS.map((o) => (
<li key={o.name}>
<div className="font-semibold">{o.name}</div>
<div className="text-muted-foreground">{o.title}</div>
{o.dre && <div className="text-xs text-gold/80 mt-0.5">{o.dre}</div>}
</li>
))}
</ul>

<h4 className="mt-8 text-sm font-semibold text-gold uppercase tracking-wider">Agents</h4>
<ul className="mt-4 space-y-4 text-sm">
{agents
.filter((a) => a.name !== "Rosanna Paticchio")
.map((a) => (
<li key={a.name}>
<div className="font-semibold">{a.name}</div>
<div className="text-muted-foreground">{a.title}</div>
{a.dre && <div className="text-xs text-gold/80 mt-0.5">{a.dre}</div>}
</li>
))}
</ul>
<div className="mt-4">
<Link to="/agents" className="text-sm font-semibold text-gold hover:underline">Meet all agents →</Link>
</div>
</div>

<div>
<h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Services</h4>
<ul className="mt-4 space-y-2 text-sm">
<li><Link to="/buy-a-restaurant" className="hover:text-gold">Buy a Restaurant</Link></li>
<li><Link to="/sell-your-restaurant" className="hover:text-gold">Sell Your Restaurant</Link></li>
<li><Link to="/restaurants-for-sale" className="hover:text-gold">Restaurant Listings</Link></li>
<li><Link to="/restaurant-leasing" className="hover:text-gold">Restaurant Leasing</Link></li>
<li><Link to="/licensing-and-permits" className="hover:text-gold">Licensing & Permits</Link></li>
<li><Link to="/restaurant-consulting" className="hover:text-gold">Restaurant Consulting</Link></li>
<li><Link to="/alcohol-licensing" className="hover:text-gold">Restaurant Alcohol Licensing</Link></li>
<li><Link to="/liquor-license-for-sale" className="hover:text-gold">Liquor License For Sale</Link></li>
<li><Link to="/health-inspection" className="hover:text-gold">Health Inspection</Link></li>
<li><Link to="/health-permitting" className="hover:text-gold">Health Permitting & Plan Check</Link></li>
<li><Link to="/leasing-vacant-restaurants" className="hover:text-gold">Leasing Vacant Restaurants</Link></li>
<li><Link to="/assignments-rent-abatement" className="hover:text-gold">Assignments & Abatement</Link></li>
<li><Link to="/business-investigations" className="hover:text-gold">Business Investigations</Link></li>
<li><Link to="/buyer-tenant-resolutions" className="hover:text-gold">Buyer / Tenant Resolutions</Link></li>
<li><Link to="/search-door-knocking" className="hover:text-gold">Off-Market Door-Knocking</Link></li>
<li><Link to="/e2-visa-europe" className="hover:text-gold">E-2 Visa (Europe)</Link></li>
<li><Link to="/grandfather-protection" className="hover:text-gold">Grandfather Protection</Link></li>
<li><Link to="/vermin-inspections" className="hover:text-gold">Vermin Inspections</Link></li>
<li><Link to="/blog" className="hover:text-gold">Blog</Link></li>
<li><Link to="/contact" className="hover:text-gold">Book a Consultation</Link></li>
</ul>
</div>
</div>
<div className="border-t border-border">
<div className="container-x py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
<span>© {new Date().getFullYear()} Penthouse Advisors Inc. · Servicing Los Angeles County, CA</span>
<span className="font-display tracking-widest text-gold">DO IT NOW.</span>
</div>
</div>
</footer>
);
}

function FloatingCTA() {
return (
<Link
to="/contact"
aria-label="Book a consultation"
className="md:hidden fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-3 text-sm font-bold text-charcoal-deep shadow-gold"
>
<Calendar className="h-4 w-4" /> Book a Consultation
</Link>
);
}

export function SiteLayout({ children, transparentHeader = false }: { children: ReactNode; transparentHeader?: boolean }) {
return (
<div className="min-h-screen flex flex-col">
<Header />
<main className="flex-1">{children}</main>
<Footer />

<FloatingCTA />
</div>
);
}

export { PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, HOURS };
