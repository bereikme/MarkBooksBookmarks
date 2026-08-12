(function () {
  var CONSENT_KEY = "mb-analytics-consent";
  var config = window.MARK_BOOKS_CONFIG || {};

  function loadGoogleAnalytics(measurementId) {
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!config.gaMeasurementId) return;

    var stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      loadGoogleAnalytics(config.gaMeasurementId);
      return;
    }
    if (stored === "declined") return;

    var banner = document.getElementById("cookie-consent-banner");
    if (!banner) return;

    banner.hidden = false;

    var acceptBtn = banner.querySelector("[data-consent-accept]");
    var declineBtn = banner.querySelector("[data-consent-decline]");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        localStorage.setItem(CONSENT_KEY, "accepted");
        banner.hidden = true;
        loadGoogleAnalytics(config.gaMeasurementId);
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        localStorage.setItem(CONSENT_KEY, "declined");
        banner.hidden = true;
      });
    }
  });
})();
