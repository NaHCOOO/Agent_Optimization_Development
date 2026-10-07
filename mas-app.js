(() => {
  const data = window.masResearch;
  if (!data) return;

  const storageKey = "llm-explainer-lang-v2";
  let lang = readLanguage();
  let selectedId = data.methods.some(m => m.id === new URLSearchParams(location.search).get("method")) ? new URLSearchParams(location.search).get("method") : "maas";
  let category = "all";
  let methodQuery = "";
  let libraryQuery = "";

  const ui = {
    zh: {
      navFramework:"研究框架", navStory:"发展主线", navWorkbench:"方法工作台", navIntersection:"交叉方向", navTimeline:"时间线", navLibrary:"论文库",
      moduleOptimization:"LLM 训练与优化", moduleSystem:"Multi-Agent System 设计",
      overviewEyebrow:"Agentic System 的系统设计平面", overviewTitle:"LLM Multi-Agent System Design", overviewLead:"这一部分围绕八个核心问题展开：从单个 Agent、团队选择、连接流程、通信形式与信息处理，到执行时动态调整；再通过 MARL 的参数联合优化和长程多轮 LLM 训练，与模型优化方向连接。Q2、Q3 中的团队与流程设计连接独立的 Agent System Workflow 专题；正式来源、已接收作者版与预印本分开标注。",
      frameworkEyebrow:"八个核心研究问题", frameworkTitle:"从 Agent 到联合优化的完整问题链", frameworkLead:"Q1–Q6 回答系统怎样设计，Q7 连接传统 MARL 的参数联合优化，Q8 回接并列的 LLM Optimization 模块。点击问题可进入对应方法；Q8 会打开模型训练页面。",
      storyEyebrow:"按问题组织证据与演进", storyTitle:"八条核心研究主线", storyLead:"每条主线都先提出设计问题，再梳理方法如何迭代。可靠性、成本和安全是检验 Q1–Q6 的约束，不被单独包装成一个系统层。",
      storyMapTitle:"方法演进与跨问题关系", storyMapHint:"横轴为会议月份（已接收论文含计划月份）；实线表示同一核心问题内的推进，虚线表示跨问题的机制迁移或汇合。关系边表达研究脉络，不等于直接引用。", storyMapRoute:"问题内演进", storyMapFusion:"跨问题连接", storyMapScroll:"可横向滚动查看完整演化路径", storyMapBridge:"进入训练与优化模块",
      workbenchEyebrow:"逐篇核对设计变量", workbenchTitle:"方法工作台", workbenchLead:"统一回答：优化什么、动态发生在哪一层、证据覆盖什么、哪些结论不能外推，以及复现使用什么 runtime。",
      intersectionEyebrow:"Q7 与 Q8 的交叉", intersectionTitle:"系统参数 φ × 模型参数 θ", intersectionLead:"Q7 追问多个 Agent 的参数如何共同学习，Q8 追问语言模型如何适应长程多轮环境。固定模型搜索系统、固定系统训练模型、交替优化与端到端联合优化必须分开讨论。",
      timelineEyebrow:"正式版本优先", timelineTitle:"论文时间线", timelineLead:"月份按会议月份展示，FlowMAS 的 2026.12 为计划会议月；Tier A 为主会 proceedings，Tier B 为已接收但 proceedings 尚未稳定发布的作者版本。",
      libraryEyebrow:"原文、代码与实现底座", libraryTitle:"论文库与开源状态", libraryLead:"“框架”区分运行时和训练底座。多数系统设计工作使用定制 Python、MetaGPT、Hugging Face 或 vLLM，而不是 veRL。",
      search:"搜索方法", filterLibrary:"筛选论文库", openOnly:"仅看已开源", frontierTitle:"前沿观察，不计入正式核心", frontierLead:"这些工作补足新问题，但证据等级必须与主会论文分开。",
      footer:"基于正式论文逐篇核验。论文结论、研究者解读与尚未解决的问题在页面中分栏呈现。",
      methods:"收录论文", formal:"Tier A 正式论文", routes:"核心问题", open:"已开源", years:"时间跨度", all:"全部", question:"研究问题", mechanism:"核心机制", evidence:"论文证据", caveat:"边界与局限", variable:"优化变量", timing:"动态粒度", training:"参数更新", framework:"实现底座", source:"正式页面", pdf:"论文 PDF", code:"官方代码", local:"本地已核验", openStatus:"开源", method:"方法", venue:"正式版本", tier:"证据", noCode:"未确认", empty:"没有匹配的方法。",
      groupSystem:"System Design · Q1–Q6", groupSystemText:"Agent、团队、流程、通信与运行时调整", groupMarl:"MARL Bridge · Q7", groupMarlText:"把参数层面的协作学习迁移到语言 Agent", groupModel:"LLM Optimization Bridge · Q8", groupModelText:"训练面向长程多轮环境的 LLM", openQuestion:"查看相关方法", storyBridge:"进入 LLM Optimization 主线",
      planeSystemTitle:"System Design · φ", planeSystemText:"优化角色、团队、图、Workflow、消息、路由、Memory 与预算。多数论文冻结 LLM，只搜索或学习系统结构。", planeLink:"相互约束", planeModelTitle:"Model Optimization · θ", planeModelText:"优化 policy、value、credit、hierarchy、RL 与 on-policy distillation。它对应网站的另一个并列子页面。",
      fixedModel:"固定 θ，搜索 φ", fixedModelText:"GPTSwarm、AFlow、ADAS、MaAS：模型大多冻结，反馈用于优化 Prompt、代码、图或 supernet。", fixedSystem:"固定 φ，训练 θ", fixedSystemText:"MAPoRL 与 Agentic RL：保留既定 harness，更新协作 policy 或单 Agent policy。", alternating:"交替优化", alternatingText:"先搜索系统、再训练模型，再用更新后的模型重搜系统；可控制成本，但会产生分布漂移。", joint:"联合优化 θ 与 φ", jointText:"让结构选择与语言策略共享团队 reward，并做 Agent–turn–message–token 多层信用；这是尚未成熟的交叉前沿。", openOptimization:"打开 LLM Optimization 子页面",
      tierNote:"Tier A = 正式主会 proceedings；Tier B = 已接收作者版本。"
    },
    en: {
      navFramework:"Framework", navStory:"Research routes", navWorkbench:"Workbench", navIntersection:"Intersection", navTimeline:"Timeline", navLibrary:"Library",
      moduleOptimization:"LLM Training & Optimization", moduleSystem:"Multi-Agent System Design",
      overviewEyebrow:"The system-design plane of Agentic Systems", overviewTitle:"LLM Multi-Agent System Design", overviewLead:"This module is organized around eight core questions: single-Agent design, team selection, topology and workflow, communication medium, information processing, runtime adaptation, MARL parameter-level joint optimization, and training LLMs for long-horizon multi-turn systems. Q2/Q3 link to the focused Agent System Workflow module; formal sources, accepted author versions, and preprints are labeled separately.",
      frameworkEyebrow:"Eight core research questions", frameworkTitle:"A complete question chain from Agents to joint optimization", frameworkLead:"Q1–Q6 cover system design, Q7 bridges parameter-level optimization from traditional MARL, and Q8 connects to the parallel LLM Optimization module. Select a question to inspect its methods; Q8 opens model training.",
      storyEyebrow:"Evidence and evolution by question", storyTitle:"Eight core research routes", storyLead:"Each route begins with a design question and traces how methods evolve. Reliability, cost, and safety constrain Q1–Q6 rather than forming an extra system layer.",
      storyMapTitle:"Method evolution and cross-question relationships", storyMapHint:"The x-axis marks conference months, including planned dates for accepted papers. Solid links show progress within one core question; dashed links show mechanism transfer or convergence across questions. Edges indicate research lineage, not necessarily direct citation.", storyMapRoute:"Within-question evolution", storyMapFusion:"Cross-question connection", storyMapScroll:"Scroll horizontally to inspect the full evolution path", storyMapBridge:"Open Training & Optimization",
      workbenchEyebrow:"Audit each design variable", workbenchTitle:"Method Workbench", workbenchLead:"Each paper is aligned by what it optimizes, where adaptation happens, what the evidence covers, what does not transfer, and which runtime supports reproduction.",
      intersectionEyebrow:"The Q7–Q8 intersection", intersectionTitle:"System parameters φ × model parameters θ", intersectionLead:"Q7 asks how multiple Agent parameters learn together; Q8 asks how language models adapt to long-horizon multi-turn environments. Fixed-model system search, fixed-system model training, alternating optimization, and end-to-end joint optimization must remain distinct.",
      timelineEyebrow:"Formal versions first", timelineTitle:"Paper Timeline", timelineLead:"Months show conference dates; FlowMAS's December 2026 date is planned. Tier A is main-conference proceedings; Tier B is an accepted author version while proceedings are not yet stable.",
      libraryEyebrow:"Papers, code, and implementation substrate", libraryTitle:"Paper Library & Open Source", libraryLead:"Framework distinguishes runtime from training infrastructure. Most system-design papers use custom Python, MetaGPT, Hugging Face, or vLLM rather than veRL.",
      search:"Search methods", filterLibrary:"Filter library", openOnly:"Open source only", frontierTitle:"Frontier watch, outside the formal core", frontierLead:"These papers fill emerging gaps, but their evidence tier stays separate from main-conference work.",
      footer:"Audited paper by paper from formal sources. Paper evidence, researcher interpretation, and unresolved limits are separated throughout the page.",
      methods:"catalog papers", formal:"Tier A papers", routes:"core questions", open:"open source", years:"year span", all:"All", question:"Research question", mechanism:"Core mechanism", evidence:"Paper evidence", caveat:"Boundary and limitation", variable:"Optimized variable", timing:"Adaptation scale", training:"Parameter update", framework:"Implementation", source:"Formal page", pdf:"Paper PDF", code:"Official code", local:"Locally verified", openStatus:"Open", method:"Method", venue:"Formal version", tier:"Evidence", noCode:"Not confirmed", empty:"No matching methods.",
      groupSystem:"System Design · Q1–Q6", groupSystemText:"Agents, teams, workflows, communication, and runtime adaptation", groupMarl:"MARL Bridge · Q7", groupMarlText:"Transfer parameter-level cooperative learning to language Agents", groupModel:"LLM Optimization Bridge · Q8", groupModelText:"Train LLMs for long-horizon multi-turn environments", openQuestion:"View related methods", storyBridge:"Open the LLM Optimization routes",
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
      [data.methods.length, t("methods")], [tierA, t("formal")], [data.questions.length, t("routes")], [open, t("open")], [`${Math.min(...years)}–${Math.max(...years)}`, t("years")]
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
    document.getElementById("question-groups").innerHTML = `
      <div class="question-group system"><strong>${t("groupSystem")}</strong><span>${t("groupSystemText")}</span></div>
      <div class="question-group marl"><strong>${t("groupMarl")}</strong><span>${t("groupMarlText")}</span></div>
      <div class="question-group model"><strong>${t("groupModel")}</strong><span>${t("groupModelText")}</span></div>`;
    document.getElementById("question-grid").innerHTML = data.questions.map(question => {
      const [title, description] = question[lang];
      const itemColor = question.category ? color(question.category) : "#7552a3";
      const active = question.category && category === question.category ? "active" : "";
      const tag = question.href ? "a" : "button";
      const target = question.href ? ` href="${question.href}"` : ` type="button" data-question-category="${question.category}"`;
      return `<${tag} class="question-card ${question.group} ${active}"${target} style="--question-color:${itemColor}"><span class="question-number">${question.n}</span><span class="question-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(description)}</small><b>${t("openQuestion")}</b></span></${tag}>`;
    }).join("");
    document.querySelectorAll("[data-question-category]").forEach(button => button.addEventListener("click", () => {
      category = button.dataset.questionCategory;
      renderFramework(); renderFilters(); renderMethodList();
      document.getElementById("workbench").scrollIntoView({ behavior:"smooth", block:"start" });
    }));
  }

  function renderStoryMap() {
    const width = 1810;
    const lanes = [
      { id:"agent", question:0 }, { id:"team", question:1 },
      { id:"workflow", question:2 }, { id:"medium", question:3 },
      { id:"information", question:4 }, { id:"adaptation", question:5 },
      { id:"marl", question:6 }, { id:"model", question:7 }
    ];
    const laneById = new Map(lanes.map(lane => [lane.id, lane]));
    const yearBands = {
      2016:{x:180,width:55}, 2017:{x:270,width:55}, 2018:{x:360,width:55}, 2019:{x:450,width:70},
      2022:{x:600,width:75}, 2023:{x:725,width:85}, 2024:{x:865,width:235},
      2025:{x:1135,width:430}, 2026:{x:1585,width:135}
    };
    const positionFor = method => {
      const band = yearBands[method.year];
      return band.x + ((method.month - 1) / 11) * band.width;
    };
    const positions = new Map();
    let laneTop = 46;
    lanes.forEach(lane => {
      const trackLastX = [];
      data.methods.filter(method => method.category === lane.id)
        .sort((a,b) => positionFor(a) - positionFor(b) || a.name.localeCompare(b.name))
        .forEach(method => {
          const x = positionFor(method);
          let track = trackLastX.findIndex(lastX => x - lastX >= 118);
          if (track < 0) { track = trackLastX.length; trackLastX.push(-Infinity); }
          trackLastX[track] = x;
          positions.set(method.id, { x, y:laneTop + 32 + track * 70, lane:lane.id });
        });
      lane.height = Math.max(90, trackLastX.length * 70 + 20);
      lane.y = laneTop + lane.height / 2;
      laneTop += lane.height;
    });
    const height = laneTop + 14;
    positions.set("optimization", { x:1740, y:laneById.get("model").y, lane:"model" });

    const edgeMarkup = data.relationshipEdges.map(([from,to]) => {
      const source = positions.get(from);
      const target = positions.get(to);
      if (!source || !target) return "";
      const crossQuestion = source.lane !== target.lane;
      const controlX = source.x + Math.max(45, (target.x - source.x) * 0.48);
      const path = `M ${source.x} ${source.y} C ${controlX} ${source.y}, ${controlX} ${target.y}, ${target.x} ${target.y}`;
      return `<path class="story-map-edge ${crossQuestion ? "fusion" : "route"}" data-edge-from="${from}" data-edge-to="${to}" d="${path}" marker-end="url(#mas-story-arrow)"></path>`;
    }).join("");

    const laneMarkup = lanes.map((lane,index) => {
      const question = data.questions[lane.question];
      const itemColor = question.category ? color(question.category) : "#7552a3";
      const label = lane.id === "model" ? "LLM Optimization" : catLabel(lane.id);
      return `
        <rect class="story-map-lane-bg" x="0" y="${lane.y - lane.height / 2}" width="${width}" height="${lane.height}" data-lane-index="${index}"></rect>
        <line class="story-map-lane-line" x1="154" y1="${lane.y}" x2="1780" y2="${lane.y}"></line>
        <circle cx="27" cy="${lane.y - 8}" r="4" fill="${itemColor}"></circle>
        <text class="story-map-lane-index" x="39" y="${lane.y - 3}">${question.n}</text>
        <text class="story-map-lane-label" x="27" y="${lane.y + 17}">${escapeHtml(label)}</text>`;
    }).join("");

    const yearMarkup = Object.entries(yearBands).map(([year,band]) => `
      <line class="story-map-year-line" x1="${band.x}" y1="31" x2="${band.x}" y2="${height - 10}"></line>
      <text class="story-map-year-label" x="${band.x}" y="27">${year}</text>`).join("");

    const nodeMarkup = data.methods.map(method => {
      const position = positions.get(method.id);
      if (!position) return "";
      return `<button type="button" title="${escapeHtml(method.name)}" class="story-map-node ${selectedId === method.id ? "active" : ""}" data-method-link="${method.id}" style="--node-x:${position.x}px;--node-y:${position.y}px;--lane-color:${color(method.category)}"><strong>${method.name}</strong><span>${method.year}.${String(method.month).padStart(2,"0")}</span></button>`;
    }).join("");

    const map = document.getElementById("mas-story-map");
    map.style.height = `${height}px`;
    map.setAttribute("aria-label", t("storyMapTitle"));
    map.innerHTML = `
      <svg class="story-map-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">
        <defs><marker id="mas-story-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z"></path></marker></defs>
        ${laneMarkup}${yearMarkup}<g class="story-map-edges">${edgeMarkup}</g>
      </svg>
      ${nodeMarkup}
      <a class="story-map-node mas-bridge-node" href="./index.html#story" style="--node-x:1740px;--node-y:${laneById.get("model").y}px;--lane-color:#7552a3"><strong>${t("storyMapBridge")}</strong><span>Q8</span></a>`;
    renderStoryMapSelection();
  }

  function renderStoryMapSelection() {
    document.querySelectorAll("#mas-story-map [data-method-link]").forEach(node => node.classList.toggle("active", node.dataset.methodLink === selectedId));
    document.querySelectorAll("#mas-story-map .story-map-edge").forEach(edge => {
      const related = edge.dataset.edgeFrom === selectedId || edge.dataset.edgeTo === selectedId;
      edge.classList.toggle("active", related);
      edge.classList.toggle("muted", !related);
    });
  }

  function renderStory() {
    const stories = data.stories[lang];
    const storyColors = data.questions.map(question => question.category ? color(question.category) : "#7552a3");
    renderStoryMap();
    document.getElementById("mas-story-stack").innerHTML = stories.map((story,index) => {
      const routeColor = storyColors[index];
      const methodLinks = story.methods.map(id => data.methods.find(m => m.id === id)).filter(Boolean).map(m => `<button data-method-link="${m.id}">${m.name}</button>`).join("");
      const bridgeLink = story.bridge ? `<a href="${story.bridge}">${story.bridgeLabel || t("storyBridge")}</a>` : "";
      const links = `${methodLinks}${bridgeLink}`;
      return `<article class="mas-story-item" style="--route-color:${routeColor}"><div class="mas-story-number">${story.n}</div><div class="mas-story-title"><h3>${escapeHtml(story.title)}</h3><div class="story-method-links">${links}</div></div><p class="mas-story-claim">${escapeHtml(story.claim)}</p></article>`;
    }).join("");
    bindMethodLinks();
  }

  function filteredMethods() {
    const q = methodQuery.trim().toLowerCase();
    const question = data.questions.find(item => item.category === category)?.n;
    return data.methods.filter(m => (category === "all" || m.category === category || m.questions?.includes(question)) && (!q || [m.name,m.venue,m.framework,copy(m).one,copy(m).question,catLabel(m.category)].join(" ").toLowerCase().includes(q)));
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
    renderFramework(); renderFilters(); renderMethodList(); renderTimeline(); renderStoryMapSelection();
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
        <h3>${method.name}</h3>${method.authors ? `<p class="workflow-authors">${lang === "zh" ? "作者" : "Authors"} · ${escapeHtml(method.authors)}</p>` : ""}<p class="reader-deck">${escapeHtml(c.one)}</p>
      </header>
      <div class="mas-reader-grid">
        <section class="reader-block"><h4>${t("question")}</h4><p>${escapeHtml(c.question)}</p></section>
        <section class="reader-block reader-formula"><h4>${t("variable")}</h4>${math(method.formula)}</section>
        <section class="reader-block full"><h4>${t("mechanism")}</h4><ul>${c.mechanism.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
        <section class="reader-block"><h4>${t("evidence")}</h4><p>${escapeHtml(c.evidence)}</p></section>
        <section class="reader-block"><h4>${t("caveat")}</h4><p>${escapeHtml(c.caveat)}</p></section>
        <section class="reader-block"><h4>${t("timing")}</h4><p>${escapeHtml(lang === "zh" && method.timingZh ? method.timingZh : method.timing)}</p></section>
        <section class="reader-block"><h4>${t("training")}</h4><p>${escapeHtml(lang === "zh" && method.learnedZh ? method.learnedZh : method.learned)}</p></section>
        <section class="reader-block full"><h4>${t("framework")}</h4><p>${escapeHtml(method.framework)}</p><div class="resource-bar"><a href="${method.source}" target="_blank" rel="noreferrer">${t("source")}</a><a href="${method.pdf}" target="_blank" rel="noreferrer">${t("pdf")}</a>${method.code ? `<a href="${method.code}" target="_blank" rel="noreferrer">${t("code")}</a>` : ""}${method.workflow ? `<a href="./workflow.html?method=${method.id}#workbench">${lang === "zh" ? "Workflow 专题深读" : "Workflow deep dive"}</a>` : ""}</div></section>
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
