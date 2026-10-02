import { Link } from "@tanstack/react-router";
import { CONSULTATION_LABEL } from "@/lib/consultation";

export interface ServiceAuthorityContent {
  title: string;
  answer: string;
  service: string;
  prepare: string[];
  guides: { to: string; label: string }[];
  sources?: { href: string; label: string }[];
  jurisdiction?: string;
}

export function ServiceAuthorityHero({ content }: { content: ServiceAuthorityContent }) {
  return (
    <section className="pa-service-hero">
      <div className="pa-shell">
        <nav aria-label="Breadcrumb" className="pa-service-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services">Services</Link>
        </nav>
        <p className="pa-kicker">Penthouse Advisors · Los Angeles County</p>
        <h1>{content.title}</h1>
        <p className="pa-service-answer">{content.answer}</p>
        <Link to="/contact" search={{ service: content.service }} className="pa-button">
          {CONSULTATION_LABEL}
        </Link>
      </div>
    </section>
  );
}

export function ServiceAuthorityDetails({ content }: { content: ServiceAuthorityContent }) {
  return (
    <section className="pa-shell pa-service-details" aria-label="Prepare for your consultation">
      <div>
        <p className="pa-kicker">Start with the facts</p>
        <h2>What to bring to the conversation.</h2>
        <ul>
          {content.prepare.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="pa-service-note">
          Have what you can ready. The $35, 30-minute consultation helps define the next step; any
          further service scope and fees are discussed separately.
        </p>
      </div>
      <div>
        <p className="pa-kicker">Explore the details</p>
        <h2>Related services &amp; guides.</h2>
        <ul>
          {content.guides.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.label}</Link>
            </li>
          ))}
        </ul>
        {content.jurisdiction && <p className="pa-service-note">{content.jurisdiction}</p>}
        {content.sources && (
          <div className="pa-service-sources">
            <h3>Official resources</h3>
            <ul>
              {content.sources.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export function ServiceAuthorityFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="pa-shell pa-service-faq">
      <p className="pa-kicker">Questions answered</p>
      <h2>Before you begin.</h2>
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  );
}
