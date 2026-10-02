// Read-only checks of the actual server-rendered homepage. No browser or lead submissions.
// PHASE1_TEST_TOOLS=/private/tmp/penthouse-phase1-tests node scripts/verify-phase2.cjs
const { createRequire } = require("node:module");
const { writeFileSync } = require("node:fs");
const assert = require("node:assert/strict");
const toolRequire = createRequire(`${process.env.PHASE1_TEST_TOOLS}/package.json`);
const { JSDOM } = toolRequire("jsdom");
(async () => {
  const base = process.argv[2] || "http://127.0.0.1:5173";
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const doc = new JSDOM(await response.text()).window.document;
  const text = (el) => el.textContent.replace(/\s+/g, " ").trim();
  const sections = [...doc.querySelectorAll(".pa-home > section")];
  assert.equal(sections.length, 9);
  assert.equal(doc.querySelectorAll("h1").length, 1);
  assert.equal(text(doc.querySelector("h1")), "Restaurant Transactions, Handled End-to-End.");
  assert.equal(doc.title, "Los Angeles Restaurant Advisors | Penthouse Advisors");
  assert.equal(doc.querySelector("link[rel=canonical]").href, "https://www.penthouseadvisors.com/");
  for (const section of sections)
    assert(doc.getElementById(section.getAttribute("aria-labelledby")));
  const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent),
  );
  const faq = schemas.find((s) => s["@type"] === "FAQPage");
  const visibleFaqs = [...doc.querySelectorAll(".pa-faq details")];
  assert.equal(faq.mainEntity.length, 5);
  const faqWordCounts = visibleFaqs.map((f, i) => {
    const answer = text(f.querySelector("p"));
    assert.equal(text(f.querySelector("h3")), faq.mainEntity[i].name);
    assert.equal(answer, faq.mainEntity[i].acceptedAnswer.text);
    const words = answer.split(/\s+/).length;
    assert(words >= 40 && words <= 80);
    return words;
  });
  const localWords = text(doc.querySelector(".pa-prose")).split(/\s+/).length;
  assert(localWords >= 150 && localWords <= 250);
  assert.equal(doc.querySelectorAll(".pa-capabilities article").length, 4);
  assert.equal(doc.querySelectorAll(".pa-service-index article").length, 6);
  assert.equal(doc.querySelectorAll(".pa-process > li").length, 6);
  assert.equal(doc.querySelectorAll(".pa-guides article").length, 4);
  assert(doc.querySelector('a[href="/blog"]'));
  assert(!/\$75|45.minute/i.test(text(doc.body)));
  for (const selector of [".pa-hero .pa-button", ".pa-final .pa-button"]) {
    assert.equal(text(doc.querySelector(selector)), "Book a 30-Minute Consultation — $35");
    assert.equal(doc.querySelector(selector).getAttribute("href"), "/contact");
  }
  const targets = [
    ...new Set([...doc.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute("href"))),
  ];
  for (const target of targets) assert.equal((await fetch(base + target)).status, 200, target);
  const assets = [...new Set([...doc.querySelectorAll("img")].map((i) => i.getAttribute("src")))];
  assets.push("/images/los-angeles-640.webp", "/android-chrome-512x512.png");
  for (const asset of assets) assert.equal((await fetch(base + asset)).status, 200, asset);
  const result = {
    result: "PASS",
    sections: 9,
    faqWordCounts,
    localWords,
    internalLinksChecked: targets.length,
    assetsChecked: assets.length,
    checks:
      "SSR content, heading structure, canonical/title, FAQ parity, internal destinations, actual image assets, offer and Blog link",
    visualQA: "See audit/phase25 visual QA evidence",
  };
  writeFileSync("audit/phase2-verification.json", JSON.stringify(result, null, 2) + "\n");
  console.log(JSON.stringify(result, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
