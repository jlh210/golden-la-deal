const fs = require("node:fs");
const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const { JSDOM } = createRequire(`${process.env.PHASE1_TEST_TOOLS}/package.json`)("jsdom");
const base = process.argv[2] || "http://127.0.0.1:4174";
const before = JSON.parse(fs.readFileSync("audit/phase4/before-inventory.json"));
const audit = JSON.parse(fs.readFileSync("audit/phase4/intent-audit.json"));
const normalize = (s) => s.replace(/\s+/g, " ").trim();
(async () => {
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((x) => new URL(x[1]).pathname);
  assert.equal(new Set(urls).size, 49);
  assert.equal(urls.length, 49);
  const docs = new Map(),
    results = [],
    links = new Set(),
    graph = [];
  for (const old of before) {
    const response = await fetch(base + old.url, { redirect: "manual" });
    assert.equal(response.status, 200, old.url);
    const d = new JSDOM(await response.text()).window.document;
    docs.set(old.url, d);
    assert.equal(d.querySelectorAll("h1").length, 1, old.url);
    assert.equal(d.querySelector('link[rel="canonical"]').href, old.canonical, old.url);
    const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map((x) =>
      JSON.parse(x.textContent),
    );
    const cat = audit.categories.find((x) => x.url === old.url);
    const empty = cat && cat.articleUrls.length === 0;
    const robots = d.querySelector('meta[name="robots"]')?.content || "index, follow";
    if (empty) {
      assert.match(robots, /noindex/);
      assert.match(robots, /follow/);
      assert(!urls.includes(old.url));
    } else {
      assert(!robots.includes("noindex"), old.url);
      assert(urls.includes(old.url));
    }
    if (audit.commercialParents.some((x) => x.url === old.url)) {
      assert.equal(d.title, old.title);
      assert.equal(d.querySelector("h1").textContent, old.h1);
      assert.equal(
        normalize(d.querySelector("main").textContent),
        normalize(old.text),
        old.url + " commercial copy changed",
      );
      assert.deepEqual(schemas, old.schemas, old.url + " commercial schema changed");
    }
    for (const a of d.querySelectorAll("a[href]")) {
      const dest = new URL(a.getAttribute("href"), "https://www.penthouseadvisors.com" + old.url);
      if (dest.origin === "https://www.penthouseadvisors.com")
        links.add(dest.pathname + dest.search);
      if (a.getAttribute("href").startsWith("#"))
        assert(
          d.getElementById(decodeURIComponent(dest.hash.slice(1))),
          old.url + " missing anchor " + dest.hash,
        );
    }
    const article = d.querySelector(".pa-article");
    if (article) {
      const words = article
        .querySelector(".pa-article-answer")
        .textContent.trim()
        .split(/\s+/).length;
      assert(words >= 40 && words <= 80, old.url + " answer " + words);
      const as = schemas.find((s) => s["@type"] === "Article");
      assert(as);
      assert.equal(as.publisher["@id"], "https://www.penthouseadvisors.com/#organization");
      assert.equal(as.dateModified, "2026-10-02");
      if (old.url.startsWith("/blog/")) {
        assert.equal(as.datePublished, "2026-08-27");
        assert.equal(as.author.name, "Richard Stein");
        assert(article.textContent.includes("Original article by Richard Stein"));
      } else {
        assert(!as.author, "Unverified Help author");
        assert(!as.datePublished, "Invented Help publication");
        assert(!article.textContent.includes("By Richard Stein"));
      }
      assert(article.querySelector('time[datetime="2026-10-02"]'));
      const fq = schemas.find((s) => s["@type"] === "FAQPage");
      const details = [...article.querySelectorAll(".pa-article-faq details")];
      assert.equal(fq.mainEntity.length, details.length);
      for (const f of fq.mainEntity) {
        const detail = details.find((x) => x.querySelector("summary").textContent === f.name);
        assert(detail);
        assert.equal(detail.querySelector("p").textContent, f.acceptedAnswer.text);
      }
      const owner = audit.articles.find((x) => x.url === old.url).commercialParent;
      assert.equal(article.querySelector(".pa-article-next a").getAttribute("href"), owner);
      assert.equal(article.querySelectorAll(".pa-article-next").length, 1);
      assert(!article.querySelector('a[href^="/contact"]'), "Aggressive article contact CTA");
      const related = [...article.querySelectorAll(".pa-article-related a")].map((x) =>
        x.getAttribute("href"),
      );
      assert(related.length >= 2 && related.length <= 4);
      assert(!related.includes(old.url));
      const internal = [...article.querySelectorAll('a[href^="/"]')].map((x) =>
        x.getAttribute("href"),
      );
      const sourceLinks = [...article.querySelectorAll(".pa-article-sources a")].map((x) => x.href);
      graph.push({
        url: old.url,
        title: d.querySelector("h1").textContent,
        commercialParent: owner,
        related,
        contextualLinks: [...new Set(internal)],
        sources: sourceLinks,
        answerWords: words,
        bodyWords: article.textContent.trim().split(/\s+/).length,
        faqs: details.length,
      });
      const bad = /1\.5\s*[–-]\s*3\s*[×x]|six.figures|\$8[–-]\$18|2[–-]4 weeks|20[–-]40%/i;
      assert(!bad.test(article.textContent), old.url + " unsupported prior claim remains");
    }
    results.push({
      url: old.url,
      status: 200,
      canonical: old.canonical,
      indexability: robots,
      inSitemap: urls.includes(old.url),
    });
  }
  for (const path of links) {
    assert.equal((await fetch(base + path, { redirect: "manual" })).status, 200, path);
  }
  for (const path of [
    "/blog/not-a-real-post",
    "/help/buying-a-restaurant/not-a-real-post",
    "/help/not-a-category",
  ])
    assert.equal((await fetch(base + path)).status, 404, path);
  const emptyUrls = audit.categories.filter((x) => !x.articleUrls.length).map((x) => x.url);
  const hub = docs.get("/help");
  for (const a of hub.querySelectorAll("main a"))
    assert(!emptyUrls.includes(a.getAttribute("href")));
  assert(
    docs
      .get("/blog/restaurant-buyer-due-diligence-checklist")
      .querySelector("h1")
      .textContent.includes("Findings"),
  );
  assert.equal(graph.length, 11);
  const result = {
    status: "PASS",
    knownRoutes: results.length,
    indexableSitemapUrls: urls.length,
    noindexCategories: emptyUrls.length,
    articles: graph.length,
    internalDestinationsChecked: links.size,
    protectedCommercialPages: 7,
    redirects: 0,
    unknownRoutes: 404,
    routes: results,
  };
  fs.writeFileSync("audit/phase4/verification.json", JSON.stringify(result, null, 2));
  fs.writeFileSync("audit/phase4/link-graph.json", JSON.stringify(graph, null, 2));
  console.log(JSON.stringify({ ...result, routes: undefined }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
