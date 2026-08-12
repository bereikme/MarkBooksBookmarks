# Mark Book's Bookmarks — website

Static marketing site for the Mark Book's Bookmarks app family (Mark Book's Recipes,
Mark Book's Travels, Mark Book's Music). Plain HTML/CSS/JS, no build step — ready for
GitHub Pages.

## Pages

- `index.html` — home page with the three apps
- `privacy.html` — Privacy Policy
- `terms.html` — Terms & Conditions
- `report-bug.html` — bug report form

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick your default
   branch and the `/ (root)` folder.
4. Save — GitHub will publish the site at `https://<user>.github.io/<repo>/`.

## Still needs your input before going live

- **Logo** — drop your logo file into `assets/logo/` (see the README there).
- **Legal placeholders** — `privacy.html` and `terms.html` contain highlighted
  `[ONTBREEKT]` placeholders (legal entity name, jurisdiction, contact email,
  effective date) that need real values, ideally reviewed by whoever owns legal/privacy.
- **Support email** — replace `support@example.com` in `report-bug.html` and
  `js/config.js`.
- **Bug report → Jira** — see below.

## Connecting bug reports to Jira

This site is fully static, so it cannot hold a Jira API token safely (anything shipped
to GitHub Pages is public). `js/config.js` has a `bugReportEndpoint` you need to point
at something that owns the Jira credentials server-side. Options:

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
  bugReportEndpoint: "https://your-endpoint.example.com/report-bug",
  jiraProjectKey: "YOUR-PROJECT-KEY",
  fallbackEmail: "support@yourdomain.com"
};
```

Until `bugReportEndpoint` is set, the form shows an error and points users to the
mailto fallback link.
