/* Read-only comparison AFTER a separately authorized deployment and fresh crawl. */
const fs = require("node:fs");
const expectedDir = process.argv[2] || "audit/phase5/local-final";
const actualDir = process.argv[3] || "audit/phase5/production-after";
const read = (dir, file) => JSON.parse(fs.readFileSync(`${dir}/${file}.json`));
const expected = read(expectedDir, "manifest");
const actual = new Map(read(actualDir, "manifest").map((p) => [p.url, p]));
const failures = [];
for (const page of expected) {
  const live = actual.get(page.url);
  if (!live) {
    failures.push({ url: page.url, issue: "Missing route" });
    continue;
  }
  for (const field of [
    "status",
    "redirect",
    "canonical",
    "title",
    "description",
    "h1",
    "robots",
    "xRobotsTag",
    "sitemapInclusion",
    "contentFingerprint",
    "schemas",
    "openGraph",
  ]) {
    if (JSON.stringify(page[field]) !== JSON.stringify(live[field]))
      failures.push({ url: page.url, issue: `Mismatch: ${field}` });
  }
}
const summary = read(actualDir, "summary");
failures.push(...summary.failures);
if (summary.sitemapUrls !== 49 || summary.uniqueSitemapUrls !== 49)
  failures.push({ issue: "Expected 49 unique sitemap URLs" });
if (summary.orphaned.length || summary.titleDuplicates.length || summary.metaDuplicates.length)
  failures.push({ issue: "Orphan or duplicate metadata regression" });
if (summary.unknown.some((p) => p.status !== 404))
  failures.push({ issue: "Unknown route status regression" });
const result = {
  status: failures.length ? "FAIL" : "PASS",
  routesCompared: expected.length,
  failures,
};
fs.writeFileSync(`${actualDir}/deployment-comparison.json`, JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
process.exitCode = failures.length ? 1 : 0;
