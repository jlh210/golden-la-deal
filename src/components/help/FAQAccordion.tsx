import type { FAQ } from "@/content/help/types";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  if (!faqs.length) return null;
  return (
    <div className="grid gap-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-xl border border-border bg-card p-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
            {f.q}
            <span className="text-xl leading-none text-gold transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
