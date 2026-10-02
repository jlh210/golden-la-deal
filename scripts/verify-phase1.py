"""Read-only SSR regression checks. Run against a local server, never submits leads.
Usage: python3 scripts/verify-phase1.py http://127.0.0.1:5173
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlsplit
import concurrent.futures
import json
import re
import sys
import xml.etree.ElementTree as ET

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
ORG = 'https://www.penthouseadvisors.com/#organization'
ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical, self.schemas, self.headings, self.links = [], [], [], []
        self.inputs = []
        self.capture, self.buffer = None, ''
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical.append(attrs['href'])
        if tag == 'a': self.links.append(attrs.get('href', ''))
        if tag in ['input', 'select']: self.inputs.append({'tag':tag, **attrs})
        if tag == 'h1' or tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.capture, self.buffer = tag, ''
    def handle_data(self, text):
        if self.capture: self.buffer += text
    def handle_endtag(self, tag):
        if tag != self.capture: return
        if tag == 'script': self.schemas.append(json.loads(self.buffer))
        else: self.headings.append(self.buffer)
        self.capture = None

def walk(value):
    if isinstance(value, dict):
        yield value
        for child in value.values(): yield from walk(child)
    elif isinstance(value, list):
        for child in value: yield from walk(child)

def get(path):
    with urlopen(BASE + path, timeout=30) as response:
        assert response.status == 200, path
        text = response.read().decode()
    page = Page(); page.feed(text)
    return page

with urlopen(BASE + '/sitemap.xml', timeout=30) as response:
    sitemap = ET.fromstring(response.read())
urls = [node.text for node in sitemap.findall('{*}url/{*}loc')]
assert len(urls) == len(set(urls)), 'Duplicate sitemap URLs'
assert all(url.startswith('https://www.penthouseadvisors.com') for url in urls)
paths = [urlsplit(url).path or '/' for url in urls]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    pages = dict(zip(paths, pool.map(get, paths)))

for path, page in pages.items():
    expected = 'https://www.penthouseadvisors.com' + path.rstrip('/')
    assert page.canonical == [expected], (path, page.canonical)
    assert len(page.headings) == 1, (path, page.headings)
    for node in walk(page.schemas):
        assert node.get('@type') != 'SearchAction', path
        if node.get('@type') == 'Service': assert node['provider'] == {'@id': ORG}, path
        if node.get('@type') == 'Article' and path.startswith('/help/'):
            assert node['publisher'] == {'@id': ORG}
            assert 'datePublished' not in node, path
            assert node.get('dateModified') == '2026-07-24', path
        if node.get('@type') == 'CollectionPage':
            assert node['isPartOf']['@id'] == 'https://www.penthouseadvisors.com/#website'
        if node.get('@id') == ORG and 'name' in node:
            assert not any(k in node for k in ['geo','priceRange','sameAs','address'])
    assert sum(n.get('@type') == 'FAQPage' for n in walk(page.schemas)) <= 1, path

listing_slugs = re.findall(r'slug: "([^"]+)"', (ROOT/'src/lib/listings.ts').read_text())
for slug in listing_slugs: assert '/restaurants-for-sale/' + slug in pages
assert '/hardware-store-for-sale' in pages
article_count = 0
for source in (ROOT/'src/content/help/articles').glob('*.ts'):
    text = source.read_text()
    slug = re.search(r'slug: "([^"]+)"', text)[1]
    path = next(p for p in pages if p.startswith('/help/') and p.endswith('/' + slug))
    parent = re.search(r'commercialParent:\s*\{\s*to: "([^"]+)"', text)[1]
    related = re.findall(r'to: "([^"]+)"', text.split('related: [',1)[1])
    assert 2 <= len(related) <= 4, (source, related)
    assert len(related) == len(set(related)), source
    for target in [parent, *related]:
        assert target != path, (source, 'self-link')
        assert target in pages, (source, target)
        assert target in pages[path].links, (source, 'not rendered', target)
    article_count += 1
# Query parameters preserve canonical and existing service-prefill rendering.
prefill = get('/contact?service=Buying%20a%20restaurant')
assert prefill.canonical == ['https://www.penthouseadvisors.com/contact']
assert any(i.get('name') == 'serviceNeeded' and i.get('value') == 'Buying a restaurant' and i.get('type') == 'hidden' for i in prefill.inputs)
unknown = get('/contact?service=not-a-real-service')
assert any(i.get('name') == 'serviceNeeded' and i['tag'] == 'select' for i in unknown.inputs)
result = {'sitemapUrls':len(urls),'renderedPagesChecked':len(pages),'articlesChecked':article_count,
          'listingDetailsChecked':len(listing_slugs),'checks':'HTTP 200, one H1, canonicals, JSON-LD parsing/entity/date/FAQ invariants, rendered article links, query canonical',
          'result':'PASS'}
print(json.dumps(result, indent=2))
(ROOT/'audit/phase1-ssr-results.json').write_text(json.dumps(result, indent=2)+'\n')
