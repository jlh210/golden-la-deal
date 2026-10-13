import { buildServiceJsonLd } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { Wine, ShieldCheck, Stamp } from "lucide-react";
import { ServiceLanding } from "@/components/site/ServiceLanding";

const URL = "https://www.penthouseadvisors.com/licensing-and-permits";
const FAQS = [
  {
    q: "How long does a Type 47 liquor license transfer take in Los Angeles?",
    a: "Typically 60–90 days from filing once the seller's license is clean and the premises diagram is approved. Census-tract issues or CUB requirements can extend the timeline — we diagnose those before you file.",
  },
  {
    q: "Do you handle Health Department plan check?",
    a: "Yes. We draft Health Dept blueprints, submit to plan check, manage corrections, and walk through to stamped approval — see our Health Permitting & Plan Check page.",
  },
  {
    q: "Can you remove a red tag and get me reopened?",
    a: "Yes — that is one of our specialties. We pre-inspect, remediate, schedule re-inspection, and reopen restaurants under red tag across LA County.",
  },
  {
    q: "What is grandfather protection?",
    a: "Older restaurant spaces often retain rights — seating count, hood size, ABC type — that current code would not allow. We protect those rights during sale, lease, or remodel.",
  },
];

export const Route = createFileRoute("/licensing-and-permits")({
  head: () => ({
    meta: [
      { title: "Restaurant Licensing & Permits Los Angeles | ABC, Health, Plan Check" },
      {
        name: "description",
        content:
          "Restaurant licensing and permitting in LA County: Type 41/47 ABC transfers, Health Dept plan check, red-tag rescue, vermin inspections, and grandfather protection.",
      },
      { property: "og:title", content: "Restaurant Licensing & Permits in Los Angeles" },
      {
        property: "og:description",
        content: "ABC licensing, Health Dept permitting, and red-tag rescue across LA County.",
      },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: buildServiceJsonLd({
      name: "Restaurant Licensing & Permits — Los Angeles",
      serviceType: "Restaurant Licensing & Permitting",
      description:
        "Alcohol licensing, Health Dept permitting, and code compliance for LA County restaurants.",
      url: URL,
      breadcrumbs: [
        { name: "Home", url: "https://www.penthouseadvisors.com" },
        { name: "Services", url: "https://www.penthouseadvisors.com/services" },
        { name: "Licensing & Permits", url: URL },
      ],
      faqs: FAQS,
    }),
  }),
  component: LicensingPage,
});

function LicensingPage() {
  return (
    <ServiceLanding
      eyebrow="Licensing & Permits"
      title="Licensing & permits"
      accent="that actually clear."
      subtitle="ABC liquor licensing, Health Dept plan check, red-tag rescue, and code compliance for LA County restaurants."
      h1="Restaurant Licensing & Permits in Los Angeles"
      overview="Licensing and permitting is where most restaurant deals stall. We've structured that work as a discipline — ABC transfers and new applications (Type 41 Beer & Wine, Type 47 Hard Liquor), Health Department plan check and inspection, vermin compliance, and grandfather protection on older spaces. One firm, sequenced in parallel, ending at doors open."
      benefits={[
        {
          icon: Wine,
          title: "ABC Licensing",
          body: "Type 41 / Type 47 transfers, new applications, CUB diversion, premises diagram, and census-tract strategy.",
        },
        {
          icon: ShieldCheck,
          title: "Health Dept Clearance",
          body: "Pre-inspection, red-tag remediation, plan check submittal, hood compliance, and re-inspection.",
        },
        {
          icon: Stamp,
          title: "Code & Compliance",
          body: "Vermin compliance inspections, grandfather protection, and code-trigger analysis on remodels.",
        },
      ]}
      process={[
        {
          step: "01",
          title: "Diagnose",
          body: "License history, premises diagram, code posture, prior inspection records — pulled and reviewed.",
        },
        {
          step: "02",
          title: "File & Negotiate",
          body: "ABC filing, Health plan check, corrections, hearings, CUB if required.",
        },
        {
          step: "03",
          title: "Issue & Open",
          body: "Stamped permits, active license, clean Health card — keys to the operator.",
        },
      ]}
      faqs={FAQS}
      related={[
        { to: "/alcohol-licensing", label: "Alcohol Licensing (Type 41/47)" },
        { to: "/liquor-license-for-sale", label: "Liquor License For Sale" },
        { to: "/health-inspection", label: "Health Inspection & Red-Tag" },
        { to: "/vermin-inspections", label: "Vermin Inspections" },
        { to: "/grandfather-protection", label: "Grandfather Protection" },
      ]}
      serviceNeeded="Alcohol licensing (Type 41 / 47)"
      ctaTitle="Stuck in licensing or permitting?"
      ctaBody="We diagnose and move today. One firm, one phone call."
    />
  );
}
