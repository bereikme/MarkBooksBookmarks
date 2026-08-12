document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
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

    if (!config.contactFormEndpoint) {
      showStatus(
        "error",
        "The contact form isn't connected yet. Please use the email link below instead."
      );
      return;
    }

    var payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      topic: form.topic.value,
      message: form.message.value.trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      showStatus("error", "Please fill in your name, email, and message.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    fetch(config.contactFormEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        showStatus("success", "Thanks! We've received your message.");
        form.reset();
      })
      .catch(function () {
        showStatus(
          "error",
          "Something went wrong sending your message. Please use the email link below instead."
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      });
  });
});
