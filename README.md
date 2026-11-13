# Sunset Score website

A static GitHub Pages site. The checked-in HTML is the site: there is no application server, client-side router, or required deployment build.

## Local review

From this directory, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [the local homepage](http://127.0.0.1:8765/). Use the server rather than double-clicking an HTML file, because navigation and assets use paths relative to the domain root.

- `/`: shared bio link with a complete card for each app, stacked on mobile.
- `/apps/sunset-score/`: Sunset Score product page and direct ad destination.
- `/apps/double-you/`: Double You product page and direct ad destination.
- `/how-it-works/`: explanation of Sunset Score forecasts.
- `/about/`: a short app summary and contact information. No company biography or legal company name is added here or in SEO metadata.
- `/sunset-score/support/` and `/double-you/support/`: support and FAQs.
- `/sunset-score/` and `/double-you/`: original privacy/terms URLs, preserved for existing store and app links.

Shared styling lives in `assets/site.css`. The homepage retains its original striped background, and the website uses the original Double You browser icon. Existing screenshots and store links have been retained. All copy and FAQ answers are in the HTML, including when JavaScript is disabled.

The stylesheet links include a `?v=` content hash. Whenever `assets/site.css` changes, update that value in every HTML page to the first 12 characters of its SHA-256 hash before publishing. This gives returning visitors the matching stylesheet instead of a cached earlier version. Check an ordinary reload as well as a fresh visit.

## Policy maintenance

The original Markdown files remain the policy sources. Their wording has not been rewritten as part of the SEO changes. Render them into the policy HTML after editing them:

```sh
npm install
npm run render:policies
```

This maintenance command needs Node 20 or later. Commit the generated HTML along with the edited Markdown when publishing is authorized. It preserves the existing policy URLs and generates working section anchors. Visitors do not download a Markdown renderer or make a separate request for policy text.

## SEO included

Unique titles and descriptions; one main heading per page; self-referencing HTTPS canonical URLs; Open Graph and Twitter metadata; three 1200 × 630 sharing images made from the existing screenshots; crawlable navigation; image dimensions, alt text and lazy loading; WebSite, WebPage/AboutPage, MobileApplication and breadcrumb JSON-LD; `robots.txt`; `sitemap.xml`; and a noindex 404 page. Company/publisher structured data is intentionally omitted. The company name remains only where it was already part of the original legal documents.

The homepage and both app pages describe US prices in the MobileApplication data. Each offer links to the visible price on the app page. On the support pages, FAQ microdata marks up the actual questions and answers. Editing an answer updates what readers and crawlers receive together. Decorative icons use empty alt text; the screenshots have descriptions.

`/llms.txt` is a short guide to the public app, pricing, support, policy and API pages. It complements the sitemap. Neither file guarantees indexing or inclusion in an AI answer.

## Publication checklist

1. Check US store prices before changing the pricing bullets or offers. Keep the homepage, the app pages, their structured prices and `llms.txt` in sync. The stores show the price in each region.
2. If data practices change, review the privacy policy and app-store disclosures against the current app and server behavior.
3. Confirm GitHub Pages uses `sunset-score.com` and enable **Enforce HTTPS**. This is a hosting setting, not something an HTML tag can enforce. Verify HTTP and `www` variants redirect to the preferred HTTPS host.
4. After an approved push and deployment, submit `https://sunset-score.com/sitemap.xml` in Search Console and inspect the homepage and new product/content pages. Local previews cannot be indexed or tested through Google's URL inspection.
5. Update store marketing/website links to the preferred product URLs when desired, keeping the existing privacy/support links intact. This task does not change store settings.

Store-account settings, analytics and Search Console are managed separately from this website.
