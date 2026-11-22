import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

const groups: { heading: string; items: { label: string; body: string }[] }[] = [
  {
    heading: "Brief on our core services",
    items: [
      {
        label: "Acquisitions & Sales",
        body: "Assisting clients with buying or selling existing restaurants, bars, and food service businesses.",
      },
      {
        label: "Retail-Commercial Leasing",
        body: "Securing vacant second-generation spaces, handling lease negotiations, and managing landlord lease assignments.",
      },
      {
        label: "Restaurant Business Valuations",
        body: "To find the correct Purchase Price Valuation we start off by reviewing the Rent, years remaining on the lease, available Options, the average gross monthly sales, Net Monthly Returns, and opportunity assessment. Then performing a Health Department, Code Compliant pre-inspection of the attached and non attached equipment.",
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
        body: "Restaurant Code Compliant pre-inspections. Adding or Changing Equipment under a Plan-Check “Equipment Review”. Navigating health department inspections. Ownership-Change Requirements. Resolving code compliance violations, example, “red tags”.",
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
 * Firm overview copy shared by the Home hero and the About hero (under
 * "Servicing LA County's Restaurants & Businesses").
 */
export function FirmOverview({
  className = "",
  intro,
  coreServicesHeading,
  labelOverrides,
  bodyOverrides,
}: {
  className?: string;
  intro?: ReactNode;
  /** Overrides the first group's heading ("Brief on our core services"). */
  coreServicesHeading?: string;
  /** Per-page overrides for item labels, keyed by the default label. */
  labelOverrides?: Record<string, string>;
  /** Per-page overrides for item body copy, keyed by the default label. */
  bodyOverrides?: Record<string, string>;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {intro ? (
        <p>{intro}</p>
      ) : (
        <p>
          <strong>Penthouse Advisors Inc.,</strong> focuses entirely on the Legal, Transactional
          matters involving, Health Department Permitting and Code Compliance, CA, State Alcohol
          Licensing, Rent/Lease Negotiations, Regulatory Sides of Restaurant Sales/Acquisitions and
          Retail/Commercial Businesses and Real Estate.
        </p>
      )}
      {groups.map((g, i) => (
        <div key={g.heading}>
          <p className="font-semibold">
            {i === 0 && coreServicesHeading ? coreServicesHeading : g.heading}:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {g.items.map((item) => (
              <li key={item.label}>
                <strong>{labelOverrides?.[item.label] ?? item.label}:</strong>{" "}
                {bodyOverrides?.[item.label] ?? item.body}
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
