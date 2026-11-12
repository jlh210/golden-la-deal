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
        <HeadingCTA />
        {article.answer && <p className="pa-article-answer">{article.answer}</p>}
        {!category && (
          <Link
            to="/contact"
            className="inline-flex bg-[#8b671d] px-5 py-3 text-sm font-semibold text-white no-underline transition hover:bg-[#6f5115]"
          >
            Book a Consultation
          </Link>
        )}
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
