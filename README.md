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

## Custom domain: www.markbooksbookmarks.com

A `CNAME` file with `www.markbooksbookmarks.com` is already in the repo root — that's
what tells GitHub Pages which domain to serve. Two more things need to happen outside
this repo before it works:

1. **DNS record** — at your DNS provider (wherever `markbooksbookmarks.com` is
   registered/managed), add a `CNAME` record:
   - Host/name: `www`
   - Value/target: `bereikme.github.io`

2. **Domain verification** (separate from the DNS record above, and easy to miss) —
   GitHub requires you to prove ownership of the domain before it'll serve it:
   - Go to your GitHub **account** (or organization) **Settings → Pages** →
     "Verified domains" → add `markbooksbookmarks.com`.
   - GitHub gives you a TXT record challenge, e.g.
     `_github-pages-challenge-bereikme.markbooksbookmarks.com`. Add that TXT record
     at your DNS provider, then click verify in GitHub.

3. Back in the **repo's** Settings → Pages, enter `www.markbooksbookmarks.com` under
   **Custom domain** and save. GitHub re-checks the DNS record; once it succeeds, tick
   **Enforce HTTPS** (may take a few minutes to a few hours to become available while
   GitHub provisions the certificate).

If you also want `markbooksbookmarks.com` (no `www`) to work, add `A` records for the
apex domain pointing at GitHub Pages' IPs (`185.199.108.153`, `185.199.109.153`,
`185.199.110.153`, `185.199.111.153`) — GitHub Pages only serves one canonical domain
(here, the `www` one from the `CNAME` file), so the apex domain will redirect to it.

## Still needs your input before going live

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
