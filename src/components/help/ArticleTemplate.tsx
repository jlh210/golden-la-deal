import { Link } from "@tanstack/react-router";
import type { Article, Category, Section } from "@/content/help/types";
import { Breadcrumbs } from "./Breadcrumbs";

function sectionId(section: Extract<Section, { type: "h2" }>) {
  return (
    section.id ??
    section.text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}
function renderSection(s: Section, i: number) {
  switch (s.type) {
    case "h2":
      return (
        <h2 key={i} id={sectionId(s)}>
          {s.text}
        </h2>
      );
    case "h3":
      return <h3 key={i}>{s.text}</h3>;
    case "p":
      return <p key={i}>{s.text}</p>;
    case "ul":
      return (
        <ul key={i}>
          {s.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {s.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={i}>
          {s.text}
          {s.cite && <cite>{s.cite}</cite>}
        </blockquote>
      );
    case "callout":
      return (
        <aside key={i} className="pa-editorial-note">
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </aside>
      );
    case "table":
      return (
        <div key={i} className="pa-article-table">
          <table>
            <thead>
              <tr>
                {s.headers.map((text) => (
                  <th key={text} scope="col">
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, j) => (
                <tr key={j}>
                  {row.map((text, k) =>
                    k === 0 ? (
                      <th key={k} scope="row">
                        {text}
                      </th>
                    ) : (
                      <td key={k}>{text}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "links":
      return (
        <ul key={i} className="pa-context-links">
          {s.items.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>{item.title}</Link>
            </li>
          ))}
        </ul>
      );
    case "sources":
      return (
        <div key={i} className="pa-article-sources">
          <span>Sources: </span>
          {s.items.map((item, j) => (
            <span key={item.href}>
              {j > 0 && " · "}
              <a href={item.href}>{item.title}</a>
            </span>
          ))}
        </div>
      );
  }
}
const dateLabel = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
export function ArticleTemplate({
  article,
  category,
  blogCategory,
}: {
  article: Article;
  category?: Category;
  blogCategory?: string;
}) {
  const toc = article.sections.filter(
    (s): s is Extract<Section, { type: "h2" }> => s.type === "h2",
  );
  return (
    <article className="pa-shell pa-article">
      <Breadcrumbs
        crumbs={
          category
            ? [
                { label: "Help Center", to: "/help" },
                { label: category.title, to: `/help/${category.slug}` },
                { label: article.title },
              ]
            : [{ label: "Insights", to: "/blog" }, { label: article.title }]
        }
      />
      <header className="pa-article-header">
        <p className="pa-kicker">{category?.title ?? blogCategory}</p>
        <h1>{article.title}</h1>
        {article.answer && <p className="pa-article-answer">{article.answer}</p>}
        <div className="pa-article-meta">
          {article.originalAuthor && (
            <span>
              Original article by{" "}
              <Link to={article.originalAuthor.to}>
                {article.originalAuthor.name}, {article.originalAuthor.role}
              </Link>
            </span>
          )}
          {article.publishedAt && (
            <span>
              Published <time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time>
            </span>
          )}
          <span>
            Content updated <time dateTime={article.updatedAt}>{dateLabel(article.updatedAt)}</time>
          </span>
          <span>{article.readMinutes} min read</span>
        </div>
      </header>
      <div className="pa-article-grid">
        <div className="pa-article-body">
          <aside className="pa-takeaways" aria-label="Key takeaways">
            <h2>Key takeaways</h2>
            <ul>
              {article.keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
          <details className="pa-mobile-toc">
            <summary>On this page</summary>
            <ol>
              {toc.map((s) => (
                <li key={sectionId(s)}>
                  <a href={`#${sectionId(s)}`}>{s.text}</a>
                </li>
              ))}
            </ol>
          </details>
          <div className="pa-article-prose">{article.sections.map(renderSection)}</div>
          {article.faqs.length > 0 && (
            <section className="pa-article-faq">
              <h2>Questions readers ask</h2>
              {article.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          )}
          <section className="pa-article-next">
            <p className="pa-kicker">Your next step</p>
            <h2>Apply this to your transaction.</h2>
            <p>
              When you need support with a specific restaurant, review the relevant Penthouse
              Advisors service and its consultation options.
            </p>
            <Link to={article.commercialParent.to} className="pa-text-link">
              {article.commercialParent.title} <span aria-hidden="true">↗</span>
            </Link>
          </section>
          {article.related?.length ? (
            <section className="pa-article-related">
              <h2>Continue your research.</h2>
              <ul>
                {article.related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to}>{r.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <nav className="pa-desktop-toc" aria-label="Article contents">
          <p className="pa-kicker">On this page</p>
          <ol>
            {toc.map((s) => (
              <li key={sectionId(s)}>
                <a href={`#${sectionId(s)}`}>{s.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </article>
  );
}
