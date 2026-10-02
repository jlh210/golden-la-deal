import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";
import { allArticles } from "@/content/help";

export function HelpSearch() {
  const [q, setQ] = useState("");
  const flat = useMemo(() => allArticles(), []);
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const terms = query.split(/\s+/);
    const relevance = (title: string) =>
      terms.filter((term) => title.toLowerCase().includes(term)).length;
    return flat
      .filter(({ article, category }) => {
        const hay = [article.title, article.description, ...article.keywords, category.title]
          .join(" ")
          .toLowerCase();
        return terms.every((term) => hay.includes(term));
      })
      .sort((a, b) => relevance(b.article.title) - relevance(a.article.title))
      .slice(0, 8);
  }, [q, flat]);

  return (
    <div className="mx-auto max-w-2xl">
      <label className="relative block">
        <span className="sr-only">Search the help center</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gold" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search transaction guides…"
          className="w-full rounded-full border border-gold/40 bg-card pl-12 pr-4 py-4 text-base shadow-elegant focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </label>
      {q.trim() && results.length === 0 && (
        <p role="status" className="mt-3 text-sm">
          No matching guide. Try a broader topic or browse the collections below.
        </p>
      )}
      {results.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-xl border border-border bg-card shadow-elegant">
          {results.map(({ article, category }) => (
            <Link
              key={`${category.slug}/${article.slug}`}
              to="/help/$category/$slug"
              params={{ category: category.slug, slug: article.slug }}
              className="group flex items-start justify-between gap-4 border-b border-border/60 last:border-0 px-4 py-3 hover:bg-gold/5"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold">{article.title}</div>
                <div className="text-xs text-muted-foreground">
                  {category.title} · {article.readMinutes} min
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-gold opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
