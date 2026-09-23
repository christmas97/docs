# Sunset Score website

A static GitHub Pages site. The checked-in HTML is the site: there is no application server, client-side router, or required deployment build.

## Local review

From this directory, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [the local homepage](http://127.0.0.1:8765/). Use the server rather than double-clicking an HTML file, because navigation and assets use paths relative to the domain root.

- `/`: shared bio link, showing both apps and their store buttons immediately.
- `/apps/sunset-score/`: Sunset Score product page and direct ad destination.
- `/apps/double-you/`: Double You product page and direct ad destination.
- `/how-it-works/`: explanation of Sunset Score forecasts.
- `/about/`: a short app summary and contact information. No company biography or legal company name is added here or in SEO metadata.
- `/sunset-score/support/` and `/double-you/support/`: support and FAQs.
- `/sunset-score/` and `/double-you/`: original privacy/terms URLs, preserved for existing store and app links.

Shared styling lives in `assets/site.css`. The homepage retains its original striped background, and the website uses the original Double You browser icon. Existing screenshots and store links have been retained. All copy and FAQ answers are in the HTML, including when JavaScript is disabled.

## Policy maintenance

The original Markdown files remain the policy sources. Their wording has not been rewritten as part of the SEO changes. Render them into the policy HTML after editing them:

```sh
npm install
npm run render:policies
```

This maintenance command needs Node 20 or later. Commit the generated HTML along with the edited Markdown when publishing is authorized. It preserves the existing policy URLs and generates working section anchors. Visitors do not download a Markdown renderer or make a separate request for policy text.

## SEO included

Unique titles and descriptions; one main heading per page; self-referencing HTTPS canonical URLs; Open Graph and Twitter metadata; three 1200 × 630 sharing images made from the existing screenshots; crawlable navigation; image dimensions, alt text and lazy loading; WebSite, WebPage/AboutPage, MobileApplication and breadcrumb JSON-LD; `robots.txt`; `sitemap.xml`; and a noindex 404 page. Company/publisher structured data is intentionally omitted. The company name remains only where it was already part of the original legal documents.

MobileApplication data describes the actual apps. It does not claim Google app rich-result eligibility: no ratings, reviews or fixed offer prices have been invented. FAQ answers are visible HTML; no FAQ rich-result promises or FAQ markup are included. A sitemap helps discovery but does not guarantee indexing or rankings.

## Publication checklist

1. Review the copy, About page and current pricing model. The site describes Sunset Score as a subscription app and Double You as a one-time purchase, without fixed regional prices.
2. Review the existing Sunset Score privacy policy against the current app implementation. It says weather requests/processing happen on-device and there is no server receiving user data. The app-store privacy disclosures describe additional data categories. The SEO work preserves the existing policy text and does not validate these claims.
3. Confirm GitHub Pages uses `sunset-score.com` and enable **Enforce HTTPS**. This is a hosting setting, not something an HTML tag can enforce. Verify HTTP and `www` variants redirect to the preferred HTTPS host.
4. After an approved push and deployment, submit `https://sunset-score.com/sitemap.xml` in Search Console and inspect the homepage and new product/content pages. Local previews cannot be indexed or tested through Google's URL inspection.
5. Update store marketing/website links to the preferred product URLs when desired, keeping the existing privacy/support links intact. This task does not change store settings.

Store-account settings, analytics and Search Console are managed separately from this website.
