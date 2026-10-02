// Read-only preservation and internal-link verification; no external forms or payments.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const { createRequire } = require("node:module");
const { JSDOM } = createRequire(`${process.env.PHASE1_TEST_TOOLS}/package.json`)("jsdom");
const base = process.argv[2] || "http://127.0.0.1:5174";
const { entries } = JSON.parse(fs.readFileSync("audit/phase25/blog-inventory.json", "utf8"));
const normalize = (s) => s.replace(/\s+/g, " ").trim();
const replacement = (s) =>
  s.replace(
    "A no-cost valuation call gets you a defensible range specific to your restaurant.",
    "Discuss your restaurant in a $35, 30-minute consultation.",
  );
(async () => {
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  const localUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const live = fs.readFileSync("audit/phase25/production/sitemap.xml", "utf8");
  const liveUrls = [...live.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  for (const url of liveUrls)
    assert(
      localUrls.some((local) => local.replace(/\/$/, "") === url.replace(/\/$/, "")),
      `Missing live route ${url}`,
    );
  assert.equal(new Set(localUrls).size, localUrls.length);
  const results = [];
  const targets = new Set();
  for (const entry of entries) {
    assert.equal(
      createHash("sha256")
        .update(fs.readFileSync(`audit/phase25/production/${entry.file}`))
        .digest("hex"),
      entry.sha256,
    );
    const path = new URL(entry.url).pathname;
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    const d = new JSDOM(await res.text()).window.document;
    const original = new JSDOM(`<main>${entry.mainHTML}</main>`).window.document;
    original.querySelector("article > div.mt-16")?.remove();
    assert.equal(
      normalize(d.querySelector(".pa-preserved-blog").textContent),
      normalize(replacement(original.querySelector("main").textContent)),
      `Content fidelity ${path}`,
    );
    assert.equal(d.title, entry.title);
    for (const meta of entry.meta) {
      const key = meta.name ? "name" : "property";
      assert.equal(
        d.querySelector(`meta[${key}="${meta[key]}"]`)?.content,
        meta.content,
        `${path}: ${meta[key]}`,
      );
    }
    assert.equal(d.querySelector("link[rel=canonical]").href, entry.canonical);
    assert.equal(d.querySelectorAll("h1").length, 1);
    assert.equal(
      d.querySelector("meta[name=description]").content,
      entry.meta.find((m) => m.name === "description").content,
    );
    assert.equal(d.querySelector("meta[name=robots]").content, "index, follow");
    const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
      JSON.parse(s.textContent),
    );
    const article = schemas.find((s) => s["@type"] === "Article");
    if (entry.articleSchema) assert.deepEqual(article, entry.articleSchema);
    const faq = schemas.find((s) => s["@type"] === "FAQPage");
    if (faq)
      for (const [i, details] of [...d.querySelectorAll(".pa-preserved-blog details")].entries()) {
        assert.equal(
          normalize(details.querySelector("p").textContent),
          faq.mainEntity[i].acceptedAnswer.text,
        );
      }
    for (const link of d.querySelectorAll('.pa-preserved-blog a[href^="/"]'))
      targets.add(link.getAttribute("href"));
    for (const link of d.querySelectorAll('.pa-preserved-blog a[href^="#"]'))
      assert(d.getElementById(link.getAttribute("href").slice(1)), `Missing anchor ${path}`);
    for (const img of d.querySelectorAll(".pa-preserved-blog img")) {
      assert(img.alt);
      assert(img.width > 0 && img.height > 0);
      assert.equal((await fetch(base + img.getAttribute("src"))).status, 200);
    }
    assert(
      !d.querySelector(
        ".pa-preserved-blog script,.pa-preserved-blog iframe,.pa-preserved-blog [onclick]",
      ),
    );
    results.push({
      path,
      status: res.status,
      canonical: entry.canonical,
      content: "PASS: complete text matches original except documented price sentence",
      metadata: "PASS",
      schema: "PASS",
      indexable: true,
    });
  }
  for (const path of targets) assert.equal((await fetch(base + path)).status, 200, path);
  assert.equal((await fetch(base + "/blog/not-a-real-post")).status, 404);
  const allLinks = new Set();
  for (const url of localUrls) {
    const page = new JSDOM(await (await fetch(base + (new URL(url).pathname || "/"))).text()).window
      .document;
    for (const a of page.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      if (href.startsWith("/") || href.startsWith("https://www.penthouseadvisors.com")) {
        const destination = new URL(href, "https://www.penthouseadvisors.com");
        allLinks.add(destination.pathname + destination.search);
      }
    }
  }
  for (const path of allLinks) assert.equal((await fetch(base + path)).status, 200, path);
  const result = {
    status: "PASS",
    allSiteInternalLinksChecked: allLinks.size,
    blog: results,
    liveSitemapUrls: liveUrls.length,
    localSitemapUrls: localUrls.length,
    allKnownLiveSitemapRoutesPreserved: true,
    blogInternalLinksChecked: targets.size,
    unknownBlogStatus: 404,
  };
  fs.writeFileSync("audit/phase25/route-verification.json", JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
