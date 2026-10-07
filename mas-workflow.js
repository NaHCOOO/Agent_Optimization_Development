/* The focused catalog is shared with the MAS overview to keep venue/source audits aligned. */
(() => {
  const data = window.masResearch;
  const catalog = window.workflowResearch;
  if (!data || !catalog) return;
  catalog.methods.filter(m => m.tier !== "C").forEach(m => {
    const previous = data.methods.find(p => p.id === m.id);
    const category = ["dylan","maas","agentverse","llm-blender"].includes(m.id) ? "team" : "workflow";
    const copy = language => ({
      one:m[language].one, question:m[language].variable,
      mechanism:m[language].mechanism, evidence:m[language].evidence, caveat:m[language].caveat
    });
    const item = {
      ...previous, id:m.id, name:m.name, year:m.year, month:m.month, venue:m.venue,
      tier:m.tier, category, questions:m.questions, authors:m.authors,
      source:m.source, pdf:m.pdf, code:m.code, open:Boolean(m.code),
      local:`../LLM_multi_agent_system/${m.local}`, formula:m.formula,
      timing:m.en.timing, learned:m.en.weights, framework:m.framework,
      timingZh:m.zh.timing, learnedZh:m.zh.weights, workflow:true,
      zh:copy("zh"), en:copy("en")
    };
    if (previous) Object.assign(previous,item); else data.methods.push(item);
  });
  data.questions[1].zh[1] = "决定角色、模型、成员和资源预算；其中与结构选择相耦合的部分在 Workflow 专题继续展开。";
  data.questions[1].en[1] = "Choose roles, models, members, and budgets; selection coupled to structure is expanded in the Workflow module.";
  data.questions[2].href = "./workflow.html#overview";
  data.questions[2].zh[1] = "从人工协议到条件图生成与执行反馈优化；进入 Agent System Workflow 专题。";
  data.questions[2].en[1] = "From protocols to conditional generation and feedback optimization; open Agent System Workflow.";
  const updates = {
    zh:[
      [0,"ReAct 关注单个 Agent 的推理、行动与观察循环。单 Agent 设计的核心是状态、记忆、工具和行动策略；MetaGPT、ChatDev 的角色交接和 ADAS 的程序设计搜索则在系统与 Workflow 主线展开。",["react"]],
      [1,"团队选择与流程结构相互约束。AgentVerse 依任务招募专家，DyLAN 筛选贡献高的成员，MaAS 依问题选择系统，Fleet of Agents 在推理时筛选与重采样分支；LLM-Blender 是候选排序与融合的集成对照。",["agentverse","dylan","maas","foa","llm-blender"]],
      [2,"Agent System Workflow 深入 Q3 与部分 Q2：人工协议包括 MetaGPT、ChatDev、AutoGen 和 Debate；GPTSwarm、ADAS、AFlow、MaAS 用执行反馈优化结构；GTD、CARD、RADAR、MAGE 学习条件设计器。CE-Graph、AutoRAS、FlowMAS 进一步细化失败、鲁棒性和信息反馈。",["metagpt","chatdev","autogen","gptswarm","aflow","gtd","flowmas"]],
      [5,"动态必须标明时间尺度：AgentVerse 与 DyLAN 调整成员，MaAS 按问题采样系统，Flow 按执行状态更新依赖，CARD 随模型与工具条件调整图，Evolving Orchestration 逐步选 Agent。离线结构搜索与运行时恢复不是同一机制。",["agentverse","dylan","maas","flow","card","evolving"]]
    ],
    en:[
      [0,"ReAct studies one Agent's reasoning-action-observation loop. Single-Agent design concerns state, memory, tools, and action policies; MetaGPT/ChatDev handoffs and ADAS program search are studied in the system and Workflow routes.",["react"]],
      [1,"Team selection and workflow structure constrain each other. AgentVerse recruits experts, DyLAN filters contributors, MaAS selects query-conditioned systems, and Fleet of Agents resamples branches. LLM-Blender is an ensemble ranking/fusion comparator.",["agentverse","dylan","maas","foa","llm-blender"]],
      [2,"Agent System Workflow deepens Q3 and parts of Q2: MetaGPT, ChatDev, AutoGen, and Debate define protocols; GPTSwarm, ADAS, AFlow, and MaAS optimize from execution feedback; GTD, CARD, RADAR, and MAGE learn conditional designers. CE-Graph, AutoRAS, and FlowMAS enrich failure, robustness, and information feedback.",["metagpt","chatdev","autogen","gptswarm","aflow","gtd","flowmas"]],
      [5,"Dynamic must name its scale: AgentVerse/DyLAN adapt members, MaAS samples per query, Flow updates execution-state dependencies, CARD adapts to model/tool conditions, and Evolving Orchestration selects Agents stepwise. Offline search is not runtime recovery.",["agentverse","dylan","maas","flow","card","evolving"]]
    ]
  };
  Object.entries(updates).forEach(([language,rows])=>rows.forEach(([index,claim,methods])=>Object.assign(data.stories[language][index],{claim,methods})));
  ["zh","en"].forEach(language=>{
    [1,2].forEach(index=>Object.assign(data.stories[language][index],{bridge:"./workflow.html#story",bridgeLabel:language==="zh"?"进入 Workflow 专题":"Open the Workflow study"}));
  });
  catalog.edges.forEach(([a,b])=>{
    if(data.methods.some(m=>m.id===a)&&data.methods.some(m=>m.id===b)&&!data.relationshipEdges.some(([x,y])=>x===a&&y===b)) data.relationshipEdges.push([a,b]);
  });
  data.frontier = [{name:"Codebook Agent",venue:"arXiv 2026.09",status:"preprint",source:"./workflow.html?method=codebook#workbench",zh:"拓扑码本与摊销预测；正式发表尚未核验，详细分析见 Workflow 专题。",en:"Topology codebooks and amortized prediction; formal publication unverified. See the focused Workflow analysis."}];
})();
