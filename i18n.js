window.llmI18n = {
  "ui": {
    "en": {
      "brand": "Agent Optimization Development",
      "navRoutes": "Routes",
      "navTimeline": "Timeline",
      "navPipeline": "Pipeline",
      "navFormula": "Formula",
      "navCompare": "Compare",
      "navDetails": "Details",
      "navPapers": "Papers",
      "compactTitle": "Toggle compact cards",
      "langTitle": "Switch language",
      "mapEyebrow": "Selected method landscape",
      "mapTitle": "Routes from single-turn RLVR to multi-turn agent credit assignment",
      "mapLead": "Click any node to synchronize the pipeline, formula explanation, details, and comparison panels.",
      "searchLabel": "Search",
      "searchPlaceholder": "GRPO, advantage, entropy, distillation",
      "timelineEyebrow": "Evolution",
      "timelineTitle": "Algorithm Timeline",
      "pipelineEyebrow": "Training pipeline",
      "pipelineTitle": "Pipeline",
      "formulaEyebrow": "Objective surgery",
      "formulaTitle": "Formula Explain",
      "compareEyebrow": "Side-by-side",
      "compareTitle": "Algorithm Comparison",
      "compareLeft": "Left",
      "compareRight": "Right",
      "detailsEyebrow": "Deep-read notes",
      "detailsTitle": "Motivation, modification, training signal",
      "papersEyebrow": "Local corpus",
      "papersTitle": "PDFs and Open-Source Status",
      "thMethod": "Method",
      "thPdf": "PDF",
      "thSource": "Source",
      "thCode": "Code",
      "thFramework": "Framework",
      "allMethods": "All methods",
      "selectedComponent": "Selected component",
      "objective": "Objective",
      "motivation": "Motivation",
      "advantageSignal": "Advantage/signal",
      "credit": "Credit",
      "feedback": "Feedback",
      "method": "Method",
      "coreModification": "Core modification",
      "trainingParadigm": "Training paradigm",
      "framework": "Framework",
      "detailMotivation": "Motivation",
      "detailModifications": "Core modifications",
      "detailObjective": "Training objective",
      "detailParadigm": "Training paradigm",
      "focus": "Focus",
      "localPdf": "Local PDF",
      "sourcePdf": "Official/source PDF",
      "codeProject": "Code / project",
      "notConfirmed": "Not confirmed",
      "categories": {
        "value": "PPO / value",
        "group": "GRPO / group",
        "opd": "On-policy distillation",
        "multi": "Multi-turn optimization",
        "opdrl": "OPD + RL"
      }
    },
    "zh": {
      "brand": "Agent Optimization Development",
      "navRoutes": "路线图",
      "navTimeline": "时间线",
      "navPipeline": "流程",
      "navFormula": "公式",
      "navCompare": "对比",
      "navDetails": "细节",
      "navPapers": "论文",
      "compactTitle": "切换紧凑卡片",
      "langTitle": "切换中英文",
      "mapEyebrow": "方法全景",
      "mapTitle": "从单轮 RLVR 到多轮 Agent 归因的演化路线",
      "mapLead": "点击任意节点，会同步更新训练流程、公式拆解、方法细节和对比面板。",
      "searchLabel": "搜索",
      "searchPlaceholder": "GRPO、优势估计、熵、蒸馏",
      "timelineEyebrow": "演化",
      "timelineTitle": "算法时间线",
      "pipelineEyebrow": "训练流程",
      "pipelineTitle": "流程",
      "formulaEyebrow": "目标函数改造",
      "formulaTitle": "公式拆解",
      "compareEyebrow": "并排对比",
      "compareTitle": "算法对比",
      "compareLeft": "左侧",
      "compareRight": "右侧",
      "detailsEyebrow": "深读笔记",
      "detailsTitle": "动机、改动、训练信号",
      "papersEyebrow": "本地语料",
      "papersTitle": "PDF 与开源状态",
      "thMethod": "方法",
      "thPdf": "PDF",
      "thSource": "来源",
      "thCode": "代码",
      "thFramework": "框架",
      "allMethods": "全部方法",
      "selectedComponent": "当前组件",
      "objective": "目标函数",
      "motivation": "动机",
      "advantageSignal": "优势估计 / 信号",
      "credit": "归因粒度",
      "feedback": "反馈",
      "method": "方法",
      "coreModification": "核心改动",
      "trainingParadigm": "训练范式",
      "framework": "框架",
      "detailMotivation": "提出动机",
      "detailModifications": "核心改动",
      "detailObjective": "训练目标",
      "detailParadigm": "训练范式",
      "focus": "聚焦",
      "localPdf": "本地 PDF",
      "sourcePdf": "正式/来源 PDF",
      "codeProject": "代码/项目",
      "notConfirmed": "未确认",
      "categories": {
        "value": "PPO / 价值路线",
        "group": "GRPO / 组内比较路线",
        "opd": "在线策略蒸馏路线",
        "multi": "多轮优化路线",
        "opdrl": "OPD + RL 路线"
      }
    }
  },
  "methods": {
    "zh": {
      "ppo": {
        "branch": "基础",
        "oneLine": "带截断式约束的在线策略策略梯度，用学习得到的价值/优势估计稳定更新。",
        "motivation": "让策略梯度可以做多轮小批量更新，同时不需要 TRPO 那套复杂的信赖域计算。",
        "modifications": [
          "用当前策略和旧策略的概率比 r_t(theta) 做重要性校正。",
          "把 r_t 截断到 [1-epsilon, 1+epsilon]，避免单次更新过大。",
          "用价值函数或 GAE 估计优势，并同时训练价值损失。"
        ],
        "training": "在线策略采样 + 学习得到的价值评估器/价值模型 + 截断替代目标，可叠加 KL、价值和熵正则项。",
        "advantage": "A_t 来自价值估计或 GAE。",
        "objective": "截断替代目标：E[min(r_t A_t, clip(r_t,1-eps,1+eps) A_t)]，并可叠加 KL、价值和熵正则。",
        "credit": "通过 A_t 给到词元/动作级别，但质量依赖价值估计器。",
        "feedback": "标量奖励；在 LLM 推理中通常是延迟反馈。",
        "openSource": "有参考实现。",
        "framework": "OpenAI Baselines；LLM RL 变体常在 verl 中实现。",
        "pipeline": [
          [
            "采样",
            "用当前策略采样在线策略轨迹。"
          ],
          [
            "奖励",
            "给最终答案或环境结果打分。"
          ],
          [
            "价值评估",
            "拟合 V(s)，并计算 GAE 优势估计。"
          ],
          [
            "截断",
            "用截断替代目标和价值损失更新。"
          ],
          [
            "迭代",
            "每个在线策略批次后刷新旧策略。"
          ]
        ],
        "formulaParts": [
          [
            "概率比",
            "r_t(theta)",
            "采样动作在新策略下的概率除以旧策略概率。"
          ],
          [
            "优势估计",
            "A_t",
            "基于价值的估计：这个词元/动作是否比预期更好。"
          ],
          [
            "截断",
            "clip(r_t, 1-eps, 1+eps)",
            "信赖域的近似，限制过大的策略更新。"
          ],
          [
            "替代目标",
            "min(r_t A_t, clip(r_t) A_t)",
            "当更新会过度提高目标时，取更保守的一支。"
          ]
        ]
      },
      "vineppo": {
        "branch": "归因",
        "oneLine": "保留 PPO，但用蒙特卡洛延续采样估计替代容易有偏的学习得到的价值。",
        "motivation": "检验推理密集型 LLM 任务中，PPO 的价值网络是否真的能可靠做归因。",
        "modifications": [
          "在中间状态重置生成，并采样 K 条延续采样。",
          "把延续回报的平均值作为 V_MC(s)。",
          "计算 A_MC(s,a)=r+gamma V_MC(s')-V_MC(s)，再走标准 PPO 更新。"
        ],
        "training": "PPO 式更新，但优势估计来自 MC 延续采样；额外采样预算用于更可靠归因。",
        "advantage": "来自延续采样轨迹的无偏 MC 优势估计。",
        "objective": "保持 PPO 截断目标不变，只把 A_t 替换为 MC 延续采样得到的 A_MC。",
        "credit": "状态/动作或推理步骤级别，取决于中间状态如何分组。",
        "feedback": "最终任务奖励，通过采样得到的延续采样传播到中间状态。",
        "openSource": "官方代码已开源。",
        "framework": "VinePPO 官方实现；PPO 式训练，并支持从中间语言状态重启 continuation rollout。",
        "pipeline": [
          [
            "基础轨迹",
            "从策略采样一条推理轨迹。"
          ],
          [
            "重置状态",
            "选择中间前缀作为重启点。"
          ],
          [
            "MC 延续采样",
            "从每个前缀采样 K 条未来轨迹并平均回报。"
          ],
          [
            "优势估计",
            "用 V_MC(s') - V_MC(s) 衡量动作的因果增益。"
          ],
          [
            "PPO 更新",
            "用更细的优势估计走标准截断式更新。"
          ]
        ],
        "formulaParts": [
          [
            "价值",
            "V_MC(s)=1/K sum_k R(eta_k)",
            "用延续采样轨迹估计中间语言状态的价值。"
          ],
          [
            "优势估计",
            "A_MC(s,a)=r+gamma V_MC(s')-V_MC(s)",
            "归因是采取该动作带来的回报提升。"
          ],
          [
            "范围",
            "PPO objective unchanged",
            "创新点不是损失，而是优势估计器。"
          ]
        ]
      },
      "vcppo": {
        "branch": "长 CoT PPO",
        "oneLine": "通过价值预训练和解耦 GAE 修正长 CoT 场景下 PPO 的价值侧。",
        "motivation": "解释 PPO 在长链思维中崩塌的原因：价值初始化偏差和奖励信号衰减。",
        "modifications": [
          "RL 前先预训练价值模型，降低初始价值偏差。",
          "策略模型与价值评估器使用解耦 GAE，减轻长输出上的奖励衰减。",
          "保留 PPO 截断目标，重点修回报/优势估计管线。"
        ],
        "training": "带校准价值评估器初始化、并解耦策略模型/价值评估器优势估计的基于价值的 PPO。",
        "advantage": "策略模型的优势估计使用解耦 GAE；价值评估器学习衰减更少的回报。",
        "objective": "PPO 截断策略损失 + 价值优化；重点是价值预训练和解耦 GAE 校准长 CoT 回报。",
        "credit": "仍是依赖价值评估器的词元级归因。",
        "feedback": "稀疏最终奖励，通过更好的价值估计向前传播。",
        "openSource": "未找到清晰官方代码。",
        "framework": "适合参考 verl 类系统中的 PPO/价值路线。",
        "pipeline": [
          [
            "value pretraining",
            "RL 开始前校准价值评估器。"
          ],
          [
            "采样",
            "生成长 CoT 样本。"
          ],
          [
            "decoupled GAE",
            "策略模型和价值评估器使用不同的优势估计/回报路径。"
          ],
          [
            "截断式 PPO",
            "用校准后的优势估计更新策略模型。"
          ],
          [
            "价值更新",
            "让价值评估器对齐长程回报。"
          ]
        ],
        "formulaParts": [
          [
            "偏差",
            "value pretraining",
            "降低标量价值头的初始化偏差。"
          ],
          [
            "GAE",
            "decoupled GAE",
            "策略模型与价值评估器不再共享同一个衰减估计器。"
          ],
          [
            "损失",
            "PPO loss retained",
            "VC-PPO 是修复 PPO，而不是移除价值评估器。"
          ]
        ]
      },
      "vapo": {
        "branch": "混合配方",
        "oneLine": "一个价值模型 PPO 配方，吸收 DAPO/GRPO 技巧，并加入长度自适应 GAE。",
        "motivation": "证明基于价值的 PPO 仍能在高级推理上工作，前提是系统性处理价值偏差、长度差异和稀疏奖励。",
        "modifications": [
          "价值预训练与解耦 GAE。",
          "长度自适应 GAE 适配不同长度输出。",
          "加入 Clip-Higher、词元级损失、正向 LM 损失和组采样。"
        ],
        "training": "基于价值的 PPO 和 DAPO/GRPO 工程配方的混合。",
        "advantage": "长度自适应 GAE 生成的基于价值的优势估计。",
        "objective": "PPO 式目标 + VAPO 系统配方：长度自适应 GAE、词元级损失、Clip-Higher 和正例 LM 辅助损失。",
        "credit": "词元级归因，但经过长度自适应和价值校准。",
        "feedback": "最终奖励、价值预测和辅助 LM 信号。",
        "openSource": "未找到单独官方复现；verl 文档将其列为相关推理 RL 方法。",
        "framework": "verl/HybridFlow 生态；FSDP/FSDP2/Megatron-LM 训练，vLLM/SGLang/HF 采样。",
        "pipeline": [
          [
            "价值预训练",
            "先校准价值头。"
          ],
          [
            "组采样",
            "采样一组回答。"
          ],
          [
            "length-adaptive GAE",
            "按长度调整时间维度归因。"
          ],
          [
            "稳定化组件",
            "叠加 Clip-Higher、词元损失、正向 LM 损失。"
          ],
          [
            "PPO 更新",
            "用修正后的基于价值的 PPO 更新。"
          ]
        ],
        "formulaParts": [
          [
            "价值",
            "V_theta(s)",
            "与 GRPO 不同，VAPO 保留学习得到的价值模型。"
          ],
          [
            "长度",
            "length-adaptive GAE",
            "按输出长度调节优势估计衰减。"
          ],
          [
            "配方",
            "PPO + DAPO tricks",
            "核心是系统配方，而不是单个损失替换。"
          ]
        ]
      },
      "grpo": {
        "branch": "无价值评估器 RLVR",
        "oneLine": "去掉价值评估器，对同一提示的一组输出做组内相对奖励标准化。",
        "motivation": "大模型 RL 中训练价值评估器成本高且可能不稳定，可验证奖励已足够提供组内比较。",
        "modifications": [
          "同一提示采样 G 个回答。",
          "用组内奖励均值/标准差归一化得到优势估计。",
          "保留 PPO 式概率比截断，但不训练价值模型。"
        ],
        "training": "无价值评估器 RLVR；组内相对基线替代学习得到的价值基线。",
        "advantage": "A_i=(R_i-mean(R))/std(R)，同一提示组内归一化。",
        "objective": "组相对目标：同一提示内归一化奖励作为 A_i，在词元概率比上做 PPO 式截断，并可加 KL。",
        "credit": "序列级奖励通常广播到回答词元，归因粒度偏粗。",
        "feedback": "可验证最终答案奖励。",
        "openSource": "未找到完整训练代码；模型权重公开。",
        "framework": "GRPO 已被 verl、verl-agent 等框架支持。",
        "pipeline": [
          [
            "提示分组",
            "同一提示采样 G 个回答。"
          ],
          [
            "验证器",
            "用规则或评判器计算奖励。"
          ],
          [
            "组内基线",
            "用组内均值/标准差得到相对优势估计。"
          ],
          [
            "截断更新",
            "在词元上应用 PPO 式截断式概率比。"
          ],
          [
            "无价值评估器",
            "不训练价值网络。"
          ]
        ],
        "formulaParts": [
          [
            "分组",
            "G responses",
            "同一提示的输出互相构成基线。"
          ],
          [
            "优势估计",
            "(R_i - mean R) / std R",
            "一个回答相对同组其他样本的好坏。"
          ],
          [
            "概率比",
            "r_i,t",
            "当前策略与旧策略在采样得到的词元上的概率比。"
          ],
          [
            "广播",
            "A_i for all tokens",
            "序列奖励被广播到该回答的所有词元。"
          ]
        ]
      },
      "dapo": {
        "branch": "稳定化 GRPO",
        "oneLine": "面向大规模长 CoT 的开源 GRPO 配方，加入动态采样、词元级损失和超长输出塑形。",
        "motivation": "朴素 GRPO 在大规模训练中会遇到熵崩塌、零梯度分组、奖励噪声和超长输出问题。",
        "modifications": [
          "Clip-Higher 放宽正向更新。",
          "动态采样过滤全对/全错的零梯度分组。",
          "加入词元级策略梯度损失和超长奖励塑形。"
        ],
        "training": "基于 verl 的可复现大规模 GRPO 系统配方。",
        "advantage": "仍是组内归一化奖励优势估计，但只保留有效组。",
        "objective": "DAPO 目标：在 GRPO 上加入非对称截断、动态过滤、词元级聚合和超长输出塑形。",
        "credit": "词元级聚合，避免长回答权重被错误缩放。",
        "feedback": "数学验证器奖励，并对过长输出做塑形。",
        "openSource": "官方开源。",
        "framework": "基于 verl；公开配方、数据、验证器和模型权重。",
        "pipeline": [
          [
            "采样",
            "同一提示采样多个回答。"
          ],
          [
            "动态过滤",
            "保留同时有正确和错误样本的组。"
          ],
          [
            "优势估计",
            "计算组内奖励归一化优势估计。"
          ],
          [
            "词元损失",
            "用词元级聚合更新。"
          ],
          [
            "长度塑形",
            "对超长输出回答施加平滑惩罚。"
          ]
        ],
        "formulaParts": [
          [
            "过滤",
            "0 < N_{\\mathrm{correct}} < G",
            "只训练能产生学习信号的组。"
          ],
          [
            "截断",
            "Clip-Higher",
            "允许正向更新稍大，缓解熵崩塌。"
          ],
          [
            "聚合",
            "token-level averaging",
            "跨词元聚合，而不是先按回答平均。"
          ]
        ]
      },
      "gspo": {
        "branch": "序列级概率比",
        "oneLine": "把 GRPO 的重要性校正从词元级改为整条回答序列概率比。",
        "motivation": "GRPO 奖励是序列级，但概率比/截断是词元级，粒度不一致。",
        "modifications": [
          "用整条回答似然定义序列概率比。",
          "在回答级别做截断和策略更新。",
          "减少单个词元概率比异常值对更新的主导。"
        ],
        "training": "无价值评估器 RLVR，但优化单位从词元转向序列。",
        "advantage": "仍是组内相对奖励优势估计。",
        "objective": "序列级目标：用整条回答概率比 s_i 替代词元概率比，并在序列级做截断更新。",
        "credit": "回答级归因，更贴合序列奖励。",
        "feedback": "可验证序列奖励。",
        "openSource": "未找到论文官方代码。",
        "framework": "verl 和 verl-agent 支持 GSPO，但属于框架支持。",
        "pipeline": [
          [
            "组采样",
            "为每个提示采样回答。"
          ],
          [
            "奖励",
            "计算序列级奖励。"
          ],
          [
            "序列概率比",
            "用整条回答的平均对数概率比。"
          ],
          [
            "截断",
            "在序列概率比上做截断。"
          ],
          [
            "更新",
            "用序列粒度更新策略。"
          ]
        ],
        "formulaParts": [
          [
            "概率比",
            "s_i=(pi(y_i)/pi_old(y_i))^(1/|y_i|)",
            "对整条回答的似然比做长度归一。"
          ],
          [
            "优势估计",
            "A_i",
            "仍来自分组奖励归一化。"
          ],
          [
            "单位",
            "sequence-level clipping",
            "截断对象从词元概率比变成回答概率比。"
          ]
        ]
      },
      "gmpo": {
        "branch": "几何平均",
        "oneLine": "用几何平均替换 GRPO 词元聚合，降低异常值词元概率比的影响。",
        "motivation": "算术平均容易被极端词元项主导，尤其在长输出和高方差概率比下。",
        "modifications": [
          "把词元损失项通过几何平均聚合。",
          "保留 GRPO 的组内相对优势估计。",
          "让更新对极端词元更鲁棒。"
        ],
        "training": "与 GRPO 兼容的目标改造，主要改词元聚合。",
        "advantage": "同 GRPO 的组内归一化优势估计。",
        "objective": "几何平均目标：对词元级截断项在对数空间平均，抑制异常词元主导梯度。",
        "credit": "词元级，但用几何聚合稳定权重。",
        "feedback": "可验证奖励。",
        "openSource": "官方开源。",
        "framework": "官方 PyTorch 代码；README 也给出在 verl 中使用 GMPO 的路径。",
        "pipeline": [
          [
            "组采样",
            "采样一组回答。"
          ],
          [
            "奖励归一化",
            "计算组内相对优势估计。"
          ],
          [
            "词元项",
            "计算每个词元的截断式项。"
          ],
          [
            "几何平均",
            "用 log/exp 形式聚合。"
          ],
          [
            "更新",
            "降低异常值词元主导的风险。"
          ]
        ],
        "formulaParts": [
          [
            "聚合",
            "exp(1/T sum_t log term_t)",
            "几何平均对应对数空间平均。"
          ],
          [
            "鲁棒性",
            "outlier suppression",
            "极端词元项不会像算术平均那样支配损失。"
          ],
          [
            "兼容性",
            "GRPO-compatible",
            "可作为 GRPO 聚合层替换。"
          ]
        ]
      },
      "gfpo": {
        "branch": "过滤式采样",
        "oneLine": "训练时过采样更大分组，再按长度或奖励/词元效率过滤 top-k。",
        "motivation": "RLVR 会诱导模型用更长答案换准确率，产生填充词元。",
        "modifications": [
          "每个提示采样比训练需要更多的回答。",
          "按长度或奖励/词元效率过滤。",
          "只在过滤后的子组上应用 GRPO。"
        ],
        "training": "在采样/选择层做隐式奖励塑形。",
        "advantage": "过滤后组内的相对优势估计。",
        "objective": "过滤后 GRPO 目标：先按长度或奖励/词元效率选样本，再在过滤子组上做 GRPO。",
        "credit": "序列级选择 + 词元级 GRPO 更新。",
        "feedback": "奖励和长度/效率指标。",
        "openSource": "未找到官方代码。",
        "framework": "可在支持过采样和回答过滤的 GRPO 框架中实现。",
        "pipeline": [
          [
            "过采样",
            "为提示采样大于 G 的候选回答。"
          ],
          [
            "打分",
            "计算奖励、长度或奖励/词元效率。"
          ],
          [
            "过滤",
            "选择 top-k 高效样本。"
          ],
          [
            "组内优势估计",
            "在过滤子组里归一化奖励。"
          ],
          [
            "更新",
            "运行标准 GRPO 更新。"
          ]
        ],
        "formulaParts": [
          [
            "选择",
            "top-k by reward/token",
            "训练样本选择偏向高效答案。"
          ],
          [
            "目标",
            "GRPO on filtered set",
            "损失本身不变，数据分布改变。"
          ],
          [
            "效果",
            "shorter correct answers",
            "减少用填充词元换奖励的倾向。"
          ]
        ]
      },
      "flowgrpo": {
        "branch": "Agent 系统",
        "oneLine": "在多模块 AgentFlow 系统中只优化规划器，用最终结果奖励训练长程工具使用行为。",
        "motivation": "单体工具使用 LLM 难训练、难泛化；模块化 Agent 系统更接近实际生产形态。",
        "modifications": [
          "把系统拆成规划器、执行器、验证器、生成器。",
          "只对规划器做 GRPO 式在线优化。",
          "把最终结果奖励广播到规划器轮次。"
        ],
        "training": "在线流程中的多轮系统优化。",
        "advantage": "最终奖励的组内归一化优势估计，被广播到规划器动作。",
        "objective": "规划器更新目标：把最终结果奖励组内归一化后，用于在线流程中的规划器决策。",
        "credit": "轨迹级归因，稳定但粗。",
        "feedback": "最终任务成功/失败。",
        "openSource": "未找到官方代码。",
        "framework": "AgentFlow 风格自定义系统；OpenReview 正式版本。",
        "pipeline": [
          [
            "规划器",
            "决定下一步工具或模块调用。"
          ],
          [
            "执行器",
            "执行工具/API/子模块。"
          ],
          [
            "验证器",
            "检查中间或最终结果。"
          ],
          [
            "结果奖励",
            "根据最终任务结果打分。"
          ],
          [
            "GRPO 规划器更新",
            "只更新规划器的决策策略。"
          ]
        ],
        "formulaParts": [
          [
            "范围",
            "planner only",
            "训练目标集中在系统决策层。"
          ],
          [
            "奖励",
            "final outcome reward",
            "多轮结果只在最后评价。"
          ],
          [
            "广播",
            "shared planner advantage",
            "同一轨迹优势估计广播到规划器步骤。"
          ]
        ]
      },
      "gigpo": {
        "branch": "步骤归因",
        "oneLine": "在回合级分组外，再构造同一锚定状态的步骤级分组来做局部归因。",
        "motivation": "轨迹级 GRPO 无法判断多步 Agent 中哪一步导致最终成败。",
        "modifications": [
          "保留回合分组优势估计。",
          "把相同状态/锚点的动作组成步骤分组。",
          "组合轨迹级和步骤级优势估计。"
        ],
        "training": "无价值评估器 Agent RL，用已有采样中的相同状态做局部比较。",
        "advantage": "A(a_t)=A_E(tau)+omega A_S(a_t)。",
        "objective": "组中组目标：A(a_t)=A_E(tau)+omega A_S(a_t)，结合回合级成功度和相同状态下的步骤比较。",
        "credit": "轨迹 + 步骤/动作级别。",
        "feedback": "最终奖励和相同状态下不同动作的相对结果。",
        "openSource": "官方开源。",
        "framework": "verl-agent，基于 veRL；支持 ALFWorld、WebShop、Search、Sokoban、Gym Cards、AppWorld。",
        "pipeline": [
          [
            "回合分组",
            "为提示/任务采样多条轨迹。"
          ],
          [
            "锚定状态",
            "识别可比较的相同 Agent 状态。"
          ],
          [
            "步骤分组",
            "比较同一状态下不同动作。"
          ],
          [
            "混合优势估计",
            "合并回合和步骤优势估计。"
          ],
          [
            "更新",
            "优化动作级 Agent 行为。"
          ]
        ],
        "formulaParts": [
          [
            "回合",
            "A_E(tau)",
            "整条轨迹的相对成功度。"
          ],
          [
            "步骤",
            "A_S(a_t)",
            "同一状态下某动作相对其他动作的好坏。"
          ],
          [
            "混合",
            "A_E + omega A_S",
            "全局结果和局部动作归因的加权组合。"
          ]
        ]
      },
      "hgpo": {
        "branch": "上下文层级",
        "oneLine": "在 GiGPO 的步骤分组上加入历史上下文一致性，构建层级分组。",
        "motivation": "同状态分组可能忽略历史上下文，导致上下文不一致和错误比较。",
        "modifications": [
          "按历史上下文相似度构建多层分组。",
          "对不同层级优势估计自适应加权。",
          "在偏差-方差之间做更细的折中。"
        ],
        "training": "上下文感知的步骤级 Agent RL。",
        "advantage": "A_H(s_t)=sum_k w_k A_k^H(s_t)。",
        "objective": "层级分组目标：A_H(s_t)=sum_k w_k A_k^H(s_t)，融合不同历史一致性层级的优势估计。",
        "credit": "从粗到细的层级归因。",
        "feedback": "最终奖励，经上下文一致分组传播。",
        "openSource": "官方开源。",
        "framework": "verl-agent / veRL 扩展；长程 Agent RL 配方。",
        "pipeline": [
          [
            "采样",
            "采样多条 Agent 轨迹。"
          ],
          [
            "上下文匹配",
            "按历史一致性组织状态。"
          ],
          [
            "层级分组",
            "构建从粗到细的分组层级。"
          ],
          [
            "加权优势估计",
            "按层级权重合并优势估计。"
          ],
          [
            "策略更新",
            "用上下文感知归因更新。"
          ]
        ],
        "formulaParts": [
          [
            "层级",
            "A_k^H",
            "第 k 层上下文分组的优势估计。"
          ],
          [
            "权重",
            "w_k proportional to (k+1)^alpha",
            "层级越细，权重可自适应变化。"
          ],
          [
            "目标",
            "context consistency",
            "避免把历史不同但表面相同的状态错配。"
          ]
        ]
      },
      "arpo": {
        "branch": "自适应采样",
        "oneLine": "根据工具反馈后的熵上升来分配额外采样，把探索预算放在关键工具步骤。",
        "motivation": "工具调用后模型不确定性常上升，这些位置更可能决定后续轨迹成败。",
        "modifications": [
          "监控工具反馈前后的熵变化。",
          "在高 ΔH 位置自适应分支。",
          "区分共享词元和分支特定词元的优势归因。"
        ],
        "training": "多轮工具使用 RL 中的熵引导采样分配。",
        "advantage": "共享词元用平均优势估计，分支特定词元用各自回报。",
        "objective": "树状采样目标：基于 GRPO 式截断目标，同时区分共享前缀与分支词元的归因。",
        "credit": "工具步骤和分支后的词元/动作级别。",
        "feedback": "工具观测、最终奖励和熵变化。",
        "openSource": "官方开源。",
        "framework": "ARPO 代码仓库；RL 阶段参考 ReCall 和 VERL；SFT 阶段集成 LLaMA-Factory；采样使用 vLLM。",
        "pipeline": [
          [
            "试探采样",
            "先生成一条包含工具反馈的轨迹。"
          ],
          [
            "熵监控",
            "测量工具反馈前后 ΔH。"
          ],
          [
            "自适应分支",
            "在高不确定位置多采样。"
          ],
          [
            "归因",
            "共享/单独词元分别归因。"
          ],
          [
            "更新",
            "用更高效的分支数据训练。"
          ]
        ],
        "formulaParts": [
          [
            "分支",
            "P_t=alpha+beta Delta H_t",
            "熵上升越大，越可能在该点分支。"
          ],
          [
            "共享部分",
            "A_shared",
            "分支前共享词元使用平均归因。"
          ],
          [
            "分支部分",
            "branch return",
            "分支后的动作使用各自结果归因。"
          ]
        ]
      },
      "aepo": {
        "branch": "熵平衡",
        "oneLine": "在 ARPO 基础上控制高熵采样崩塌和高熵词元梯度截断。",
        "motivation": "单纯熵引导分支会过度偏向高熵区域，反而导致采样和梯度不稳定。",
        "modifications": [
          "熵预监控。",
          "连续分支惩罚。",
          "停梯度截断和熵感知优势估计。"
        ],
        "training": "熵平衡式 Agent RL，既利用熵又约束其副作用。",
        "advantage": "结合准确率和熵的优势缩放。",
        "objective": "熵平衡目标：在 GRPO/DAPO 式词元损失上加入连续分支惩罚、停梯度截断和熵感知优势。",
        "credit": "分支/过程周边的词元归因，并对高熵词元做保护。",
        "feedback": "熵变化、最终奖励和分支历史。",
        "openSource": "官方开源。",
        "framework": "与 ARPO 同代码仓库；AEPO 脚本；基于 VERL/ReCall 风格训练栈，vLLM 采样。",
        "pipeline": [
          [
            "预监控",
            "提前估计熵模式。"
          ],
          [
            "分支惩罚",
            "惩罚连续分支。"
          ],
          [
            "entropy-aware advantage",
            "结合奖励和不确定性。"
          ],
          [
            "停梯度截断",
            "保护高熵词元的梯度。"
          ],
          [
            "更新",
            "平衡探索收益和稳定性。"
          ]
        ],
        "formulaParts": [
          [
            "分支",
            "P_t=(alpha+gamma Delta H_t)(1-P_hat(l))",
            "分支概率受熵和连续分支惩罚共同控制。"
          ],
          [
            "截断",
            "sg(delta)/delta",
            "停梯度技巧保留方向并控制幅度。"
          ],
          [
            "平衡",
            "entropy-aware advantage",
            "不让高熵本身支配训练。"
          ]
        ]
      },
      "appo": {
        "branch": "过程归因",
        "oneLine": "把分支点从工具边界推进到更细的过程级决策点。",
        "motivation": "关键分支不一定只出现在工具调用边界，熵也不总能代表过程影响。",
        "modifications": [
          "定义分支评分判断过程影响。",
          "在过程级位置分支。",
          "用未来感知优势缩放评估后续影响。"
        ],
        "training": "从轮次/工具级归因推到细粒度过程归因。",
        "advantage": "基于分组的截断式 RL + 过程级未来感知优势估计。",
        "objective": "过程级目标：在分支后的轨迹组上做截断式 RL，并用未来感知优势缩放过程级决策。",
        "credit": "过程级，细于工具调用但粗于任意词元。",
        "feedback": "后续轨迹结果和分支影响。",
        "openSource": "未找到官方代码。",
        "framework": "可在 Agent 采样框架中实现过程切分与分支。",
        "pipeline": [
          [
            "试探轨迹",
            "观察序列决策点。"
          ],
          [
            "分支评分",
            "评估某点是否影响下游延续采样。"
          ],
          [
            "过程级分支",
            "在高影响过程级节点分支。"
          ],
          [
            "未来感知优势估计",
            "按下游结果差异缩放归因。"
          ],
          [
            "策略更新",
            "优化细粒度过程行为。"
          ]
        ],
        "formulaParts": [
          [
            "位置",
            "Branching Score",
            "过滤高熵但低影响的词元。"
          ],
          [
            "单位",
            "procedure-level",
            "归因目标细于工具调用、粗于任意词元。"
          ],
          [
            "未来影响",
            "future-aware advantage",
            "一个分支的价值由它如何改变后续结果决定。"
          ]
        ]
      },
      "turnppo": {
        "branch": "Turn-Level Advantage",
        "oneLine": "Turn-PPO 在对话轮次上估计优势，让 PPO 能更低噪声地训练多轮 Agent 动作。",
        "motivation": "结果级 PPO 会把最终奖励广播到整段对话，难以判断是哪一轮帮助或伤害了 Agent。",
        "modifications": [
          "把每个 Agent 轮次当作主要归因单位，而不是把整条轨迹展平。",
          "从多轮交互奖励中估计 Turn-Level Advantage。",
          "在保留对话采样结构的同时，对轮次动作应用 PPO 截断。"
        ],
        "training": "Turn-PPO：面向 Agentic LLM 的多轮 PPO，核心是 Turn-Level Advantage Estimation。",
        "advantage": "用 Turn-Level Advantage 替代单一轨迹奖励广播。",
        "objective": "Turn-PPO 目标：每一轮使用 A_turn 做截断策略更新，避免整条轨迹统一广播。",
        "credit": "多轮轨迹中的轮次/动作级别。",
        "feedback": "环境或任务奖励，被归因回对话/工具使用的轮次。",
        "openSource": "未找到清晰官方代码。",
        "framework": "PPO 式多轮 RL；Findings of EACL 2026 正式版。",
        "pipeline": [
          [
            "多轮采样",
            "收集 Agent 与环境对话。"
          ],
          [
            "轮次切分",
            "按交互轮次组织生成词元/动作。"
          ],
          [
            "轮次优势估计",
            "估计哪些轮次改善了后续结果。"
          ],
          [
            "PPO 更新",
            "使用 Turn-Level Advantage 做截断策略更新。"
          ],
          [
            "迭代",
            "随着策略变化刷新采样轨迹。"
          ]
        ],
        "formulaParts": [
          [
            "单位",
            "turn t",
            "优化单位是一整轮 Agent 轮次，而不是任意词元片段。"
          ],
          [
            "优势估计",
            "A_turn",
            "每一轮单独估计归因，避免均匀轨迹广播。"
          ],
          [
            "损失",
            "min(r_t A_turn, clip(r_t) A_turn)",
            "PPO 截断保留，但优势估计是轮次特定。"
          ]
        ]
      },
      "hiper": {
        "branch": "层级归因",
        "oneLine": "用层级式 RL 和显式归因，在高层计划与低层动作之间训练 LLM Agent。",
        "motivation": "长程 Agent 任务同时包含策略规划和执行；扁平 RL 信号很难判断失败来自计划还是动作执行。",
        "modifications": [
          "把 Agent 行为拆成层级决策层级。",
          "在高层规划与低层执行之间显式分配归因。",
          "让全局任务结果监督真正负责的子决策。"
        ],
        "training": "带显式归因的 LLM Agent 层级式 RL。",
        "advantage": "层级归因区分计划级和动作级学习信号。",
        "objective": "层级式 RL 目标：围绕计划层与动作层的显式归因构建，分别训练规划和执行信号。",
        "credit": "计划/子目标/动作层级。",
        "feedback": "任务结果和中间执行反馈，被分配到不同层级。",
        "openSource": "未找到清晰官方代码。",
        "framework": "层级式 Agent RL；arXiv 标注 ICML 2026。",
        "pipeline": [
          [
            "任务采样",
            "运行长程 LLM Agent 轨迹。"
          ],
          [
            "层级拆分",
            "区分高层计划/子目标决策和执行动作。"
          ],
          [
            "显式归因",
            "把成功或失败责任分配到对应层级。"
          ],
          [
            "层级更新",
            "用不同归因更新规划器和执行器信号。"
          ],
          [
            "细化策略",
            "同时提升策略规划和操作执行。"
          ]
        ],
        "formulaParts": [
          [
            "层级",
            "plan -> action",
            "轨迹被拆成多层决策。"
          ],
          [
            "归因",
            "A_plan + A_action",
            "归因区分战略错误和执行错误。"
          ],
          [
            "目标",
            "L_HRL",
            "RL 目标围绕显式层级归因构建。"
          ]
        ]
      },
      "stephrl": {
        "branch": "Augmented Step Transitions",
        "oneLine": "STEP-HRL 用 local progress summary 构造 augmented step-level transitions，让高层子任务和低层动作都不再依赖完整历史。",
        "motivation": "长程 LLM Agent 如果每一步都读取不断增长的交互历史，会带来高成本，也会让关键决策信息被冗余上下文淹没。",
        "modifications": [
          "引入 local progress policy，把子任务内部历史压缩成紧凑的 progress state。",
          "低层策略只基于当前子任务、当前观测和 local progress 生成动作，而不是读取完整历史。",
          "子任务完成后，把 final local progress 传给高层策略，作为全局进度的一部分。",
          "高层、低层和 local progress 三个策略共享同一个 policy backbone，但在 offline RL 阶段使用不同 critic。"
        ],
        "training": "先做 behavior cloning，再在 augmented step-level transitions 上做 step-level offline HRL。",
        "advantage": "在 step transition 上用 A(s,u)=Q_phi(s,u)-V_psi(s) 做 advantage-weighted regression。",
        "objective": "STEP-HRL 目标：在 augmented step-level transitions 上做 IQL/ILQL-style Q/V 学习，并用 advantage-weighted regression 改进策略。",
        "credit": "高层子任务转移和低层原子动作都以 step-level transition 表示。",
        "feedback": "专家示范、采集得到的离线轨迹、子任务完成的 intrinsic reward，以及环境 extrinsic reward。",
        "openSource": "官方开源。",
        "framework": "官方 STEP-HRL 仓库；deepspeed 离线 HRL pipeline，基于 GLIDER，不是 verl。",
        "pipeline": [
          [
            "专家数据",
            "从 expert trajectories 构造高层、低层和 local progress 的监督数据。"
          ],
          [
            "Behavior cloning",
            "初始化三类策略共享的 policy backbone。"
          ],
          [
            "采集轨迹",
            "用 behavior-cloned policies 生成额外离线轨迹。"
          ],
          [
            "Step-level offline RL",
            "训练 Q/V critic，并在 augmented transitions 上做 advantage-weighted regression。"
          ],
          [
            "紧凑执行",
            "推理时使用当前子任务、观测和 local progress，而不是完整历史。"
          ]
        ],
        "formulaParts": [
          [
            "local progress",
            "p_t^k ~ pi_p(.|g_k,a_{t-1}^k,o_t^k,p_{t-1}^k)",
            "local progress 把子任务内部历史折叠成紧凑状态。"
          ],
          [
            "low-level",
            "a_t^k ~ pi_l(.|g_k,p_t^k,o_t^k)",
            "低层动作只依赖当前子任务、观测和 local progress。"
          ],
          [
            "high-level",
            "g_{k+1} ~ pi_h(.|c,G_k,p_hat_k,o_0^{k+1})",
            "完成的子任务和 final local progress 决定下一个子任务。"
          ],
          [
            "offline RL",
            "A(s,u)=Q_phi(s,u)-V_psi(s)",
            "用 step transition 上的 advantage-weighted regression 改进策略。"
          ]
        ]
      },
      "hipif": {
        "branch": "Planning + Folding",
        "oneLine": "HIPIF 训练 Agent 围绕显式子目标执行，并把已完成子目标的历史折叠起来，减少 long-context interference。",
        "motivation": "长程 Agent 既需要层级分解，也需要上下文管理；只做 credit assignment 不能解决不断增长历史带来的状态追踪失败。",
        "modifications": [
          "围绕显式 subgoal 组织执行，并把完成的 subgoal history 折叠成 compact records。",
          "用 hierarchical reflection 判断当前 subgoal 是否完成，以及下一步该执行动作还是切换子目标。",
          "设计 subgoal-oriented process rewards，惩罚无效子目标、失败的子目标终止、重复动作和格式错误。",
          "用 GRPO-style group normalization 在 step-level scores 上训练 subgoal-centric decisions。"
        ],
        "training": "端到端 GRPO-style RL，同时训练 hierarchical planning、information folding、reflection 和子目标执行。",
        "advantage": "把最终任务结果和 subgoal-oriented process rewards 组合成 step-level score，再在组内归一化得到优势估计。",
        "objective": "HIPIF 目标：在 folded context 下对 subgoal-centric decisions 做 GRPO，并结合 hierarchical reflection 与 subgoal-oriented process rewards。",
        "credit": "子目标生成、子目标切换，以及子目标内部执行步骤。",
        "feedback": "终局环境奖励 + 从环境反馈中提取的 rule-based process penalties。",
        "openSource": "未找到官方代码。",
        "framework": "论文实验基于 verl-agent；截至本次更新未找到公开官方仓库。",
        "pipeline": [
          [
            "子目标上下文",
            "维护任务、已折叠子目标、当前子目标和当前子目标内的动作-观测历史。"
          ],
          [
            "Hierarchical reflection",
            "判断当前子目标是否完成，并为下一动作或下一子目标生成反思。"
          ],
          [
            "Information folding",
            "子目标完成后，把它的执行历史折叠进紧凑记录。"
          ],
          [
            "Process rewards",
            "惩罚无效子目标、失败终止、重复动作和格式错误。"
          ],
          [
            "GRPO 更新",
            "在采样组内归一化 step-level scores，并更新策略。"
          ]
        ],
        "formulaParts": [
          [
            "context",
            "C_{k,j}=[c;H_{<k};g_k;T_{k,j}]",
            "策略看到折叠后的全局进度和当前子目标内局部历史。"
          ],
          [
            "decision",
            "y_{k,j} ~ pi_theta(.|C_{k,j},xi_{k,j})",
            "输出可以继续当前子目标，也可以切换到新子目标。"
          ],
          [
            "reflection",
            "(eta_{k,t},z_{k,t}) ~ pi_theta(.|H_{<k},g_k,h_{k,t},o_t)",
            "reflection 判断子目标完成状态，并准备下一次决策。"
          ],
          [
            "score",
            "S_t=R_env+r_t^proc",
            "step-level score 由终局成功信号和局部过程惩罚组成。"
          ]
        ]
      },
      "opd": {
        "branch": "自生成错误",
        "oneLine": "广义知识蒸馏让学生在自己生成的样本上学习，由教师纠正自生成错误。",
        "motivation": "标准蒸馏常训练在专家/参考前缀上，但推理时学生会访问自己的错误状态，因此需要在这些在线策略状态上得到纠正。",
        "modifications": [
          "从学生策略采样输出，而不是只使用专家示范。",
          "让教师对学生自己生成的尝试进行打分或重标注。",
          "在学生的在线策略分布上优化广义蒸馏目标。",
          "把自生成错误作为训练状态，降低训练/推理分布错配。"
        ],
        "training": "在学生采样得到的生成结果上做在线策略蒸馏 / 广义知识蒸馏。",
        "advantage": "不需要 RL 优势估计；训练信号来自教师对学生自生成样本的监督。",
        "objective": "On-policy distillation 目标：在 y~pi_student(.|x) 的学生生成分布上最小化教师-学生蒸馏损失。",
        "credit": "学生策略诱导状态上的序列/词元监督。",
        "feedback": "教师对学生自生成错误的反馈。",
        "openSource": "未找到清晰官方代码；TRL 风格的 GKD 训练器可实现该范式。",
        "framework": "GKD / 在线策略蒸馏；综述仅作为背景参考。",
        "pipeline": [
          [
            "学生采样",
            "学生用当前策略生成候选回答。"
          ],
          [
            "自生成错误",
            "错误或较弱的学生样本成为训练状态。"
          ],
          [
            "教师反馈",
            "教师在这些学生创建的样本上提供监督。"
          ],
          [
            "GKD 损失",
            "在学生的在线策略数据分布上优化蒸馏目标。"
          ],
          [
            "迭代",
            "随着学生分布变化持续迭代。"
          ]
        ],
        "formulaParts": [
          [
            "分布",
            "y ~ pi_student(.|x)",
            "样本来自学生自己，而不是专家数据分布。"
          ],
          [
            "教师",
            "pi_teacher(.|x,y)",
            "教师监督作用于学生自己输出创造的状态。"
          ],
          [
            "损失",
            "L_KD(teacher, student)",
            "知识蒸馏在在线策略学生分布上进行。"
          ],
          [
            "效果",
            "learn from mistakes",
            "目标直接覆盖学生推理时真实会犯的错误。"
          ]
        ]
      },
      "opsd": {
        "branch": "自教师",
        "oneLine": "同一个模型分成教师/学生视角，教师额外看到特权推理轨迹。",
        "motivation": "避免依赖外部大教师，同时利用推理数据中已有的已验证轨迹或参考答案。",
        "modifications": [
          "学生只基于题目采样。",
          "教师是同一模型，但能看到特权信息。",
          "在学生轨迹上最小化特权教师与非特权学生的逐词元分布差异。"
        ],
        "training": "信息不对称教师/学生上下文下的在线策略自蒸馏。",
        "advantage": "无 RL 优势估计；教师-学生词元分布差异提供密集信号。",
        "objective": "逐词元自蒸馏目标：在学生前缀上最小化特权教师分布与普通学生分布的 KL/差异。",
        "credit": "词元级密集蒸馏。",
        "feedback": "特权轨迹/答案，而非标量环境奖励。",
        "openSource": "官方开源。",
        "framework": "trl 实验版 GOLD 训练器、Accelerate、vLLM。",
        "pipeline": [
          [
            "学生采样",
            "只用问题生成。"
          ],
          [
            "特权上下文",
            "给教师视角附加已验证轨迹或答案。"
          ],
          [
            "自教师",
            "同一模型在更丰富上下文下产生词元分布。"
          ],
          [
            "分布差异",
            "最小化教师/学生词元分布差距。"
          ],
          [
            "更新",
            "无需外部教师改善推理。"
          ]
        ],
        "formulaParts": [
          [
            "上下文",
            "pi_T(.|x,z) vs pi_S(.|x)",
            "同一权重在不同信息条件下分别扮演教师和学生。"
          ],
          [
            "损失",
            "per-token KL",
            "在每个学生前缀上施加密集监督。"
          ],
          [
            "风险",
            "privileged leakage",
            "教师可能依赖推理时学生看不到的信息。"
          ]
        ]
      },
      "skillsd": {
        "branch": "技能条件化教师",
        "oneLine": "把完成的多轮轨迹总结成技能条件化教师上下文，再蒸馏回普通提示学生。",
        "motivation": "固定特权答案不适合多策略 Agent 任务；朴素 OPSD+RL 也可能崩塌。",
        "modifications": [
          "把完成轨迹总结成成功、错误和工作流类型的自然语言技能。",
          "只有教师看到检索到的技能，学生仍只看普通提示。",
          "用 UCB 选择技能，并动态同步教师。",
          "在 GRPO 上叠加重要性加权采样词元反向 KL 自蒸馏。"
        ],
        "training": "GRPO 奖励最大化 + 技能条件化自蒸馏辅助项。",
        "advantage": "完成率奖励给 GRPO 分组优势估计；SDL 提供词元级教师塑形。",
        "objective": "联合目标：L_GRPO + lambda L_SDL；GRPO 负责任务奖励，SDL 提供技能条件化的词元级自蒸馏。",
        "credit": "GRPO 在轨迹级选择好采样；SDL 在这些采样上重新分配词元概率。",
        "feedback": "完成率环境奖励 + 从历史完成轨迹总结出的技能。",
        "openSource": "未找到可用官方代码；项目页显示代码待发布。",
        "framework": "GRPO + 采样词元反向 KL SDL；AppWorld/Sokoban；UCB 技能检索。",
        "pipeline": [
          [
            "Agent 采样",
            "收集多轮轨迹和完成率奖励。"
          ],
          [
            "技能总结",
            "把成功、错误和工作流模式总结进技能库。"
          ],
          [
            "UCB 检索",
            "为当前任务选择局部技能。"
          ],
          [
            "技能教师",
            "教师看到 x 加检索到的技能；学生只看到 x。"
          ],
          [
            "GRPO + SDL",
            "联合优化奖励和采样词元反向 KL 自蒸馏。"
          ]
        ],
        "formulaParts": [
          [
            "技能",
            "S(x)=UCB(B(x))",
            "从技能库中取一个任务局部技能给教师视角。"
          ],
          [
            "教师",
            "pi_teacher(.|x+S(x), y_<t)",
            "教师有技能增强上下文，学生没有。"
          ],
          [
            "SDL",
            "rho_on (exp(-ell)-1+ell)",
            "重要性加权的采样词元反向 KL 蒸馏。"
          ],
          [
            "总目标",
            "L_GRPO + lambda L_SDL",
            "奖励仍是任务级，SDL 提供密集词元塑形。"
          ]
        ]
      },
      "sdar": {
        "branch": "门控自蒸馏",
        "oneLine": "保持 GRPO 主损失不变，把带门控的词元级 OPSD 作为多轮 Agent 的受控辅助目标。",
        "motivation": "多轮 OPSD 容易不稳定；特权教师引导有非对称信任，负差距可能只是噪声。",
        "modifications": [
          "把 OPSD 当作辅助项，而不是改写 RL 优势估计。",
          "用熵、教师-学生差距或 soft-OR 构造停止梯度的词元门控。",
          "强化正向教师认可，削弱负差距词元。",
          "保留由验证器驱动的 GRPO 策略损失作为主信号。"
        ],
        "training": "GRPO 主目标 + 带门控的 OPSD 辅助损失。",
        "advantage": "GRPO 的 RL 优势估计不变；门控只控制蒸馏强度。",
        "objective": "联合目标：L_GRPO + lambda_SDAR L_SDAR；GRPO 为主，门控词元蒸馏只作辅助。",
        "credit": "在轨迹/序列级 RL 奖励之上叠加词元级蒸馏门控。",
        "feedback": "环境奖励 + 技能条件化特权上下文；门控由熵或教师-学生差距决定。",
        "openSource": "官方开源。",
        "framework": "SDAR 代码仓库；GRPO + 带门控的 OPSD；ALFWorld/Search-QA/WebShop；Qwen2.5/Qwen3。",
        "pipeline": [
          [
            "Agent 采样",
            "运行多轮任务并接收验证器奖励。"
          ],
          [
            "特权视角",
            "为同一决策状态构造技能条件化教师上下文。"
          ],
          [
            "词元门控",
            "用熵、教师-学生差距或 soft-OR 计算停梯度门控。"
          ],
          [
            "辅助蒸馏",
            "只在门控信任教师信号的位置施加词元级 OPSD。"
          ],
          [
            "GRPO 更新",
            "保持主 RL 损失和优势估计语义不变。"
          ]
        ],
        "formulaParts": [
          [
            "差距",
            "\\Delta_t = \\log \\pi_T(y_t\\mid s_t^+) - \\log \\pi_\\theta(y_t\\mid s_t)",
            "正差距表示特权教师更认可当前采样得到的词元。"
          ],
          [
            "门控",
            "g_t = \\sigma(\\beta \\Delta_t)",
            "停止梯度的门控缩放辅助蒸馏，不改写 RL 优势估计。"
          ],
          [
            "损失",
            "\\ell_t^{\\mathrm{SDAR}} = g_t\\!\\left(\\log \\pi_\\theta^+(y_t\\mid s_t^+) - \\log \\pi_\\theta(y_t\\mid s_t)\\right)",
            "额外压力是词元级，并由教师信号的可信度控制。"
          ],
          [
            "总目标",
            "L_{\\mathrm{GRPO}} + \\lambda_{\\mathrm{SDAR}} L_{\\mathrm{SDAR}}",
            "RL 是主目标，SDAR 是稳定化辅助项。"
          ]
        ]
      },
      "sdpo": {
        "branch": "丰富反馈",
        "oneLine": "把丰富环境反馈转成密集自蒸馏信号：当前模型在反馈条件下充当教师。",
        "motivation": "可验证环境常返回错误信息、评判器输出或观测；压成标量奖励会丢掉失败原因。",
        "modifications": [
          "形式化带丰富反馈的 RL。",
          "把当前模型条件化在反馈上作为自教师。",
          "把反馈增强的下一词元预测蒸馏回原策略。"
        ],
        "training": "在学生采样轨迹和词元化反馈上做自蒸馏策略优化。",
        "advantage": "密集 logit/词元级蒸馏替代或补充稀疏优势估计。",
        "objective": "反馈自蒸馏目标：最小化反馈条件自教师 logit 与原策略 logit 的 KL/JS 差异。",
        "credit": "来自事后反馈的词元级密集信号。",
        "feedback": "运行时错误、评判器反馈、工具输出或批次内成功样本。",
        "openSource": "官方开源。",
        "framework": "基于 verl 的代码仓库，包含丰富反馈数据、训练脚本和多轮基线。",
        "pipeline": [
          [
            "采样",
            "策略尝试可验证任务。"
          ],
          [
            "丰富反馈",
            "环境返回文本错误/评判器/工具反馈。"
          ],
          [
            "自教师",
            "当前模型在反馈条件下重新推理。"
          ],
          [
            "logit 蒸馏",
            "蒸馏反馈增强的下一词元分布。"
          ],
          [
            "更新",
            "把密集事后反馈信号接到 RLVR 或单独使用。"
          ]
        ],
        "formulaParts": [
          [
            "反馈",
            "f = env(y)",
            "反馈包含尝试为何失败或成功的信息。"
          ],
          [
            "教师",
            "pi_theta(.|x,y_<t,f)",
            "同一模型看到事后反馈后成为教师。"
          ],
          [
            "损失",
            "D(logits_teacher || logits_student)",
            "密集词元校正替代单个二元奖励。"
          ]
        ]
      },
      "rlsd": {
        "branch": "RL + 自蒸馏",
        "oneLine": "让环境奖励决定更新方向，自蒸馏只调节细粒度更新幅度。",
        "motivation": "纯特权自蒸馏可能信息泄漏，并导致长期训练不稳定。",
        "modifications": [
          "诊断 OPSD 中的特权教师信息泄漏。",
          "让 RLVR/可验证奖励决定梯度方向。",
          "用词元级自蒸馏策略差异缩放更新强度。"
        ],
        "training": "RLVR + 自蒸馏的混合；奖励锚点方向，蒸馏调节强度。",
        "advantage": "由奖励导出的 RL 优势估计决定方向，词元级策略差异负责重加权。",
        "objective": "奖励锚定目标：RLVR 决定更新方向，自蒸馏策略差异只调节词元级更新幅度。",
        "credit": "由序列奖励锚定的词元级幅度加权。",
        "feedback": "可验证奖励 + 特权/自蒸馏信号。",
        "openSource": "未找到清晰官方代码。",
        "framework": "可在带词元加权的 RLVR 框架中实现。",
        "pipeline": [
          [
            "RLVR 采样",
            "生成尝试并得到可验证奖励。"
          ],
          [
            "特权自视角",
            "计算教师/学生策略差异。"
          ],
          [
            "方向",
            "用奖励决定正向或负向更新。"
          ],
          [
            "幅度",
            "用策略差异作为词元级更新强度。"
          ],
          [
            "混合更新",
            "避免特权教师单独决定方向。"
          ]
        ],
        "formulaParts": [
          [
            "方向",
            "sign from reward",
            "环境奖励仍是可信方向来源。"
          ],
          [
            "幅度",
            "|pi_T - pi_S|",
            "自蒸馏决定哪些词元更新更强。"
          ],
          [
            "保护约束",
            "no teacher-only direction",
            "降低信息泄漏和特权优化不适定风险。"
          ]
        ]
      },
      "serl": {
        "branch": "选择性事后反馈",
        "oneLine": "在多轮 Agent 中选择“蒸馏什么”和“何时蒸馏”，用任务奖励决定方向，环境反馈决定位置和强度。",
        "motivation": "多轮 Agent 有大量未来观测和反馈，但无差别事后反馈蒸馏可能教错动作。",
        "modifications": [
          "比较不同反馈来源和插入粒度。",
          "用环境反馈选择与动作相关的锚点。",
          "保持任务奖励作为方向，用反馈调节位置选择和幅度。"
        ],
        "training": "面向多轮 Agent 的选择性环境重加权学习。",
        "advantage": "任务奖励方向 + 环境反馈重加权。",
        "objective": "选择性重加权目标：任务奖励决定方向，事后反馈在选定动作/锚点上调节权重。",
        "credit": "动作/锚点级选择性密集加权。",
        "feedback": "观测、错误信息、未来轨迹、成功轨迹和环境响应。",
        "openSource": "官方开源。",
        "framework": "SERL 代码仓库，面向 ALFWorld/WebShop 风格多轮 Agent。",
        "pipeline": [
          [
            "Agent 采样",
            "与环境进行多轮交互。"
          ],
          [
            "结果奖励",
            "保留最终任务成功作为更新方向。"
          ],
          [
            "反馈选择",
            "选择有用的事后反馈/环境信号。"
          ],
          [
            "锚点放置",
            "把训练压力施加到可执行动作或关键锚点。"
          ],
          [
            "重加权更新",
            "调节学习强度，而不是盲目广播奖励。"
          ]
        ],
        "formulaParts": [
          [
            "内容",
            "select feedback source",
            "不是每个未来观测都适合当监督。"
          ],
          [
            "时机",
            "select anchor/action",
            "蒸馏应放在环境信号与动作相关的位置。"
          ],
          [
            "方向",
            "task reward + feedback weight",
            "奖励决定方向，反馈决定位置和强度。"
          ]
        ]
      }
    }
  }
};
