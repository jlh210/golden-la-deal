const fs = require("node:fs");
const assert = require("node:assert/strict");
const { createRequire } = require("node:module");
const { JSDOM } = createRequire(`${process.env.PHASE1_TEST_TOOLS}/package.json`)("jsdom");
const base = process.argv[2] || "http://127.0.0.1:4174";
const paths = [
  "buy-a-restaurant",
  "sell-your-restaurant",
  "restaurant-leasing",
  "restaurant-consulting",
  "alcohol-licensing",
  "health-permitting",
  "business-investigations",
];
(async () => {
  const results = [];
  for (const path of paths) {
    const response = await fetch(`${base}/${path}`);
    assert.equal(response.status, 200);
    const doc = new JSDOM(await response.text()).window.document;
    assert.equal(doc.querySelectorAll("h1").length, 1);
    assert.equal(
      doc.querySelector('link[rel="canonical"]').href,
      `https://www.penthouseadvisors.com/${path}`,
    );
    const answer = doc.querySelector(".pa-service-answer").textContent.trim();
    const words = answer.split(/\s+/).length;
    assert(words >= 40 && words <= 80, `${path}: ${words} words`);
    const cta = doc.querySelector(".pa-service-hero a.pa-button");
    assert(cta.textContent.includes("$35") && cta.textContent.includes("30-Minute"));
    assert(new URL(cta.href, base).searchParams.get("service"));
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((x) =>
      JSON.parse(x.textContent),
    );
    assert.equal(schemas.filter((x) => x["@type"] === "Service").length, 1);
    const faq = schemas.find((x) => x["@type"] === "FAQPage");
    assert(faq);
    const details = [...doc.querySelectorAll("main details")];
    assert.equal(details.length, faq.mainEntity.length);
    for (const item of faq.mainEntity) {
      const d = details.find((d) => d.querySelector("summary").textContent.includes(item.name));
      assert(d);
      assert.equal(d.querySelector("p").textContent, item.acceptedAnswer.text);
    }
    results.push({ path, answerWords: words, faqs: details.length, status: "PASS" });
  }
  fs.writeFileSync(
    "audit/phase3/service-verification.json",
    JSON.stringify({ status: "PASS", results }, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
