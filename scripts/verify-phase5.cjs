const fs = require("node:fs");
const assert = require("node:assert/strict");
const { createHash } = require("node:crypto");
const base = process.argv[2] || "http://127.0.0.1:4174";
const dir = process.argv[3] || "audit/phase5/local-final";
const pages = JSON.parse(fs.readFileSync(dir + "/manifest.json"));
const summary = JSON.parse(fs.readFileSync(dir + "/summary.json"));
const before = JSON.parse(fs.readFileSync("audit/phase5/local-before/manifest.json"));
const prior = JSON.parse(fs.readFileSync("audit/phase4/verification.json"));
const origin = "https://www.penthouseadvisors.com";
const org = origin + "/#organization";
const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
const checks = [];
const check = (name, fn) => {
  try {
    fn();
    checks.push({ name, status: "PASS" });
  } catch (e) {
    checks.push({ name, status: "FAIL", reason: e.message });
  }
};
(async () => {
  check("59 known production routes preserved", () => {
    for (const old of prior.routes) {
      const p = pages.find((p) => p.url === old.url);
      assert.equal(p?.status, 200, old.url);
      assert.equal(p.canonical, old.canonical, old.url);
    }
  });
  check("Full crawl and sitemap", () => {
    assert.equal(summary.failures.length, 0, JSON.stringify(summary.failures));
    assert.equal(summary.sitemapUrls, 49);
    assert.equal(summary.uniqueSitemapUrls, 49);
    assert.equal(summary.noindex.filter((p) => p.startsWith("/help/")).length, 10);
    for (const p of pages.filter((p) => p.sitemapInclusion)) {
      assert.equal(p.indexability, "indexable");
      assert.equal(p.status, 200);
    }
  });
  check("Titles, descriptions, H1 and canonicals", () => {
    assert.equal(summary.titleDuplicates.length, 0);
    assert.equal(summary.metaDuplicates.length, 0);
    for (const p of pages.filter((p) => p.indexability === "indexable")) {
      assert(p.title && p.description, p.url);
      assert.equal(p.h1.length, 1, p.url);
      assert.equal(p.canonical, origin + p.url, p.url);
      for (const k of [
        "og:title",
        "og:description",
        "og:url",
        "og:image",
        "og:image:alt",
        "twitter:card",
        "twitter:image",
      ])
        assert(p.openGraph[k], p.url + " missing " + k);
      assert.equal(new URL(p.openGraph["og:url"]).href, p.canonical, p.url);
      assert(new URL(p.openGraph["og:image"]).protocol === "https:", p.url);
    }
  });
  check("Content freeze", () => {
    for (const p of pages.filter((p) => p.status === 200 && p.canonical)) {
      const b = before.find((b) => b.url === p.url);
      const expected =
        p.url === "/restaurants-for-sale"
          ? createHash("sha256")
              .update(
                norm(
                  JSON.parse(fs.readFileSync("audit/phase4/before-inventory.json"))
                    .find((x) => x.url === p.url)
                    .text.replace("Click a gold pin", "Click a pin"),
                ),
              )
              .digest("hex")
          : b.contentFingerprint;
      assert.equal(p.contentFingerprint, expected, p.url + " main copy changed");
    }
  });
  check("No orphaned indexable pages", () => assert.equal(summary.orphaned.length, 0));
  check("Robots declaration and noindex visibility", () => {
    assert(summary.robots.includes("Sitemap: " + origin + "/sitemap.xml"));
    assert(!summary.robots.includes("Disallow: /help"));
    assert(!summary.robots.includes("Disallow: /blog"));
    assert(!summary.robots.includes("Disallow: /\n"));
  });
  check("JSON-LD identity, unsupported fields and FAQ visible parity", () => {
    const forbidden = new Set([
      "aggregateRating",
      "review",
      "geo",
      "address",
      "priceRange",
      "award",
      "awards",
      "hasCredential",
      "numberOfEmployees",
      "potentialAction",
    ]);
    function walk(x, url) {
      if (!x || typeof x !== "object") return;
      for (const [k, v] of Object.entries(x)) {
        assert(!forbidden.has(k), url + " unsupported " + k);
        if (["publisher", "provider"].includes(k) && v?.["@id"]) assert.equal(v["@id"], org, url);
        walk(v, url);
      }
    }
    for (const p of pages.filter((p) => p.status === 200 && p.canonical)) {
      assert(p.schemas.length, p.url);
      walk(p.schemas, p.url);
      const nodes = p.schemas.flatMap((x) => x["@graph"] || [x]);
      assert.equal(
        nodes.filter((x) => [].concat(x["@type"]).includes("Organization")).length,
        1,
        p.url,
      );
      for (const n of nodes) {
        if (n["@type"] === "FAQPage")
          for (const q of n.mainEntity) {
            assert(p.mainText.includes(norm(q.name)), p.url + " FAQ question not visible");
            assert(
              p.mainText.includes(norm(q.acceptedAnswer.text)),
              p.url + " FAQ answer mismatch",
            );
          }
        if (n["@type"] === "Article") {
          assert.equal(n.url, p.canonical);
          assert.equal(n.dateModified, "2026-10-02");
          assert.equal(n.publisher["@id"], org);
          if (p.url.startsWith("/help/")) {
            assert(!n.author);
            assert(!n.datePublished);
          } else {
            assert.equal(n.author.name, "Richard Stein");
            assert.equal(n.datePublished, "2026-08-27");
          }
        }
        if (n["@type"] === "BreadcrumbList")
          for (const item of n.itemListElement) {
            assert(item.item.startsWith(origin));
            assert(pages.some((t) => t.canonical === item.item || t.canonical === item.item + "/"));
          }
      }
    }
  });
  check("Current offer and no old consultation price", () => {
    for (const p of pages.filter((p) => p.status === 200 && p.canonical)) {
      assert(
        !/\$75|45.minute|no.cost valuation|free valuation consultation/i.test(p.mainText),
        p.url,
      );
    }
    assert(pages.find((p) => p.url === "/contact").mainText.includes("$35"));
  });
  check("Unknown content returns genuine 404", () =>
    summary.unknown.forEach((p) => assert.equal(p.status, 404, p.url)),
  );
  const redirectChecks = [];
  for (const p of pages.filter((p) => p.status >= 300 && p.status < 400)) {
    const u = new URL(p.redirect, origin);
    const r = await fetch(base + u.pathname, { redirect: "manual" });
    redirectChecks.push({
      from: p.url,
      to: u.pathname,
      status: p.status,
      destinationStatus: r.status,
    });
  }
  check("Existing legacy redirects remain one-hop", () => {
    assert.equal(redirectChecks.length, 4);
    redirectChecks.forEach((x) => assert.equal(x.destinationStatus, 200));
  });
  const queries = [];
  for (const p of [
    "/?utm_source=phase5",
    "/contact?service=Buying%20a%20restaurant&utm_source=phase5",
    "/blog?utm_campaign=phase5",
    "/help?utm_campaign=phase5",
  ]) {
    const r = await fetch(base + p);
    const html = await r.text();
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
    queries.push({ url: p, status: r.status, canonical });
  }
  check("Tracking parameters excluded from canonical", () => {
    for (const q of queries) {
      assert.equal(q.status, 200);
      assert.equal(new URL(q.canonical).href, origin + q.url.split("?")[0]);
    }
  });
  fs.writeFileSync(
    "audit/phase5/technical-verification.json",
    JSON.stringify({ checks, redirectChecks, queries }, null, 2) + "\n",
  );
  console.log(JSON.stringify(checks, null, 2));
  if (checks.some((x) => x.status === "FAIL")) process.exitCode = 1;
})();
