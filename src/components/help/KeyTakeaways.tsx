import { Sparkles } from "lucide-react";

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside
      aria-label="Key takeaways"
      className="rounded-xl border border-gold/40 bg-gold/[0.04] p-6"
    >
      <div className="flex items-center gap-2 text-gold">
        <Sparkles className="h-4 w-4" />
        <span className="text-xs font-semibold uppercase tracking-widest">Key Takeaways</span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
