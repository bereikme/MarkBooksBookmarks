document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("bug-report-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = form.querySelector("button[type='submit']");
  var config = window.MARK_BOOKS_CONFIG || {};

  function showStatus(kind, message) {
    statusEl.className = "form-status " + kind;
    statusEl.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!config.bugReportEndpoint) {
      showStatus(
        "error",
        "Bug reporting isn't connected to Jira yet. Please use the email link below instead."
      );
      return;
    }

    var payload = {
      app: form.app.value,
      summary: form.summary.value.trim(),
      description: form.description.value.trim(),
      stepsToReproduce: form.steps.value.trim(),
      severity: form.severity.value,
      reporterEmail: form.email.value.trim(),
      jiraProjectKey: config.jiraProjectKey
    };

    if (!payload.summary || !payload.description) {
      showStatus("error", "Please fill in at least a summary and description.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    fetch(config.bugReportEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        showStatus(
          "success",
          "Thanks! Your bug report was submitted to our tracker."
        );
        form.reset();
      })
      .catch(function () {
        showStatus(
          "error",
          "Something went wrong submitting your report. Please use the email link below instead."
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit bug report";
      });
  });
});
