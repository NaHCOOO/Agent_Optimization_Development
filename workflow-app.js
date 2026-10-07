(() => {
  const data = window.workflowResearch;
  if (!data) return;
  const key = "llm-explainer-lang-v2";
  let lang = "zh";
  try { lang = localStorage.getItem(key) === "en" ? "en" : "zh"; } catch (_) { /* File previews may restrict storage. */ }
  const parameters = new URLSearchParams(location.search);
  let selected = data.methods.some(m => m.id === parameters.get("method")) ? parameters.get("method") : "flowmas";
  let route = "all";
  let query = "";
  const comparison = ["gtd", "aflow", "flowmas"];
  const ui = {
    zh: {
      navFramework:"研究框架",navStory:"演进与关系",navWorkbench:"方法工作台",navCompare:"并排对比",navTimeline:"时间线",navLibrary:"论文库",
      moduleOptimization:"LLM 训练与优化",moduleSystem:"Multi-Agent System 设计",eyebrow:"Q2 × Q3 的专题研究",
      lead:"围绕“选哪些 Agent / Operator、怎样连接、按什么流程执行”梳理人工协议、条件结构生成与执行反馈优化。它是系统设计的深入分支，与模型训练共享任务反馈，但优化变量不同。",
      frameworkEyebrow:"按优化机制分类",frameworkTitle:"三条路线，两个容易混淆的边界",frameworkLead:"数据来源、学习机制与运行时调整是不同维度。同一方法可跨路线，表中的主归属用于定位，不表示互斥。",
      storyEyebrow:"从人工协作到结构分布",storyTitle:"方法演进与关系",storyLead:"横轴采用已核验的早期公开月份；未核验更早版本时采用会议月。正式会议信息单独展示。关系边是机制对照，不代表直接引用。",
      mapTitle:"协议 → 搜索 → 条件生成与反馈精细化",mapHint:"实线表示同路线机制对照，虚线表示跨路线连接；关系边不代表直接引用或继承。",sameRoute:"路线内",crossRoute:"跨路线",
      workbenchEyebrow:"逐篇对齐优化对象与证据",workbenchLead:"作者、方法机制、数据来源、优化策略、动态粒度、参数更新、实验范围和局限分别核对。",
      compareEyebrow:"在相同维度下比较",compareLead:"并列核对三种结构设计机制，而不是把所有方法都写成“根据任务生成图”。",
      intersectionEyebrow:"回到 Agentic System 的共同问题",intersectionTitle:"Workflow φ 与语言策略 θ",
      timelineEyebrow:"公开月份与发表状态分开",timelineLead:"A 为正式主会来源，B 为已接收作者版，C 为未核验正式发表的预印本。FlowMAS 的 2026.12 是计划会议月份，不是当前已有 proceedings。",
      libraryEyebrow:"正式原文、作者代码与框架",libraryTitle:"论文库与开源核验",libraryLead:"优先链接主会原文。正式 PDF 下载受限时保留正式入口，明确标注本地阅读的作者版。代码可访问、仅宣布地址和未确认公开分开记录。",
      search:"搜索方法",librarySearch:"筛选论文库",openOnly:"仅看已确认公开代码",formalOnly:"仅看正式主会来源",footer:"核验日期：2026.10.07。方法公式为统一解释示意，不冒充论文原式；局限栏包含研究者分析。",auditLink:"来源与分类核验记录",
      methods:"收录方法",formal:"正式主会来源",accepted:"已接收作者版",preprint:"预印本",public:"已确认公开代码",all:"全部",empty:"没有匹配的方法。",authors:"作者",variable:"优化对象",data:"数据与反馈来源",optimizer:"优化机制",timing:"动态粒度",weights:"参数更新",evidence:"论文证据",caveat:"边界与局限",mechanism:"核心机制",formula:"统一机制示意",framework:"实现底座",source:"发表入口",pdf:"正式 PDF",authorPdf:"作者 PDF",code:"官方代码",acceptance:"接收依据",related:"相邻机制",noRelation:"暂无直接绘制的机制连接。",compareSlot:"比较方法",method:"方法",venue:"发表状态",open:"开源状态",first:"早期来源",formalTime:"会议月份",unconfirmed:"公开状态未确认",announced:"原文宣布地址，访问未确认",paperLocal:"本地阅读原文",localFormal:"主会来源 PDF",localAuthor:"作者版 PDF",fallbackNote:"正式 OpenReview PDF 在本次下载中返回 403。本地阅读作者版，正式入口保留；不把作者版下载标为正式 PDF 下载成功。",planned:"计划会议月",supplement:"补充对照",
      scope:[['选择成员与构件','Q2 决定角色、模型和 operator 候选。Workflow 同时关心选择结果如何落到可执行结构。'],['连接与执行语义','Q3 不只包含通信图，还包括依赖、顺序、并发、循环、停止及恢复。图上的边与可执行流程并不完全等价。'],['信息与动态调整','Q5 影响消息价值、冗余和归因；Q6 影响何时重组。它们是 Workflow 的交叉维度，不替代 MAS 的其余主线。']],
      boundaries:[['自动执行 ≠ 自动设计','AutoGen 自动回复、AgentVerse 招募循环和 DyLAN 筛选成员都可动态执行，但并不因此属于训练结构搜索策略。LLM-Blender 则是固定集成流水线。'],['数据驱动 ≠ 无执行反馈','GTD、MAGE 和 Codebook Agent 先付出执行采集成本，再学习设计器。GPTSwarm、G-Designer、CARD 也使用反馈训练，不能按“有数据 / 无数据”强行互斥分类。']],
      intersection:[['与系统设计的关系','这个专题深入 Q3 和部分 Q2，连到 Q5、Q6；单 Agent、通信载体及 MARL 联合优化仍在 MAS 总页展开。'],['与模型训练的关系','多数方法固定执行 LLM，只更新 φ。LLM-Blender 的融合器训练是例外，但不等于 MARL。结构生成器用了 PyTorch 或 RL，也不意味着使用 veRL 训练 Agent LLM。']],
      stories:[['人工协议：先组织协作','MetaGPT、ChatDev、AutoGen 和 Debate 明确角色与信息交接；AgentVerse 与 DyLAN 增加团队调整。LLM-Blender 提供选择、聚合的集成对照。'],['反馈优化：从代码到结构分布','GPTSwarm 调节点与边；ADAS 搜索程序，AFlow 搜索代码流程，MaAS 学问题条件下的系统分布。CE-Graph 利用失败模式，AutoRAS 把鲁棒性写入 primitive，FlowMAS 使用结构与信息中间反馈。'],['条件生成：让经验跨任务复用','GTD 使用代理引导扩散，RADAR 显式处理冗余，MAGE 加入能量梯度，Codebook Agent 摊销为码预测与重排。CARD 额外把模型、工具和知识变化作为条件；Flow 补充执行中更新。']],
      edge:{protocol:"人工协议转为可优化结构",team:"成员筛选转向条件系统选择",feedback:"节点、边反馈转向结构模块",code:"程序搜索与树式流程搜索",distribution:"单流程选择与问题条件分布",failure:"标量得分与结构化失败诊断",flow:"系统分布与多样化 DAG 构造",robustness:"结构选择加入安全行为约束",condition:"任务条件扩展到环境配置",generation:"变分图与扩散生成机制对照",redundancy:"扩散生成加入有效规模约束",energy:"零阶代理引导与一阶能量引导",amortization:"迭代生成与摊销码本对照",runtime:"执行状态与环境条件的两种适配"}
    },
    en: {
      navFramework:"Framework",navStory:"Evolution & relations",navWorkbench:"Workbench",navCompare:"Comparison",navTimeline:"Timeline",navLibrary:"Library",
      moduleOptimization:"LLM Training & Optimization",moduleSystem:"Multi-Agent System Design",eyebrow:"A focused study of Q2 × Q3",
      lead:"Study which Agents/operators to select, how to connect them, and how to execute: human-designed protocols, conditional structure generation, and execution-feedback optimization. This deepens system design and shares task feedback with model training, but optimizes different variables.",
      frameworkEyebrow:"Classify by optimization mechanism",frameworkTitle:"Three routes and two important boundaries",frameworkLead:"Data provenance, learning mechanism, and runtime adaptation are separate axes. Routes locate the main contribution, not mutually exclusive sets.",
      storyEyebrow:"From protocols to structure distributions",storyTitle:"Method evolution & relationships",storyLead:"The x-axis uses verified early public months, or conference months when an earlier version was not verified. Formal venues are shown separately. Edges compare mechanisms, not direct citations.",
      mapTitle:"Protocols → search → generation and richer feedback",mapHint:"Solid links compare mechanisms within a route; dashed links cross routes. Edges do not imply direct citations or inheritance.",sameRoute:"Within route",crossRoute:"Cross route",
      workbenchEyebrow:"Align optimization variables and evidence",workbenchLead:"Audit authors, mechanisms, data, optimization, adaptation scale, weight updates, experimental scope, and limits separately.",
      compareEyebrow:"Compare aligned dimensions",compareLead:"Distinguish structure-design mechanisms rather than describing every paper as task-conditioned graph generation.",
      intersectionEyebrow:"Shared Agentic System questions",intersectionTitle:"Workflow φ and language policy θ",
      timelineEyebrow:"Public dates and publication status",timelineLead:"A: formal main-conference source. B: accepted author version. C: preprint without verified formal publication. FlowMAS's December 2026 date is the planned conference month, not available proceedings.",
      libraryEyebrow:"Formal papers, author code, and frameworks",libraryTitle:"Paper Library & Open-Source Audit",libraryLead:"Prefer formal papers. When a formal download is blocked, preserve its entry and label the local author copy. Public code, announced links, and unconfirmed releases are distinct.",
      search:"Search methods",librarySearch:"Filter library",openOnly:"Verified public code only",formalOnly:"Formal main-conference sources only",footer:"Audited 2026-10-07. Formulas are explanatory abstractions, not paper equation transcriptions; limitations include researcher analysis.",auditLink:"Sources and classification audit",
      methods:"methods",formal:"formal main-conference sources",accepted:"accepted author version",preprint:"preprint",public:"verified public code",all:"All",empty:"No matching methods.",authors:"Authors",variable:"Optimized variable",data:"Data & feedback",optimizer:"Optimization",timing:"Adaptation scale",weights:"Weight updates",evidence:"Paper evidence",caveat:"Boundary & limitation",mechanism:"Core mechanism",formula:"Unified mechanism sketch",framework:"Implementation",source:"Publication entry",pdf:"Formal PDF",authorPdf:"Author PDF",code:"Official code",acceptance:"Acceptance evidence",related:"Adjacent mechanisms",noRelation:"No adjacent mechanism links drawn.",compareSlot:"Comparison method",method:"Method",venue:"Publication status",open:"Open-source status",first:"Early source",formalTime:"Conference month",unconfirmed:"Public release unconfirmed",announced:"Announced in paper; access unconfirmed",paperLocal:"Local reading copy",localFormal:"Conference-source PDF",localAuthor:"Author-version PDF",fallbackNote:"The formal OpenReview download returned 403 during this audit. An author version was read locally, preserving the formal entry; this is not a successful formal PDF download.",planned:"Planned conference",supplement:"Additional comparator",
      scope:[['Members and building blocks','Q2 chooses roles, models, and candidate operators. Workflow also asks how those choices become executable structures.'],['Connections and execution semantics','Q3 includes dependencies, ordering, concurrency, loops, stopping, and recovery. A communication graph is not the entire execution protocol.'],['Information and adaptation','Q5 concerns message value, redundancy, and credit; Q6 concerns when to reorganize. These intersect with Workflow without replacing the other MAS questions.']],
      boundaries:[['Automatic execution ≠ automatic design','AutoGen replies, AgentVerse recruitment, and DyLAN selection can adapt at runtime without learning structure-search policies. LLM-Blender is a fixed ensemble pipeline.'],['Data-driven ≠ feedback-free','GTD, MAGE, and Codebook Agent pay collection costs before training designers. GPTSwarm, G-Designer, and CARD also learn from feedback; data presence is not a mutually exclusive taxonomy.']],
      intersection:[['System-design relationship','This topic deepens Q3 and parts of Q2, intersecting with Q5/Q6. Single-Agent design, communication media, and MARL remain in the MAS overview.'],['Model-training relationship','Most methods freeze execution LLMs and update φ. LLM-Blender trains fusion modules, not a MARL team. Using PyTorch or RL for a designer does not imply veRL-based Agent-LLM training.']],
      stories:[['Protocols: organize collaboration first','MetaGPT, ChatDev, AutoGen, and Debate specify roles and handoffs; AgentVerse and DyLAN add team adaptation. LLM-Blender supplies an ensemble comparator.'],['Feedback: from programs to distributions','GPTSwarm optimizes nodes/edges; ADAS searches programs, AFlow searches code workflows, and MaAS learns conditional system distributions. CE-Graph uses failure modes, AutoRAS robust primitives, and FlowMAS structure/information feedback.'],['Generation: reuse execution experience','GTD guides diffusion with proxies, RADAR handles redundancy, MAGE adds energy gradients, and Codebook Agent amortizes prediction/reranking. CARD conditions on resource changes; Flow supplies execution-time updates.']],
      edge:{protocol:"Protocols become optimizable structures",team:"Member filtering to conditional system selection",feedback:"Node/edge feedback to structure modules",code:"Program search versus tree workflow search",distribution:"One workflow versus query-conditioned distributions",failure:"Scalar scores versus structured failures",flow:"System distributions to diverse DAG construction",robustness:"Structure selection with safety behavior",condition:"Task conditions to resource conditions",generation:"Variational graphs versus diffusion",redundancy:"Diffusion with effective-size control",energy:"Zeroth-order proxy versus first-order energy",amortization:"Iterative generation versus amortized codes",runtime:"Execution-state versus resource-condition adaptation"}
    }
  };
  const t = key => ui[lang][key];
  const c = method => method[lang];
  const esc = value => String(value).replace(/[&<>"']/g, x => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
  const byId = id => data.methods.find(m => m.id === id);
  const color = m => data.routes[m.route].color;
  const venue = m => m.venue.replace(" · accepted", lang === "zh" ? " · 已接收" : " · accepted");
  const date = m => `${m.year}.${String(m.month).padStart(2,"0")}`;
  const tier = m => m.tier === "A" ? t("formal") : m.tier === "B" ? t("accepted") : t("preprint");
  const math = formula => window.katex ? katex.renderToString(formula, {displayMode:true,throwOnError:false,output:"htmlAndMathml"}) : `<code>${esc(formula)}</code>`;
  const methodLink = (m, extra = "") => `<button type="button" data-method="${m.id}" ${extra}>${esc(m.name)}</button>`;
  function copyUI() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-wf]").forEach(el => { el.textContent = t(el.dataset.wf); });
    const toggle = document.getElementById("workflow-language-toggle");
    toggle.textContent = lang === "zh" ? "EN" : "中文";
    toggle.setAttribute("aria-label", lang === "zh" ? "切换到英文" : "Switch to Chinese");
  }
  function blocks(items) { return items.map(([title,text]) => `<article><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join(""); }
  function overview() {
    const stats = [[data.methods.length,t("methods")],[data.methods.filter(m=>m.tier==="A").length,t("formal")],[data.methods.filter(m=>m.tier==="B").length,t("accepted")],[data.methods.filter(m=>m.tier==="C").length,t("preprint")],[data.methods.filter(m=>m.code).length,t("public")]];
    document.getElementById("workflow-stats").innerHTML = stats.map(([n,label])=>`<div class="stat"><strong>${n}</strong><span>${label}</span></div>`).join("");
    document.getElementById("workflow-scope").innerHTML = blocks(t("scope"));
    document.getElementById("workflow-routes").innerHTML = Object.entries(data.routes).map(([id,r],i)=>`<article class="workflow-route" style="--route-color:${r.color}"><p class="eyebrow">0${i+1}</p><h3>${r[lang]}</h3><p>${r[lang+"Text"]}</p><div class="workflow-method-links">${data.methods.filter(m=>m.route===id).map(m=>methodLink(m)).join("")}</div></article>`).join("");
    document.getElementById("workflow-boundaries").innerHTML = blocks(t("boundaries"));
    document.getElementById("workflow-intersection").innerHTML = blocks(t("intersection")) + `<a href="./system-design.html#framework">${t("moduleSystem")} →</a><a href="./index.html#story">${t("moduleOptimization")} →</a>`;
  }
  function graph() {
    const width = 1880;
    const start = 2023 * 12 + 4;
    const positions = new Map();
    const xFor = m => { const [year,month] = m.first.split("-").map(Number); return 260 + (year*12+month-1-start)*35; };
    let bottom = 62;
    const lanes = Object.entries(data.routes).map(([id,r]) => {
      const tracks = [];
      const list = data.methods.filter(m=>m.route===id).sort((a,b)=>xFor(a)-xFor(b)||a.name.localeCompare(b.name));
      list.forEach(m=>{
        const x = xFor(m);
        let track = tracks.findIndex(last=>x-last>=170);
        if (track<0) { track=tracks.length; tracks.push(-Infinity); }
        tracks[track]=x;
        positions.set(m.id,{x,track,lane:id});
      });
      const height = Math.max(140, tracks.length*66+40);
      const top = bottom;
      bottom += height;
      list.forEach(m=>{ positions.get(m.id).y=top+30+positions.get(m.id).track*66; });
      return {id,r,top,height};
    });
    const height = bottom+18;
    const laneMarkup = lanes.map((l,i)=>`<rect class="story-map-lane-bg" data-lane-index="${i}" x="0" y="${l.top}" width="${width}" height="${l.height}"></rect><line class="story-map-lane-line" x1="220" x2="${width}" y1="${l.top}" y2="${l.top}"></line><text x="20" y="${l.top+30}" fill="${l.r.color}" font-size="13" font-weight="700">0${i+1}</text><foreignObject x="20" y="${l.top+42}" width="170" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style="font:600 12px/1.6 system-ui;color:${l.r.color}">${esc(l.r[lang])}</div></foreignObject>`).join("");
    const years = [2023,2024,2025,2026].map(year=>{const x=year===2023?260:260+(year*12-start)*35;return `<line class="story-map-year-line" x1="${x}" x2="${x}" y1="36" y2="${height}"></line><text class="story-map-year-label" x="${x}" y="27">${year}</text>`;}).join("");
    const edges = data.edges.map(([a,b])=>{
      const p=positions.get(a),q=positions.get(b);const adjacent=a===selected||b===selected;
      const cx=(p.x+q.x)/2;
      return `<path class="story-map-edge ${p.lane===q.lane?"route":"fusion"} ${adjacent?"active":"muted"}" d="M${p.x},${p.y} C${cx},${p.y} ${cx},${q.y} ${q.x},${q.y}"></path>`;
    }).join("");
    const nodes = data.methods.map(m=>{const p=positions.get(m.id);return `<button type="button" title="${esc(m.title)}" aria-pressed="${m.id===selected}" class="story-map-node ${m.id===selected?"active":""}" data-map-method="${m.id}" style="--node-x:${p.x}px;--node-y:${p.y}px;--lane-color:${color(m)}"><strong>${esc(m.name)}</strong><span>${m.first.replace("-",".")} · ${m.tier}</span></button>`;}).join("");
    const map=document.getElementById("workflow-map");map.style.width=`${width}px`;map.style.height=`${height}px`;
    map.innerHTML=`<svg class="story-map-svg" viewBox="0 0 ${width} ${height}" aria-hidden="true">${laneMarkup}${years}${edges}</svg>${nodes}`;
    const related=data.edges.filter(([a,b])=>a===selected||b===selected);
    document.getElementById("workflow-relations").innerHTML=`<strong>${esc(byId(selected).name)} · ${t("related")}</strong>`+(related.length?related.map(([a,b,type])=>`<span>${methodLink(byId(a===selected?b:a),'data-no-scroll="true"')} · ${t("edge")[type]}</span>`).join(""):t("noRelation"));
  }
  function stories() {
    const routes=["manual","search","generated"];
    document.getElementById("workflow-stories").innerHTML=t("stories").map(([title,text],i)=>`<article class="mas-story" style="--story-color:${data.routes[routes[i]].color}"><div class="mas-story-number">0${i+1}</div><div><h3>${esc(title)}</h3><p>${esc(text)}</p><div class="story-methods">${data.methods.filter(m=>m.route===routes[i]).map(m=>methodLink(m)).join("")}</div></div></article>`).join("");
  }
  function matches(m, q) { return [m.name,m.title,m.authors,m.framework,data.routes[m.route][lang],...Object.values(c(m)).flat()].join(" ").toLowerCase().includes(q.toLowerCase()); }
  function list() {
    const options=[['all',t("all")],...Object.entries(data.routes).map(([id,r])=>[id,r[lang]])];
    document.getElementById("workflow-filter").innerHTML=options.map(([id,name])=>`<button type="button" class="segment ${route===id?"active":""}" aria-pressed="${route===id}" data-route="${id}">${name}</button>`).join("");
    const rows=data.methods.filter(m=>(route==="all"||m.route===route)&&matches(m,query));
    document.getElementById("workflow-method-list").innerHTML=rows.length?rows.map(m=>`<button type="button" class="method-list-item ${m.id===selected?"active":""}" data-method="${m.id}" data-no-scroll="true" style="--method-color:${color(m)}"><span class="method-list-main"><strong>${esc(m.name)}</strong><small>${data.routes[m.route][lang]}</small></span><span class="method-list-date">${m.first.replace("-",".")}</span></button>`).join(""):`<p>${t("empty")}</p>`;
  }
  function reader() {
    const m=byId(selected),d=c(m);const el=document.getElementById("workflow-reader");el.style.setProperty("--method-color",color(m));
    const fields=["variable","data","optimizer","timing","weights","evidence","caveat"];
    el.innerHTML=`<header class="reader-header"><div class="method-kicker"><span>${data.routes[m.route][lang]}</span><span>${venue(m)}</span><span>Tier ${m.tier}</span><span>${m.questions.join(" · ")}</span></div><h3>${esc(m.name)}</h3><p class="workflow-reader-title">${esc(m.title)}</p><p class="workflow-authors">${t("authors")} · ${esc(m.authors)}</p><p class="reader-deck">${esc(d.one)}</p></header><div class="mas-reader-grid">${fields.slice(0,2).map(f=>`<section class="reader-block"><h4>${t(f)}</h4><p>${esc(d[f])}</p></section>`).join("")}<section class="reader-block full"><h4>${t("formula")}</h4><div class="math-formula">${math(m.formula)}</div></section><section class="reader-block full"><h4>${t("mechanism")}</h4><ul>${d.mechanism.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></section>${fields.slice(2).map(f=>`<section class="reader-block"><h4>${t(f)}</h4><p>${esc(d[f])}</p></section>`).join("")}<section class="reader-block full"><h4>${t("framework")}</h4><p>${esc(m.framework)}</p><p>${t("paperLocal")} · ${m.fallback||m.tier!=="A"?t("localAuthor"):t("localFormal")}</p><div class="resource-bar"><a href="${m.source}" target="_blank" rel="noreferrer">${t("source")}</a><a href="${m.pdf}" target="_blank" rel="noreferrer">${m.tier==="A"?t("pdf"):t("authorPdf")}</a>${m.readingPdf?`<a href="${m.readingPdf}" target="_blank" rel="noreferrer">${t("authorPdf")}</a>`:""}${m.code?`<a href="${m.code}" target="_blank" rel="noreferrer">${t("code")}</a>`:""}${m.acceptance?`<a href="${m.acceptance}" target="_blank" rel="noreferrer">${t("acceptance")}</a>`:""}</div>${m.fallback?`<p class="workflow-source-note">${t("fallbackNote")}</p>`:""}${m.announcedCode?`<p class="workflow-source-note">${t("announced")} · <a href="${m.announcedCode}" target="_blank" rel="noreferrer">${esc(m.announcedCode)}</a></p>`:""}</section></div>`;
  }
  function compare() {
    document.getElementById("workflow-compare-controls").innerHTML=comparison.map((id,i)=>`<label for="workflow-compare-${i}">${t("compareSlot")} ${i+1}<select id="workflow-compare-${i}" data-compare="${i}">${data.methods.map(m=>`<option value="${m.id}" ${m.id===id?"selected":""}>${esc(m.name)}</option>`).join("")}</select></label>`).join("");
    const fields=["variable","data","optimizer","timing","weights","caveat"];
    document.getElementById("workflow-compare").innerHTML=comparison.map(id=>{const m=byId(id);return `<article style="--route-color:${color(m)}"><h3>${m.name}</h3><small>${venue(m)} · Tier ${m.tier}</small><dl>${fields.map(f=>`<dt>${t(f)}</dt><dd>${esc(c(m)[f])}</dd>`).join("")}</dl></article>`;}).join("");
    document.getElementById("workflow-comparison-table").innerHTML=`<table class="paper-table"><thead><tr><th>${t("method")}</th><th>${t("authors")}</th><th>${t("venue")}</th><th>${t("mechanism")}</th><th>${t("caveat")}</th></tr></thead><tbody>${data.methods.map(m=>`<tr><td>${methodLink(m,'class="workflow-table-name"')}<small>${data.routes[m.route][lang]}</small></td><td>${esc(m.authors.split(",")[0])}${m.authors.includes(",")?" et al.":""}</td><td>${venue(m)}<small>Tier ${m.tier}</small></td><td>${esc(c(m).one)}</td><td>${esc(c(m).caveat)}</td></tr>`).join("")}</tbody></table>`;
  }
  function timeline() {
    const groups={};[...data.methods].sort((a,b)=>a.first.localeCompare(b.first)||a.name.localeCompare(b.name)).forEach(m=>(groups[m.first.slice(0,4)] ||= []).push(m));
    document.getElementById("workflow-timeline").innerHTML=Object.entries(groups).map(([year,list])=>`<div class="mas-year"><div class="mas-year-label">${year}</div><div class="mas-year-papers">${list.map(m=>`<button type="button" class="timeline-paper ${m.id===selected?"active":""}" data-method="${m.id}" style="--paper-color:${color(m)}"><strong>${esc(m.name)}</strong><span>${t("first")} ${m.first.replace("-",".")}</span><small>${venue(m)} · ${date(m)} · ${m.tier}</small></button>`).join("")}</div></div>`).join("");
  }
  function library() {
    const q=document.getElementById("workflow-library-search").value;
    const open=document.getElementById("workflow-open-only").checked,formal=document.getElementById("workflow-formal-only").checked;
    const rows=data.methods.filter(m=>matches(m,q)&&(!open||m.code)&&(!formal||m.tier==="A"));
    document.getElementById("workflow-library").innerHTML=`<table class="paper-table"><thead><tr><th>${t("method")}</th><th>${t("venue")}</th><th>${t("open")}</th><th>${t("framework")}</th><th>${t("paperLocal")}</th><th>${t("source")}</th></tr></thead><tbody>${rows.length?rows.map(m=>`<tr><td>${methodLink(m,'class="workflow-table-name"')}<small>${esc(m.authors.split(",")[0])} et al.</small></td><td>${venue(m)}<small>Tier ${m.tier} · ${date(m)}${m.tier==="B"?" · "+t("planned"):""}</small></td><td>${m.code?`<a href="${m.code}" target="_blank" rel="noreferrer">${t("code")}</a>`:m.announcedCode?t("announced"):t("unconfirmed")}</td><td>${esc(m.framework)}</td><td>${m.fallback||m.tier!=="A"?t("localAuthor"):t("localFormal")}<small>${esc(m.local)}</small></td><td><a href="${m.source}" target="_blank" rel="noreferrer">${t("source")}</a> · <a href="${m.pdf}" target="_blank" rel="noreferrer">PDF</a></td></tr>`).join(""):`<tr><td colspan="6">${t("empty")}</td></tr>`}</tbody></table>`;
  }
  function select(id,scroll) {
    if (!byId(id)) return;
    selected=id;
    const url=new URL(location.href);url.searchParams.set("method",id);
    try { history.replaceState(null,"",url); } catch (_) { /* file:// previews may prohibit query updates. */ }
    list();reader();graph();timeline();
    if(scroll) document.getElementById("workbench").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function render() { copyUI();overview();graph();stories();list();reader();compare();timeline();library(); }
  document.addEventListener("click",event=>{
    const method=event.target.closest("[data-method]");if(method) select(method.dataset.method,method.dataset.noScroll!=="true");
    const node=event.target.closest("[data-map-method]");if(node) select(node.dataset.mapMethod,false);
    const filter=event.target.closest("[data-route]");if(filter) {route=filter.dataset.route;list();}
  });
  document.addEventListener("change",event=>{if(event.target.matches("[data-compare]")){comparison[Number(event.target.dataset.compare)]=event.target.value;compare();}});
  document.getElementById("workflow-search").addEventListener("input",event=>{query=event.target.value.trim();list();});
  document.getElementById("workflow-library-search").addEventListener("input",library);
  ["workflow-open-only","workflow-formal-only"].forEach(id=>document.getElementById(id).addEventListener("change",library));
  document.getElementById("workflow-language-toggle").addEventListener("click",()=>{lang=lang==="zh"?"en":"zh";try{localStorage.setItem(key,lang);}catch(_){}render();});
  render();
})();
