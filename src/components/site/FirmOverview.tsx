import { Link } from "@tanstack/react-router";

const groups: { heading: string; items: { label: string; body: string }[] }[] = [
  {
    heading: "Their core services include",
    items: [
      {
        label: "Acquisitions & Sales",
        body: "Assisting clients with buying or selling existing restaurants, bars, and food service businesses.",
      },
      {
        label: "Commercial Leasing",
        body: "Securing vacant second-generation spaces, handling lease negotiations, and managing landlord lease assignments.",
      },
      {
        label: "Valuations",
        body: "Performing pre-purchase business investigations and opportunity assessments.",
      },
    ],
  },
  {
    heading: "Licensing & Permitting",
    items: [
      {
        label: "ABC/Liquor Licensing",
        body: "Managing California Alcoholic Beverage Control state licensing, transfers (such as Type 41 or Type 47), and local alcohol-use approvals.",
      },
      {
        label: "Health Department Permitting",
        body: "Navigating health department inspections, ownership-change requirements, plan-checks, and resolving code compliance violations or “red tags”.",
      },
    ],
  },
  {
    heading: "Commercial Property Management",
    items: [
      {
        label: "Ordinance Compliance",
        body: "Ensuring commercial properties stay in compliance with local Los Angeles ordinances.",
      },
      {
        label: "Tenant Operations",
        body: "Handling rigorous tenant screening, prompt rent collections, move-in/move-out property inspections, and lease preparation.",
      },
    ],
  },
];

/**
 * Firm overview copy shared by the Home hero (under "Retail Business Advisor
 * and Brokerage · Los Angeles County") and the About hero (under "Servicing
 * LA County's Restaurants & Businesses").
 */
export function FirmOverview({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <p>
        <strong>Penthouse Advisors Inc.</strong> established in 2021, serving Los Angeles County as
        a modern, full-service restaurant brokerage and business advisory firm with an office in
        Santa Monica, CA. Because they operate as a professional consulting and brokerage firm
        rather than a visual design or construction company, they do not have a public portfolio.
        Instead, <strong>what they do</strong> focuses entirely on the legal, transactional, and
        regulatory sides of the restaurant and commercial real estate business.
      </p>
      {groups.map((g) => (
        <div key={g.heading}>
          <p className="font-semibold">{g.heading}:</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {g.items.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.body}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p>
        <Link to="/contact" className="font-semibold underline hover:opacity-80">
          Book a Consultation Appointment.
        </Link>
      </p>
    </div>
  );
}
