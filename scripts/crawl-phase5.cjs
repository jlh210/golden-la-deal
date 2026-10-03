/* Read-only rendered crawl. No form submissions or external account actions. */
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { createRequire } = require("node:module");
const { JSDOM } = createRequire(
  `${process.env.PHASE1_TEST_TOOLS || "/private/tmp/penthouse-phase1-tests"}/package.json`,
)("jsdom");
const base = process.argv[2] || "http://127.0.0.1:4174";
const output = process.argv[3] || "audit/phase5/local-before";
const origin = "https://www.penthouseadvisors.com";
const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
const sha = (s) => createHash("sha256").update(s).digest("hex");
const flatten = (s) => s.flatMap((x) => x["@graph"] || [x]);
const get = async (p) => {
  const r = await fetch(base + p, { redirect: "manual", signal: AbortSignal.timeout(20000) });
  return { r, text: await r.text() };
};
(async () => {
  fs.mkdirSync(output, { recursive: true });
  const { r: sr, text: sitemap } = await get("/sitemap.xml");
  const xml = new JSDOM(sitemap, { contentType: "text/xml" }).window.document;
  const sitemapUrls = [...xml.querySelectorAll("loc")].map((x) => x.textContent);
  const seeds = JSON.parse(fs.readFileSync("audit/phase4/before-inventory.json")).map((x) => x.url);
  // Discover additional static application pages; dynamic paths come from links/sitemap/baseline.
  for (const f of fs.readdirSync("src/routes")) {
    if (!f.endsWith(".tsx") || f.includes("$") || f.startsWith("__")) continue;
    const route = fs
      .readFileSync(path.join("src/routes", f), "utf8")
      .match(/createFileRoute\(["']([^"']+)/)?.[1];
    if (route && !route.startsWith("/api/") && !route.includes(".xml"))
      seeds.push(route.replace(/\/$/, "") || "/");
  }
  const queue = [
    ...new Set([
      "/",
      "/api/public/contact-map",
      ...seeds,
      ...sitemapUrls.map((x) => new URL(x).pathname),
    ]),
  ];
  const seen = new Set(),
    pages = [],
    assets = new Map(),
    failures = [],
    fragments = [];
  function addAsset(raw, from) {
    if (!raw || raw.startsWith("data:")) return;
    const u = new URL(raw, origin + from);
    if (u.origin === origin) assets.set(u.pathname, { url: u.pathname });
  }
  while (queue.length) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    const { r, text } = await get(url);
    const d = new JSDOM(text, { url: origin + url }).window.document;
    const m = (k) => d.querySelector(`meta[name="${k}"],meta[property="${k}"]`)?.content || null;
    const canonical = d.querySelector("link[rel=canonical]")?.href || null;
    const schemas = [];
    for (const el of d.querySelectorAll('script[type="application/ld+json"]'))
      try {
        schemas.push(JSON.parse(el.textContent));
      } catch {
        failures.push({ url, issue: "Invalid JSON-LD" });
      }
    const outgoing = [];
    for (const a of d.querySelectorAll("a[href]")) {
      const dest = new URL(a.href, origin + url);
      if (dest.origin !== origin) continue;
      const p = dest.pathname;
      outgoing.push({
        url: p,
        query: dest.search,
        fragment: dest.hash,
        anchor: norm(a.textContent),
        inMain: !!a.closest("main"),
      });
      if (!p.startsWith("/api/") && !/\.(xml|txt|png|jpg|webp|svg|ico|pdf)$/i.test(p))
        queue.push(p);
      if (dest.hash)
        fragments.push({ from: url, to: p, id: decodeURIComponent(dest.hash.slice(1)) });
    }
    for (const frame of d.querySelectorAll("iframe[src]")) {
      const u = new URL(frame.getAttribute("src"), origin + url);
      if (u.origin === origin && u.pathname === "/api/public/contact-map") queue.push(u.pathname);
    }
    if (canonical && new URL(canonical).origin === origin) queue.push(new URL(canonical).pathname);
    for (const el of d.querySelectorAll(
      "img[src],script[src],source[src],link[rel=stylesheet],link[rel=icon],link[rel=apple-touch-icon],link[rel=manifest],link[rel=preload],link[rel=modulepreload]",
    ))
      addAsset(el.getAttribute("src") || el.getAttribute("href"), url);
    for (const el of d.querySelectorAll("[srcset]"))
      for (const part of el.getAttribute("srcset").split(","))
        addAsset(part.trim().split(/\s/)[0], url);
    addAsset(m("og:image"), url);
    const types = flatten(schemas).flatMap((x) => [].concat(x["@type"] || []));
    const headings = [...d.querySelectorAll("main h1,main h2,main h3,main h4")].map((h) => ({
      level: +h.tagName.slice(1),
      text: norm(h.textContent),
    }));
    const robot = m("robots") || r.headers.get("x-robots-tag") || "index, follow";
    pages.push({
      url,
      status: r.status,
      redirect: r.headers.get("location"),
      indexability: r.status === 200 && !robot.includes("noindex") ? "indexable" : "nonindexable",
      canonical,
      title: d.title,
      description: m("description"),
      h1: [...d.querySelectorAll("h1")].map((h) => norm(h.textContent)),
      headings,
      robots: robot,
      xRobotsTag: r.headers.get("x-robots-tag"),
      schemaTypes: types,
      schemas,
      outgoing,
      incoming: [],
      sitemapInclusion: sitemapUrls.includes(origin + url),
      openGraph: Object.fromEntries(
        [
          "og:title",
          "og:description",
          "og:url",
          "og:type",
          "og:image",
          "og:image:alt",
          "og:image:width",
          "og:image:height",
          "twitter:card",
          "twitter:image",
          "twitter:title",
          "twitter:description",
        ].map((k) => [k, m(k)]),
      ),
      contentFingerprint: sha(norm(d.querySelector("main")?.textContent)),
      mainText: norm(d.querySelector("main")?.textContent),
      ids: [...d.querySelectorAll("[id]")].map((x) => x.id),
      images: [...d.querySelectorAll("img")].map((x) => ({
        src: x.getAttribute("src"),
        alt: x.getAttribute("alt"),
        width: x.getAttribute("width"),
        height: x.getAttribute("height"),
        loading: x.getAttribute("loading"),
        fetchpriority: x.getAttribute("fetchpriority"),
      })),
      externalScripts: [...d.querySelectorAll("script[src]")]
        .map((x) => x.src)
        .filter((x) => !x.startsWith(origin)),
      analyticsMarkers: [
        ...text.matchAll(
          /googletagmanager\.com|google-analytics\.com|static\.cloudflareinsights\.com|plausible\.io|clarity\.ms|G-[A-Z0-9]{6,}|GTM-[A-Z0-9]+/g,
        ),
      ].map((x) => x[0]),
    });
  }
  for (const p of pages)
    for (const a of p.outgoing) {
      const t = pages.find((x) => x.url === a.url);
      if (t) t.incoming.push({ from: p.url, anchor: a.anchor, inMain: a.inMain });
      if (!t || t.status !== 200)
        failures.push({
          url: p.url,
          issue: "Broken/redirecting internal link",
          target: a.url,
          status: t?.status,
        });
    }
  for (const f of fragments)
    if (!pages.find((x) => x.url === f.to)?.ids.includes(f.id))
      failures.push({ ...f, issue: "Missing fragment" });
  for (const [url, asset] of assets) {
    const r = await fetch(base + url, { signal: AbortSignal.timeout(20000) });
    asset.status = r.status;
    asset.type = r.headers.get("content-type");
    const body = await r.arrayBuffer();
    asset.bytes = body.byteLength;
    if (r.status !== 200) failures.push({ url, issue: "Missing asset", status: r.status });
    if (asset.type?.includes("text/css"))
      for (const match of Buffer.from(body)
        .toString()
        .matchAll(/url\(["']?([^\s)"']+)/g)) {
        const u = new URL(match[1], origin + url);
        if (u.origin === origin && !assets.has(u.pathname))
          assets.set(u.pathname, { url: u.pathname });
      }
  }
  const unknown = [];
  for (const p of [
    "/blog/phase5-missing-post",
    "/help/buying-a-restaurant/phase5-missing-guide",
    "/help/phase5-missing-category",
    "/restaurants-for-sale/phase5-missing-listing",
    "/phase5-missing-service",
  ]) {
    const { r } = await get(p);
    unknown.push({ url: p, status: r.status });
    if (r.status !== 404)
      failures.push({ url: p, issue: "Missing path not 404", status: r.status });
  }
  const duplicates = (key) =>
    Object.entries(
      Object.groupBy(
        pages.filter((x) => x.indexability === "indexable"),
        (x) => x[key],
      ),
    )
      .filter(([k, v]) => !k || k === "null" || v.length > 1)
      .map(([value, v]) => ({ value, urls: v.map((x) => x.url) }));
  const robots = (await get("/robots.txt")).text;
  const summary = {
    pages: pages.length,
    sitemapStatus: sr.status,
    sitemapUrls: sitemapUrls.length,
    uniqueSitemapUrls: new Set(sitemapUrls).size,
    noindex: pages.filter((p) => p.robots.includes("noindex")).map((p) => p.url),
    titleDuplicates: duplicates("title"),
    metaDuplicates: duplicates("description"),
    orphaned: pages
      .filter(
        (p) =>
          p.indexability === "indexable" &&
          p.url !== "/" &&
          !p.incoming.some((i) => i.from !== p.url),
      )
      .map((p) => p.url),
    weakMainDiscovery: pages
      .filter(
        (p) =>
          p.indexability === "indexable" &&
          p.url !== "/" &&
          !p.incoming.some((i) => i.from !== p.url && i.inMain),
      )
      .map((p) => p.url),
    unknown,
    assetCount: assets.size,
    failures,
    robots,
  };
  for (const [name, value] of Object.entries({
    manifest: pages,
    summary,
    assets: [...assets.values()],
  }))
    fs.writeFileSync(`${output}/${name}.json`, JSON.stringify(value, null, 2) + "\n");
  fs.writeFileSync(`${output}/sitemap.xml`, sitemap);
  fs.writeFileSync(`${output}/robots.txt`, robots);
  console.log(JSON.stringify(summary, null, 2));
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
