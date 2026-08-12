# Mark Book's Bookmarks — website

Static marketing site for the Mark Book's Bookmarks app family (Mark Book's Recipes,
Mark Book's Travels, Mark Book's Music), a product of Vendisa. Plain HTML/CSS/JS, no
build step — ready for GitHub Pages.

## Pages

- `index.html` — home page with the three apps
- `privacy.html` — Privacy Policy
- `terms.html` — Terms & Conditions
- `contact.html` — contact form (general inquiries + privacy requests)
- `report-bug.html` — bug report form

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick your default
   branch and the `/ (root)` folder.
4. Save — GitHub will publish the site at `https://<user>.github.io/<repo>/`.

## Still needs your input before going live

- **Legal placeholder** — `privacy.html` has one highlighted `[ONTBREEKT]` placeholder
  left (Vendisa's registered business address) plus a "Last updated" date on both
  `privacy.html` and `terms.html`.
- **Contact/support email** — replace `support@example.com` in `report-bug.html`,
  `contact.html`, and `js/config.js` with the real address.
- **Bug report → Jira** and **contact form** — see below.
- **Google Analytics** — see below.

## Connecting bug reports and the contact form to a backend

This site is fully static, so it cannot hold a Jira API token (or any other secret)
safely — anything shipped to GitHub Pages is public. `js/config.js` has a
`bugReportEndpoint` and a `contactFormEndpoint` that need to point at something that
owns credentials server-side. Options:

- **Jira Service Management portal form** — if the target project is a service desk,
  point users at (or embed) its public customer portal request form. No secrets needed.
- **Small serverless proxy** (Cloudflare Worker, Netlify/Vercel function, AWS Lambda) —
  receives the JSON payload the form sends, holds the Jira API token as a secret, and
  calls the Jira REST API `POST /rest/api/3/issue` to create the bug in the target
  project.
- **Email-to-Jira** — if the target Jira project has "create issues from email" enabled,
  swap the fetch-based submit for a `mailto:` link or a form service (e.g. Formspree)
  that forwards to that address.

Once you've picked an approach and have the target Jira site + project key, update
`js/config.js`:

```js
window.MARK_BOOKS_CONFIG = {
  legalEntityName: "Vendisa",
  bugReportEndpoint: "https://your-endpoint.example.com/report-bug",
  contactFormEndpoint: "https://your-endpoint.example.com/contact",
  jiraProjectKey: "YOUR-PROJECT-KEY",
  fallbackEmail: "support@yourdomain.com",
  gaMeasurementId: ""
};
```

Until `bugReportEndpoint` / `contactFormEndpoint` are set, both forms show an error and
point users to their mailto fallback link.

## Enabling Google Analytics

The Privacy Policy already discloses the use of Google Analytics (site/app statistics),
Google Firebase (crash/diagnostic data in the apps), and Atlassian Jira (bug tracking),
with a 30-day retention period for that operational data.

On the website itself, analytics stay off until you set a real GA4 Measurement ID:

```js
gaMeasurementId: "G-XXXXXXXXXX"
```

Once set, a cookie-consent banner (`js/analytics.js`, styled in `css/style.css` under
"Cookie consent banner") appears on first visit. Google Analytics is only loaded after
a visitor clicks **Accept** — nothing is tracked before consent, in line with Dutch/EU
cookie rules.

## Logo

`assets/logo/logo.svg` is a generated placeholder built from the reference "Mark Book's
Recipes" logo you shared, relabeled "Mark Book's / Bookmarks". Swap the file for your
final artwork whenever it's ready — every page references it via
`assets/logo/logo.svg`, so replacing that one file updates the whole site.
