(() => {
  const data = window.masResearch;
  if (!data) return;

  const storageKey = "llm-explainer-lang-v2";
  let lang = readLanguage();
  let selectedId = "maas";
  let category = "all";
  let methodQuery = "";
  let libraryQuery = "";

  const ui = {
    zh: {
      navFramework:"研究框架", navStory:"发展主线", navWorkbench:"方法工作台", navIntersection:"交叉方向", navTimeline:"时间线", navLibrary:"论文库",
      moduleOptimization:"LLM 训练与优化", moduleSystem:"Multi-Agent System 设计",
      overviewEyebrow:"Agentic System 的系统设计平面", overviewTitle:"LLM Multi-Agent System Design", overviewLead:"这一部分研究的不是怎样更新一个 LLM 的权重，而是怎样把多个 Agent、工具与环境组织成有效系统：选谁、怎样连接、何时执行、传什么、如何融合，以及运行时是否应改变结构。网页以 25 篇正式论文为核心，并把 workshop 与预印本前沿单独标注。",
      frameworkEyebrow:"八个可决策层", frameworkTitle:"系统状态不是一张通信图", frameworkLead:"点击任一层，方法工作台会筛到直接优化这一层的论文。Topology 只回答“谁能交流”，Workflow 还要回答“何时、按什么顺序、如何停止”。",
      storyEyebrow:"从固定团队到可学习系统", storyTitle:"七章发展主线", storyLead:"每一章对应一个设计变量的变化。论文按问题关系组织，不把“多 Agent”当作一个单独算法类别。",
      workbenchEyebrow:"逐篇核对设计变量", workbenchTitle:"方法工作台", workbenchLead:"统一回答：优化什么、动态发生在哪一层、证据覆盖什么、哪些结论不能外推，以及复现使用什么 runtime。",
      intersectionEyebrow:"两个并列方向的交集", intersectionTitle:"系统参数 φ × 模型参数 θ", intersectionLead:"固定模型搜索系统、固定系统训练模型、交替优化和端到端联合优化，是四种不同问题。不能只写“联合优化”而不说明更新了哪组参数。",
      timelineEyebrow:"正式版本优先", timelineTitle:"论文时间线", timelineLead:"月份按正式会议月份展示；Tier A 为主会 proceedings，Tier B 为已接收但 proceedings 尚未稳定发布的作者版本。",
      libraryEyebrow:"原文、代码与实现底座", libraryTitle:"论文库与开源状态", libraryLead:"“框架”区分运行时和训练底座。多数系统设计工作使用定制 Python、MetaGPT、Hugging Face 或 vLLM，而不是 veRL。",
      search:"搜索方法", filterLibrary:"筛选论文库", openOnly:"仅看已开源", frontierTitle:"前沿观察，不计入正式核心", frontierLead:"这些工作补足新问题，但证据等级必须与主会论文分开。",
      footer:"基于正式论文逐篇核验。论文结论、研究者解读与尚未解决的问题在页面中分栏呈现。",
      methods:"核心论文", formal:"Tier A 正式论文", routes:"研究路线", open:"已开源", years:"时间跨度", all:"全部", question:"研究问题", mechanism:"核心机制", evidence:"论文证据", caveat:"边界与局限", variable:"优化变量", timing:"动态粒度", training:"参数更新", framework:"实现底座", source:"正式页面", pdf:"论文 PDF", code:"官方代码", local:"本地已核验", openStatus:"开源", method:"方法", venue:"正式版本", tier:"证据", noCode:"未确认", empty:"没有匹配的方法。",
      planeSystemTitle:"System Design · φ", planeSystemText:"优化角色、团队、图、Workflow、消息、路由、Memory 与预算。多数论文冻结 LLM，只搜索或学习系统结构。", planeLink:"相互约束", planeModelTitle:"Model Optimization · θ", planeModelText:"优化 policy、value、credit、hierarchy、RL 与 on-policy distillation。它对应网站的另一个并列子页面。",
      fixedModel:"固定 θ，搜索 φ", fixedModelText:"GPTSwarm、AFlow、ADAS、MaAS：模型大多冻结，反馈用于优化 Prompt、代码、图或 supernet。", fixedSystem:"固定 φ，训练 θ", fixedSystemText:"MAPoRL 与 Agentic RL：保留既定 harness，更新协作 policy 或单 Agent policy。", alternating:"交替优化", alternatingText:"先搜索系统、再训练模型，再用更新后的模型重搜系统；可控制成本，但会产生分布漂移。", joint:"联合优化 θ 与 φ", jointText:"让结构选择与语言策略共享团队 reward，并做 Agent–turn–message–token 多层信用；这是尚未成熟的交叉前沿。", openOptimization:"打开 LLM Optimization 子页面",
      tierNote:"Tier A = 正式主会 proceedings；Tier B = 已接收作者版本。"
    },
    en: {
      navFramework:"Framework", navStory:"Research routes", navWorkbench:"Workbench", navIntersection:"Intersection", navTimeline:"Timeline", navLibrary:"Library",
      moduleOptimization:"LLM Training & Optimization", moduleSystem:"Multi-Agent System Design",
      overviewEyebrow:"The system-design plane of Agentic Systems", overviewTitle:"LLM Multi-Agent System Design", overviewLead:"This module studies how multiple Agents, tools, and environments are organized rather than how one LLM's weights are updated: who participates, how they connect, when they execute, what they send, how messages are fused, and whether structure changes at runtime. The core contains 25 formal papers, with workshop and preprint frontiers labeled separately.",
      frameworkEyebrow:"Eight decision layers", frameworkTitle:"A system state is more than a communication graph", frameworkLead:"Select a layer to filter the workbench. Topology answers who may communicate; workflow must also specify when, in what order, and how execution stops.",
      storyEyebrow:"From fixed teams to learnable systems", storyTitle:"Seven research chapters", storyLead:"Each chapter follows a changing design variable. Papers are organized by research question rather than treating multi-Agent as one algorithm class.",
      workbenchEyebrow:"Audit each design variable", workbenchTitle:"Method Workbench", workbenchLead:"Each paper is aligned by what it optimizes, where adaptation happens, what the evidence covers, what does not transfer, and which runtime supports reproduction.",
      intersectionEyebrow:"Where the two parallel directions meet", intersectionTitle:"System parameters φ × model parameters θ", intersectionLead:"Searching a system with fixed models, training models in a fixed system, alternating them, and optimizing both end to end are different problems. A claim of joint optimization must say which variables are updated.",
      timelineEyebrow:"Formal versions first", timelineTitle:"Paper Timeline", timelineLead:"Months show the formal conference month. Tier A is main-conference proceedings; Tier B is an accepted author version while proceedings are not yet stable.",
      libraryEyebrow:"Papers, code, and implementation substrate", libraryTitle:"Paper Library & Open Source", libraryLead:"Framework distinguishes runtime from training infrastructure. Most system-design papers use custom Python, MetaGPT, Hugging Face, or vLLM rather than veRL.",
      search:"Search methods", filterLibrary:"Filter library", openOnly:"Open source only", frontierTitle:"Frontier watch, outside the formal core", frontierLead:"These papers fill emerging gaps, but their evidence tier stays separate from main-conference work.",
      footer:"Audited paper by paper from formal sources. Paper evidence, researcher interpretation, and unresolved limits are separated throughout the page.",
      methods:"core papers", formal:"Tier A papers", routes:"research routes", open:"open source", years:"year span", all:"All", question:"Research question", mechanism:"Core mechanism", evidence:"Paper evidence", caveat:"Boundary and limitation", variable:"Optimized variable", timing:"Adaptation scale", training:"Parameter update", framework:"Implementation", source:"Formal page", pdf:"Paper PDF", code:"Official code", local:"Locally verified", openStatus:"Open", method:"Method", venue:"Formal version", tier:"Evidence", noCode:"Not confirmed", empty:"No matching methods.",
      planeSystemTitle:"System Design · φ", planeSystemText:"Optimize roles, teams, graphs, workflows, messages, routing, memory, and budgets. Most papers freeze the LLM and search or learn system structure.", planeLink:"mutual constraints", planeModelTitle:"Model Optimization · θ", planeModelText:"Optimize policy, value, credit, hierarchy, RL, and on-policy distillation. This is the website's parallel research module.",
      fixedModel:"Fix θ, search φ", fixedModelText:"GPTSwarm, AFlow, ADAS, and MaAS mostly freeze models and use feedback to optimize prompts, code, graphs, or a supernet.", fixedSystem:"Fix φ, train θ", fixedSystemText:"MAPoRL and Agentic RL keep a defined harness while updating collaborative or single-Agent policies.", alternating:"Alternating optimization", alternatingText:"Search the system, train the model, then search again under the updated model. This controls complexity but creates distribution shift.", joint:"Jointly optimize θ and φ", jointText:"Share team reward across structure selection and language policy with Agent-turn-message-token credit. This remains an immature frontier.", openOptimization:"Open the LLM Optimization module",
      tierNote:"Tier A = formal main-conference proceedings; Tier B = accepted author version."
    }
  };

  function readLanguage() {
    try { return localStorage.getItem(storageKey) || "zh"; } catch { return "zh"; }
  }

  function writeLanguage(value) {
    try { localStorage.setItem(storageKey, value); } catch { /* session-only fallback */ }
  }

  function t(key) { return ui[lang][key] || key; }
  function copy(method) { return method[lang] || method.en; }
  function cat(id) { return data.categories[id]; }
  function catLabel(id) { return cat(id)?.[lang] || id; }
  function color(id) { return cat(id)?.color || "#174d3b"; }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
  }

  function math(latex, display = true) {
    if (window.katex) {
      try { return window.katex.renderToString(latex, { displayMode: display, throwOnError: false, strict: "ignore", trust: false }); } catch { /* readable fallback below */ }
    }
    return `<code>${escapeHtml(latex)}</code>`;
  }

  function applyCopy() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-ui]").forEach(el => {
      const value = t(el.dataset.ui);
      if (value) el.textContent = value;
    });
    document.getElementById("mas-language-toggle").textContent = lang === "zh" ? "EN" : "中文";
  }

  function renderStats() {
    const tierA = data.methods.filter(m => m.tier === "A").length;
    const open = data.methods.filter(m => m.open).length;
    const years = data.methods.map(m => m.year);
    const stats = [
      [data.methods.length, t("methods")], [tierA, t("formal")], [Object.keys(data.categories).length, t("routes")], [open, t("open")], [`${Math.min(...years)}–${Math.max(...years)}`, t("years")]
    ];
    document.getElementById("mas-stats").innerHTML = stats.map(([value,label]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`).join("");
  }

  function renderPlanes() {
    document.getElementById("plane-contrast").innerHTML = `
      <div class="plane-panel"><strong>${t("planeSystemTitle")}</strong><p>${t("planeSystemText")}</p></div>
      <div class="plane-axis">${t("planeLink")}</div>
      <div class="plane-panel"><strong>${t("planeModelTitle")}</strong><p>${t("planeModelText")}</p></div>`;
  }

  function renderFramework() {
    document.getElementById("system-equation").innerHTML = math("S_t=(V_t,R_t,E_t,W_t,C_t,P_t,F_t,B_t)");
    document.getElementById("layer-grid").innerHTML = data.layers.map(layer => {
      const [title, description] = layer[lang];
      return `<button class="layer-button ${category === layer.id ? "active" : ""}" data-layer="${layer.id}" style="--layer-color:${color(layer.id)}"><span class="layer-symbol">${layer.symbol}</span><span><strong>${title}</strong><small>${description}</small></span></button>`;
    }).join("");
    document.querySelectorAll("[data-layer]").forEach(button => button.addEventListener("click", () => {
      category = button.dataset.layer;
      renderFramework(); renderFilters(); renderMethodList();
      document.getElementById("workbench").scrollIntoView({ behavior:"smooth", block:"start" });
    }));
  }

  function renderStory() {
    const stories = data.stories[lang];
    const palette = Object.values(data.categories).map(x => x.color);
    document.getElementById("route-river").innerHTML = stories.map((story,index) => `<div class="river-stage" style="--stage-color:${palette[index % palette.length]}"><span>${story.n}</span><strong>${escapeHtml(story.title)}</strong><b></b></div>`).join("");
    document.getElementById("mas-story-stack").innerHTML = stories.map((story,index) => {
      const routeColor = palette[index % palette.length];
      const links = story.methods.map(id => data.methods.find(m => m.id === id)).filter(Boolean).map(m => `<button data-method-link="${m.id}">${m.name}</button>`).join("");
      return `<article class="mas-story-item" style="--route-color:${routeColor}"><div class="mas-story-number">${story.n}</div><div class="mas-story-title"><h3>${escapeHtml(story.title)}</h3><div class="story-method-links">${links}</div></div><p class="mas-story-claim">${escapeHtml(story.claim)}</p></article>`;
    }).join("");
    bindMethodLinks();
  }

  function filteredMethods() {
    const q = methodQuery.trim().toLowerCase();
    return data.methods.filter(m => (category === "all" || m.category === category) && (!q || [m.name,m.venue,m.framework,copy(m).one,copy(m).question,catLabel(m.category)].join(" ").toLowerCase().includes(q)));
  }

  function renderFilters() {
    const options = [{id:"all", label:t("all")}, ...Object.entries(data.categories).map(([id,value]) => ({id,label:value[lang]}))];
    document.getElementById("mas-category-filter").innerHTML = options.map(item => `<button class="segment ${category === item.id ? "active" : ""}" data-category="${item.id}">${item.label}</button>`).join("");
    document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => { category = button.dataset.category; renderFilters(); renderFramework(); renderMethodList(); }));
  }

  function renderMethodList() {
    const methods = filteredMethods();
    if (methods.length && !methods.some(m => m.id === selectedId)) selectedId = methods[0].id;
    document.getElementById("mas-method-list").innerHTML = methods.length ? methods.map(m => `<button class="method-list-item ${selectedId === m.id ? "active" : ""}" data-select-method="${m.id}" style="--method-color:${color(m.category)}"><span class="method-list-main"><strong>${m.name}</strong><small>${catLabel(m.category)}</small></span><span class="method-list-date">${m.year}.${String(m.month).padStart(2,"0")}</span></button>`).join("") : `<p>${t("empty")}</p>`;
    document.querySelectorAll("[data-select-method]").forEach(button => button.addEventListener("click", () => selectMethod(button.dataset.selectMethod, false)));
    renderReader();
  }

  function selectMethod(id, scroll = true) {
    if (!data.methods.some(m => m.id === id)) return;
    selectedId = id;
    const selected = data.methods.find(m => m.id === id);
    category = selected.category;
    methodQuery = "";
    document.getElementById("mas-method-search").value = "";
    renderFramework(); renderFilters(); renderMethodList(); renderTimeline();
    if (scroll) document.getElementById("workbench").scrollIntoView({ behavior:"smooth", block:"start" });
  }

  function renderReader() {
    const method = data.methods.find(m => m.id === selectedId) || filteredMethods()[0] || data.methods[0];
    const c = copy(method);
    const methodColor = color(method.category);
    document.getElementById("mas-method-reader").style.setProperty("--method-color", methodColor);
    document.getElementById("mas-method-reader").innerHTML = `
      <header class="reader-header">
        <div class="method-kicker"><span>${catLabel(method.category)}</span><span>${method.venue}</span><span class="tier-badge">Tier ${method.tier}</span><span>${t("local")}</span></div>
        <h3>${method.name}</h3><p class="reader-deck">${escapeHtml(c.one)}</p>
      </header>
      <div class="mas-reader-grid">
        <section class="reader-block"><h4>${t("question")}</h4><p>${escapeHtml(c.question)}</p></section>
        <section class="reader-block reader-formula"><h4>${t("variable")}</h4>${math(method.formula)}</section>
        <section class="reader-block full"><h4>${t("mechanism")}</h4><ul>${c.mechanism.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
        <section class="reader-block"><h4>${t("evidence")}</h4><p>${escapeHtml(c.evidence)}</p></section>
        <section class="reader-block"><h4>${t("caveat")}</h4><p>${escapeHtml(c.caveat)}</p></section>
        <section class="reader-block"><h4>${t("timing")}</h4><p>${escapeHtml(method.timing)}</p></section>
        <section class="reader-block"><h4>${t("training")}</h4><p>${escapeHtml(method.learned)}</p></section>
        <section class="reader-block full"><h4>${t("framework")}</h4><p>${escapeHtml(method.framework)}</p><div class="resource-bar"><a href="${method.source}" target="_blank" rel="noreferrer">${t("source")}</a><a href="${method.pdf}" target="_blank" rel="noreferrer">${t("pdf")}</a>${method.code ? `<a href="${method.code}" target="_blank" rel="noreferrer">${t("code")}</a>` : ""}</div></section>
      </div>`;
  }

  function renderIntersection() {
    document.getElementById("joint-objective").innerHTML = math("\\max_{\\theta,\\phi}\\;\\mathbb E_{\\tau\\sim p_{\\theta,\\phi}}[R(\\tau)]-\\lambda\\,Cost(\\tau)");
    const cards = [
      ["01",t("fixedModel"),t("fixedModelText"),"#3367a8","#workbench"], ["02",t("fixedSystem"),t("fixedSystemText"),"#b45443","./index.html#story"], ["03",t("alternating"),t("alternatingText"),"#c47718","#timeline"], ["04",t("joint"),t("jointText"),"#7552a3","./index.html#overview"]
    ];
    document.getElementById("intersection-grid").innerHTML = cards.map(([n,title,body,itemColor,href]) => `<article class="intersection-item" style="--item-color:${itemColor}"><span>${n}</span><h3>${title}</h3><p>${body}</p><a href="${href}">${href.startsWith("./index") ? t("openOptimization") : t("navWorkbench")}</a></article>`).join("");
  }

  function renderTimeline() {
    const grouped = Object.groupBy ? Object.groupBy(data.methods, m => m.year) : data.methods.reduce((acc,m) => ((acc[m.year] ||= []).push(m),acc),{});
    document.getElementById("mas-timeline").innerHTML = Object.keys(grouped).sort((a,b) => Number(a)-Number(b)).map(year => {
      const papers = grouped[year].sort((a,b) => a.month-b.month).map(m => `<button class="timeline-paper ${selectedId === m.id ? "active" : ""}" data-timeline-method="${m.id}" style="--paper-color:${color(m.category)}"><strong>${m.name}</strong><span>${year}.${String(m.month).padStart(2,"0")}</span><small>${m.venue} · Tier ${m.tier}</small></button>`).join("");
      return `<div class="mas-year"><div class="mas-year-label">${year}</div><div class="mas-year-papers">${papers}</div></div>`;
    }).join("");
    document.querySelectorAll("[data-timeline-method]").forEach(button => button.addEventListener("click", () => selectMethod(button.dataset.timelineMethod)));
  }

  function renderLibrary() {
    const q = libraryQuery.trim().toLowerCase();
    const openOnly = document.getElementById("mas-open-only").checked;
    const rows = data.methods.filter(m => (!openOnly || m.open) && (!q || [m.name,m.venue,m.framework,catLabel(m.category)].join(" ").toLowerCase().includes(q)));
    document.getElementById("mas-paper-head").innerHTML = `<tr><th>${t("method")}</th><th>${t("venue")}</th><th>${t("tier")}</th><th>${t("framework")}</th><th>${t("openStatus")}</th><th>${t("source")}</th></tr>`;
    document.getElementById("mas-paper-body").innerHTML = rows.map(m => `<tr><td><strong>${m.name}</strong><small>${catLabel(m.category)}</small></td><td>${m.venue}</td><td><span class="tier-badge" style="--method-color:${color(m.category)}">Tier ${m.tier}</span></td><td>${escapeHtml(m.framework)}</td><td><span class="status ${m.open ? "open" : ""}">${m.open ? t("open") : t("noCode")}</span></td><td><a href="${m.pdf}" target="_blank" rel="noreferrer">PDF</a>${m.code ? ` · <a href="${m.code}" target="_blank" rel="noreferrer">Code</a>` : ""}</td></tr>`).join("");
    document.getElementById("frontier-list").innerHTML = data.frontier.map(item => `<a class="frontier-item" href="${item.source}" target="_blank" rel="noreferrer"><strong>${item.name}</strong><span>${item.venue}</span><p>${escapeHtml(item[lang])}</p></a>`).join("");
  }

  function bindMethodLinks() {
    document.querySelectorAll("[data-method-link]").forEach(button => button.addEventListener("click", () => selectMethod(button.dataset.methodLink)));
  }

  function renderAll() {
    applyCopy(); renderStats(); renderPlanes(); renderFramework(); renderStory(); renderFilters(); renderMethodList(); renderIntersection(); renderTimeline(); renderLibrary();
  }

  document.getElementById("mas-language-toggle").addEventListener("click", () => { lang = lang === "zh" ? "en" : "zh"; writeLanguage(lang); renderAll(); });
  document.getElementById("mas-method-search").addEventListener("input", event => { methodQuery = event.target.value; renderMethodList(); });
  document.getElementById("mas-library-search").addEventListener("input", event => { libraryQuery = event.target.value; renderLibrary(); });
  document.getElementById("mas-open-only").addEventListener("change", renderLibrary);
  renderAll();
})();
