const MODEL_LABELS = {
  xgb_cv: "XGBoost CV",
  xgb_final: "XGBoost final",
  keras_cnn: "CNN-LSTM",
  autoencoder_ae: "Autoencoder",
  ensemble_avg: "Averaged ensemble"
};

const METRIC_LABELS = {
  accuracy: "Accuracy",
  precision_macro: "Precision macro",
  recall_macro: "Recall macro",
  f1_macro: "F1 macro",
  ap_micro: "AP micro",
  roc_auc_micro: "ROC-AUC micro"
};

function percent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function niceModelName(key) {
  return MODEL_LABELS[key] || key.replaceAll("_", " ");
}

function renderMetrics(metrics) {
  const grid = document.getElementById("metricsGrid");
  const tbody = document.querySelector("#metricsTable tbody");
  const bars = document.getElementById("accuracyBars");
  if (!grid || !tbody || !bars) return;

  const entries = Object.entries(metrics).sort((a, b) => b[1].accuracy - a[1].accuracy);

  grid.innerHTML = entries.map(([key, item]) => `
    <article>
      <span>${niceModelName(key)}</span>
      <strong>${percent(item.accuracy)}</strong>
      <span>${METRIC_LABELS.roc_auc_micro}: ${item.roc_auc_micro.toFixed(4)}</span>
    </article>
  `).join("");

  tbody.innerHTML = entries.map(([key, item]) => `
    <tr>
      <td><strong>${niceModelName(key)}</strong></td>
      <td>${percent(item.accuracy)}</td>
      <td>${percent(item.precision_macro)}</td>
      <td>${percent(item.recall_macro)}</td>
      <td>${percent(item.f1_macro)}</td>
      <td>${percent(item.ap_micro)}</td>
      <td>${item.roc_auc_micro.toFixed(4)}</td>
    </tr>
  `).join("");

  bars.innerHTML = entries.map(([key, item]) => `
    <div class="bar-item">
      <strong>${niceModelName(key)}</strong>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(3, item.accuracy * 100)}%"></div></div>
      <span>${percent(item.accuracy)}</span>
    </div>
  `).join("");
}

function setupGallery() {
  const modal = document.getElementById("plotModal");
  const modalImage = document.getElementById("modalImage");
  const close = document.getElementById("closeModal");
  if (!modal || !modalImage || !close) return;

  document.querySelectorAll(".plot-card").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.dataset.image;
      const label = button.querySelector("span")?.textContent || "Expanded plot";
      modalImage.src = `assets/images/${image}`;
      modalImage.alt = label;
      modal.setAttribute("aria-hidden", "false");
      close.focus();
    });
  });

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modalImage.removeAttribute("src");
  }

  close.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
}

fetch("assets/data/models_summary_metrics.json")
  .then((response) => response.json())
  .then(renderMetrics)
  .catch(() => {
    const grid = document.getElementById("metricsGrid");
    if (grid) {
      grid.innerHTML = "<article><span>Metrics unavailable</span><strong>--</strong><span>Check exported reports.</span></article>";
    }
  });

setupGallery();

