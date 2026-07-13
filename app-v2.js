const deepData = window.RESEARCH_DATA;

const copy = {
  zh: {
    navStory: "研究主线", navWorkbench: "方法工作台", navCompare: "对比实验室", navTimeline: "时间线", navLibrary: "论文库",
    overviewEyebrow: "长程多轮 Agent 优化研究", overviewTitle: "真正变化的不是一个 loss，而是训练信号如何穿过长轨迹",
    overviewLead: "这份图谱围绕三个问题组织 26 篇论文：baseline 从哪里来，最终结果怎样归因到中间决策，以及稀疏 reward 如何与 dense teacher feedback 协同。",
    storyEyebrow: "从算法列表到问题演化", storyTitle: "五章研究故事线", storyLead: "每一章都从上一条路线留下的结构性问题出发。点击方法，进入统一的深读工作台。",
    storyMapTitle: "方法演化与关系", storyMapHint: "横轴为首次公开时间；实线表示路线内迭代，虚线表示跨路线融合。点击节点可进入方法深读。", storyMapRoute: "路线内迭代", storyMapFusion: "跨路线融合", storyMapScroll: "可横向滚动查看完整演化路径",
    workbenchEyebrow: "逐篇深读", workbenchTitle: "方法工作台", workbenchLead: "统一拆成：研究判断、机制、公式、训练信号、证据、边界与实现。",
    compareEyebrow: "不要只比最终分数", compareTitle: "三方法对比实验室", compareLead: "按优化单位、baseline、critic、反馈、额外计算与局限对齐比较。",
    timelineEyebrow: "正式版本优先", timelineTitle: "论文时间线", timelineLead: "月份按首个公开版本记录；venue 优先显示已发表的正式会议版本。",
    libraryEyebrow: "原文与复现入口", libraryTitle: "论文库与开源状态", libraryLead: "本地 PDF、正式来源、官方代码与训练框架集中核对。",
    search: "搜索方法", filterLibrary: "筛选论文库", openOnly: "仅看已开源", footer: "基于本地收录论文逐篇整理。论文结论与研究者解读在页面中分栏呈现。",
    methods: "篇论文", routes: "条研究主线", open: "项代码入口", formal: "篇正式会议版本", all: "全部",
    chapterThesis: "核心矛盾", chapterBridge: "路线推进", openWorkbench: "深读",
    paperClaim: "论文主张", researcherRead: "研究者解读", mechanism: "机制拆解", objective: "关键公式", signalProfile: "训练信号剖面",
    evidence: "论文证据", caveat: "适用边界", implementation: "复现与实现", localPdf: "PDF 原文", officialSource: "正式来源", code: "代码仓库",
    unit: "优化 / 归因单位", baseline: "baseline", critic: "critic", cost: "额外计算", feedback: "反馈来源", benchmarks: "实验范围",
    venue: "版本", firstPublic: "首次公开", framework: "框架", noCode: "未确认官方代码", formulaFallback: "公式文本",
    lensAll: "完整", lensSignal: "训练信号", lensEvidence: "证据与边界", lensBuild: "实现",
    rowClaim: "核心判断", rowIntervention: "关键改动", rowObjective: "目标函数", rowUnit: "归因单位", rowBaseline: "Baseline", rowCritic: "Critic", rowFeedback: "反馈", rowCost: "额外计算", rowEvidence: "证据", rowCaveat: "边界", rowFramework: "实现框架",
    thMethod: "方法 / 论文", thDate: "时间 / 版本", thMaterial: "原文", thCode: "开源", thFramework: "框架", official: "官方开源", unavailable: "未确认",
    empty: "没有符合当前筛选条件的方法。", formulaNote: "公式只展示该方法最具辨识度的变化；完整目标与约束请以原文为准。"
  },
  en: {
    navStory: "Research story", navWorkbench: "Method workbench", navCompare: "Comparison lab", navTimeline: "Timeline", navLibrary: "Paper library",
    overviewEyebrow: "Long-horizon agent optimization", overviewTitle: "The real change is not one loss, but how training signal travels through a long trajectory",
    overviewLead: "This atlas organizes 26 papers around three questions: where the baseline comes from, how outcomes are assigned to intermediate decisions, and how sparse reward works with dense teacher feedback.",
    storyEyebrow: "From paper list to problem evolution", storyTitle: "A five-chapter research story", storyLead: "Each chapter starts from a structural limitation left by the previous route. Select any method to open the reading workbench.",
    storyMapTitle: "Method evolution and relationships", storyMapHint: "The x-axis marks first public release. Solid links show within-route iteration; dashed links show cross-route fusion. Select a node for the full reading.", storyMapRoute: "Within-route iteration", storyMapFusion: "Cross-route fusion", storyMapScroll: "Scroll horizontally to inspect the full evolution path",
    workbenchEyebrow: "Paper-by-paper reading", workbenchTitle: "Method workbench", workbenchLead: "A consistent view of claim, mechanism, formula, signal, evidence, boundary and implementation.",
    compareEyebrow: "Compare more than final scores", compareTitle: "Three-method comparison lab", compareLead: "Align optimization unit, baseline, critic, feedback, compute and limitations.",
    timelineEyebrow: "Formal versions first", timelineTitle: "Paper timeline", timelineLead: "Months follow first public release; venue labels prefer formal conference versions.",
    libraryEyebrow: "Sources and reproduction", libraryTitle: "Paper library and open-source status", libraryLead: "Local PDFs, formal sources, official repositories and training frameworks in one place.",
    search: "Search methods", filterLibrary: "Filter library", openOnly: "Open source only", footer: "Compiled paper by paper from the local corpus. Author claims and researcher interpretation are separated.",
    methods: "papers", routes: "research routes", open: "code links", formal: "formal publications", all: "All",
    chapterThesis: "Core tension", chapterBridge: "How the route moves", openWorkbench: "Read",
    paperClaim: "Paper claim", researcherRead: "Researcher interpretation", mechanism: "Mechanism", objective: "Key equation", signalProfile: "Training-signal profile",
    evidence: "Evidence", caveat: "Boundary", implementation: "Reproduction", localPdf: "Paper PDF", officialSource: "Formal source", code: "Repository",
    unit: "Optimization / credit unit", baseline: "baseline", critic: "critic", cost: "extra compute", feedback: "feedback", benchmarks: "evaluation scope",
    venue: "version", firstPublic: "first public", framework: "framework", noCode: "No official code confirmed", formulaFallback: "Equation text",
    lensAll: "Full", lensSignal: "Training signal", lensEvidence: "Evidence & boundary", lensBuild: "Implementation",
    rowClaim: "Core claim", rowIntervention: "Intervention", rowObjective: "Objective", rowUnit: "Credit unit", rowBaseline: "Baseline", rowCritic: "Critic", rowFeedback: "Feedback", rowCost: "Extra compute", rowEvidence: "Evidence", rowCaveat: "Boundary", rowFramework: "Framework",
    thMethod: "Method / paper", thDate: "Date / venue", thMaterial: "Paper", thCode: "Open source", thFramework: "Framework", official: "Official", unavailable: "Not confirmed",
    empty: "No method matches the current filters.", formulaNote: "The equation highlights the method's most distinctive intervention. See the paper for the complete objective and constraints."
  }
};

let v2Selected = selectedId || "grpo";
let v2Category = "all";
let compareIds = ["grpo", "gigpo", "sdar"];
let compareLens = "all";

const researchCommon = deepData.common;
const formalVenuePattern = /ICLR|ICML|NeurIPS|ACL|EACL|WWW|PMLR/i;
const storyMapEdges = [
  ["ppo", "vineppo"], ["ppo", "vcppo"], ["vcppo", "vapo"], ["grpo", "vapo"],
  ["ppo", "grpo"], ["grpo", "dapo"], ["grpo", "gspo"], ["grpo", "gmpo"], ["grpo", "gfpo"],
  ["grpo", "flowgrpo"], ["grpo", "gigpo"], ["gigpo", "hgpo"], ["ppo", "turnppo"],
  ["grpo", "arpo"], ["arpo", "aepo"], ["aepo", "appo"],
  ["grpo", "hiper"], ["hiper", "stephrl"], ["stephrl", "hipif"], ["grpo", "hipif"], ["hipif", "appo"],
  ["opd", "opsd"], ["opd", "skillsd"], ["opd", "sdpo"], ["opsd", "rlsd"],
  ["grpo", "skillsd"], ["skillsd", "sdar"], ["rlsd", "sdar"], ["sdar", "serl"], ["flowgrpo", "serl"]
];
const storyMapColors = {
  value: "#3367a8", group: "#2d8a68", multi: "#c47718", hierarchy: "#b45443", opd: "#7552a3"
};

function t(key) {
  return copy[currentLang][key] || key;
}

function localizedMethod(method, key) {
  return mValue(method, key);
}

function localizedPipeline(method) {
  return mPipeline(method);
}

function localizedFormulaParts(method) {
  return mFormulaParts(method);
}

function noteFor(method) {
  const zh = deepData.notes.zh[method.id];
  if (currentLang === "zh" && zh) return zh;
  const common = researchCommon[method.id];
  return {
    claim: method.oneLine,
    evidence: `Evaluation scope: ${common.benchmarks}. ${method.training}`,
    caveat: `The method assigns credit at ${common.unit} granularity and depends on ${common.baseline}; this is the primary assumption to audit when moving to a new environment.`,
    read: `Primary intervention: ${method.modifications.join(" ")}`
  };
}

function plainMarkdown(value) {
  return escapeHtml(value ?? "")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function formulaHtml(latex, displayMode = true) {
  if (window.katex) {
    try {
      return window.katex.renderToString(latex, { displayMode, throwOnError: false, strict: "ignore", trust: false });
    } catch (_error) {
      // The text fallback below keeps formulas readable when a malformed source slips through.
    }
  }
  return `<code class="formula-fallback">${escapeHtml(latex)}</code>`;
}

function legacyFormulaHtml(value) {
  const raw = String(value ?? "");
  const formulaLike = /[=~_^()|+\-*/]|\b(?:pi|theta|lambda|epsilon|eps|gamma|beta|alpha|rho|sigma|omega|Delta|sum|exp|log|clip|min|max|mean|std|KL|E)\b/.test(raw);
  if (!formulaLike) return `<code class="concept-token">${escapeHtml(raw)}</code>`;
  const latex = raw
    .replaceAll("->", "\\to ")
    .replaceAll("proportional to", "\\propto ")
    .replace(/\bDelta\b/g, "\\Delta")
    .replace(/\b(pi|theta|lambda|epsilon|eps|gamma|beta|alpha|rho|sigma|omega)\b/g, (token) => `\\${token === "eps" ? "epsilon" : token}`)
    .replace(/\b(pi|theta|lambda|epsilon|eps|gamma|beta|alpha|rho|sigma|omega)_/g, (token, greek) => `\\${greek === "eps" ? "epsilon" : greek}_`)
    .replace(/\bsum_([a-z])/g, "\\sum_{$1}")
    .replace(/\b(exp|log|min|max)\b/g, "\\$1")
    .replace(/\b(clip|mean|std|sign|softmax|Filter)\b/g, "\\operatorname{$1}")
    .replace(/\bKL\b/g, "D_{KL}")
    .replace(/\bE\[/g, "\\mathbb{E}[")
    .replace(/~/g, "\\sim ");
  return formulaHtml(latex, false);
}

function categoryColor(method) {
  return categories[method.category]?.color || "#334155";
}

function paperPdfHref(method) {
  return location.hostname.endsWith("github.io") ? method.source : method.pdf;
}

function setV2Selected(id, scroll = false) {
  if (!byId[id]) return;
  v2Selected = id;
  selectedId = id;
  renderMethodIndex();
  renderReader();
  renderStorySelection();
  renderStoryMapSelection();
  renderTimelineSelection();
  if (scroll) document.getElementById("workbench")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyCopy() {
  document.documentElement.lang = currentLang === "zh" ? "zh" : "en";
  document.querySelectorAll("[data-copy]").forEach((el) => {
    const value = copy[currentLang][el.dataset.copy];
    if (value) el.textContent = value;
  });
  document.getElementById("language-toggle").textContent = currentLang === "zh" ? "EN" : "中文";
}

function renderStats() {
  const official = methods.filter((m) => m.code).length;
  const formal = methods.filter((m) => formalVenuePattern.test(m.venue)).length;
  const stats = [
    [methods.length, t("methods")],
    [deepData.chapters[currentLang].length, t("routes")],
    [official, t("open")],
    [formal, t("formal")]
  ];
  document.getElementById("overview-stats").innerHTML = stats.map(([value, label]) => `
    <div class="stat"><strong>${value}</strong><span>${label}</span></div>
  `).join("");

  const theses = currentLang === "zh"
    ? [["Baseline", "谁定义相对好坏"], ["Credit", "谁应为最终结果负责"], ["Dense signal", "稀疏 reward 之外学什么"]]
    : [["Baseline", "Who defines relative quality"], ["Credit", "Who caused the outcome"], ["Dense signal", "What to learn beyond sparse reward"]];
  document.getElementById("thesis-strip").innerHTML = theses.map(([name, text], index) => `
    <div class="thesis-item"><span>0${index + 1}</span><div><strong>${name}</strong><p>${text}</p></div></div>
  `).join("");
}

function renderStory() {
  const chapters = deepData.chapters[currentLang];
  document.getElementById("story-stack").innerHTML = chapters.map((chapter) => `
    <article class="story-chapter" data-chapter="${chapter.id}">
      <div class="chapter-number">${chapter.index}</div>
      <div class="chapter-copy">
        <h3>${plainMarkdown(chapter.title)}</h3>
        <div class="chapter-argument">
          <div><span>${t("chapterThesis")}</span><p>${plainMarkdown(chapter.thesis)}</p></div>
          <div><span>${t("chapterBridge")}</span><p>${plainMarkdown(chapter.bridge)}</p></div>
        </div>
      </div>
      <div class="chapter-methods">
        ${chapter.methods.map((id) => {
          const method = byId[id];
          return `<button class="story-method ${v2Selected === id ? "active" : ""}" data-method="${id}" style="--method-color:${categoryColor(method)}"><strong>${method.name}</strong><span>${localizedMethod(method, "branch")}</span></button>`;
        }).join("")}
      </div>
    </article>
  `).join("");
}

function renderStoryMap() {
  const chapters = deepData.chapters[currentLang];
  const chapterByMethod = new Map();
  chapters.forEach((chapter) => chapter.methods.forEach((id) => chapterByMethod.set(id, chapter.id)));

  const width = 1320;
  const height = 760;
  const laneLayout = {
    value: { y: 90, offsets: [-24, 24], height: 112 },
    group: { y: 215, offsets: [-48, 0, 48], height: 138 },
    multi: { y: 360, offsets: [-48, 0, 48], height: 138 },
    hierarchy: { y: 485, offsets: [-24, 24], height: 112 },
    opd: { y: 640, offsets: [-72, -24, 24, 72], height: 190 }
  };
  const yearBands = {
    2017: { x: 174, width: 96 },
    2023: { x: 300, width: 110 },
    2024: { x: 440, width: 180 },
    2025: { x: 650, width: 350 },
    2026: { x: 990, width: 600 }
  };
  const positionFor = (method) => {
    const band = yearBands[method.year];
    return band.x + ((method.month - 1) / 11) * band.width;
  };

  const positions = new Map();
  chapters.forEach((chapter) => {
    const layout = laneLayout[chapter.id];
    const trackLastX = layout.offsets.map(() => -Infinity);
    [...chapter.methods]
      .map((id) => byId[id])
      .sort((a, b) => positionFor(a) - positionFor(b) || a.name.localeCompare(b.name))
      .forEach((method) => {
        const x = positionFor(method);
        let track = trackLastX.findIndex((lastX) => x - lastX >= 108);
        if (track < 0) track = trackLastX.indexOf(Math.min(...trackLastX));
        trackLastX[track] = x;
        positions.set(method.id, { x, y: layout.y + layout.offsets[track], chapter: chapter.id });
      });
  });

  const edgeMarkup = storyMapEdges.map(([from, to], index) => {
    const source = positions.get(from);
    const target = positions.get(to);
    if (!source || !target) return "";
    const crossRoute = source.chapter !== target.chapter;
    const controlX = source.x + Math.max(42, (target.x - source.x) * 0.48);
    const path = `M ${source.x} ${source.y} C ${controlX} ${source.y}, ${controlX} ${target.y}, ${target.x} ${target.y}`;
    return `<path class="story-map-edge ${crossRoute ? "fusion" : "route"}" data-edge-from="${from}" data-edge-to="${to}" d="${path}" marker-end="url(#story-arrow)" style="--edge-order:${index}"></path>`;
  }).join("");

  const laneMarkup = chapters.map((chapter, index) => {
    const layout = laneLayout[chapter.id];
    const y = layout.y;
    return `
      <rect class="story-map-lane-bg" x="0" y="${y - layout.height / 2}" width="${width}" height="${layout.height}" data-lane-index="${index}"></rect>
      <line class="story-map-lane-line" x1="154" y1="${y}" x2="1290" y2="${y}"></line>
      <circle cx="27" cy="${y - 8}" r="4" fill="${storyMapColors[chapter.id]}"></circle>
      <text class="story-map-lane-index" x="39" y="${y - 3}">${chapter.index}</text>
      <text class="story-map-lane-label" x="27" y="${y + 17}">${escapeHtml(chapter.title.replace(/^第[^：:]+[：:]\s*/, ""))}</text>`;
  }).join("");

  const yearMarkup = Object.entries(yearBands).map(([year, band]) => `
    <line class="story-map-year-line" x1="${band.x}" y1="31" x2="${band.x}" y2="746"></line>
    <text class="story-map-year-label" x="${band.x}" y="29">${year}</text>
  `).join("");

  const nodeMarkup = methods.map((method) => {
    const position = positions.get(method.id);
    if (!position) return "";
    return `<button type="button" class="story-map-node ${v2Selected === method.id ? "active" : ""}" data-method="${method.id}" style="--node-x:${position.x}px;--node-y:${position.y}px;--lane-color:${storyMapColors[position.chapter]}"><strong>${method.name}</strong><span>${method.year}.${String(method.month).padStart(2, "0")}</span></button>`;
  }).join("");

  const map = document.getElementById("story-map");
  map.setAttribute("aria-label", t("storyMapTitle"));
  map.innerHTML = `
    <svg class="story-map-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      <defs><marker id="story-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z"></path></marker></defs>
      ${laneMarkup}${yearMarkup}<g class="story-map-edges">${edgeMarkup}</g>
    </svg>
    ${nodeMarkup}`;
  renderStoryMapSelection();
}

function renderStorySelection() {
  document.querySelectorAll(".story-method").forEach((button) => button.classList.toggle("active", button.dataset.method === v2Selected));
}

function renderStoryMapSelection() {
  document.querySelectorAll(".story-map-node").forEach((button) => button.classList.toggle("active", button.dataset.method === v2Selected));
  document.querySelectorAll(".story-map-edge").forEach((edge) => {
    const related = edge.dataset.edgeFrom === v2Selected || edge.dataset.edgeTo === v2Selected;
    edge.classList.toggle("active", related);
    edge.classList.toggle("muted", !related);
  });
}

function methodMatches(method, query) {
  if (v2Category !== "all" && method.category !== v2Category) return false;
  const note = noteFor(method);
  return !query || [method.name, method.paperTitle, method.venue, method.tags.join(" "), localizedMethod(method, "oneLine"), note.claim, note.read]
    .join(" ").toLowerCase().includes(query);
}

function renderCategoryFilter() {
  const entries = [["all", t("all")], ...Object.keys(categories).map((id) => [id, categoryLabel(id)])];
  document.getElementById("category-filter").innerHTML = entries.map(([id, label]) => `
    <button type="button" class="segment ${v2Category === id ? "active" : ""}" data-category="${id}">${label}</button>
  `).join("");
}

function renderMethodIndex() {
  const query = document.getElementById("method-search").value.trim().toLowerCase();
  const visible = methods.filter((method) => methodMatches(method, query));
  document.getElementById("method-list").innerHTML = visible.length ? visible.map((method) => `
    <button type="button" class="method-list-item ${v2Selected === method.id ? "active" : ""}" data-method="${method.id}" style="--method-color:${categoryColor(method)}">
      <span class="method-list-main"><strong>${method.name}</strong><small>${localizedMethod(method, "branch")}</small></span>
      <span class="method-list-date">${method.year}.${String(method.month).padStart(2, "0")}</span>
    </button>
  `).join("") : `<p class="empty-state">${t("empty")}</p>`;
}

function renderReader() {
  const method = byId[v2Selected];
  const common = researchCommon[method.id];
  const note = noteFor(method);
  const pipeline = localizedPipeline(method);
  const formulaParts = localizedFormulaParts(method);
  const title = method.paperTitle || method.name;

  document.getElementById("method-reader").innerHTML = `
    <header class="reader-header" style="--method-color:${categoryColor(method)}">
      <div class="reader-kicker"><span>${categoryLabel(method.category)}</span><span>${method.year}.${String(method.month).padStart(2, "0")}</span><span>${method.venue}</span></div>
      <h3>${method.name}</h3>
      ${title !== method.name ? `<p class="paper-full-title">${plainMarkdown(title)}</p>` : ""}
      <p class="reader-deck">${plainMarkdown(localizedMethod(method, "oneLine"))}</p>
    </header>

    <div class="claim-grid">
      <section class="claim-block paper-claim"><span>${t("paperClaim")}</span><p>${plainMarkdown(note.claim)}</p></section>
      <section class="claim-block research-read"><span>${t("researcherRead")}</span><p>${plainMarkdown(note.read)}</p></section>
    </div>

    <section class="reader-section">
      <div class="reader-section-title"><span>01</span><h4>${t("mechanism")}</h4></div>
      <div class="mechanism-flow">
        ${pipeline.map(([name, description], index) => `
          <div class="mechanism-step"><i>${String(index + 1).padStart(2, "0")}</i><strong>${plainMarkdown(name)}</strong><p>${plainMarkdown(description)}</p></div>
        `).join("")}
      </div>
    </section>

    <section class="reader-section formula-section">
      <div class="reader-section-title"><span>02</span><h4>${t("objective")}</h4></div>
      <div class="equation-stage">
        <div class="equation-main">${formulaHtml(common.formula)}</div>
        <p>${t("formulaNote")}</p>
      </div>
      <div class="formula-parts">
        ${formulaParts.map(([name, token, explanation]) => `
          <div class="formula-part-card"><span>${plainMarkdown(name)}</span><div>${legacyFormulaHtml(token)}</div><p>${plainMarkdown(explanation)}</p></div>
        `).join("")}
      </div>
    </section>

    <section class="reader-section">
      <div class="reader-section-title"><span>03</span><h4>${t("signalProfile")}</h4></div>
      <div class="signal-grid">
        ${signalCell(t("unit"), common.unit)}
        ${signalCell(t("baseline"), common.baseline)}
        ${signalCell(t("critic"), common.critic)}
        ${signalCell(t("feedback"), localizedMethod(method, "feedback"))}
        ${signalCell(t("cost"), common.cost)}
        ${signalCell(t("benchmarks"), common.benchmarks)}
      </div>
    </section>

    <section class="evidence-grid">
      <div class="evidence-card"><span>${t("evidence")}</span><p>${plainMarkdown(note.evidence)}</p></div>
      <div class="evidence-card caveat"><span>${t("caveat")}</span><p>${plainMarkdown(note.caveat)}</p></div>
    </section>

    <section class="reader-section implementation-section">
      <div class="reader-section-title"><span>04</span><h4>${t("implementation")}</h4></div>
      <div class="implementation-grid">
        <div><span>${t("framework")}</span><p>${plainMarkdown(localizedMethod(method, "framework"))}</p></div>
        <div><span>${t("venue")}</span><p>${method.venue}</p></div>
        <div class="resource-links">
          <a href="${paperPdfHref(method)}" target="_blank" rel="noreferrer">${t("localPdf")} ↗</a>
          <a href="${method.source}" target="_blank" rel="noreferrer">${t("officialSource")} ↗</a>
          ${method.code ? `<a href="${method.code}" target="_blank" rel="noreferrer">${t("code")} ↗</a>` : `<span>${t("noCode")}</span>`}
        </div>
      </div>
    </section>
  `;
}

function signalCell(label, value) {
  return `<div class="signal-cell"><span>${label}</span><strong>${plainMarkdown(value)}</strong></div>`;
}

function renderCompareControls() {
  document.getElementById("compare-selects").innerHTML = compareIds.map((id, index) => `
    <label><span>0${index + 1}</span><select data-compare-index="${index}">${methods.map((method) => `<option value="${method.id}" ${method.id === id ? "selected" : ""}>${method.name}</option>`).join("")}</select></label>
  `).join("");
  const lenses = [["all", t("lensAll")], ["signal", t("lensSignal")], ["evidence", t("lensEvidence")], ["build", t("lensBuild")]];
  document.getElementById("compare-lens").innerHTML = lenses.map(([id, label]) => `<button type="button" data-lens="${id}" class="segment ${compareLens === id ? "active" : ""}">${label}</button>`).join("");
}

function renderComparison() {
  const selected = compareIds.map((id) => byId[id]);
  const rows = [
    ["claim", t("rowClaim"), (m) => noteFor(m).claim],
    ["signal", t("rowIntervention"), (m) => localizedMethod(m, "modifications")],
    ["signal", t("rowObjective"), (m) => ({ formula: researchCommon[m.id].formula })],
    ["signal", t("rowUnit"), (m) => researchCommon[m.id].unit],
    ["signal", t("rowBaseline"), (m) => researchCommon[m.id].baseline],
    ["signal", t("rowCritic"), (m) => researchCommon[m.id].critic],
    ["signal", t("rowFeedback"), (m) => localizedMethod(m, "feedback")],
    ["build", t("rowCost"), (m) => researchCommon[m.id].cost],
    ["evidence", t("rowEvidence"), (m) => noteFor(m).evidence],
    ["evidence", t("rowCaveat"), (m) => noteFor(m).caveat],
    ["build", t("rowFramework"), (m) => localizedMethod(m, "framework")]
  ].filter(([lens]) => compareLens === "all" || lens === compareLens || (compareLens === "all" && lens === "claim"));

  document.getElementById("comparison-table").innerHTML = `
    <thead><tr><th></th>${selected.map((method) => `<th style="--method-color:${categoryColor(method)}"><span>${categoryLabel(method.category)}</span><strong>${method.name}</strong><small>${method.venue}</small></th>`).join("")}</tr></thead>
    <tbody>${rows.map(([, label, getter]) => `<tr><th>${label}</th>${selected.map((method) => `<td>${comparisonValue(getter(method))}</td>`).join("")}</tr>`).join("")}</tbody>
  `;
}

function comparisonValue(value) {
  if (Array.isArray(value)) return `<ul>${value.map((item) => `<li>${plainMarkdown(item)}</li>`).join("")}</ul>`;
  if (value && value.formula) return `<div class="compare-formula">${formulaHtml(value.formula, false)}</div>`;
  return plainMarkdown(value);
}

function renderTimeline() {
  const sorted = [...methods].sort((a, b) => a.year - b.year || a.month - b.month || a.name.localeCompare(b.name));
  const groups = new Map();
  sorted.forEach((method) => {
    if (!groups.has(method.year)) groups.set(method.year, []);
    groups.get(method.year).push(method);
  });
  document.getElementById("timeline-board").innerHTML = [...groups.entries()].map(([year, yearMethods]) => `
    <div class="timeline-year">
      <div class="year-label"><strong>${year}</strong><span>${yearMethods.length} ${t("methods")}</span></div>
      <div class="year-track">
        ${yearMethods.map((method) => `<button type="button" class="timeline-node ${v2Selected === method.id ? "active" : ""}" data-method="${method.id}" style="--method-color:${categoryColor(method)}"><span>${String(method.month).padStart(2, "0")}</span><strong>${method.name}</strong><small>${method.venue}</small></button>`).join("")}
      </div>
    </div>
  `).join("");
}

function renderTimelineSelection() {
  document.querySelectorAll(".timeline-node").forEach((button) => button.classList.toggle("active", button.dataset.method === v2Selected));
}

function renderLibraryHeader() {
  document.getElementById("paper-table-head").innerHTML = `<tr><th>${t("thMethod")}</th><th>${t("thDate")}</th><th>${t("thMaterial")}</th><th>${t("thCode")}</th><th>${t("thFramework")}</th></tr>`;
}

function renderLibrary() {
  const query = document.getElementById("library-search").value.trim().toLowerCase();
  const openOnly = document.getElementById("open-only").checked;
  const visible = methods.filter((method) => {
    if (openOnly && !method.code) return false;
    return !query || [method.name, method.paperTitle, method.venue, localizedMethod(method, "framework"), categoryLabel(method.category)].join(" ").toLowerCase().includes(query);
  });
  document.getElementById("paper-table-body").innerHTML = visible.map((method) => `
    <tr>
      <td><button type="button" class="table-method" data-method="${method.id}"><strong>${method.name}</strong><span>${plainMarkdown(method.paperTitle || localizedMethod(method, "oneLine"))}</span></button></td>
      <td><strong>${method.year}.${String(method.month).padStart(2, "0")}</strong><span class="venue-label">${method.venue}</span></td>
      <td><a href="${paperPdfHref(method)}" target="_blank" rel="noreferrer">PDF</a><a href="${method.source}" target="_blank" rel="noreferrer">Source ↗</a></td>
      <td>${method.code ? `<span class="status open">${t("official")}</span><a href="${method.code}" target="_blank" rel="noreferrer">GitHub ↗</a>` : `<span class="status">${t("unavailable")}</span>`}</td>
      <td>${plainMarkdown(localizedMethod(method, "framework"))}</td>
    </tr>
  `).join("");
}

function bindV2Events() {
  document.body.addEventListener("click", (event) => {
    const methodButton = event.target.closest("[data-method]");
    if (methodButton) {
      const scroll = methodButton.closest("#story-map, #story-stack, #timeline-board, #paper-table-body") !== null;
      setV2Selected(methodButton.dataset.method, scroll);
      return;
    }
    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      v2Category = categoryButton.dataset.category;
      renderCategoryFilter();
      renderMethodIndex();
      return;
    }
    const lensButton = event.target.closest("[data-lens]");
    if (lensButton) {
      compareLens = lensButton.dataset.lens;
      renderCompareControls();
      renderComparison();
    }
  });
  document.getElementById("method-search").addEventListener("input", renderMethodIndex);
  document.getElementById("library-search").addEventListener("input", renderLibrary);
  document.getElementById("open-only").addEventListener("change", renderLibrary);
  document.getElementById("compare-selects").addEventListener("change", (event) => {
    const index = Number(event.target.dataset.compareIndex);
    if (Number.isInteger(index)) {
      compareIds[index] = event.target.value;
      renderComparison();
    }
  });
  document.getElementById("language-toggle").addEventListener("click", () => {
    currentLang = currentLang === "zh" ? "en" : "zh";
    writeStoredLanguage(currentLang);
    renderV2();
  });
}

function renderV2() {
  applyCopy();
  renderStats();
  renderStoryMap();
  renderStory();
  renderCategoryFilter();
  renderMethodIndex();
  renderReader();
  renderCompareControls();
  renderComparison();
  renderTimeline();
  renderLibraryHeader();
  renderLibrary();
}

renderV2();
bindV2Events();
