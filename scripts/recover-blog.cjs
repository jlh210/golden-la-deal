// Recover checked-in, read-only production snapshots. Never fetches or executes remote code.
// PHASE1_TEST_TOOLS=/private/tmp/penthouse-phase1-tests node scripts/recover-blog.cjs
const fs = require("fs");
const { createRequire } = require("module");
const r = createRequire(`${process.env.PHASE1_TEST_TOOLS}/package.json`);
const { JSDOM } = r("jsdom");
const { entries } = JSON.parse(fs.readFileSync("audit/phase25/blog-inventory.json", "utf8"));
fs.mkdirSync("src/content/blog", { recursive: true });
const records = entries.map((e) => {
  const d = new JSDOM(`<main>${e.mainHTML}</main>`).window.document;
  const main = d.querySelector("main");
  // Shared CTA is rendered by the current component, not frozen legacy payment copy/styles.
  main.querySelector("article > div.mt-16")?.remove();
  for (const el of main.querySelectorAll("script,iframe,object,embed,style,link,form")) el.remove();
  for (const el of main.querySelectorAll("*"))
    for (const a of [...el.attributes]) {
      if (
        a.name.startsWith("on") ||
        a.name === "style" ||
        a.name === "data-status" ||
        a.name === "aria-current" ||
        /^(?:javascript|data):/i.test(a.value)
      )
        el.removeAttribute(a.name);
    }
  for (const img of main.querySelectorAll("img")) {
    const dental = img.getAttribute("src").includes("dental");
    img.setAttribute(
      "src",
      dental ? "/images/blog/dental-office.png" : "/images/blog/westwood-restaurant.jpg",
    );
    img.setAttribute("width", dental ? "828" : "348");
    img.setAttribute("height", dental ? "791" : "348");
    img.setAttribute("loading", "lazy");
  }
  const old = "A no-cost valuation call gets you a defensible range specific to your restaurant.";
  const replacement = "Discuss your restaurant in a $35, 30-minute consultation.";
  let html = main.innerHTML.replace(old, replacement);
  const schemas = e.schemas
    .filter((s) => !s["@graph"])
    .map((s) => JSON.parse(JSON.stringify(s).replace(old, replacement)));
  for (const s of schemas) {
    if (s["@type"] === "CollectionPage")
      s.isPartOf = { "@id": "https://www.penthouseadvisors.com/#website" };
    if (s["@type"] === "Article")
      s.publisher = { "@id": "https://www.penthouseadvisors.com/#organization" };
  }
  const slug = e.file.replace(".html", "");
  fs.writeFileSync(`src/content/blog/${slug}.html`, html + "\n");
  return {
    slug,
    path: new URL(e.canonical).pathname,
    title: e.title,
    canonical: e.canonical,
    meta: e.meta.filter((m) => m.name !== "viewport" && m.name !== "theme-color"),
    schemas,
    hasCTA: slug !== "blog",
  };
});
fs.writeFileSync("src/content/blog/metadata.json", JSON.stringify(records, null, 2) + "\n");
fs.writeFileSync(
  "src/content/blog/index.ts",
  `import metadata from "./metadata.json";\n${records.map((r, i) => `import html${i} from "./${r.slug}.html?raw";`).join("\n")}\nconst html = [${records.map((_, i) => `html${i}`).join(", ")}];\nexport const blogPages = metadata.map((page, i) => ({ ...page, html: html[i] }));\nexport function blogHead(page: (typeof blogPages)[number]) {\nreturn {meta: [{title:page.title}, ...page.meta], links:[{rel:"canonical",href:page.canonical}], scripts:page.schemas.map(schema=>({type:"application/ld+json",children:JSON.stringify(schema)}))};\n}\n`,
);
fs.writeFileSync(
  "src/content/blog/paths.ts",
  `// Exact public production URLs; no inferred dates.\nexport const blogPaths = ${JSON.stringify(
    records.map((r) => r.path),
    null,
    2,
  )};\n`,
);
console.log(
  "Recovered",
  records.length,
  "Blog pages; originals retained in audit/phase25/production.",
);
