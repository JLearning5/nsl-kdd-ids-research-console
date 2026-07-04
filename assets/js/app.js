(function () {
  const page = document.body.dataset.page;
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      (page === "overview" && href === "index.html") ||
      (page && href === `${page}.html`)
    ) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (page === "overview") {
    fetch("assets/data/models_summary_metrics.json")
      .then((response) => response.ok ? response.json() : null)
      .then((metrics) => {
        if (!metrics) return;
        const best = Object.values(metrics).reduce((top, item) => (
          item.accuracy > top.accuracy ? item : top
        ), { accuracy: 0 });
        const target = document.getElementById("overview-best-accuracy");
        if (target) target.textContent = `${(best.accuracy * 100).toFixed(2)}%`;
      })
      .catch(() => {});
  }
})();

