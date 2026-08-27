import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost, Section } from "@/content/blog/types";
import { getPost } from "@/content/blog";
import { Breadcrumbs } from "@/components/help/Breadcrumbs";
import { KeyTakeaways } from "@/components/help/KeyTakeaways";
import { FAQAccordion } from "@/components/help/FAQAccordion";
import { CTASection } from "@/components/site/CTASection";
import { ListingSpotlight } from "@/components/blog/ListingSpotlight";

function renderSection(s: Section, i: number) {
  switch (s.type) {
    case "h2":
      return (
        <h2
          key={i}
          id={s.id ?? s.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
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
            <li key={j} className="leading-relaxed">{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="mt-4 space-y-2 pl-5 list-decimal marker:text-gold marker:font-bold text-foreground/85">
          {s.items.map((it, j) => (
            <li key={j} className="leading-relaxed">{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={i} className="mt-6 border-l-4 border-gold pl-5 italic text-foreground/80">
          {s.text}
          {s.cite && <cite className="mt-2 block text-xs not-italic text-muted-foreground">— {s.cite}</cite>}
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

function getSpotlightIndex(sections: Section[]): number {
  const h2Indices = sections
    .map((s, i) => (s.type === "h2" ? i : -1))
    .filter((i) => i !== -1);
  // Skip the first h2 (the intro heading) so the promo never lands before
  // the reader has gotten into the actual content.
  const candidates = h2Indices.slice(1);
  if (candidates.length > 0) {
    return candidates[Math.floor((candidates.length - 1) / 2)];
  }
  return Math.floor(sections.length / 2);
}

export function BlogPostTemplate({ post }: { post: BlogPost }) {
  const toc = post.sections
    .filter((s): s is Extract<Section, { type: "h2" }> => s.type === "h2")
    .map((s) => ({
      text: s.text,
      id: s.id ?? s.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));

  const published = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = (post.related ?? [])
    .map((r) => ({ ...r, post: getPost(r.slug) }))
    .filter((r) => r.post);

  const spotlightIndex = getSpotlightIndex(post.sections);

  return (
    <article className="container-x py-10 md:py-14">
      <Breadcrumbs crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">{post.category}</p>
        <h1 className="mt-2 text-3xl md:text-5xl font-display font-bold leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold" /> {post.readMinutes} min read
          </span>
          <span>Published {published}</span>
          <span>By Richard Stein, COO</span>
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <KeyTakeaways items={post.keyTakeaways} />

          <div className="mt-10 max-w-3xl">
            {post.sections.map((s, i) => (
              <Fragment key={i}>
                {i === spotlightIndex && i > 0 && <ListingSpotlight />}
                {renderSection(s, i)}
              </Fragment>
            ))}
          </div>

          {post.faqs.length > 0 && (
            <section className="mt-14 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                Frequently Asked Questions
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">
                Common questions, answered directly.
              </h2>
              <div className="mt-6">
                <FAQAccordion faqs={post.faqs} />
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-14 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Related</p>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Keep reading.</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
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
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">On this page</p>
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
          title="Thinking about buying, selling, or leasing?"
          body="Speak directly with a Penthouse Advisors specialist about your situation."
        />
      </div>
    </article>
  );
}
