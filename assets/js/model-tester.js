const RAW_FIELDS = [
  { name: "duration", group: "Connection", step: 1 },
  { name: "src_bytes", group: "Connection", step: 1 },
  { name: "dst_bytes", group: "Connection", step: 1 },
  { name: "land", group: "Connection", step: 1, max: 1 },
  { name: "wrong_fragment", group: "Connection", step: 1 },
  { name: "urgent", group: "Connection", step: 1 },
  { name: "hot", group: "Content", step: 1 },
  { name: "num_failed_logins", group: "Content", step: 1 },
  { name: "logged_in", group: "Content", step: 1, max: 1 },
  { name: "num_compromised", group: "Content", step: 1 },
  { name: "root_shell", group: "Content", step: 1, max: 1 },
  { name: "su_attempted", group: "Content", step: 1 },
  { name: "num_root", group: "Content", step: 1 },
  { name: "num_file_creations", group: "Content", step: 1 },
  { name: "num_shells", group: "Content", step: 1 },
  { name: "num_access_files", group: "Content", step: 1 },
  { name: "num_outbound_cmds", group: "Content", step: 1 },
  { name: "is_host_login", group: "Content", step: 1, max: 1 },
  { name: "is_guest_login", group: "Content", step: 1, max: 1 },
  { name: "count", group: "Traffic window", step: 1 },
  { name: "srv_count", group: "Traffic window", step: 1 },
  { name: "serror_rate", group: "Traffic window", step: 0.01, max: 1 },
  { name: "srv_serror_rate", group: "Traffic window", step: 0.01, max: 1 },
  { name: "rerror_rate", group: "Traffic window", step: 0.01, max: 1 },
  { name: "srv_rerror_rate", group: "Traffic window", step: 0.01, max: 1 },
  { name: "same_srv_rate", group: "Traffic window", step: 0.01, max: 1 },
  { name: "diff_srv_rate", group: "Traffic window", step: 0.01, max: 1 },
  { name: "srv_diff_host_rate", group: "Traffic window", step: 0.01, max: 1 },
  { name: "dst_host_count", group: "Host window", step: 1 },
  { name: "dst_host_srv_count", group: "Host window", step: 1 },
  { name: "dst_host_same_srv_rate", group: "Host window", step: 0.01, max: 1 },
  { name: "dst_host_diff_srv_rate", group: "Host window", step: 0.01, max: 1 },
  { name: "dst_host_same_src_port_rate", group: "Host window", step: 0.01, max: 1 },
  { name: "dst_host_srv_diff_host_rate", group: "Host window", step: 0.01, max: 1 },
  { name: "dst_host_serror_rate", group: "Host window", step: 0.01, max: 1 },
  { name: "dst_host_srv_serror_rate", group: "Host window", step: 0.01, max: 1 },
  { name: "dst_host_rerror_rate", group: "Host window", step: 0.01, max: 1 },
  { name: "dst_host_srv_rerror_rate", group: "Host window", step: 0.01, max: 1 }
];

const BASE_DEFAULTS = {
  protocol_type: "tcp",
  service: "http",
  flag: "SF",
  duration: 0,
  src_bytes: 181,
  dst_bytes: 5450,
  land: 0,
  wrong_fragment: 0,
  urgent: 0,
  hot: 0,
  num_failed_logins: 0,
  logged_in: 1,
  num_compromised: 0,
  root_shell: 0,
  su_attempted: 0,
  num_root: 0,
  num_file_creations: 0,
  num_shells: 0,
  num_access_files: 0,
  num_outbound_cmds: 0,
  is_host_login: 0,
  is_guest_login: 0,
  count: 8,
  srv_count: 8,
  serror_rate: 0,
  srv_serror_rate: 0,
  rerror_rate: 0,
  srv_rerror_rate: 0,
  same_srv_rate: 1,
  diff_srv_rate: 0,
  srv_diff_host_rate: 0,
  dst_host_count: 9,
  dst_host_srv_count: 255,
  dst_host_same_srv_rate: 1,
  dst_host_diff_srv_rate: 0,
  dst_host_same_src_port_rate: 0.11,
  dst_host_srv_diff_host_rate: 0,
  dst_host_serror_rate: 0,
  dst_host_srv_serror_rate: 0,
  dst_host_rerror_rate: 0,
  dst_host_srv_rerror_rate: 0
};

const PRESETS = {
  Normal: {
    service: "http",
    flag: "SF",
    src_bytes: 215,
    dst_bytes: 45076,
    logged_in: 1,
    count: 1,
    srv_count: 1,
    same_srv_rate: 1,
    dst_host_count: 12,
    dst_host_srv_count: 255,
    dst_host_same_srv_rate: 1,
    dst_host_same_src_port_rate: 0.08
  },
  DoS: {
    service: "private",
    flag: "S0",
    src_bytes: 0,
    dst_bytes: 0,
    logged_in: 0,
    count: 279,
    srv_count: 15,
    serror_rate: 1,
    srv_serror_rate: 1,
    same_srv_rate: 0.05,
    diff_srv_rate: 0.06,
    dst_host_count: 255,
    dst_host_srv_count: 16,
    dst_host_same_srv_rate: 0.06,
    dst_host_diff_srv_rate: 0.07,
    dst_host_serror_rate: 1,
    dst_host_srv_serror_rate: 1
  },
  Probe: {
    service: "private",
    flag: "REJ",
    src_bytes: 0,
    dst_bytes: 0,
    logged_in: 0,
    count: 125,
    srv_count: 1,
    rerror_rate: 1,
    srv_rerror_rate: 1,
    same_srv_rate: 0.01,
    diff_srv_rate: 0.07,
    dst_host_count: 255,
    dst_host_srv_count: 1,
    dst_host_same_srv_rate: 0,
    dst_host_diff_srv_rate: 0.65,
    dst_host_rerror_rate: 1,
    dst_host_srv_rerror_rate: 1
  },
  R2L: {
    service: "ftp_data",
    flag: "SF",
    duration: 2,
    src_bytes: 334,
    dst_bytes: 0,
    hot: 3,
    num_failed_logins: 2,
    logged_in: 0,
    is_guest_login: 1,
    count: 1,
    srv_count: 1,
    same_srv_rate: 1,
    dst_host_count: 4,
    dst_host_srv_count: 1,
    dst_host_same_srv_rate: 0.25,
    dst_host_same_src_port_rate: 1
  },
  U2R: {
    service: "telnet",
    flag: "SF",
    duration: 12,
    src_bytes: 104,
    dst_bytes: 276,
    hot: 6,
    num_failed_logins: 1,
    logged_in: 1,
    num_compromised: 5,
    root_shell: 1,
    su_attempted: 1,
    num_root: 4,
    num_file_creations: 2,
    count: 1,
    srv_count: 1,
    same_srv_rate: 1,
    dst_host_count: 2,
    dst_host_srv_count: 2,
    dst_host_same_srv_rate: 1
  }
};

const state = {
  metadata: null,
  model: null,
  columnIndex: null,
  activePreset: "Normal"
};

const form = document.getElementById("trafficForm");
const presetBar = document.getElementById("presetBar");
const status = document.getElementById("modelStatus");
const predictedClass = document.getElementById("predictedClass");
const probabilityList = document.getElementById("probabilityList");
const riskDial = document.getElementById("riskDial");
const riskValue = document.getElementById("riskValue");
const evidenceList = document.getElementById("evidenceList");

function labelFor(name) {
  return name
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function setStatus(text, tone = "") {
  if (!status) return;
  status.textContent = text;
  status.className = `status-pill ${tone}`.trim();
}

function getChoices(prefix) {
  const values = state.metadata.combinedColumns
    .filter((column) => column.startsWith(prefix))
    .map((column) => column.slice(prefix.length))
    .sort((a, b) => a.localeCompare(b));
  return values.length ? values : [""];
}

function fieldMax(name, fallback) {
  const index = state.columnIndex.get(name);
  if (index == null) return fallback;
  const max = state.metadata.scaler.dataMax[index];
  if (!Number.isFinite(max) || max <= 0) return fallback;
  return Math.max(max, fallback ?? 0);
}

function renderSelect(name, choices, value) {
  const options = choices.map((choice) => (
    `<option value="${choice}" ${choice === value ? "selected" : ""}>${choice}</option>`
  )).join("");
  return `
    <div class="field">
      <label for="${name}">${labelFor(name)}</label>
      <select id="${name}" name="${name}">${options}</select>
    </div>
  `;
}

function renderNumberField(field, value) {
  const max = field.max ?? Math.ceil(fieldMax(field.name, 99999));
  return `
    <div class="field">
      <label for="${field.name}">${labelFor(field.name)}</label>
      <input id="${field.name}" name="${field.name}" type="number" min="0" max="${max}" step="${field.step}" value="${value ?? 0}">
    </div>
  `;
}

function groupedFields() {
  return RAW_FIELDS.reduce((groups, field) => {
    if (!groups[field.group]) groups[field.group] = [];
    groups[field.group].push(field);
    return groups;
  }, {});
}

function currentPresetValues(name = state.activePreset) {
  return { ...BASE_DEFAULTS, ...(PRESETS[name] || {}) };
}

function buildForm() {
  const values = currentPresetValues();
  const protocolChoices = getChoices("proto_");
  const serviceChoices = getChoices("service_");
  const flagChoices = getChoices("flag_");

  const connectionFields = `
    <fieldset class="field-group">
      <legend>Connection identity</legend>
      <div class="field-grid">
        ${renderSelect("protocol_type", protocolChoices, values.protocol_type)}
        ${renderSelect("service", serviceChoices, values.service)}
        ${renderSelect("flag", flagChoices, values.flag)}
      </div>
    </fieldset>
  `;

  const groups = groupedFields();
  const fieldsets = Object.entries(groups).map(([group, fields]) => `
    <fieldset class="field-group">
      <legend>${group}</legend>
      <div class="field-grid">
        ${fields.map((field) => renderNumberField(field, values[field.name])).join("")}
      </div>
    </fieldset>
  `).join("");

  form.innerHTML = `${connectionFields}${fieldsets}<div class="form-actions"><button type="submit">Run Prediction</button></div>`;
  form.addEventListener("input", () => predictFromForm());
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    predictFromForm();
  });
}

function buildPresets() {
  presetBar.innerHTML = Object.keys(PRESETS).map((name) => (
    `<button type="button" data-preset="${name}" class="${name === state.activePreset ? "active" : ""}">${name}</button>`
  )).join("");

  presetBar.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-preset]");
    if (!button) return;
    state.activePreset = button.dataset.preset;
    presetBar.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
    applyPreset(state.activePreset);
    predictFromForm();
  });
}

function applyPreset(name) {
  const values = currentPresetValues(name);
  Object.entries(values).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input) input.value = value;
  });
}

function readFormValues() {
  const formData = new FormData(form);
  const values = { ...BASE_DEFAULTS };
  for (const [key, value] of formData.entries()) {
    if (["protocol_type", "service", "flag"].includes(key)) {
      values[key] = value;
    } else {
      values[key] = Number(value || 0);
    }
  }
  return values;
}

function encode(values) {
  const columns = state.metadata.combinedColumns;
  const vector = new Array(columns.length).fill(0);

  RAW_FIELDS.forEach((field) => {
    const index = state.columnIndex.get(field.name);
    if (index != null) vector[index] = Number(values[field.name] || 0);
  });

  const categoricalMap = {
    protocol_type: "proto_",
    service: "service_",
    flag: "flag_"
  };

  Object.entries(categoricalMap).forEach(([field, prefix]) => {
    const index = state.columnIndex.get(`${prefix}${values[field]}`);
    if (index != null) vector[index] = 1;
  });

  return vector.map((value, index) => (
    value * state.metadata.scaler.scale[index] + state.metadata.scaler.min[index]
  ));
}

function treeValue(tree, row) {
  let node = 0;
  while (tree.left_children[node] !== -1) {
    const featureIndex = tree.split_indices[node];
    const threshold = tree.split_conditions[node];
    const value = row[featureIndex];
    if (!Number.isFinite(value)) {
      node = tree.default_left[node] ? tree.left_children[node] : tree.right_children[node];
    } else {
      node = value < threshold ? tree.left_children[node] : tree.right_children[node];
    }
  }
  return tree.base_weights[node];
}

function softmax(scores) {
  const max = Math.max(...scores);
  const exp = scores.map((value) => Math.exp(value - max));
  const total = exp.reduce((sum, value) => sum + value, 0);
  return exp.map((value) => value / total);
}

function predict(row) {
  const learner = state.model.learner;
  const booster = learner.gradient_booster.model;
  const numClass = Number(learner.learner_model_param.num_class || state.metadata.classes.length);
  const scores = new Array(numClass).fill(0.5);
  booster.trees.forEach((tree, index) => {
    const classIndex = booster.tree_info[index] ?? 0;
    scores[classIndex] += treeValue(tree, row);
  });
  return softmax(scores);
}

function renderPrediction(probabilities, values) {
  const classes = state.metadata.classes;
  const ranked = probabilities
    .map((probability, index) => ({ label: classes[index], probability }))
    .sort((a, b) => b.probability - a.probability);

  const top = ranked[0];
  const threat = probabilities.reduce((sum, probability, index) => (
    classes[index] === "Normal" ? sum : sum + probability
  ), 0);

  predictedClass.textContent = top.label;
  riskDial.style.setProperty("--risk", `${Math.round(threat * 100)}%`);
  riskValue.textContent = `${Math.round(threat * 100)}%`;

  probabilityList.innerHTML = ranked.map((item) => `
    <div class="prob-row ${item.label === "Normal" ? "" : "threat"}">
      <div class="prob-label">
        <span>${item.label}</span>
        <span>${(item.probability * 100).toFixed(2)}%</span>
      </div>
      <div class="prob-track"><div class="prob-bar" style="width:${Math.max(1, item.probability * 100)}%"></div></div>
    </div>
  `).join("");

  evidenceList.innerHTML = `
    <div><dt>Top class</dt><dd>${top.label} at ${(top.probability * 100).toFixed(2)} percent confidence</dd></div>
    <div><dt>Protocol</dt><dd>${values.protocol_type} / ${values.service} / ${values.flag}</dd></div>
    <div><dt>Traffic rates</dt><dd>same_srv_rate ${Number(values.same_srv_rate).toFixed(2)}, serror_rate ${Number(values.serror_rate).toFixed(2)}, rerror_rate ${Number(values.rerror_rate).toFixed(2)}</dd></div>
    <div><dt>Host window</dt><dd>dst_host_count ${values.dst_host_count}, dst_host_srv_count ${values.dst_host_srv_count}</dd></div>
  `;
}

function predictFromForm() {
  if (!state.metadata || !state.model || !form.elements.length) return;
  const values = readFormValues();
  const row = encode(values);
  const probabilities = predict(row);
  renderPrediction(probabilities, values);
}

async function init() {
  if (!form || !presetBar) return;
  try {
    const [metadata, model] = await Promise.all([
      fetch("assets/data/model_metadata.json").then((response) => response.json()),
      fetch("assets/data/xgb_final.json").then((response) => response.json())
    ]);

    state.metadata = metadata;
    state.model = model;
    state.columnIndex = new Map(metadata.combinedColumns.map((column, index) => [column, index]));

    buildPresets();
    buildForm();
    setStatus("Model ready", "success");
    predictFromForm();
  } catch (error) {
    setStatus("Model unavailable", "warning");
    predictedClass.textContent = "Unavailable";
    probabilityList.innerHTML = "<p>Unable to load the exported model artifacts.</p>";
  }
}

init();
