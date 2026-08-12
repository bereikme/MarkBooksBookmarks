/**
 * Site-wide configuration for Mark Book's Bookmarks.
 *
 * IMPORTANT — bug report endpoint:
 * GitHub Pages only serves static files, so this site cannot hold a Jira
 * API token safely (anything in this repo is public). `bugReportEndpoint`
 * must point at a small intermediary that owns the Jira credentials
 * server-side, for example:
 *   - A Jira Service Management customer portal request form URL, or
 *   - A tiny serverless function (Cloudflare Worker / Netlify Function /
 *     AWS Lambda) that receives this JSON payload and calls the Jira
 *     REST API "create issue" endpoint using a securely stored token.
 *
 * Until that endpoint exists, the report form falls back to the mailto
 * link shown beneath it.
 */
window.MARK_BOOKS_CONFIG = {
  bugReportEndpoint: "", // TODO: set to your serverless proxy or JSM portal endpoint
  jiraProjectKey: "TODO-PROJECT-KEY", // TODO: the Jira project bugs should land in
  fallbackEmail: "support@example.com" // TODO: replace with real support address
};
