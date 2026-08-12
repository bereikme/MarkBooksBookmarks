/**
 * Site-wide configuration for Mark Book's Bookmarks.
 *
 * IMPORTANT — bugReportEndpoint / contactFormEndpoint:
 * GitHub Pages only serves static files, so this site cannot hold a Jira
 * API token (or any other secret) safely — anything in this repo is public.
 * Both endpoints must point at a small intermediary that owns credentials
 * server-side, for example:
 *   - A Jira Service Management customer portal request form URL, or
 *   - A tiny serverless function (Cloudflare Worker / Netlify Function /
 *     AWS Lambda) that receives the JSON payload and calls the Jira REST
 *     API "create issue" endpoint using a securely stored token.
 *
 * Until bugReportEndpoint is set, the bug report form falls back to the
 * mailto link shown beneath it. Same for contactFormEndpoint on the
 * contact page.
 *
 * gaMeasurementId: leave empty until you have a real Google Analytics 4
 * Measurement ID. While empty, no cookie-consent banner is shown and no
 * analytics script is ever loaded — nothing is tracked by default.
 */
window.MARK_BOOKS_CONFIG = {
  legalEntityName: "Vendisa",
  bugReportEndpoint: "", // TODO: set to your serverless proxy or JSM portal endpoint
  contactFormEndpoint: "", // TODO: set to your serverless proxy or form service endpoint
  jiraProjectKey: "TODO-PROJECT-KEY", // TODO: the Jira project bugs should land in
  fallbackEmail: "support@example.com", // TODO: replace with the real support/contact address
  gaMeasurementId: "" // TODO: e.g. "G-XXXXXXXXXX" — leave empty to keep analytics off
};
