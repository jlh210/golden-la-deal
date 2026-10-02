const fs = require("fs"),
  crypto = require("crypto");
const { createRequire } = require("module");
const r = createRequire(`${process.env.PHASE1_TEST_TOOLS}/package.json`);
const { JSDOM } = r("jsdom");
const dir = "audit/phase25/production";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const entries = files.map((f) => {
  const raw = fs.readFileSync(`${dir}/${f}`, "utf8");
  const d = new JSDOM(raw).window.document;
  const main = d.querySelector("main");
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent),
  );
  const meta = [...d.querySelectorAll("meta[name],meta[property]")].map((m) =>
    Object.fromEntries([...m.attributes].map((a) => [a.name, a.value])),
  );
  const links = [...main.querySelectorAll("a")].map((a) => ({
    href: a.getAttribute("href"),
    text: a.textContent.trim(),
  }));
  return {
    file: f,
    sha256: crypto.createHash("sha256").update(raw).digest("hex"),
    url: d.querySelector("link[rel=canonical]").href,
    status: 200,
    canonical: d.querySelector("link[rel=canonical]").href,
    title: d.title,
    meta,
    headings: [...main.querySelectorAll("h1,h2,h3")].map((h) => ({
      level: h.tagName,
      text: h.textContent,
      id: h.id,
    })),
    articleText: main.textContent,
    mainHTML: main.innerHTML,
    articleSchema: schemas.find((s) => s["@type"] === "Article") || null,
    schemas,
    images: [...main.querySelectorAll("img")].map((i) => ({
      src: i.getAttribute("src"),
      alt: i.alt,
    })),
    internalLinks: links.filter((l) => l.href.startsWith("/") || l.href.startsWith("#")),
    externalLinks: links.filter((l) => !l.href.startsWith("/") && !l.href.startsWith("#")),
    cta: links.filter((l) => l.href.includes("contact") || l.href.startsWith("tel:")),
    related: [...main.querySelectorAll("section")]
      .filter((s) => s.textContent.includes("Keep reading."))
      .map((s) => s.textContent),
    indexability: {
      robots: d.querySelector("meta[name=robots]")?.content,
      headerFile: f.replace(".html", ".headers"),
    },
    claimsForReview: [...main.querySelectorAll("p,li")]
      .map((p) => p.textContent)
      .filter((t) => /\d|must|require|automatically|no-cost|grandfather|legal|exempt/i.test(t)),
  };
});
fs.writeFileSync(
  "audit/phase25/blog-inventory.json",
  JSON.stringify({ capturedAt: new Date().toISOString(), entries }, null, 2),
);
for (const e of entries)
  console.log(
    e.file,
    e.articleSchema,
    "\nIMAGES",
    e.images,
    "\nPRICE",
    e.articleText.match(/.{0,100}(?:no-cost|\$75|45.minute|free valuation).{0,160}/gi),
  );
