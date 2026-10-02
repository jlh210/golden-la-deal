import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import type { Article, Category, Section } from "@/content/help/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { KeyTakeaways } from "./KeyTakeaways";
import { FAQAccordion } from "./FAQAccordion";
import { CTASection } from "@/components/site/CTASection";

function renderSection(s: Section, i: number) {
  switch (s.type) {
    case "h2":
      return (
        <h2
          key={i}
          id={
            s.id ??
            s.text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "")
          }
          className="mt-12 text-2xl md:text-3xl font-display font-bold scroll-mt-24"
        >
          {s.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-8 text-xl font-display font-bold">
          {s.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-4 text-base leading-relaxed text-foreground/85">
          {s.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-4 space-y-2 pl-5 list-disc marker:text-gold text-foreground/85">
          {s.items.map((it, j) => (
            <li key={j} className="leading-relaxed">
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol
          key={i}
          className="mt-4 space-y-2 pl-5 list-decimal marker:text-gold marker:font-bold text-foreground/85"
        >
          {s.items.map((it, j) => (
            <li key={j} className="leading-relaxed">
              {it}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={i} className="mt-6 border-l-4 border-gold pl-5 italic text-foreground/80">
          {s.text}
          {s.cite && (
            <cite className="mt-2 block text-xs not-italic text-muted-foreground">— {s.cite}</cite>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <div key={i} className="mt-6 rounded-xl border border-gold/30 bg-gold/[0.04] p-5">
          <div className="text-sm font-semibold text-gold">{s.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.text}</p>
        </div>
      );
  }
}

export function ArticleTemplate({ article, category }: { article: Article; category: Category }) {
  const toc = article.sections
    .filter((s): s is Extract<Section, { type: "h2" }> => s.type === "h2")
    .map((s) => ({
      text: s.text,
      id:
        s.id ??
        s.text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
    }));

  const updated = new Date(article.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <article className="container-x py-10 md:py-14">
      <Breadcrumbs
        crumbs={[
          { label: "Help Center", to: "/help" },
          { label: category.title, to: `/help/${category.slug}` },
          { label: article.title },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          {category.title}
        </p>
        <h1 className="mt-2 text-3xl md:text-5xl font-display font-bold leading-tight">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold" /> {article.readMinutes} min read
          </span>
          <span>Updated {updated}</span>
          <span>By Richard Stein, COO</span>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <KeyTakeaways items={article.keyTakeaways} />

          <div className="mt-10 max-w-3xl">{article.sections.map(renderSection)}</div>

          {article.faqs.length > 0 && (
            <section className="mt-14 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                Frequently Asked Questions
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">
                Common questions about {category.title.toLowerCase()}.
              </h2>
              <div className="mt-6">
                <FAQAccordion faqs={article.faqs} />
              </div>
            </section>
          )}

          <p className="mt-10 max-w-3xl text-base">
            For help with your transaction, explore{" "}
            <Link to={article.commercialParent.to} className="underline underline-offset-4">
              {article.commercialParent.title}
            </Link>
            .
          </p>

          {article.related && article.related.length > 0 && (
            <section className="mt-14 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Related</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Keep reading.</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {article.related.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 text-sm font-semibold hover:border-gold/60 hover:bg-gold/5 transition"
                  >
                    <span>{r.title}</span>
                    <ArrowRight className="h-4 w-4 text-gold transition group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              On this page
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="block border-l-2 border-border pl-3 py-1 text-muted-foreground hover:border-gold hover:text-foreground transition"
                  >
                    {t.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-16">
        <CTASection
          title="Have a specific situation?"
          body="Speak directly with a Penthouse Advisors specialist about your restaurant."
        />
      </div>
    </article>
  );
}
