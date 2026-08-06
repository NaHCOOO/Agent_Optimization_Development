/* Deep-reading layer kept separate from bibliographic method metadata. */
window.RESEARCH_DATA = {
  chapters: {
    zh: [
      {
        id: "value",
        index: "01",
        title: "先把 advantage 算准",
        thesis: "PPO 的核心矛盾不是 clipping 本身，而是长序列中 critic、return 与 advantage 是否可信。",
        bridge: "VinePPO 用 continuation rollout 直接估值；VC-PPO 与 VAPO 则修复 critic 的初始化、衰减和长度偏差。",
        methods: ["ppo", "vineppo", "vcppo", "vapo"]
      },
      {
        id: "group",
        index: "02",
        title: "去掉 critic 后，稳定性转移到 group",
        thesis: "GRPO 省掉 value model，却把基线质量、梯度粒度、长度偏差和有效采样都交给同 prompt 的响应组。",
        bridge: "DAPO 修训练配方，GSPO/GMPO 修聚合单位，GFPO 修进入更新的数据分布。",
        methods: ["grpo", "dapo", "gspo", "gmpo", "gfpo"]
      },
      {
        id: "multi",
        index: "03",
        title: "从整条轨迹广播，走向结构化 credit",
        thesis: "多轮环境里，同一个最终奖励不该无差别写回所有 turn、action 和 token。真正的问题是：在哪里分叉、以什么状态比较、由哪一层承担责任。",
        bridge: "Flow-GRPO 是粗粒度起点；GiGPO/HGPO 细化 state/context；Turn-PPO 回到 learned value；T³/AREW 处理 belief 与信息 credit；SUPO、KARL、AgeMem 再把 context、knowledge、memory 纳入端到端优化。",
        methods: ["flowgrpo", "gigpo", "hgpo", "turnppo", "arpo", "aepo", "appo", "t3", "arew", "supo", "karl", "agemem"]
      },
      {
        id: "hierarchy",
        index: "04",
        title: "长程 Agent 还需要层级状态",
        thesis: "credit assignment 解决‘谁负责’，却不自动解决长历史膨胀与高低层决策纠缠。HRL 把 subgoal、progress 与 action 变成不同时间尺度。",
        bridge: "GLIDER 先用离线 HRL 建立 planner/executor 与句子级 critic；HiPER 转向显式层级归因；STEP-HRL 用 local progress 构造 step transitions；HIPIF 再联合训练 planning、reflection 与 information folding。",
        methods: ["glider", "hiper", "stephrl", "hipif"]
      },
      {
        id: "opd",
        index: "05",
        title: "稀疏 reward 之外，引入 dense teacher signal",
        thesis: "On-policy distillation 的关键不是复制 teacher 答案，而是在 student 自己会访问的错误前缀上提供 token-level 修正。与 RL 结合时，必须明确谁决定方向、谁只调节强度。",
        bridge: "OPD/OPSD 建立分布匹配；Skill-SD、SDPO、RLSD、SDAR 与 SERL 控制 dense signal；SPEAR 用成功轨迹自模仿，EAPO 则把外部专家作为训练期 action。",
        methods: ["opd", "opsd", "skillsd", "sdpo", "rlsd", "sdar", "serl", "spear", "eapo"]
      }
    ],
    en: [
      { id: "value", index: "01", title: "Make advantage estimation trustworthy", thesis: "PPO's bottleneck in long sequences is often the critic-return-advantage pipeline rather than clipping itself.", bridge: "VinePPO estimates value with continuations; VC-PPO and VAPO repair critic initialization, decay and length bias.", methods: ["ppo", "vineppo", "vcppo", "vapo"] },
      { id: "group", index: "02", title: "Removing the critic moves risk into the group", thesis: "GRPO saves the value model but makes group composition, granularity, length bias and sample utility determine the gradient.", bridge: "DAPO repairs the recipe, GSPO/GMPO the aggregation unit, and GFPO the update distribution.", methods: ["grpo", "dapo", "gspo", "gmpo", "gfpo"] },
      { id: "multi", index: "03", title: "From trajectory broadcast to structured credit", thesis: "One final reward should not be copied indiscriminately to every turn, action and token in a multi-turn environment.", bridge: "GiGPO/HGPO and Turn-PPO refine credit; T³/AREW repair belief and information signals; SUPO, KARL and AgeMem jointly optimize context, knowledge and memory control.", methods: ["flowgrpo", "gigpo", "hgpo", "turnppo", "arpo", "aepo", "appo", "t3", "arew", "supo", "karl", "agemem"] },
      { id: "hierarchy", index: "04", title: "Long-horizon agents also need hierarchical state", thesis: "Credit answers who was responsible, but not how to control growing histories or separate planning from execution.", bridge: "GLIDER first builds planner/executor hierarchy with offline actor-critic learning; HiPER makes hierarchical credit explicit; STEP-HRL adds local-progress transitions; HIPIF jointly trains planning, reflection and folding.", methods: ["glider", "hiper", "stephrl", "hipif"] },
      { id: "opd", index: "05", title: "Dense teacher signal beyond sparse reward", thesis: "On-policy distillation corrects the prefixes the student actually visits. When combined with RL, direction and magnitude must remain distinct.", bridge: "OPD/OPSD establish distribution matching; later methods add skills and feedback, while SPEAR replays self-generated wins and EAPO learns when to consult external experts.", methods: ["opd", "opsd", "skillsd", "sdpo", "rlsd", "sdar", "serl", "spear", "eapo"] }
    ]
  },

  common: {
    ppo: { formula: "\\mathbb{E}_t[\\min(r_t(\\theta)\\hat A_t,\\operatorname{clip}(r_t(\\theta),1-\\epsilon,1+\\epsilon)\\hat A_t)]", unit: "token / action", baseline: "learned V(s)", critic: "yes", cost: "medium", benchmarks: "MuJoCo, Atari, Roboschool" },
    vineppo: { formula: "\\hat A_{MC}(s_t,a_t)=r_t+\\gamma \\hat V_{MC}(s_{t+1})-\\hat V_{MC}(s_t)", unit: "reasoning step", baseline: "MC continuations", critic: "no learned critic", cost: "high rollout", benchmarks: "MATH, GSM8K" },
    vcppo: { formula: "\\hat A_t^{actor}=\\operatorname{GAE}(\\gamma,\\lambda_a),\\qquad \\hat R_t^{critic}=\\operatorname{GAE}(\\gamma,\\lambda_c)+V(s_t)", unit: "token", baseline: "pretrained V(s)", critic: "yes", cost: "medium", benchmarks: "AIME, Codeforces, GPQA" },
    vapo: { formula: "\\hat A_t^{LA}=\\sum_{l=0}^{T-t-1}(\\gamma\\lambda(T))^l\\delta_{t+l}", unit: "token", baseline: "calibrated V(s)", critic: "yes", cost: "high", benchmarks: "AIME 2024" },
    grpo: { formula: "\\hat A_i=\\frac{R_i-\\mu_{\\mathcal G}}{\\sigma_{\\mathcal G}},\\qquad r_{i,t}=\\frac{\\pi_\\theta(y_{i,t}|y_{i,<t})}{\\pi_{old}(y_{i,t}|y_{i,<t})}", unit: "sequence reward -> tokens", baseline: "group mean", critic: "no", cost: "group rollout", benchmarks: "GSM8K, MATH" },
    dapo: { formula: "\\frac{1}{\\sum_i |o_i|}\\sum_{i,t}\\min(r_{i,t}\\hat A_i,\\operatorname{clip}(r_{i,t},1-\\epsilon_l,1+\\epsilon_h)\\hat A_i)", unit: "token-weighted sequence", baseline: "group mean", critic: "no", cost: "high scale", benchmarks: "AIME 2024" },
    gspo: { formula: "s_i(\\theta)=\\left(\\frac{\\pi_\\theta(y_i|x)}{\\pi_{old}(y_i|x)}\\right)^{1/|y_i|}", unit: "sequence", baseline: "group mean", critic: "no", cost: "group rollout", benchmarks: "math, code" },
    gmpo: { formula: "\\operatorname{GM}(z_{1:T})=\\exp\\left(\\frac{1}{T}\\sum_{t=1}^{T}\\log z_t\\right)", unit: "sequence via token GM", baseline: "group mean", critic: "no", cost: "group rollout", benchmarks: "math reasoning" },
    gfpo: { formula: "\\mathcal G'=\\operatorname{TopK}_{y\\in\\mathcal G}\\;\\operatorname{efficiency}(R(y),|y|)", unit: "selected sequence", baseline: "filtered group", critic: "no", cost: "oversampling", benchmarks: "AIME, AMC, OlympiadBench" },
    flowgrpo: { formula: "\\hat A_i=\\frac{R(\\tau_i)-\\mu_{\\mathcal G}}{\\sigma_{\\mathcal G}},\\quad \\hat A_{i,t}=\\hat A_i", unit: "planner turn", baseline: "trajectory group", critic: "no", cost: "multi-turn rollout", benchmarks: "10 search/agent/math/science tasks" },
    gigpo: { formula: "\\hat A(a_t)=\\hat A_E(\\tau)+\\omega\\hat A_S(a_t|s_t)", unit: "state-action", baseline: "episode + anchor group", critic: "no", cost: "reused branches", benchmarks: "ALFWorld, WebShop, Sokoban" },
    hgpo: { formula: "\\hat A_H(s_t)=\\sum_{k=0}^{K}w_k\\hat A_k(s_t,h_t^{(k)}),\\quad w_k\\propto(k+1)^\\alpha", unit: "context-aware action", baseline: "hierarchical groups", critic: "no", cost: "hierarchical grouping", benchmarks: "agentic environments" },
    turnppo: { formula: "L^{turn}=\\mathbb E_k[\\min(\\rho_k\\hat A_k^{turn},\\operatorname{clip}(\\rho_k,1-\\epsilon,1+\\epsilon)\\hat A_k^{turn})]", unit: "agent turn", baseline: "turn value", critic: "yes", cost: "medium", benchmarks: "WebShop, Sokoban" },
    arpo: { formula: "P_t=\\alpha+\\beta\\,\\Delta H_t", unit: "shared / branch token", baseline: "tree group", critic: "no", cost: "adaptive branches", benchmarks: "13 reasoning/search tasks" },
    aepo: { formula: "P_t=(\\alpha+\\gamma\\Delta H_t)(1-\\hat P(l))", unit: "entropy-aware token", baseline: "tree group", critic: "no", cost: "balanced branches", benchmarks: "14 web-agent tasks" },
    appo: { formula: "B_t=U_t+\\lambda\\,\\Delta\\log p(y_{>t}|y_{\\le t})", unit: "procedure decision", baseline: "branched futures", critic: "no", cost: "targeted branches", benchmarks: "13 agentic benchmarks" },
    glider: { formula: "\\mathcal L_\\pi(\\theta)=-\\mathbb E_{(s,u)\\sim D^r}\\left[\\exp\\!\\left(\\frac{Q_\\phi(s,u)-V_\\psi(s)}{\\lambda}\\right)\\log\\pi_\\theta(u\\mid s)\\right]", unit: "subgoal / primitive action", baseline: "offline expectile V(s)", critic: "sentence-level Q/V", cost: "offline data + critic", benchmarks: "ScienceWorld, ALFWorld" },
    hiper: { formula: "J=J_{high}(g_k|s_k)+\\lambda J_{low}(a_t|s_t,g_k)", unit: "subgoal + action", baseline: "hierarchical returns", critic: "hierarchical", cost: "high", benchmarks: "ALFWorld, ScienceWorld" },
    stephrl: { formula: "A(s,u)=Q_\\phi(s,u)-V_\\psi(s)", unit: "subtask / action", baseline: "IQL value", critic: "offline Q/V", cost: "offline data", benchmarks: "ScienceWorld, ALFWorld" },
    hipif: { formula: "S_t=R_{env}+r_t^{proc},\\qquad \\hat A_i=\\frac{S_i-\\mu_{\\mathcal G}}{\\sigma_{\\mathcal G}}", unit: "subgoal-centric decision", baseline: "group mean", critic: "no", cost: "multi-turn group", benchmarks: "ALFWorld, VirtualHome, ScienceWorld" },
    opd: { formula: "\\mathbb E_{y\\sim\\pi_S(\\cdot|x)}[D_f(\\pi_T(\\cdot|x,y_{<t})\\|\\pi_S(\\cdot|x,y_{<t}))]", unit: "token", baseline: "teacher distribution", critic: "teacher", cost: "teacher forward", benchmarks: "summarization, translation, arithmetic" },
    opsd: { formula: "\\sum_t D(\\pi_\\theta(\\cdot|x,z,y_{<t})\\|\\pi_\\theta(\\cdot|x,y_{<t}))", unit: "token", baseline: "privileged self-teacher", critic: "self-teacher", cost: "dual context", benchmarks: "reasoning tasks" },
    skillsd: { formula: "L=L_{GRPO}+\\lambda L_{SDL}", unit: "trajectory + token", baseline: "group + skill teacher", critic: "self-teacher", cost: "teacher + skill bank", benchmarks: "AppWorld, Sokoban" },
    sdpo: { formula: "L_{SDPO}=\\sum_t D(\\pi_\\theta(\\cdot|x,y_{<t},f)\\|\\pi_\\theta(\\cdot|x,y_{<t}))", unit: "token", baseline: "feedback self-teacher", critic: "self-teacher", cost: "feedback forward", benchmarks: "math, code, agents" },
    rlsd: { formula: "g_t=\\operatorname{sgn}(\\hat A^{RL})\\cdot m_t^{SD}", unit: "reward direction / token magnitude", baseline: "reward + self-teacher", critic: "optional", cost: "teacher forward", benchmarks: "RLVR reasoning" },
    sdar: { formula: "L=L_{\\mathrm{GRPO}}+\\lambda_{\\mathrm{SDAR}}\\sum_t\\ell_t^{\\mathrm{SDAR}},\\qquad \\ell_t^{\\mathrm{SDAR}}=g_t\\!\\left(\\log\\pi_\\theta^+(y_t\\mid s_t^+)-\\log\\pi_\\theta(y_t\\mid s_t)\\right)", unit: "trajectory + gated token", baseline: "group + teacher gap", critic: "self-teacher", cost: "teacher + gate", benchmarks: "ALFWorld, Search-QA, WebShop" },
    serl: { formula: "L=\\sum_{t\\in\\mathcal A}w_t(f_{>t})\\,\\hat A^{task}\\log\\pi_\\theta(a_t|s_t)", unit: "selected action / anchor", baseline: "task reward", critic: "feedback selector", cost: "hindsight feedback", benchmarks: "ALFWorld, WebShop" },
    t3: { formula: "t^*=\\inf\\left\\{t:\\forall\\tau\\in[t-k,t),\\ d(H_\\tau,H_{\\tau+1})\\le\\Delta_{min}\\right\\},\\qquad \\tau\\leftarrow\\tau_{\\le t^*}", unit: "informative trajectory prefix", baseline: "base PPO / GRPO / GSPO", critic: "optimizer dependent", cost: "progress detector; fewer rollout tokens", benchmarks: "5 active-reasoning tasks" },
    arew: { formula: "\\widehat A_t=A_t+\\lambda u_t,\\qquad u_t=\\begin{cases}|P_\\tau|^{-1}&z_t=+1\\\\-|N_\\tau|^{-1}&z_t=-1\\\\0&z_t=0\\end{cases}", unit: "AS / BT decision segment", baseline: "outcome advantage + centered critique", critic: "PPO critic retained", cost: "directional critique labels", benchmarks: "7 active-reasoning tasks across 3 domains" },
    supo: { formula: "\\hat A_j=\\frac{R_j-\\mu_{\\mathcal G}}{\\sigma_{\\mathcal G}},\\qquad J_{SUPO}\\propto\\sum_{i=1}^{I_j+1}\\sum_{t\\in\\tau_{j,i}}\\min(\\rho_{t}\\hat A_j,\\operatorname{clip}(\\rho_t)\\hat A_j)\\mathbf1[T_j\\le H,I_j\\le S]", unit: "tool / summary token", baseline: "rollout group", critic: "no", cost: "summary generation", benchmarks: "CodeGym, BrowseComp-Plus" },
    karl: { formula: "R(\\tau)=\\lambda_{explore}(\\tau)\\min(R_{task}(\\tau)+R_{format}(\\tau),r_{limit})", unit: "trajectory reward -> tokens", baseline: "GRPO group", critic: "no", cost: "knowledge service + async rollouts", benchmarks: "6 KG / database tasks" },
    agemem: { formula: "R(\\tau)=\\mathbf w^\\top[R_{task},R_{context},R_{memory}]+P_{penalty},\\qquad A_t=A_T", unit: "memory / reasoning step", baseline: "trajectory group", critic: "no", cost: "3-stage rollout + LLM judge", benchmarks: "5 long-context benchmarks" },
    spear: { formula: "J_{total}=J_{GRPO}+\\gamma(t)\\widetilde J_{SIL},\\qquad \\widetilde A_i=R_i-P_{50}(D_R)", unit: "replayed trajectory / token", baseline: "group + replay median", critic: "no", cost: "FIFO replay + extra updates", benchmarks: "ALFWorld, WebShop, Sokoban, AIME" },
    eapo: { formula: "J_{EAPO}=\\mathbb E_{H_T\\sim\\pi_\\theta(\\cdot|x)}[R(E(H_T),g)],\\qquad \\rho_s=s^{-1}", unit: "reasoning / consultation action", baseline: "outcome reward", critic: "not specified", cost: "training-time expert pool", benchmarks: "AIME, AIMO plus 8 transfer benchmarks" }
  },

  notes: {
    zh: {
      ppo: { claim: "PPO 提供稳定更新的通用骨架，但在 LLM 长程任务中，性能上限往往由 value/advantage 质量决定。", evidence: "原论文在连续控制与 Atari 上验证了 clipped surrogate 的样本效率和实现简洁性；它并未针对 sparse-reward LLM credit assignment。", caveat: "把 PPO 当作完整答案会掩盖 critic 偏差：clip 只能限制步长，不能修正错误 advantage。", read: "后续 value 路线的共同点不是重写 PPO loss，而是重写进入 loss 的训练信号。" },
      vineppo: { claim: "语言生成允许从任意 prefix 继续采样，因此可以用 Monte Carlo continuations 换掉不可靠的 learned value。", evidence: "ICML 2025 正式版在 MATH/GSM8K 上报告优于 PPO，并显示 value network 对候选推理步骤的排序接近随机。", caveat: "估值更准的代价是额外 continuation rollout；环境必须能从中间语言状态稳定重启。", read: "这篇论文最重要的结论不是‘MC 永远优于 critic’，而是 credit estimator 值得独立于 policy loss 被审计。" },
      vcppo: { claim: "Long-CoT PPO collapse 主要来自 value initialization bias 与 reward signal decay，而非 PPO 机制本身。", evidence: "AIME、Codeforces、GPQA 上的消融分别支持 value pretraining 与 decoupled GAE。", caveat: "证据集中在可验证推理；对多轮、部分可观测环境的外推仍需验证。", read: "它把讨论从‘PPO vs GRPO’拉回更精确的问题：actor 和 critic 对 bias-variance 的偏好不同。" },
      vapo: { claim: "只要同时处理 critic 偏差、长度异质性和稀疏奖励，value-based PPO 仍可超过 critic-free recipe。", evidence: "Qwen2.5-32B 在 AIME 2024 上报告 60.4，并通过七项组件组成稳定训练配方。", caveat: "多组件系统难以判断单一创新的可迁移性，复现成本也高于一个局部目标改造。", read: "VAPO 更适合作为工程配方阅读，而不是寻找一条决定性的全新公式。" },
      grpo: { claim: "同 prompt 多响应的相对奖励可以替代 learned critic，显著降低 RLVR 训练资源。", evidence: "DeepSeekMath 展示了数学推理能力提升，并成为后续 critic-free LLM RL 的基线。", caveat: "序列奖励广播给所有 token，组内方差为零时没有有效梯度；结果强依赖 group composition。", read: "GRPO 不是消除了 baseline，而是把参数化 baseline 换成了采样 baseline。" },
      dapo: { claim: "大规模 GRPO 的核心失败来自探索塌缩、无效组、token weighting 与截断噪声，需要系统级修复。", evidence: "NeurIPS 2025 版本在 Qwen2.5-32B/AIME 2024 上达到 50 分，并开源 verl 训练系统、数据与 verifier。", caveat: "Dynamic Sampling 会改变训练 prompt 分布；四项技术之间存在耦合，不能只复制 Clip-Higher。", read: "DAPO 的价值在可复现 recipe：它回答‘如何把 GRPO 跑稳’，而不是‘如何做细粒度 credit’。" },
      gspo: { claim: "奖励和优化都发生在 response 级时，importance ratio 也应在 sequence 级定义。", evidence: "论文报告 sequence clipping 对训练稳定性及 MoE 路由变化更稳健。", caveat: "sequence ratio 改善粒度一致性，却仍把一个 advantage 分配给整条响应。", read: "GSPO 修正的是 off-policy correction 的统计单位，不等同于解决 reasoning-step credit。" },
      gmpo: { claim: "token 项的算术平均容易被少数极端 ratio 主导，几何平均可抑制 outlier。", evidence: "实验与权重分析显示更平衡的 token contribution 和稳定训练。", caveat: "几何平均要求正值处理并改变梯度几何；收益依赖具体 clipping 与数值实现。", read: "它是一种 objective aggregation surgery，适合与 GRPO recipe 组合，而非独立训练范式。" },
      gfpo: { claim: "长答案并不必然包含更好的推理；先多采样再筛选，可以让 RL 偏向简洁且高效的轨迹。", evidence: "论文在多项数学推理基准上提升准确率并缩短输出。", caveat: "过滤会降低样本多样性，也可能错误压制需要长推理的困难题。", read: "GFPO 把 reward shaping 移到数据选择层，代价是引入 selection bias。" },
      flowgrpo: { claim: "模块化 AgentFlow 可只在线优化 planner，并把多轮交互拆成可训练的单轮 planner decisions。", evidence: "ICLR 2026 版本在搜索、Agent、数学和科学十项基准上报告平均提升。", caveat: "最终 reward 仍广播到每个 planner turn，因此优化稳定但 credit 粗。", read: "它是多轮优化的结构化起点，也清晰暴露了 GiGPO/Turn-PPO 要解决的问题。" },
      gigpo: { claim: "把 episode group 与同一 anchor state 的 step group 叠加，可在无 critic 条件下得到局部 action credit。", evidence: "NeurIPS 2025 论文在交互式 Agent benchmark 上优于 trajectory-level GRPO，并分析 episode/step advantage 的互补性。", caveat: "‘相同 state’不保证相同历史语义；anchor 覆盖率受 rollout 重合度限制。", read: "GiGPO 的关键创新是比较集合，而不是新的 reward：局部反事实来自同状态分支。" },
      hgpo: { claim: "step grouping 必须显式考虑历史上下文，否则同一表面状态下的 action comparison 会产生偏差。", evidence: "ICLR 2026 版本通过 hierarchy-of-groups 与上下文权重提升多轮任务表现。", caveat: "更细历史条件减少偏差，却缩小 group、增大方差；层级权重仍是设计选择。", read: "HGPO 把 GiGPO 的 state equality 扩展为 context similarity，核心是 bias-variance 权衡。" },
      turnppo: { claim: "多轮 Agent 的自然 action 单位是一个 turn；用 learned turn value 比 trajectory-normalized GRPO 更稳。", evidence: "WebShop 与 Sokoban 上，token-PPO 和 Turn-PPO 都缓解 GRPO collapse，Turn-PPO 多数设置更优。", caveat: "turn-level clipping 会让整轮受一个 ratio 约束，且仍需要训练 critic。", read: "它不是简单把公式下标换成 turn，而是重定义 MDP action 与 value 的时间尺度。" },
      arpo: { claim: "工具反馈后 entropy 上升的位置值得额外分支探索，并需要区分共享前缀与独立分支的 credit。", evidence: "13 项计算、知识与深度搜索 benchmark 上报告优于 trajectory RL，并降低工具调用预算。", caveat: "entropy 是不确定性代理，不等于因果重要性；高熵分支可能浪费预算。", read: "ARPO 同时改 sampling tree 与 advantage attribution，二者必须一起理解。" },
      aepo: { claim: "entropy-guided branching 自身会引发连续过分支和高熵 token 梯度受损，探索必须被平衡。", evidence: "WWW 2026 正式版在 14 个 web-agent 数据集上展示稳定 entropy 与性能提升。", caveat: "预监测和 branch penalty 增加调参维度；结论主要来自 web search agent。", read: "AEPO 是对 ARPO 的失败模式修正：既使用 entropy，又限制 entropy 对 rollout 和 update 的副作用。" },
      appo: { claim: "关键决策点分布在整个生成序列，既不局限于 tool boundary，也不能只由 token entropy 判断。", evidence: "13 个 benchmark 上平均提升约 4 点，并保持工具调用效率与过程可解释性。", caveat: "future-aware Branching Score 需要额外 continuation 才能估计决策影响。", read: "APPO 将 branch location 与 downstream effect 连接起来，是 procedure-level credit 而非 turn-level heuristic。" },
      glider: { claim: "长程 LLM Agent 应把任务规划与原子执行拆成两个时间尺度，并用不同奖励构造离线训练数据。", evidence: "ICML 2025 正式版在 ScienceWorld 与 ALFWorld、三个 LLM backbone 上验证层次结构、SFT+ORL 和 offline-to-online adaptation。", caveat: "依赖离线数据覆盖、固定或可判定的 subtask completion 信号以及时间抽象跨度 c；句子级 advantage 会整体广播到目标或动作的全部 token。", read: "GLIDER 是这条 HRL 路线的离线起点：它先建立共享 backbone 的 planner/executor 和 Q/V critic，后续方法再追问 credit、状态压缩与端到端在线训练。" },
      hiper: { claim: "长程失败应拆成高层 subgoal/plan 错误与低层 execution 错误，并分别分配 credit。", evidence: "ICML 2026 正式版在长程 Agent 环境中验证显式层级归因。", caveat: "层级边界与 subgoal 质量会成为新的误差来源，训练系统也更复杂。", read: "HiPER 的贡献是责任结构：它不只让 credit 更细，还让不同时间尺度拥有不同学习目标。" },
      stephrl: { claim: "用 local progress 压缩 subtask 内历史，可构造同时服务高层与低层策略的 augmented step transitions。", evidence: "ACL 2026 正式版在 ScienceWorld 与 ALFWorld 上评估，采用 BC 后的 offline IQL/ILQL-style 学习。", caveat: "依赖离线数据和 progress summary 质量；不是 on-policy GRPO，也不基于 verl。", read: "它把 context compression 变成可学习状态，而不是简单截断历史。" },
      hipif: { claim: "显式 subgoal 与 information folding 应端到端联合训练，否则长历史仍会干扰 planning 和 state tracking。", evidence: "ALFWorld、VirtualHome、ScienceWorld 上比较 HiPER、STEP-HRL、GiGPO 等；RL 实验基于 verl-agent。", caveat: "process rewards 含规则设计，尚无官方代码；当前为 arXiv 版本。", read: "HIPIF 把 HRL、context compression 和 GRPO 放进同一闭环，是当前故事线的综合节点。" },
      opd: { claim: "KD 应在 student 自己生成的前缀上进行，让 teacher 纠正 student 真正会犯的错误。", evidence: "ICLR 2024 论文在摘要、翻译和算术等任务上验证 GKD，并分析不同 divergence。", caveat: "仍需强 teacher 在线前向；student sampling 增加成本，且 teacher 对错误前缀未必校准。", read: "OPD 的核心是训练分布从 teacher data 转向 student occupancy，不是普通 teacher-generated SFT。" },
      opsd: { claim: "同一模型在 privileged context 下可充当 teacher，把隐藏信息转成 dense token supervision。", evidence: "论文展示 self-distillation 在 reasoning 设置中的收益，无需外部更大 teacher。", caveat: "privileged information 可能泄漏答案结构；teacher 与 student 同步漂移会导致目标不稳定。", read: "OPSD 降低 teacher 成本，却把问题转成‘特权视角是否可信、何时同步’。" },
      skillsd: { claim: "从完成轨迹归纳出的 skill 应只提供给 teacher，再把其 token-level 判断蒸馏回不看 skill 的 student。", evidence: "AppWorld 与 Sokoban 上优于 GRPO、skill-augmented GRPO 和纯 OPD；动态 teacher 同步优于 frozen/off-policy 变体。", caveat: "skill retrieval 使用 UCB，bank 扩大后的语义检索与 sampled-token distillation 仍有限。", read: "论文最有价值的设计原则是：skills guide the teacher, not the student。" },
      sdpo: { claim: "错误信息、verifier 文本和工具反馈包含比二元 reward 更密集的信息，可让当前模型在反馈条件下自教。", evidence: "多类可验证任务上展示 rich-feedback self-distillation 的收益，并提供 verl 代码。", caveat: "反馈可能噪声化或泄漏答案，额外 teacher forward 增加训练成本。", read: "SDPO 把 environment feedback 从 reward scalar 重新解释为 teacher context。" },
      rlsd: { claim: "环境 reward 应决定更新方向，自蒸馏只决定哪些 token 更新更强。", evidence: "论文通过稳定性实验与消融说明 teacher-only direction 容易受 privileged leakage 影响。", caveat: "magnitude reweighting 仍依赖 teacher-student gap 的校准，可能放大错误置信度。", read: "RLSD 的核心是信号职责分离：reward 负责 sign，distillation 负责 scale。" },
      sdar: { claim: "多轮 OPSD 应作为 gated auxiliary loss，而不应直接重写 GRPO advantage。", evidence: "ALFWorld、Search-QA、WebShop 上验证 entropy/gap gate 与动态 teacher 的组合。", caveat: "门控阈值和 teacher 同步引入额外敏感性，收益依赖 privileged skill 质量。", read: "SDAR 提供了更保守的 OPD+RL 接口：主 RL 语义保持不变，teacher 只在可信位置发言。" },
      serl: { claim: "事后反馈不是越多越好，关键是选择蒸馏什么，以及把信号放在哪个可执行 action/anchor。", evidence: "多轮 Agent benchmark 上比较反馈来源、placement 与 selective reweighting。", caveat: "feedback selector 自身可能产生偏差；未来观测与当前动作的因果相关性并不自动成立。", read: "SERL 把 dense supervision 问题从‘有没有反馈’推进到‘反馈与动作是否对齐’。" },
      t3: { claim: "active reasoning 的 belief 一旦进入持续停滞区，后续无效动作会污染甚至反转早期探索动作的 advantage。", evidence: "ICLR 2026 Oral 在五项交互推理任务上把 T³ 接入 PPO、GRPO 与 GSPO，最高提升 30 points，并减少最高 34% token cost。", caveat: "精确 belief 不可观测，因此每个环境都要设计 progress proxy；依赖 ground truth 的 proxy 在真实部署时未必可得。", read: "T³ 不直接做更细 credit，而是先删除会让 credit 失真的 rollout 尾部；它是 data-side wrapper，不是新 policy loss。" },
      arew: { claim: "Action Selection 与 Belief Tracking 会互相遮蔽学习信号，使 outcome RL 锁死在低信息行为；方向性 critique 足以打破这种耦合。", evidence: "ICML 2026 在七项 active-reasoning task 上报告最高 60-point gain，并验证 critique weighted accuracy 只需优于随机。", caveat: "AS/BT 交替结构与 truth-aligned belief readout 需要任务配合；critique 不是 free signal，其规则质量仍决定偏差。", read: "AREW 是 T³ 的推进：从截断坏尾部转向在同一轨迹内零和地转移 advantage，明确奖励‘问得好’与‘用得好’。" },
      supo: { claim: "summary 既然决定后续可见状态，就应作为 policy action 与 tool use 一起由最终任务奖励训练。", evidence: "ACL 2026 在 CodeGym 与 BrowseComp-Plus 上分别比 GRPO 提升 3.2 和 14 points，并把 64K working context 扩展到 192K effective context。", caveat: "所有 segment 仍共享一个 rollout advantage，summary 的局部因果 credit 没被辨别；论文未确认官方代码。", read: "SUPO 的关键不是‘加一个摘要器’，而是把 context transition 写入 MDP，并证明现有 GRPO 基础设施可对 summary token 反向传播。" },
      karl: { claim: "知识密集 Agent 不仅要学会用工具，还要学会何时、向哪里主动探索外部结构化知识。", evidence: "ACL 2026 在 KG 与 database 六项任务上进行动态知识、curiosity reward 和静态知识消融；官方仓库开放基于 veRL 的异步训练与环境。", caveat: "curiosity 以 trajectory multiplier 进入，仍不能区分哪个查询真正导致成功；知识源构建和 novelty 定义依赖领域。", read: "KARL 是 reward 与系统侧扩展，不是新的 GRPO estimator：它把 exploration objective 和异步环境工程补到多轮训练闭环。" },
      agemem: { claim: "LTM 与 STM 不应是外置 heuristic，而应成为同一 policy 可学习的工具动作，并由延迟任务结果联合优化。", evidence: "ACL 2026 Highlight 在五项长上下文任务上评估；官方实现使用 Trinity-RFT 与 AgentScope，提供三阶段训练配置。", caveat: "论文称 step-wise GRPO，但公式把同一个 terminal group advantage 广播给全部 step；细粒度因果归因并未真正解决，且多项 reward 依赖 LLM judge。", read: "AgeMem 的贡献在 action space 与 curriculum，而不是新 advantage estimator；阅读时要把‘记录到 step’与‘得到 step-specific credit’区分开。" },
      spear: { claim: "长程 Agent 的探索不应只靠 entropy；先用逐步衰减的工具奖励学会交互，再逐步增强对自身成功轨迹的模仿，可避免早期过拟合。", evidence: "ICLR 2026 在 ALFWorld、WebShop、Sokoban 与 AIME 上兼容 GRPO/GiGPO/Dr.BoT；官方开放 veRL 与 veRL-Agent 实现及 checkpoint。", caveat: "replay 是 off-policy self-imitation，并非严格 on-policy distillation；FIFO buffer 与 median baseline 会引入陈旧样本和选择偏差。", read: "SPEAR 把 self-generated experience 变成 curriculum：早期扩展 skill-level coverage，后期沿成功路径做 action-level exploitation。" },
      eapo: { claim: "把咨询强模型设为训练期可学习 action，再逐步撤掉访问权，可以用 outcome RL 隐式内化专家策略。", evidence: "ICML 2026 在 AIME/AIMO 上平均比 self-exploratory RL 高约 5 points，并在代码、科学问答和知识问答上测试迁移。", caveat: "没有显式 KD divergence，也未确认完整训练代码；专家调用成本高，且错误专家会把探索偏向错误的高奖励区域。", read: "EAPO 位于 distillation 与 agent RL 交界：teacher 不直接提供 loss，而是改变 on-policy context；最终 reward 同时训练‘何时问’和‘问完怎么用’。" }
    },
    en: {}
  }
};
