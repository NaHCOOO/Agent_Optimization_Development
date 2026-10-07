# Agent System Workflow 研究与来源核验

核验日期：2026-10-07。收录用户提出的 20 个方法，另外保留 AgentPrune 和 Flow 两个结构压缩、运行时编排对照。共 22 项：20 项正式主会来源、1 项已接收作者版、1 项预印本。代码公开状态与会议发表状态独立记录。19 个仓库已通过 GitHub 官方公开仓库 API 核验。

## 与 MAS 总页的关系

Workflow 深入 Q3（连接与协作流程）和部分 Q2（成员、角色、operator 选择），并与 Q5 的信息价值及 Q6 的执行中调整交叉。MAS 总页继续保持八个核心问题；Q1 不再把 MetaGPT、ChatDev 的团队交接当成单 Agent 设计的核心例子。页面通过同一份 `workflow-data.js` 共享作者、正式版本和机制摘要，避免两处来源结论不一致。

## 分类修正

- 人工协议与运行时：MetaGPT、ChatDev、AutoGen、LLM Debate、DyLAN、AgentVerse；LLM-Blender 作为固定集成流水线对照。DyLAN、AgentVerse 有运行时调整，并非完全静态。
- 数据驱动的条件结构生成：GTD、CARD、RADAR、MAGE、Codebook Agent。CARD 还使用环境条件与执行反馈训练，不等于纯监督预测。
- 执行反馈驱动的结构优化：GPTSwarm、ADAS、G-Designer、AFlow、MaAS、CE-Graph、AutoRAS、FlowMAS，补充 AgentPrune 和 Flow。GPTSwarm 同时优化节点与边，不应只归为预构造数据学习；G-Designer 跨条件生成和反馈学习。
- ADAS 的程序空间不严格限于固定 operator；MaAS、FlowMAS 学分布，不只是找到一个最优流程。拓扑生成、单流程优化和执行中的调整需要分开比较。

## 正式版本与身份校正

G-Designer 采用 [ICML 2025 主会版](https://proceedings.mlr.press/v267/zhang25cu.html)，替换旧 workshop 标注。RADAR、MAGE、CE-Graph、AutoRAS 使用 ICML 2026 proceedings；GTD 使用 ACL 2026；AutoGen 使用 COLM 2024 身份，不沿用早期 ICLR workshop。

FlowMAS 是独立于 ICLR 2025 Flow 的工作。其 NeurIPS 2026 接收由[实验室公告](https://asc.xmu.edu.cn/newsInfo?id=87)确认。作者仓库曾发布接收说明，但本次页面与公开 API 访问均返回 404，不计入已确认公开代码。当前使用作者版 PDF，2026.12 是计划会议月，不代表截至核验日已经有正式 proceedings。Codebook Agent 尚未核验正式发表，保持预印本标记。MAGE 特指 score-based communication-graph diffusion 论文，不与同名知识图谱或 meta-RL 方法混淆。

## 作者、论文、代码与框架

| 方法 | 作者（首位） | 主路线 | 来源与证据等级 | 公开代码 | 实现底座 |
|---|---|---|---|---|---|
| MetaGPT | Sirui Hong et al. | 人工协议与运行时 | [ICLR 2024](https://proceedings.iclr.cc/paper_files/paper/2024/hash/6507b115562bb0a305f1958ccc87355a-Abstract-Conference.html) · A | [代码](https://github.com/FoundationAgents/MetaGPT) | MetaGPT / Python / LLM API |
| ChatDev | Chen Qian et al. | 人工协议与运行时 | [ACL 2024](https://aclanthology.org/2024.acl-long.810/) · A | [代码](https://github.com/OpenBMB/ChatDev) | ChatDev / Python / LLM API |
| AutoGen | Qingyun Wu et al. | 人工协议与运行时 | [COLM 2024](https://openreview.net/forum?id=BAakY1hNKS) · A | [代码](https://github.com/microsoft/autogen) | AutoGen / Python / LLM API |
| LLM Debate | Yilun Du et al. | 人工协议与运行时 | [ICML 2024](https://proceedings.mlr.press/v235/du24e.html) · A | [代码](https://github.com/composable-models/llm_multiagent_debate) | Python / LLM API |
| LLM-Blender | Dongfu Jiang et al. | 人工协议与运行时 | [ACL 2023](https://aclanthology.org/2023.acl-long.792/) · A | [代码](https://github.com/yuchenlin/LLM-Blender) | Hugging Face Transformers / PyTorch |
| DyLAN | Zijun Liu et al. | 人工协议与运行时 | [COLM 2024](https://openreview.net/forum?id=XII0Wp1XA9) · A | [代码](https://github.com/SALT-NLP/DyLAN) | Python / LLM API |
| AgentVerse | Weize Chen et al. | 人工协议与运行时 | [ICLR 2024](https://openreview.net/forum?id=EHg5GDnyq1) · A | [代码](https://github.com/OpenBMB/AgentVerse) | AgentVerse / Python / LLM API |
| GTD | Eric Hanchen Jiang et al. | 数据驱动的条件结构生成 | [ACL 2026](https://aclanthology.org/2026.acl-long.1764/) · A | [代码](https://github.com/sophiayin19/GTD_MAS) | PyTorch / graph diffusion / LLM API |
| CARD | Tongtong Wu et al. | 数据驱动的条件结构生成 | [ICLR 2026](https://openreview.net/forum?id=JgvJdICc6P) · A | [代码](https://github.com/Warma10032/CARD) | PyTorch / PyTorch Geometric / Transformers / LLM API |
| RADAR | Zhen Zhang et al. | 数据驱动的条件结构生成 | [ICML 2026](https://proceedings.mlr.press/v306/zhang26ji.html) · A | [代码](https://github.com/cszhangzhen/RADAR) | PyTorch / discrete graph diffusion / LLM API |
| MAGE | Guanhao Zhao et al. | 数据驱动的条件结构生成 | [ICML 2026](https://proceedings.mlr.press/v306/zhao26af.html) · A | 仅宣布地址，公开访问未确认 | PyTorch / Graph Transformer / score-based diffusion |
| Codebook Agent | Jinxi Yu et al. | 数据驱动的条件结构生成 | [arXiv 2026](https://arxiv.org/abs/2609.02264) · C | [代码](https://github.com/jinxiy1104/CodebookAgent) | PyTorch / VQ autoencoder / MLP / LLM API |
| GPTSwarm | Mingchen Zhuge et al. | 执行反馈驱动的结构优化 | [ICML 2024](https://proceedings.mlr.press/v235/zhuge24a.html) · A | [代码](https://github.com/metauto-ai/GPTSwarm) | GPTSwarm / Python / PyTorch / LLM API |
| ADAS | Shengran Hu et al. | 执行反馈驱动的结构优化 | [ICLR 2025](https://proceedings.iclr.cc/paper_files/paper/2025/hash/36b7acf6f6010652b3f2a433774a66fe-Abstract-Conference.html) · A | [代码](https://github.com/ShengranHu/ADAS) | Python / LLM API |
| G-Designer | Guibin Zhang et al. | 执行反馈驱动的结构优化 | [ICML 2025](https://proceedings.mlr.press/v267/zhang25cu.html) · A | [代码](https://github.com/yanweiyue/GDesigner) | GPTSwarm / Python / PyTorch / graph VAE / LLM API |
| AFlow | Jiayi Zhang et al. | 执行反馈驱动的结构优化 | [ICLR 2025](https://proceedings.iclr.cc/paper_files/paper/2025/hash/5492ecbce4439401798dcd2c90be94cd-Abstract-Conference.html) · A | [代码](https://github.com/FoundationAgents/AFlow) | MetaGPT / Python / LLM API |
| MaAS | Guibin Zhang et al. | 执行反馈驱动的结构优化 | [ICML 2025](https://proceedings.mlr.press/v267/zhang25bi.html) · A | [代码](https://github.com/bingreeky/MaAS) | AFlow / MetaGPT / PyTorch / LLM API |
| CE-Graph | Jusheng Zhang et al. | 执行反馈驱动的结构优化 | [ICML 2026](https://proceedings.mlr.press/v306/zhang26f.html) · A | 未确认公开 | LLM API |
| AutoRAS | Yang Yue et al. | 执行反馈驱动的结构优化 | [ICML 2026](https://proceedings.mlr.press/v306/yue26d.html) · A | [代码](https://github.com/guohezuy/AutoRAS) | Python / PyTorch / primitive compiler / LLM API |
| FlowMAS | Haitao Wang et al. | 执行反馈驱动的结构优化 | [NeurIPS 2026 · accepted](https://openreview.net/forum?id=Q5E25NvUNs) · B | 仅宣布地址，公开访问返回 404 | MaAS / AFlow / Python / PyTorch / Hugging Face or LLM API |
| AgentPrune | Guibin Zhang et al. | 执行反馈驱动的结构优化 | [ICLR 2025](https://proceedings.iclr.cc/paper_files/paper/2025/hash/bbc461518c59a2a8d64e70e2c38c4a0e-Abstract-Conference.html) · A | [代码](https://github.com/yanweiyue/AgentPrune) | GPTSwarm / Python / PyTorch / LLM API |
| Flow | Boye Niu et al. | 执行反馈驱动的结构优化 | [ICLR 2025](https://proceedings.iclr.cc/paper_files/paper/2025/hash/ba84da6921f3040b74ee163aa7451f53-Abstract-Conference.html) · A | [代码](https://github.com/tmllab/2025_ICLR_FLOW) | Python / LLM API |

实现底座依据论文、作者仓库说明与可公开核验的依赖信息，不表示本次已经复现实验。多数方法冻结执行 LLM，使用 PyTorch 训练结构模块并不意味着使用 veRL 微调 Agent LLM。LLM-Blender 会训练排序器、融合器，需与结构优化及多 Agent 联合微调区别。

## 本地阅读版本

PDF 位于研究目录 `LLM_multi_agent_system/`，不属于嵌套的网站 Git 仓库；公网页面链接到正式原文或明确标记的作者版，不发布会失效的本地下载路径。已有原文复用，不重复下载。

| 方法 | 本地文件（相对于论文目录） | 实际阅读版本 | 下载来源 |
|---|---|---|---|
| MetaGPT | `agent_design/metagpt_iclr2024.pdf` | 主会来源 PDF | [原文](https://proceedings.iclr.cc/paper_files/paper/2024/file/6507b115562bb0a305f1958ccc87355a-Paper-Conference.pdf) |
| ChatDev | `agent_design/chatdev_acl2024.pdf` | 主会来源 PDF | [原文](https://aclanthology.org/2024.acl-long.810.pdf) |
| AutoGen | `workflow_topology/autogen_colm2024_author.pdf` | OpenReview 返回 403，阅读作者版 | [原文](https://arxiv.org/pdf/2308.08155) |
| LLM Debate | `workflow_topology/llm_debate_icml2024.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v235/main/assets/du24e/du24e.pdf) |
| LLM-Blender | `workflow_topology/llm_blender_acl2023.pdf` | 主会来源 PDF | [原文](https://aclanthology.org/2023.acl-long.792.pdf) |
| DyLAN | `team_selection/dylan_colm2024.pdf` | OpenReview 返回 403，阅读作者版 | [原文](https://arxiv.org/pdf/2310.02170) |
| AgentVerse | `workflow_topology/agentverse_iclr2024.pdf` | 主会来源 PDF | [原文](https://proceedings.iclr.cc/paper_files/paper/2024/file/578e65cdee35d00c708d4c64bce32971-Paper-Conference.pdf) |
| GTD | `workflow_topology/gtd_acl2026.pdf` | 主会来源 PDF | [原文](https://aclanthology.org/2026.acl-long.1764.pdf) |
| CARD | `workflow_topology/card_iclr2026_author.pdf` | OpenReview 返回 403，阅读作者版 | [原文](https://arxiv.org/pdf/2603.01089) |
| RADAR | `workflow_topology/radar_icml2026.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v306/main/assets/zhang26ji/zhang26ji.pdf) |
| MAGE | `workflow_topology/mage_icml2026.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v306/main/assets/zhao26af/zhao26af.pdf) |
| Codebook Agent | `workflow_topology/codebook_agent_arxiv2026.pdf` | 预印本作者版 | [原文](https://arxiv.org/pdf/2609.02264) |
| GPTSwarm | `workflow_topology/gptswarm_icml2024.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v235/main/assets/zhuge24a/zhuge24a.pdf) |
| ADAS | `agent_design/adas_iclr2025.pdf` | 主会来源 PDF | [原文](https://proceedings.iclr.cc/paper_files/paper/2025/file/36b7acf6f6010652b3f2a433774a66fe-Paper-Conference.pdf) |
| G-Designer | `workflow_topology/g_designer_icml2025.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v267/main/assets/zhang25cu/zhang25cu.pdf) |
| AFlow | `workflow_topology/aflow_iclr2025.pdf` | 主会来源 PDF | [原文](https://proceedings.iclr.cc/paper_files/paper/2025/file/5492ecbce4439401798dcd2c90be94cd-Paper-Conference.pdf) |
| MaAS | `team_selection/maas_icml2025.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v267/main/assets/zhang25bi/zhang25bi.pdf) |
| CE-Graph | `workflow_topology/ce_graph_icml2026.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v306/main/assets/zhang26f/zhang26f.pdf) |
| AutoRAS | `workflow_topology/autoras_icml2026.pdf` | 主会来源 PDF | [原文](https://raw.githubusercontent.com/mlresearch/v306/main/assets/yue26d/yue26d.pdf) |
| FlowMAS | `workflow_topology/flowmas_neurips2026_author.pdf` | 已接收作者版，等待 proceedings | [原文](https://arxiv.org/pdf/2609.37151) |
| AgentPrune | `workflow_topology/agentprune_iclr2025.pdf` | 主会来源 PDF | [原文](https://proceedings.iclr.cc/paper_files/paper/2025/file/bbc461518c59a2a8d64e70e2c38c4a0e-Paper-Conference.pdf) |
| Flow | `workflow_topology/flow_iclr2025.pdf` | 主会来源 PDF | [原文](https://proceedings.iclr.cc/paper_files/paper/2025/file/ba84da6921f3040b74ee163aa7451f53-Paper-Conference.pdf) |

AutoGen、CARD、DyLAN 的正式 OpenReview 下载返回 403，不能算作正式 PDF 下载成功。CARD 和 DyLAN 的作者 PDF 带会议版本标记。MAGE 原文附录宣布的仓库在本次访问中未确认公开，CE-Graph 未确认公开代码，另有 FlowMAS 作者仓库公开访问返回 404，三者不计入 19 个已确认公开代码项目；404 不用于推断仓库是否私有或尚未发布。

## 时间与关系图口径

Workflow 图按已核验的早期公开月份排序，MAGE、Flow 未核验更早公开月份时用会议月。论文库另列正式会议月份。MAS 总图保留会议月份口径，并标明已接收论文的计划日期。关系边是本次对照阅读的机制连接，不是直接引用关系或因果继承声明。

## 公式与解读

公式是统一机制示意，不是逐式复刻论文公式。所有 TeX 命令和下标保持数学记法，不把变量翻译成中文。方法证据和局限分栏展示；局限包括研究者分析，不把报告的基准增益外推为所有任务的保证。FlowMAS 的信息奖励按原文写为 PID-inspired 表示近似，不称为已精确估计真实互信息；Codebook 对同质图评分器的批评不扩张为所有 GNN 都失效。
