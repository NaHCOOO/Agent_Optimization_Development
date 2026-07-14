const categories = {
  value: { label: "PPO / value", color: "#2563eb" },
  group: { label: "GRPO / group", color: "#059669" },
  opd: { label: "On-policy distillation", color: "#0f766e" },
  multi: { label: "Multi-turn optimization", color: "#d97706" },
  opdrl: { label: "OPD + RL", color: "#7c3aed" }
};

const methods = [
  {
    id: "ppo",
    name: "PPO",
    year: 2017,
    month: 7,
    venue: "arXiv / OpenAI",
    category: "value",
    branch: "foundation",
    x: 100,
    y: 100,
    oneLine: "Clipped on-policy policy gradient with learned value/advantage estimates.",
    motivation: "Make policy gradient updates stable enough for multiple minibatch epochs without full TRPO machinery.",
    modifications: [
      "Use importance ratio r_t(theta) between current and old policy.",
      "Clip r_t inside [1-epsilon, 1+epsilon] so large updates cannot dominate.",
      "Estimate advantage with a value function, commonly GAE, and train value loss beside policy loss."
    ],
    training: "On-policy rollout, learned critic/value model, clipped surrogate objective, optional KL/value/entropy terms.",
    advantage: "A_t from value estimates or GAE.",
    objective: "E[min(r_t A_t, clip(r_t, 1-eps, 1+eps) A_t)]",
    credit: "Token/action level through A_t, but only as good as the value estimator.",
    feedback: "Scalar reward, usually delayed for LLM reasoning.",
    openSource: "Reference implementation available.",
    framework: "OpenAI Baselines; LLM RL variants in verl.",
    pdf: "../agentic_rl/PPO/ppo_proximal_policy_optimization_algorithms.pdf",
    source: "https://arxiv.org/pdf/1707.06347",
    code: "https://github.com/openai/baselines",
    pipeline: [
      ["Rollout", "Collect on-policy trajectories from the current policy."],
      ["Reward", "Score final answer or environment outcome."],
      ["Critic", "Fit V(s) and compute GAE advantages."],
      ["Clip", "Update with clipped surrogate and value loss."],
      ["Repeat", "Refresh old policy after each on-policy batch."]
    ],
    formulaParts: [
      ["ratio", "r_t(theta)", "New policy probability divided by old policy probability for the sampled action."],
      ["advantage", "A_t", "A learned value-based estimate of whether this token/action was better than expected."],
      ["clip", "clip(r_t, 1-eps, 1+eps)", "Trust-region proxy that prevents too-large policy updates."],
      ["surrogate", "min(r_t A_t, clip(r_t) A_t)", "Uses the conservative branch when the update would over-improve the objective."]
    ],
    tags: ["critic", "GAE", "clipping", "foundation"]
  },
  {
    id: "vineppo",
    name: "VinePPO",
    year: 2024,
    month: 10,
    venue: "ICML 2025",
    category: "value",
    branch: "credit",
    x: 270,
    y: 65,
    oneLine: "Keeps PPO but replaces biased learned value estimates with Monte Carlo continuation estimates.",
    motivation: "Diagnose whether PPO's value network actually assigns reliable credit in reasoning-heavy LLM tasks.",
    modifications: [
      "Reset generation at intermediate states and sample K continuations.",
      "Estimate V_MC(s) by averaging returns of continuation rollouts.",
      "Compute A_MC(s,a)=r+gamma V_MC(s')-V_MC(s), then use the usual PPO update."
    ],
    training: "PPO-style update with an MC advantage estimator; extra rollout compute is spent on credit estimation.",
    advantage: "Unbiased MC advantage from continuation rollouts.",
    objective: "PPO clipped objective, with A_t replaced by A_MC.",
    credit: "State/action or reasoning-step level, depending on how states are grouped for MC estimation.",
    feedback: "Final task reward, used through sampled continuations.",
    openSource: "Official implementation released.",
    framework: "Official VinePPO implementation; PPO-style training with resettable continuation rollouts.",
    pdf: "../agentic_rl/VinePPO/vineppo_unlocking_rl_potential_for_llm_reasoning.pdf",
    source: "https://raw.githubusercontent.com/mlresearch/v267/main/assets/kazemnejad25a/kazemnejad25a.pdf",
    code: "https://github.com/McGill-NLP/VinePPO",
    pipeline: [
      ["Base trajectory", "Sample reasoning trajectory from the policy."],
      ["Reset states", "Choose intermediate prefixes as restart points."],
      ["MC continuations", "Sample K futures from each prefix and average returns."],
      ["Advantage", "Use V_MC(s') - V_MC(s) to measure each action's causal lift."],
      ["PPO update", "Apply the standard clipped update with refined advantages."]
    ],
    formulaParts: [
      ["value", "V_MC(s)=1/K sum_k R(eta_k)", "Continuation rollouts estimate the value of an intermediate language state."],
      ["advantage", "A_MC(s,a)=r+gamma V_MC(s')-V_MC(s)", "Credit is the return improvement caused by taking the action."],
      ["scope", "PPO objective unchanged", "The loss is not the novelty; the advantage estimator is."]
    ],
    tags: ["MC rollout", "credit assignment", "value bias"]
  },
  {
    id: "vcppo",
    name: "VC-PPO",
    year: 2025,
    month: 3,
    venue: "arXiv",
    paperTitle: "What's Behind PPO's Collapse in Long-CoT? Value Optimization Holds the Secret",
    category: "value",
    branch: "long-CoT PPO",
    x: 270,
    y: 190,
    oneLine: "Calibrates PPO's value side for long-CoT by value pretraining and decoupled GAE.",
    motivation: "Explain why PPO collapses in long chain-of-thought: value initialization bias and reward signal decay.",
    modifications: [
      "Pretrain the value model before RL so initial values are not badly biased.",
      "Decouple GAE for actor and critic to reduce reward decay on long outputs.",
      "Keep PPO's clipped policy objective but fix the return/advantage plumbing."
    ],
    training: "Value-model-based PPO with calibrated critic initialization and separate actor/critic advantage computation.",
    advantage: "Actor advantage uses a decoupled GAE recipe; critic learns less-decayed returns.",
    objective: "PPO clipped surrogate plus value optimization, with value calibration.",
    credit: "Token-level via calibrated advantage, still critic-dependent.",
    feedback: "Sparse final reward propagated through improved value estimation.",
    openSource: "No clear official code found.",
    framework: "Relevant to PPO/value paths in verl-like systems.",
    pdf: "../agentic_rl/VC-PPO/vc_ppo_whats_behind_ppos_collapse_in_long_cot.pdf",
    source: "https://arxiv.org/pdf/2503.01491",
    code: "",
    pipeline: [
      ["Value pretrain", "Calibrate the critic before RL starts."],
      ["Rollout", "Generate long-CoT samples."],
      ["Decoupled GAE", "Use separate actor and critic advantage/return paths."],
      ["Clipped PPO", "Update actor with calibrated advantages."],
      ["Value update", "Keep critic aligned with long-horizon returns."]
    ],
    formulaParts: [
      ["bias", "value pretraining", "Reduces initialization bias in the scalar value head."],
      ["gae", "decoupled GAE", "Actor and critic no longer share a single decayed estimator."],
      ["loss", "PPO loss retained", "VC-PPO repairs PPO rather than removing the critic."]
    ],
    tags: ["value pretraining", "decoupled GAE", "long-CoT"]
  },
  {
    id: "vapo",
    name: "VAPO",
    year: 2025,
    month: 4,
    venue: "arXiv",
    category: "value",
    branch: "hybrid recipe",
    x: 450,
    y: 140,
    oneLine: "A value-model PPO recipe that borrows DAPO/GRPO tricks and adds length-adaptive GAE.",
    motivation: "Show that value-based PPO can still be strong if value bias, length heterogeneity, and sparse reward are handled together.",
    modifications: [
      "Uses value pretraining and decoupled GAE from VC-PPO.",
      "Uses Clip-Higher, token-level loss, and group sampling inspired by DAPO/GRPO.",
      "Adds Length-Adaptive GAE and positive-example LM loss for long reasoning stability."
    ],
    training: "Hybrid value-based PPO for long-CoT reasoning, combining calibrated critic and group/length engineering.",
    advantage: "Length-adaptive GAE over a calibrated value model.",
    objective: "PPO-style objective with VAPO system recipe: LA-GAE, token-level loss, Clip-Higher, SIL-style positive LM.",
    credit: "Token-level, value-model anchored, length-aware.",
    feedback: "Sparse verifiable reward with auxiliary positive-example language modeling.",
    openSource: "No standalone official reproduction found; related to verl ecosystem papers.",
    framework: "verl / HybridFlow ecosystem is the closest fit.",
    pdf: "../agentic_rl/VAPO/vapo_efficient_and_reliable_rl_for_advanced_reasoning.pdf",
    source: "https://arxiv.org/pdf/2504.05118",
    code: "https://github.com/verl-project/verl",
    pipeline: [
      ["Group sampling", "Sample multiple outputs per prompt to improve reward coverage."],
      ["Reward", "Use verifiable outcome reward."],
      ["LA-GAE", "Adapt lambda to sequence length for advantage propagation."],
      ["Clip-Higher", "Allow useful exploration tokens to increase more easily."],
      ["Auxiliary LM", "Add positive-example LM pressure for sparse reward stability."]
    ],
    formulaParts: [
      ["la-gae", "lambda = f(length)", "GAE's decay factor adapts to heterogeneous response length."],
      ["value", "calibrated V(s)", "Value pretraining and decoupled GAE reduce critic-side collapse."],
      ["recipe", "PPO + DAPO tricks", "The contribution is a system recipe, not a single algebraic term."]
    ],
    tags: ["length adaptive GAE", "value model", "DAPO recipe"]
  },
  {
    id: "grpo",
    name: "GRPO",
    year: 2024,
    month: 2,
    venue: "DeepSeekMath",
    category: "group",
    branch: "critic-free RLVR",
    x: 100,
    y: 300,
    oneLine: "Removes the critic and estimates baseline from rewards of a group sampled for the same prompt.",
    motivation: "Reduce PPO's memory/resource cost while keeping a clipped policy optimization backbone for verifiable reasoning.",
    modifications: [
      "Sample G responses for one prompt.",
      "Normalize each response reward by group mean and standard deviation.",
      "Use a PPO-like clipped objective with token-level importance ratios and optional KL."
    ],
    training: "Critic-free group-relative RLVR; on-policy group sampling from old policy.",
    advantage: "A_i=(R_i-mean(R_group))/std(R_group), shared across tokens of response i.",
    objective: "E[1/G sum_i 1/|o_i| sum_t min(r_i,t A_i, clip(r_i,t) A_i) - beta KL]",
    credit: "Sequence reward broadcast to all tokens in a response.",
    feedback: "Scalar outcome reward, often rule-based/verifiable.",
    openSource: "Model/code assets public; full GRPO training implementation not clearly released in DeepSeekMath repo.",
    framework: "GRPO is supported in verl and verl-agent.",
    pdf: "../agentic_rl/GRPO/deepseekmath_pushing_the_limits_of_mathematical_reasoning.pdf",
    source: "https://arxiv.org/pdf/2402.03300",
    code: "https://github.com/deepseek-ai/DeepSeek-Math",
    pipeline: [
      ["Prompt", "Take one question or task."],
      ["Group rollout", "Sample G candidate responses."],
      ["Reward", "Score each response with a rule/verifier."],
      ["Group advantage", "Normalize rewards inside the prompt group."],
      ["Clip update", "Apply PPO-style token-ratio clipping without a critic."]
    ],
    formulaParts: [
      ["group", "G responses", "The group replaces a learned value baseline."],
      ["advantage", "(R_i - mean R) / std R", "Relative reward inside the same prompt group."],
      ["ratio", "r_{i,t}", "Token-level old/new policy probability ratio."],
      ["broadcast", "A_i for all tokens", "Credit is coarse: every token in a response receives the same sign and magnitude."]
    ],
    tags: ["critic-free", "group baseline", "RLVR"]
  },
  {
    id: "dapo",
    name: "DAPO",
    year: 2025,
    month: 3,
    venue: "NeurIPS 2025",
    category: "group",
    branch: "stabilized GRPO",
    x: 270,
    y: 320,
    oneLine: "Turns GRPO into a reproducible large-scale recipe with Clip-Higher, dynamic sampling, token-level loss, and overlong shaping.",
    motivation: "Naive GRPO suffers entropy collapse, reward noise, zero-gradient prompts, and unhealthy length dynamics at scale.",
    modifications: [
      "Clip-Higher decouples lower and upper clip bounds.",
      "Dynamic sampling filters prompts where all G samples are all correct or all wrong.",
      "Token-level loss changes denominator from per-sample averaging to total token count.",
      "Overlong reward shaping reduces noise from truncated samples."
    ],
    training: "Critic-free GRPO variant, implemented as an open large-scale verl recipe.",
    advantage: "Same group-normalized response reward as GRPO, with dynamic sampling constraint 0 < #correct < G.",
    objective: "E[1/sum_i |o_i| sum_i sum_t min(r_i,t A_i, clip(r_i,t,1-eps_low,1+eps_high)A_i)]",
    credit: "Token-level loss weighting, but response-level advantage remains shared.",
    feedback: "Rule-based verifiable reward plus overlong shaping.",
    openSource: "Official code, dataset, verifier, and model assets released.",
    framework: "verl.",
    pdf: "../agentic_rl/DAPO/dapo_open_source_llm_reinforcement_learning_system_at_scale.pdf",
    source: "https://proceedings.neurips.cc/paper_files/paper/2025/file/a4277440d50f1f15d2cb4c14f7e0c0d2-Paper-Conference.pdf",
    code: "https://github.com/BytedTsinghua-SIA/DAPO",
    pipeline: [
      ["Group rollout", "Generate a group per prompt."],
      ["Verifier reward", "Score correctness and length/truncation behavior."],
      ["Dynamic filter", "Keep prompts with non-zero group variance."],
      ["Token-level loss", "Aggregate over total tokens, not sample means."],
      ["Clip-Higher", "Use asymmetric clipping to preserve exploration."]
    ],
    formulaParts: [
      ["clip", "clip(r, 1-eps_low, 1+eps_high)", "Raises the upper ceiling to reduce entropy collapse."],
      ["filter", "0 < N_{\\mathrm{correct}} < G", "Drops zero-gradient groups where relative advantage collapses."],
      ["denom", "1 / sum_i |o_i|", "Makes token-level gradients comparable across long and short responses."],
      ["shape", "overlong reward shaping", "Separates true wrong answers from truncation/noise."]
    ],
    tags: ["verl", "Clip-Higher", "dynamic sampling", "token-level loss"]
  },
  {
    id: "gspo",
    name: "GSPO",
    year: 2025,
    month: 7,
    venue: "Qwen / Alibaba",
    category: "group",
    branch: "sequence-level ratio",
    x: 450,
    y: 250,
    oneLine: "Matches reward granularity by moving importance ratio, clipping, and optimization to the sequence level.",
    motivation: "GRPO gives sequence-level rewards but corrects off-policy drift at token level, creating variance and MoE instability.",
    modifications: [
      "Define sequence ratio s_i from whole-response likelihood.",
      "Length-normalize sequence likelihood ratio to keep ratios comparable.",
      "Clip and optimize entire responses instead of individual token ratios."
    ],
    training: "Critic-free group sampling with sequence-level importance correction.",
    advantage: "Group-normalized sequence reward.",
    objective: "E[1/G sum_i min(s_i A_i, clip(s_i,1-eps,1+eps) A_i)]",
    credit: "Sequence-level optimization; token gradients inherit sequence-level weight.",
    feedback: "Sequence-level scalar reward.",
    openSource: "No separate official repo confirmed; supported in verl/verl-agent.",
    framework: "verl and verl-agent support GSPO.",
    pdf: "../agentic_rl/GSPO/gspo_group_sequence_policy_optimization.pdf",
    source: "https://arxiv.org/pdf/2507.18071",
    code: "",
    pipeline: [
      ["Group rollout", "Sample responses for each prompt."],
      ["Reward", "Score each entire response."],
      ["Sequence ratio", "Compute length-normalized likelihood ratio s_i."],
      ["Sequence clip", "Clip s_i, not each token ratio."],
      ["Update", "Optimize response-level objective."]
    ],
    formulaParts: [
      ["ratio", "s_i=(pi_theta(y_i|x)/pi_old(y_i|x))^(1/|y_i|)", "A response-level importance ratio with length normalization."],
      ["match", "reward unit = optimization unit", "The key principle: sequence reward should use sequence correction."],
      ["clip", "clip(s_i)", "Excludes overly off-policy responses rather than isolated tokens."]
    ],
    tags: ["sequence-level", "MoE stability", "critic-free"]
  },
  {
    id: "gmpo",
    name: "GMPO",
    year: 2025,
    month: 7,
    venue: "Microsoft Research",
    category: "group",
    branch: "geometric mean",
    x: 620,
    y: 250,
    oneLine: "Suppresses outlier token rewards by replacing arithmetic mean aggregation with geometric mean aggregation.",
    motivation: "GRPO can be destabilized by extreme importance-weighted token rewards and outlier ratios.",
    modifications: [
      "Replace arithmetic mean of token-level rewards with a geometric mean form.",
      "Keep PPO/GRPO style clipping while smoothing token outlier influence.",
      "Analyzes GMPO as a weighted policy gradient with more stable weights."
    ],
    training: "Plug-in GRPO objective modification for more stable token weighting.",
    advantage: "Group-relative advantage, reweighted through geometric mean token aggregation.",
    objective: "Geometric mean over token-level terms, approximately exp(1/T sum_t log reward_term_t).",
    credit: "Token-level aggregation made less sensitive to outliers.",
    feedback: "Scalar verifiable reward, propagated through group-relative policy gradient.",
    openSource: "Official code released.",
    framework: "PyTorch; repo documents verl usage; vLLM and oat-llm dependencies.",
    pdf: "../agentic_rl/GMPO/gmpo_geometric_mean_policy_optimization.pdf",
    source: "https://arxiv.org/pdf/2507.20673",
    code: "https://github.com/callsys/GMPO",
    pipeline: [
      ["Group rollout", "Sample and reward GRPO-style groups."],
      ["Token terms", "Compute token-level policy-gradient terms."],
      ["Geometric mean", "Aggregate with log/exp style smoothing."],
      ["Clip", "Retain clipped policy optimization."],
      ["Update", "Reduce influence of extreme ratios."]
    ],
    formulaParts: [
      ["geo", "GM = exp(1/T sum log term_t)", "Geometric aggregation downweights extreme outliers."],
      ["stability", "smaller effective ratio spread", "Outlier token rewards no longer dominate the whole gradient."],
      ["plug", "GRPO-compatible", "Designed as a drop-in objective change."]
    ],
    tags: ["outlier suppression", "geometric mean", "verl"]
  },
  {
    id: "gfpo",
    name: "GFPO",
    year: 2025,
    month: 8,
    venue: "arXiv",
    category: "group",
    branch: "filtered sampling",
    x: 790,
    y: 250,
    oneLine: "Samples larger groups during training, filters for concise or token-efficient responses, then trains on selected samples.",
    motivation: "RLVR improves accuracy but often inflates reasoning length with low-value filler tokens.",
    modifications: [
      "Sample a larger candidate group G per problem.",
      "Filter down to top-k by response length or reward-per-token efficiency.",
      "Compute group advantage on the filtered set, implicitly shaping for concise reasoning."
    ],
    training: "GRPO-like critic-free training with rejection/filtering before the group update.",
    advantage: "Group-relative advantage over filtered candidates.",
    objective: "GRPO objective applied to Filter_G(top-k by length or reward/token).",
    credit: "Sequence/token efficiency bias enters through selection rather than a new critic.",
    feedback: "Verifiable reward plus length or token-efficiency filter.",
    openSource: "No clear official code found.",
    framework: "Implementable in GRPO/verl data sampling layer.",
    pdf: "../agentic_rl/GFPO/gfpo_sample_more_to_think_less.pdf",
    source: "https://arxiv.org/pdf/2508.09726",
    code: "",
    pipeline: [
      ["Oversample", "Generate more candidates than will be used."],
      ["Score", "Compute reward and length/token efficiency."],
      ["Filter", "Retain shorter or reward-efficient top-k."],
      ["Group advantage", "Normalize rewards among selected samples."],
      ["Update", "Train model to prefer concise successful reasoning."]
    ],
    formulaParts: [
      ["filter", "S = top_k(G, metric)", "The main change occurs before the loss: choose which samples enter training."],
      ["metric", "reward / tokens", "Token efficiency turns cost into a training preference."],
      ["loss", "GRPO on S", "The policy objective stays close to GRPO."]
    ],
    tags: ["length control", "token efficiency", "filtering"]
  },
  {
    id: "flowgrpo",
    name: "Flow-GRPO",
    year: 2026,
    month: 4,
    venue: "ICLR 2026",
    category: "multi",
    branch: "agentic system",
    x: 100,
    y: 440,
    oneLine: "Optimizes an AgentFlow planner inside live multi-turn interaction by broadcasting outcome reward to planner decisions.",
    motivation: "Monolithic tool-use LLMs scale poorly over long horizons; modular agentic systems need on-policy training inside the interaction loop.",
    modifications: [
      "Decompose the system into planner, executor, verifier, and generator.",
      "Train the planner rather than the whole monolithic agent.",
      "Convert multi-turn optimization into tractable single-turn-style planner updates with final outcome reward."
    ],
    training: "On-policy multi-turn agent system optimization; GRPO-style group advantage over planner actions.",
    advantage: "Trajectory outcome reward is group-normalized and broadcast to planner turns.",
    objective: "Flow-GRPO planner update: group-refined advantage over in-flow planner decisions.",
    credit: "Turn-level broadcast, stable but coarse.",
    feedback: "Final task outcome in live tool/environment interaction.",
    openSource: "Project page found; no clear official code repo confirmed.",
    framework: "AgentFlow system; no public training framework confirmed.",
    pdf: "../agentic_rl/Flow-GRPO/flow_grpo_in_the_flow_agentic_system_optimization.pdf",
    source: "https://openreview.net/pdf?id=Mf5AleTUVK",
    code: "https://agentflow.stanford.edu",
    pipeline: [
      ["Planner", "Planner proposes next subgoal/action."],
      ["Executor", "Executor uses tools or environment actions."],
      ["Verifier", "Verifier checks intermediate state."],
      ["Generator", "Generator produces final response."],
      ["Broadcast reward", "Final outcome trains planner decisions with group-normalized reward."]
    ],
    formulaParts: [
      ["system", "planner only", "Training focuses on the planner module in a multi-module agent."],
      ["broadcast", "R_trajectory -> planner turns", "Final reward is reused as the signal for every relevant planner decision."],
      ["tradeoff", "stable but coarse", "This reduces complexity but can misattribute failure or success across turns."]
    ],
    tags: ["AgentFlow", "planner", "trajectory reward", "OpenReview"]
  },
  {
    id: "gigpo",
    name: "GiGPO",
    year: 2025,
    month: 5,
    venue: "NeurIPS 2025",
    category: "multi",
    branch: "step grouping",
    x: 270,
    y: 430,
    oneLine: "Adds step-level anchor-state groups inside episode-level groups for critic-free agent credit assignment.",
    motivation: "Trajectory-level GRPO cannot tell which action in a multi-step agent rollout caused success or failure.",
    modifications: [
      "Episode-level group advantage provides macro trajectory credit.",
      "Anchor state grouping finds identical environment states across existing rollouts.",
      "Step-level relative advantage compares actions taken from the same state without extra rollouts.",
      "Combine A_E and A_S into a group-in-group advantage."
    ],
    training: "Critic-free multi-turn agent RL using existing rollout redundancy for local comparisons.",
    advantage: "A(a_t)=A_E(tau_i)+omega A_S(a_t).",
    objective: "E[1/(NT) sum_i sum_t min(rho(a_t) A(a_t), clip(rho) A(a_t))] - beta KL",
    credit: "Episode plus step/action level.",
    feedback: "Sparse or delayed environment reward, discounted to steps for anchor groups.",
    openSource: "Official code released.",
    framework: "verl-agent, built on veRL.",
    pdf: "../agentic_rl/GiGPO/gigpo_group_in_group_policy_optimization_for_llm_agent_training.pdf",
    source: "https://proceedings.neurips.cc/paper_files/paper/2025/file/420c9f777c0b4f78d515e53cf74d58b2-Paper-Conference.pdf",
    code: "https://github.com/langfengQ/verl-agent",
    pipeline: [
      ["Parallel episodes", "Roll out N agents from identical initial task state."],
      ["Episode advantage", "Compare complete trajectory rewards."],
      ["Anchor states", "Hash identical environment states across trajectories."],
      ["Step advantage", "Compare actions from the same anchor state."],
      ["Joint update", "Use A_E + omega A_S in a clipped objective."]
    ],
    formulaParts: [
      ["episode", "A_E(\\tau)", "Macro reward relative to other full trajectories."],
      ["anchor", "\\mathcal{G}_S(\\tilde{s})=\\{(a_t,R_t):s_t=\\tilde{s}\\}", "Step groups are mined from existing rollouts."],
      ["joint", "A=A_E+\\omega A_S", "Credit combines global success and local action quality."]
    ],
    tags: ["verl-agent", "anchor state", "step advantage", "ALFWorld", "WebShop"]
  },
  {
    id: "hgpo",
    name: "HGPO",
    year: 2026,
    month: 4,
    venue: "ICLR 2026",
    category: "multi",
    branch: "context hierarchy",
    x: 450,
    y: 430,
    oneLine: "Fixes step-group context inconsistency by building hierarchical groups over state plus historical context.",
    motivation: "Steps with the same current state can have different histories; grouping them directly biases relative advantage.",
    modifications: [
      "Create multiple hierarchical groups with increasing context consistency.",
      "Compute advantage at each context level.",
      "Aggregate advantages using adaptive weights that favor higher-context groups while controlling variance."
    ],
    training: "Stepwise agent RL with hierarchy-of-groups advantage estimation and clipped policy update.",
    advantage: "A_H(s_t)=sum_k w_k A_k^H(s_t), w_k proportional to (k+1)^alpha.",
    objective: "E[1/(NT) sum_i sum_t min(rho(a_t) A_H(s_t), clip(rho) A_H(s_t))] - beta KL",
    credit: "Step-level, context-aware, hierarchy-weighted.",
    feedback: "Sparse delayed final reward converted into stepwise discounted returns.",
    openSource: "Official code released.",
    framework: "verl-agent recipe/hgpo.",
    pdf: "../agentic_rl/HGPO/hgpo_hierarchy_of_groups_policy_optimization.pdf",
    source: "https://openreview.net/pdf?id=T8Dev99qnz",
    code: "https://github.com/langfengQ/verl-agent/tree/master/recipe/hgpo",
    pipeline: [
      ["Stepwise rollout", "Keep prompt length bounded with memory/context."],
      ["State grouping", "Start with shared current-state groups."],
      ["Context hierarchy", "Refine groups by K levels of historical consistency."],
      ["Weighted advantage", "Fuse A_k with adaptive weights."],
      ["Clipped update", "Train with context-aware step advantages."]
    ],
    formulaParts: [
      ["issue", "context inconsistency", "Same visible state does not imply same causal context."],
      ["hierarchy", "A_H=sum_k w_k A_k", "Multiple group levels interpolate bias and variance."],
      ["weight", "w_k proportional to (k+1)^alpha", "Higher-context groups are preferred when reliable."]
    ],
    tags: ["OpenReview", "verl-agent", "context consistency", "hierarchy"]
  },
  {
    id: "arpo",
    name: "ARPO",
    year: 2025,
    month: 7,
    venue: "arXiv",
    category: "multi",
    branch: "entropy branching",
    x: 620,
    y: 420,
    oneLine: "Allocates extra rollout branches to high-entropy tool-use steps and attributes advantages to shared vs branched tokens.",
    motivation: "Tool feedback creates uncertainty spikes; trajectory-level RL under-explores these procedural decision points.",
    modifications: [
      "Monitor token entropy before and after tool calls.",
      "Branch partial rollouts where entropy variation indicates high uncertainty.",
      "Use hard or soft advantage attribution so shared prefixes and branch-specific tokens receive different signals."
    ],
    training: "Entropy-guided multi-turn agent RL with adaptive global/partial rollout budget.",
    advantage: "Group-normalized rewards with shared-token average advantage and individual branch advantage.",
    objective: "GRPO-like clipped objective over tree rollouts, with advantage attribution for shared and branch tokens.",
    credit: "Tool-step / branch-token level.",
    feedback: "Final task reward, richer exploration near tool feedback.",
    openSource: "Official code released.",
    framework: "ARPO repo; VERL/ReCall references, LLaMA-Factory SFT, vLLM rollout.",
    pdf: "../agentic_rl/ARPO/arpo_agentic_reinforced_policy_optimization.pdf",
    source: "https://arxiv.org/pdf/2507.19849",
    code: "https://github.com/RUC-NLPIR/ARPO",
    pipeline: [
      ["Global rollout", "Generate initial complete trajectories."],
      ["Entropy monitor", "Track entropy after tool calls."],
      ["Adaptive branch", "Use P_t=alpha+beta Delta H_t to branch high-uncertainty steps."],
      ["Advantage attribution", "Separate shared prefix and branch-specific credit."],
      ["Policy update", "Train on global and partial samples."]
    ],
    formulaParts: [
      ["entropy", "H_t=-sum p log p", "Measures uncertainty in the next-token distribution after tool feedback."],
      ["branch", "P_t=alpha+beta Delta H_t", "Rising entropy allocates partial rollout budget."],
      ["credit", "A_shared=mean branch advantages", "Shared segments get averaged credit; branch tokens get branch-specific credit."]
    ],
    tags: ["entropy", "tool use", "branch rollout", "vLLM"]
  },
  {
    id: "aepo",
    name: "AEPO",
    year: 2026,
    month: 4,
    venue: "WWW 2026 / arXiv",
    category: "multi",
    branch: "entropy balance",
    x: 790,
    y: 420,
    oneLine: "Balances entropy-guided exploration by preventing over-branching and preserving high-entropy token gradients.",
    motivation: "Entropy guidance can itself cause rollout collapse and gradient clipping of useful exploratory tokens.",
    modifications: [
      "Entropy pre-monitoring allocates global versus branch rollout budgets.",
      "Consecutive branch penalty prevents repeated branching on one high-entropy path.",
      "Stop-gradient clipping term preserves high-entropy token gradients in backprop.",
      "Entropy-aware advantage adds uncertainty-sensitive token weighting."
    ],
    training: "Entropy-balanced agent RL for web/tool agents.",
    advantage: "Accuracy advantage plus entropy-aware advantage shaping.",
    objective: "GRPO/DAPO-like token loss with stop-gradient adjusted clipping for high-entropy tokens.",
    credit: "High-entropy token and branch level.",
    feedback: "Final task reward plus entropy-derived exploration signal.",
    openSource: "Official code released with ARPO repo.",
    framework: "ARPO/AEPO repo; VERL/ReCall style training, vLLM rollout.",
    pdf: "../agentic_rl/AEPO/aepo_agentic_entropy_balanced_policy_optimization.pdf",
    source: "https://arxiv.org/pdf/2510.14545",
    code: "https://github.com/RUC-NLPIR/ARPO",
    pipeline: [
      ["Pre-monitor", "Estimate root/tool entropy to split rollout budget."],
      ["Balanced rollout", "Branch high-entropy points but penalize consecutive branches."],
      ["Stop-gradient clip", "Protect useful high-entropy gradients outside clip range."],
      ["Entropy advantage", "Increase learning pressure on correct uncertain tokens."],
      ["Update", "Optimize web agent behavior with stable entropy."]
    ],
    formulaParts: [
      ["penalty", "P_t=(alpha+gamma Delta H_t)(1-P_hat(l))", "Branch probability falls when a path already branched repeatedly."],
      ["clip", "clip(..., (1+eps_h) sg(delta)/delta)", "Forward value stays unchanged while backward gradient is preserved."],
      ["advantage", "A_tilde = A_acc + A_entropy", "Correct high-uncertainty tokens receive more targeted pressure."]
    ],
    tags: ["entropy balance", "stop-gradient", "web agents"]
  },
  {
    id: "appo",
    name: "APPO",
    year: 2026,
    month: 6,
    venue: "arXiv",
    category: "multi",
    branch: "procedure credit",
    x: 960,
    y: 420,
    oneLine: "Moves branching and credit from tool-call boundaries to fine-grained procedure decision points.",
    motivation: "Influential decisions are distributed throughout generated procedures; token entropy alone is an unreliable branching proxy.",
    modifications: [
      "Select branching points with a Branching Score that estimates downstream procedural impact.",
      "Branch at fine-grained sequence decision points, not only tool-call boundaries.",
      "Use procedure-level advantage scaling with future-aware dual-group comparisons."
    ],
    training: "Fine-grained agentic RL over procedural branches and future-aware credit.",
    advantage: "Procedure-level scaled advantages over branched rollouts.",
    objective: "APPO objective builds on group-based clipped RL with procedure-level branching and advantage scaling.",
    credit: "Procedure/decision-point level.",
    feedback: "Outcome reward over branched agent trajectories.",
    openSource: "No clear official code found.",
    framework: "Not confirmed.",
    pdf: "../agentic_rl/APPO/appo_agentic_procedural_policy_optimization.pdf",
    source: "https://arxiv.org/pdf/2606.12384",
    code: "",
    pipeline: [
      ["Pilot trace", "Observe sequence decision points."],
      ["Branching Score", "Score whether a point changes downstream continuations."],
      ["Procedure branch", "Create branches at high-impact procedural points."],
      ["Future-aware advantage", "Scale credit by downstream outcome differences."],
      ["Policy update", "Optimize fine-grained procedural behavior."]
    ],
    formulaParts: [
      ["where", "Branching Score", "Filters high-entropy but low-impact tokens from real procedural forks."],
      ["unit", "procedure-level", "Credit target is finer than a tool call and coarser than arbitrary tokens."],
      ["future", "future-aware advantage", "A branch is valued by how it changes later trajectory outcomes."]
    ],
    tags: ["procedure", "branching score", "future-aware credit"]
  },
  {
    id: "turnppo",
    name: "Turn-PPO",
    year: 2025,
    month: 12,
    venue: "Findings of EACL 2026",
    category: "multi",
    branch: "turn advantage",
    x: 100,
    y: 535,
    oneLine: "Estimates advantages at the turn level so PPO can train multi-turn agent actions with less noisy credit.",
    motivation: "Outcome-level PPO broadcasts a final reward across an entire conversation, which obscures which turn helped or hurt the agent.",
    modifications: [
      "Treat each agent turn as the main credit unit rather than flattening the whole trajectory.",
      "Estimate turn-level advantages from multi-turn interaction rewards.",
      "Apply PPO clipping to turn actions while preserving the conversational rollout structure."
    ],
    training: "PPO for multi-turn agentic LLMs with turn-level advantage estimation.",
    advantage: "Turn-level advantage estimates replace a single trajectory reward broadcast.",
    objective: "PPO clipped objective with A_turn for each agent turn.",
    credit: "Turn/action level across a multi-turn trajectory.",
    feedback: "Environment or task reward attributed back to dialogue/tool-use turns.",
    openSource: "No clear official code found.",
    framework: "PPO-style multi-turn RL; formal Findings of EACL 2026 paper.",
    pdf: "../agentic_rl/Turn-PPO/turn_ppo_turn_level_advantage_estimation_for_multi_turn_rl.pdf",
    source: "https://aclanthology.org/2026.findings-eacl.328.pdf",
    code: "",
    pipeline: [
      ["Multi-turn rollout", "Collect agent-environment conversations."],
      ["Turn segmentation", "Group generated tokens/actions by interaction turn."],
      ["Turn advantage", "Estimate which turns improve downstream outcome."],
      ["PPO update", "Apply clipped policy updates with turn-level advantages."],
      ["Iterate", "Refresh rollouts as the policy changes."]
    ],
    formulaParts: [
      ["unit", "turn t", "The optimization unit is a complete agent turn rather than an arbitrary token span."],
      ["advantage", "A_turn", "Credit is estimated per turn to avoid uniform trajectory broadcasting."],
      ["loss", "min(r_t A_turn, clip(r_t) A_turn)", "PPO clipping remains, but its advantage is turn-specific."]
    ],
    tags: ["turn-level", "PPO", "multi-turn", "credit assignment"]
  },
  {
    id: "hiper",
    name: "HiPER",
    year: 2026,
    month: 2,
    venue: "ICML 2026 / arXiv",
    category: "multi",
    branch: "hierarchical credit",
    x: 450,
    y: 535,
    oneLine: "Uses hierarchical reinforcement learning with explicit credit assignment for LLM agents across high-level plans and low-level actions.",
    motivation: "Long-horizon agent tasks mix strategic planning and execution; flat RL signals make it hard to identify whether failures came from the plan or from action execution.",
    modifications: [
      "Decompose agent behavior into hierarchical decision levels.",
      "Assign credit explicitly across high-level planning and lower-level execution.",
      "Train the hierarchy so global task outcomes can supervise the responsible sub-decisions."
    ],
    training: "Hierarchical RL for LLM agents with explicit credit assignment.",
    advantage: "Hierarchical credit separates plan-level and action-level learning signals.",
    objective: "Hierarchical RL objective with explicit credit assignment over plan/action levels.",
    credit: "Plan/subgoal/action hierarchy.",
    feedback: "Task outcome and intermediate execution feedback assigned to hierarchy levels.",
    openSource: "No clear official code found.",
    framework: "Hierarchical agent RL; paper marked as ICML 2026 on arXiv.",
    pdf: "../agentic_rl/HiPER/hiper_hierarchical_rl_explicit_credit_assignment_for_llm_agents.pdf",
    source: "https://arxiv.org/pdf/2602.16165",
    code: "",
    pipeline: [
      ["Task rollout", "Run a long-horizon LLM agent trajectory."],
      ["Hierarchy split", "Separate high-level plan or subgoal decisions from execution actions."],
      ["Explicit credit", "Assign responsibility to the level that caused success or failure."],
      ["Hierarchical update", "Optimize planner and executor signals with distinct credit."],
      ["Refine policy", "Improve both strategic and operational behavior."]
    ],
    formulaParts: [
      ["hierarchy", "\\mathrm{plan} \\to \\mathrm{action}", "The trajectory is decomposed into levels of decision-making."],
      ["credit", "A_{\\mathrm{plan}} + A_{\\mathrm{action}}", "Credit assignment distinguishes strategic and execution errors."],
      ["objective", "L_{\\mathrm{HRL}}", "The RL objective is structured around explicit hierarchical credit."]
    ],
    tags: ["hierarchical RL", "explicit credit", "LLM agents", "ICML"]
  },
  {
    id: "stephrl",
    name: "STEP-HRL",
    year: 2026,
    month: 6,
    venue: "ACL 2026",
    paperTitle: "Hierarchical Reinforcement Learning with Augmented Step-Level Transitions for LLM Agents",
    category: "multi",
    branch: "augmented step transitions",
    x: 620,
    y: 535,
    oneLine: "Uses local-progress summaries to build augmented step-level transitions for high-level subtasks and low-level actions.",
    motivation: "History-conditioned LLM agents keep feeding ever-growing interaction histories into each decision, which raises cost and buries decision-critical signals.",
    modifications: [
      "Introduce a local-progress policy that summarizes subtask-local history into compact progress states.",
      "Condition the low-level policy on current subtask, current observation, and local progress instead of the full history.",
      "Pass final local progress from completed subtasks to the high-level policy as global progress.",
      "Share one policy backbone across high-level, low-level, and local-progress policies while using separate critics for offline RL."
    ],
    training: "Behavior cloning followed by step-level offline HRL with utterance-level Q/V critics and advantage-weighted regression.",
    advantage: "A(s,u)=Q_phi(s,u)-V_psi(s) over augmented step-level transitions.",
    objective: "Offline HRL objective: IQL/ILQL-style Q/V learning plus advantage-weighted regression over augmented step-level transitions.",
    credit: "High-level subtask transitions and low-level primitive-action transitions, both represented at step level.",
    feedback: "Expert demonstrations, collected offline rollouts, intrinsic subtask-completion reward, and extrinsic environment reward.",
    openSource: "Official code released.",
    framework: "Official STEP-HRL repo; deepspeed-based offline HRL pipeline, built on GLIDER rather than verl.",
    pdf: "../agentic_rl/STEP-HRL/step_hrl_hierarchical_reinforcement_learning_with_augmented_step_level_transitions.pdf",
    source: "https://aclanthology.org/2026.acl-long.318.pdf",
    code: "https://github.com/TonyStark042/STEP-HRL",
    pipeline: [
      ["Expert data", "Use expert trajectories to create high-level, low-level, and local-progress supervision."],
      ["Behavior cloning", "Initialize the shared policy backbone for the three policy roles."],
      ["Collect rollouts", "Generate additional trajectories with the behavior-cloned policies."],
      ["Step-level offline RL", "Train Q/V critics and use advantage-weighted regression over augmented transitions."],
      ["Compact execution", "Run with current subtask, observation, and local progress rather than full history."]
    ],
    formulaParts: [
      ["local-progress", "p_t^k \\sim \\pi_p(\\cdot\\mid g_k,a_{t-1}^k,o_t^k,p_{t-1}^k)", "Local progress folds subtask-local history into a compact state."],
      ["low-level", "a_t^k \\sim \\pi_l(\\cdot\\mid g_k,p_t^k,o_t^k)", "Primitive actions depend on subtask, observation, and local progress."],
      ["high-level", "g_{k+1} \\sim \\pi_h(\\cdot\\mid c,G_k,\\hat{p}_k,o_0^{k+1})", "Completed subtasks and final local progress drive the next subtask."],
      ["offline-rl", "A(s,u)=Q_\\phi(s,u)-V_\\psi(s)", "The policy is improved by advantage-weighted regression on step transitions."]
    ],
    tags: ["ACL", "HRL", "offline RL", "local progress", "ScienceWorld", "ALFWorld"]
  },
  {
    id: "hipif",
    name: "HIPIF",
    year: 2026,
    month: 6,
    venue: "arXiv",
    paperTitle: "HIPIF: Hierarchical Planning and Information Folding for Long-Horizon LLM Agent Learning",
    category: "multi",
    branch: "planning + folding",
    x: 790,
    y: 535,
    oneLine: "Trains LLM agents to plan with explicit subgoals while folding completed subgoal histories to reduce long-context interference.",
    motivation: "Long-horizon agents need both hierarchical decomposition and context management; credit assignment alone does not prevent growing histories from confusing state tracking.",
    modifications: [
      "Organize execution around explicit subgoals and fold completed subgoal histories into compact records.",
      "Use hierarchical reflection to decide whether to continue a subgoal or transition to the next one.",
      "Add rule-based subgoal-oriented process rewards for invalid subgoals, failed terminal observations, repeated actions, and format errors.",
      "Train subgoal-centric decisions with GRPO-style group normalization over step-level scores."
    ],
    training: "End-to-end GRPO-style RL for hierarchical planning, information folding, reflection, and subgoal execution.",
    advantage: "Step-level advantage from final task outcome plus subgoal-oriented process rewards, normalized within sampled groups.",
    objective: "HIPIF objective: GRPO over subgoal-centric decisions with folded context, hierarchical reflection, and subgoal-oriented process rewards.",
    credit: "Subgoal proposal, subgoal transition, and within-subgoal execution steps.",
    feedback: "Terminal environment reward plus rule-based process penalties from environment feedback.",
    openSource: "No official code found.",
    framework: "Experiments implemented with verl-agent; no public repo found as of this update.",
    pdf: "../agentic_rl/HIPIF/hipif_hierarchical_planning_and_information_folding_for_long_horizon_llm_agent_learning.pdf",
    source: "https://arxiv.org/pdf/2606.10507",
    code: "",
    pipeline: [
      ["Subgoal context", "Maintain task, folded completed subgoals, current subgoal, and local action-observation history."],
      ["Hierarchical reflection", "Judge whether the current subgoal is complete and reflect on the next action or next subgoal."],
      ["Information folding", "Fold completed subgoal execution into compact history before moving on."],
      ["Process rewards", "Penalize invalid subgoals, failed subgoal endings, repeated actions, and format errors."],
      ["GRPO update", "Normalize step-level scores inside sampled groups and update the policy."]
    ],
    formulaParts: [
      ["context", "C_{k,j}=[c;H_{<k};g_k;T_{k,j}]", "The policy sees folded global progress plus current-subgoal local history."],
      ["decision", "y_{k,j} \\sim \\pi_\\theta(\\cdot\\mid C_{k,j},\\xi_{k,j})", "The output may continue the current subgoal or transition to a new one."],
      ["reflection", "(\\eta_{k,t},z_{k,t}) \\sim \\pi_\\theta(\\cdot\\mid H_{<k},g_k,h_{k,t},o_t)", "Reflection judges subgoal completion and prepares the next decision."],
      ["score", "S_t=R_{\\mathrm{env}}+r_t^{\\mathrm{proc}}", "Step-level scores combine terminal success with local process penalties."]
    ],
    tags: ["HRL", "information folding", "GRPO", "verl-agent", "ALFWorld", "ScienceWorld", "VirtualHome"]
  },
  {
    id: "opd",
    name: "OPD",
    year: 2023,
    month: 6,
    venue: "ICLR 2024",
    category: "opd",
    branch: "self-generated mistakes",
    x: 100,
    y: 710,
    oneLine: "Generalized Knowledge Distillation trains the student on its own samples so the teacher corrects self-generated mistakes.",
    motivation: "Standard distillation trains on expert or reference prefixes, but during inference the student visits its own imperfect states and needs correction there.",
    modifications: [
      "Sample outputs from the student policy rather than only from expert demonstrations.",
      "Ask the teacher to score or relabel the student's self-generated attempts.",
      "Optimize a generalized distillation objective on the student's on-policy distribution.",
      "Use self-generated mistakes as training states, reducing exposure mismatch between training and inference."
    ],
    training: "On-policy distillation / Generalized Knowledge Distillation over student-sampled generations.",
    advantage: "No RL advantage is required; the training signal is teacher supervision on student-generated samples.",
    objective: "E_{y~pi_student(.|x)}[L_KD(pi_teacher(.|x,y), pi_student(.|x,y))]",
    credit: "Sequence/token supervision on states induced by the student policy.",
    feedback: "Teacher feedback on the student's self-generated mistakes.",
    openSource: "No clear official code found; TRL-style GKD trainers can implement the pattern.",
    framework: "GKD / on-policy distillation; survey paper kept only as background reference.",
    pdf: "../llm_distillation/OPD/opd_on_policy_distillation_learning_from_self_generated_mistakes.pdf",
    source: "https://proceedings.iclr.cc/paper_files/paper/2024/file/5be69a584901a26c521c2b51e40a4c20-Paper-Conference.pdf",
    code: "",
    pipeline: [
      ["Student sample", "The student generates candidate responses from its current policy."],
      ["Self-generated mistakes", "Incorrect or weak student samples become the training states."],
      ["Teacher feedback", "The teacher provides supervision on those student-created samples."],
      ["GKD loss", "Optimize distillation on the student's on-policy data distribution."],
      ["Iterate", "Repeat as the student distribution shifts."]
    ],
    formulaParts: [
      ["distribution", "y ~ pi_student(.|x)", "The samples are generated by the learner, not by the expert data distribution."],
      ["teacher", "pi_teacher(.|x,y)", "Teacher supervision is applied to states created by the student's own outputs."],
      ["loss", "L_KD(teacher, student)", "Knowledge distillation is performed on the on-policy student distribution."],
      ["effect", "learn from mistakes", "The objective targets errors the student actually makes at inference time."]
    ],
    tags: ["GKD", "on-policy", "distillation", "self-generated mistakes"]
  },
  {
    id: "opsd",
    name: "OPSD",
    year: 2026,
    month: 1,
    venue: "arXiv",
    category: "opd",
    branch: "self teacher",
    x: 270,
    y: 640,
    oneLine: "Uses the same model as teacher and student, with the teacher conditioned on privileged reasoning traces.",
    motivation: "Avoid a separate large teacher while exploiting verified traces or reference answers available in reasoning datasets.",
    modifications: [
      "Student rolls out with only the problem.",
      "Teacher is the same model but sees privileged information.",
      "Minimize per-token divergence between privileged teacher and non-privileged student on student trajectories."
    ],
    training: "On-policy self-distillation with information-asymmetric teacher/student contexts.",
    advantage: "No RL advantage; teacher-student token divergence gives dense signal.",
    objective: "sum_t D(pi_theta(.|x, privileged, y_<t) || pi_theta(.|x, y_<t)) over student rollout prefixes.",
    credit: "Token-level dense distillation.",
    feedback: "Privileged trace/answer rather than scalar environment reward.",
    openSource: "Official code released.",
    framework: "trl experimental GOLD trainer, Accelerate, vLLM.",
    pdf: "../llm_distillation/OPSD/opsd_self_distilled_reasoner.pdf",
    source: "https://arxiv.org/pdf/2601.18734",
    code: "https://github.com/siyan-zhao/OPSD",
    pipeline: [
      ["Student rollout", "Generate with problem only."],
      ["Privileged context", "Attach verified reasoning trace or answer for teacher view."],
      ["Self teacher", "Same model produces token distribution under richer context."],
      ["Divergence", "Minimize teacher/student token distribution gap."],
      ["Update", "Improve reasoning without external teacher."]
    ],
    formulaParts: [
      ["contexts", "pi_T(.|x,z) vs pi_S(.|x)", "Teacher and student are the same weights under different information."],
      ["loss", "per-token KL", "Dense supervision is applied at each student prefix."],
      ["risk", "privileged leakage", "The teacher may rely on information unavailable to the student at inference."]
    ],
    tags: ["trl", "GOLD", "privileged info", "self-distillation"]
  },
  {
    id: "skillsd",
    name: "Skill-SD",
    year: 2026,
    month: 4,
    venue: "arXiv",
    category: "opdrl",
    branch: "skill-conditioned teacher",
    x: 450,
    y: 760,
    oneLine: "Turns completed multi-turn trajectories into skill-conditioned teacher context and distills it back into a plain-prompt student.",
    motivation: "Fixed privileged answers do not fit agent tasks with many valid strategies, and naive OPSD plus RL can collapse.",
    modifications: [
      "Summarize completed trajectories into compact natural-language skills covering success, mistakes, and workflows.",
      "Condition only the teacher on retrieved skills while the student acts under the plain prompt.",
      "Select skills with UCB and dynamically synchronize the teacher with the current student.",
      "Add importance-weighted sampled-token reverse-KL self-distillation to GRPO."
    ],
    training: "GRPO reward maximization plus auxiliary skill-conditioned self-distillation.",
    advantage: "GRPO group advantage from completion-rate reward; SDL supplies token-level teacher shaping.",
    objective: "L_total = L_GRPO + lambda L_SDL, L_SDL = 1/N sum_i sum_t rho_on_i,t (exp(-ell_i,t)-1+ell_i,t)",
    credit: "Trajectory-level GRPO selects good rollouts; sampled-token SDL redistributes token probability along those rollouts.",
    feedback: "Completion-rate environment reward plus skills summarized from prior completed trajectories.",
    openSource: "No usable official code found; project page says Code Coming Soon.",
    framework: "GRPO plus sampled-token reverse-KL SDL; AppWorld/Sokoban; UCB skill retrieval.",
    pdf: "../llm_distillation/Skill-SD/skill_sd_skill_conditioned_self_distillation_for_multi_turn_llm_agents.pdf",
    source: "https://arxiv.org/pdf/2604.10674",
    code: "",
    pipeline: [
      ["Agent rollout", "Collect multi-turn trajectories and completion reward."],
      ["Skill summary", "Summarize success, mistake, and workflow patterns into a skill bank."],
      ["UCB retrieval", "Pick a task-local skill for teacher conditioning."],
      ["Skill teacher", "Teacher sees x plus the retrieved skill; student sees x only."],
      ["GRPO + SDL", "Optimize reward and sampled-token reverse-KL self-distillation together."]
    ],
    formulaParts: [
      ["skill", "S(x)=UCB(B(x))", "Retrieve one task-local skill from the skill bank for the teacher view."],
      ["teacher", "pi_tea(.|x plus S(x), y_<t)", "Teacher gets skill-augmented context; student does not."],
      ["sdl", "rho_on (exp(-ell)-1+ell)", "Importance-corrected reverse-KL sampled-token distillation."],
      ["total", "L_GRPO + lambda L_SDL", "Reward remains task-level while SDL supplies dense token shaping."]
    ],
    tags: ["skills", "reverse-KL", "GRPO", "AppWorld", "Sokoban"]
  },
  {
    id: "sdar",
    name: "SDAR",
    year: 2026,
    month: 5,
    venue: "arXiv",
    category: "opdrl",
    branch: "gated self-distillation",
    x: 620,
    y: 760,
    oneLine: "Keeps GRPO untouched and adds gated token-level OPSD as a controlled auxiliary objective for multi-turn agents.",
    motivation: "Multi-turn OPSD can destabilize because privileged teacher guidance is asymmetric and negative gaps may be noisy.",
    modifications: [
      "Treat OPSD as an auxiliary term rather than changing the RL advantage.",
      "Use detached token gates from entropy, teacher-student gap, or a soft-OR of both signals.",
      "Strengthen positive-gap teacher endorsements and attenuate negative-gap tokens.",
      "Preserve the verifier-driven GRPO policy loss as the main optimization signal."
    ],
    training: "GRPO primary objective plus a gated OPSD auxiliary loss.",
    advantage: "RL advantage from GRPO remains unchanged; gates control only distillation intensity.",
    objective: "L = L_GRPO + lambda_SDAR L_SDAR, ell_t_SDAR = g_t (log pi_theta^+(y_t|s_t^+) - log pi_theta(y_t|s_t))",
    credit: "Token-level distillation gate on top of trajectory/sequence-level RL reward.",
    feedback: "Environment reward plus skill-conditioned privileged context; gates by entropy or teacher-student gap.",
    openSource: "Official code released.",
    framework: "SDAR repo; GRPO plus gated OPSD; ALFWorld/Search-QA/WebShop; Qwen2.5/Qwen3.",
    pdf: "../llm_distillation/SDAR/sdar_self_distilled_agentic_reinforcement_learning.pdf",
    source: "https://arxiv.org/pdf/2605.15155",
    code: "https://github.com/ZJU-REAL/SDAR",
    pipeline: [
      ["Agent rollout", "Run multi-turn tasks and receive verifier reward."],
      ["Privileged view", "Build skill-conditioned teacher context for the same decision states."],
      ["Gate tokens", "Compute entropy, teacher-student gap, or soft-OR gates with stop-gradient."],
      ["Auxiliary distill", "Apply token-level OPSD only where the gate trusts the teacher signal."],
      ["GRPO update", "Keep the main RL loss and advantage semantics unchanged."]
    ],
    formulaParts: [
      ["gap", "\\Delta_t = \\log \\pi_T(y_t\\mid s_t^+) - \\log \\pi_\\theta(y_t\\mid s_t)", "Positive gaps mean the privileged teacher endorses the sampled token more strongly."],
      ["gate", "g_t = \\sigma(\\beta \\Delta_t)", "Detached gates scale auxiliary distillation without rewriting RL advantage."],
      ["loss", "\\ell_t^{\\mathrm{SDAR}} = g_t\\!\\left(\\log \\pi_\\theta^+(y_t\\mid s_t^+) - \\log \\pi_\\theta(y_t\\mid s_t)\\right)", "The extra pressure is token-level and controlled by trust in the teacher signal."],
      ["total", "L_{\\mathrm{GRPO}} + \\lambda_{\\mathrm{SDAR}} L_{\\mathrm{SDAR}}", "RL remains primary; SDAR is a stabilizing auxiliary objective."]
    ],
    tags: ["gating", "OPSD", "GRPO", "SkillBank", "ALFWorld"]
  },
  {
    id: "sdpo",
    name: "SDPO",
    year: 2026,
    month: 1,
    venue: "arXiv",
    category: "opdrl",
    branch: "rich feedback",
    x: 450,
    y: 640,
    oneLine: "Turns rich environment feedback into a dense self-distillation signal from the current model conditioned on feedback.",
    motivation: "Verifiable environments often return error messages, judge outputs, or observations; scalar reward discards why a rollout failed.",
    modifications: [
      "Formalize reinforcement learning with rich feedback.",
      "Condition the current model on feedback and treat it as a self-teacher.",
      "Distill feedback-informed next-token predictions back into the original policy."
    ],
    training: "Self-Distillation Policy Optimization over student rollouts plus tokenized feedback.",
    advantage: "Dense logit-level/token-level distillation replaces or augments sparse advantage.",
    objective: "KL/JS between feedback-conditioned self-teacher logits and policy logits on the original rollout.",
    credit: "Token-level dense signal from feedback-informed hindsight.",
    feedback: "Runtime errors, judge feedback, tool outputs, or successful in-batch examples.",
    openSource: "Official code released.",
    framework: "verl-based repo with rich feedback datasets and multi-turn baselines.",
    pdf: "../llm_distillation/SDPO/sdpo_reinforcement_learning_via_self_distillation.pdf",
    source: "https://arxiv.org/pdf/2601.20802",
    code: "https://github.com/lasgroup/SDPO",
    pipeline: [
      ["Rollout", "Policy attempts a verifiable task."],
      ["Rich feedback", "Environment returns textual error/judge/tool feedback."],
      ["Self teacher", "Current model is reconditioned on feedback."],
      ["Logit distill", "Distill feedback-informed next-token distribution."],
      ["Update", "Use dense hindsight signal with or without RLVR."]
    ],
    formulaParts: [
      ["feedback", "f = env(y)", "Feedback contains why the attempt failed or succeeded."],
      ["teacher", "pi_theta(.|x,y_<t,f)", "The same model becomes a teacher when it can see hindsight feedback."],
      ["loss", "D(logits_teacher || logits_student)", "Dense token-level correction replaces a single binary reward."]
    ],
    tags: ["rich feedback", "verl", "self teacher", "code/math"]
  },
  {
    id: "rlsd",
    name: "RLSD",
    year: 2026,
    month: 4,
    venue: "arXiv",
    category: "opdrl",
    branch: "RL plus SD",
    x: 620,
    y: 640,
    oneLine: "Keeps environment reward as update direction and uses self-distillation only for fine-grained update magnitude.",
    motivation: "Pure privileged self-distillation can leak information and destabilize long-term training.",
    modifications: [
      "Diagnose privileged teacher information leakage in OPSD.",
      "Let RLVR/verifiable reward determine gradient direction.",
      "Use token-level self-distillation policy differences to scale update magnitude."
    ],
    training: "Hybrid RLVR plus self-distillation, with reward anchoring direction and distillation modulating strength.",
    advantage: "Reward-derived RL advantage direction, reweighted by token-level policy difference.",
    objective: "RLVR objective whose token update magnitude is shaped by self-distilled policy difference.",
    credit: "Token-level magnitude weighting anchored by sequence reward.",
    feedback: "Verifiable reward plus privileged/self-distillation signal.",
    openSource: "No clear official code found.",
    framework: "Likely implementable in RLVR frameworks with token weighting.",
    pdf: "../llm_distillation/RLSD/rlsd_self_distilled_rlvr.pdf",
    source: "https://arxiv.org/pdf/2604.03128",
    code: "",
    pipeline: [
      ["RLVR rollout", "Generate attempts and receive verifiable reward."],
      ["Privileged self-view", "Compute teacher/student policy difference."],
      ["Direction", "Use reward to decide positive or negative update."],
      ["Magnitude", "Use policy difference as token-level update strength."],
      ["Hybrid update", "Avoid letting privileged teacher set direction alone."]
    ],
    formulaParts: [
      ["direction", "sign from reward", "Environment reward remains the trusted source of direction."],
      ["magnitude", "|pi_T - pi_S|", "Self-distillation decides which tokens deserve stronger updates."],
      ["guardrail", "no teacher-only direction", "Reduces leakage and ill-posed privileged optimization."]
    ],
    tags: ["RLVR", "self-distillation", "leakage", "token weighting"]
  },
  {
    id: "serl",
    name: "SERL",
    year: 2026,
    month: 5,
    venue: "arXiv",
    category: "opdrl",
    branch: "selective hindsight",
    x: 790,
    y: 640,
    oneLine: "Selectively decides what and when to distill in multi-turn agents, using task reward for direction and environment feedback for placement/magnitude.",
    motivation: "In multi-turn agents, future observations and feedback are abundant, but indiscriminate hindsight distillation can teach the wrong actions.",
    modifications: [
      "Compare feedback sources and insertion granularities for multi-turn agents.",
      "Use environment feedback to choose action-relevant anchors.",
      "Keep task reward as update direction and use feedback to reweight placement and magnitude."
    ],
    training: "Selective Environment-Reweighted Learning for multi-turn agents.",
    advantage: "Task reward direction with environment-feedback reweighting.",
    objective: "RL-style update reweighted at selected executable actions / anchors by hindsight feedback.",
    credit: "Action/anchor-level selective dense weighting.",
    feedback: "Observation, error, future trajectory, success traces, and environment responses.",
    openSource: "Official code released.",
    framework: "SERL repo for ALFWorld/WebShop style multi-turn agents.",
    pdf: "../llm_distillation/SERL/serl_what_and_when_to_distill.pdf",
    source: "https://arxiv.org/pdf/2605.19447",
    code: "https://github.com/OliverLeeXZ/SERL",
    pipeline: [
      ["Agent rollout", "Interact with environment over multiple turns."],
      ["Outcome reward", "Keep final task success as update direction."],
      ["Feedback selection", "Choose useful hindsight/environment signals."],
      ["Anchor placement", "Apply pressure to executable actions or meaningful anchors."],
      ["Reweighted update", "Scale learning magnitude without blindly broadcasting reward."]
    ],
    formulaParts: [
      ["what", "select feedback source", "Not every future observation is useful supervision."],
      ["when", "select anchor/action", "Distillation is placed where the environment signal is action-relevant."],
      ["direction", "task reward + feedback weight", "Reward decides direction; feedback decides placement and strength."]
    ],
    tags: ["hindsight", "multi-turn", "ALFWorld", "WebShop"]
  }
];

const edges = [
  ["ppo", "vineppo"], ["ppo", "vcppo"], ["vcppo", "vapo"], ["dapo", "vapo"], ["grpo", "vapo"],
  ["ppo", "grpo"], ["grpo", "dapo"], ["grpo", "gspo"], ["grpo", "gmpo"], ["grpo", "gfpo"],
  ["ppo", "turnppo"], ["grpo", "flowgrpo"], ["flowgrpo", "turnppo"], ["grpo", "gigpo"], ["turnppo", "gigpo"], ["gigpo", "hgpo"], ["hgpo", "hiper"], ["hgpo", "stephrl"], ["hiper", "stephrl"], ["stephrl", "hipif"], ["grpo", "hipif"], ["grpo", "arpo"], ["arpo", "aepo"], ["aepo", "appo"], ["hiper", "appo"], ["hipif", "appo"],
  ["opd", "opsd"], ["opd", "sdpo"], ["opd", "skillsd"], ["opsd", "skillsd"], ["grpo", "skillsd"], ["skillsd", "sdar"],
  ["opsd", "rlsd"], ["sdpo", "rlsd"], ["rlsd", "sdar"], ["rlsd", "serl"], ["sdar", "serl"], ["flowgrpo", "serl"], ["gigpo", "serl"], ["hgpo", "serl"]
];

const compareFields = [
  ["motivation", "motivation"],
  ["coreModification", "modifications"],
  ["trainingParadigm", "training"],
  ["advantageSignal", "advantage"],
  ["objective", "objective"],
  ["credit", "credit"],
  ["feedback", "feedback"],
  ["framework", "framework"]
];

const i18n = window.llmI18n || { ui: {}, methods: {} };
const languageStorageKey = "llm-explainer-lang-v2";
let currentLang = readStoredLanguage() || "zh";

function readStoredLanguage() {
  try {
    return window.localStorage?.getItem(languageStorageKey);
  } catch {
    return null;
  }
}

function writeStoredLanguage(lang) {
  try {
    window.localStorage?.setItem(languageStorageKey, lang);
  } catch {
    // Language switching still works for the current session when storage is unavailable.
  }
}

function ui(key) {
  return i18n.ui?.[currentLang]?.[key] ?? i18n.ui?.en?.[key] ?? key;
}

function categoryLabel(category) {
  return i18n.ui?.[currentLang]?.categories?.[category] ?? categories[category].label;
}

function methodCopy(method) {
  return i18n.methods?.[currentLang]?.[method.id] || {};
}

function mValue(method, key) {
  const translated = methodCopy(method)[key];
  return translated === undefined ? method[key] : translated;
}

function mPipeline(method) {
  return mValue(method, "pipeline") || method.pipeline;
}

function mFormulaParts(method) {
  return mValue(method, "formulaParts") || method.formulaParts;
}

function applyStaticCopy() {
  document.documentElement.lang = currentLang === "zh" ? "zh" : "en";
  document.title = ui("brand");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = ui(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", ui(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.setAttribute("title", ui(node.dataset.i18nTitle));
  });
  const languageToggle = document.getElementById("language-toggle");
  if (languageToggle) {
    languageToggle.textContent = currentLang === "zh" ? "EN" : "中文";
    languageToggle.setAttribute("aria-label", ui("langTitle"));
  }
}

function toggleLanguage() {
  currentLang = currentLang === "zh" ? "en" : "zh";
  writeStoredLanguage(currentLang);
  applyStaticCopy();
  renderAll();
}

const greekTokens = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  eps: "ε",
  lambda: "λ",
  theta: "θ",
  sigma: "σ",
  rho: "ρ",
  tau: "τ",
  omega: "ω",
  pi: "π"
};

let selectedId = "grpo";
let selectedFormulaPart = "advantage";
let activeCategory = "all";

const byId = Object.fromEntries(methods.map((m) => [m.id, m]));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeMathText(value) {
  return String(value)
    .replaceAll("->", "→")
    .replaceAll("<=", "≤")
    .replaceAll(">=", "≥")
    .replaceAll("!=", "≠")
    .replaceAll("+-", "±")
    .replaceAll("1/(NT)", "1 / (N T)")
    .replaceAll("1/G", "1 / G")
    .replaceAll("1/K", "1 / K")
    .replaceAll("sum_t", "Σ_t")
    .replaceAll("sum_i", "Σ_i")
    .replaceAll("sum_k", "Σ_k")
    .replaceAll("sum_j", "Σ_j")
    .replaceAll("sum", "Σ")
    .replaceAll("ell", "ℓ")
    .replaceAll("min", "min")
    .replaceAll("clip", "clip")
    .replaceAll("mean", "mean")
    .replaceAll("std", "std")
    .replaceAll("proportional to", "∝")
    .replaceAll("||", "∥")
    .replaceAll("~", "∼");
}

function tokenToMath(token) {
  if (greekTokens[token]) return greekTokens[token];
  return token;
}

function renderMath(value, mode = "inline") {
  let text = normalizeMathText(value);
  text = escapeHtml(text);
  text = text.replace(/\b(alpha|beta|gamma|delta|epsilon|eps|lambda|theta|sigma|rho|tau|omega|pi)\b/g, (_, token) => tokenToMath(token));
  text = text.replace(/\bpi_/g, "π_");
  text = text.replace(/\brho_/g, "ρ_");
  text = text.replace(/\blambda_/g, "λ_");
  text = text.replace(/\bsigma\(/g, "σ(");
  text = text.replace(/\bE\[/g, "𝔼[");
  text = text.replace(/\bKL\b/g, "D<sub>KL</sub>");
  text = text.replace(/\bV_MC\b/g, "V<sub>MC</sub>");
  text = text.replace(/\bA_MC\b/g, "A<sub>MC</sub>");
  text = text.replace(/\bA_shared\b/g, "A<sub>shared</sub>");
  text = text.replace(/\bA_entropy\b/g, "A<sub>entropy</sub>");
  text = text.replace(/\bA_acc\b/g, "A<sub>acc</sub>");
  text = text.replace(/\bA_E\b/g, "A<sub>E</sub>");
  text = text.replace(/\bA_S\b/g, "A<sub>S</sub>");
  text = text.replace(/\bA_H\b/g, "A<sub>H</sub>");
  text = text.replace(/\bD_f\b/g, "D<sub>f</sub>");
  text = text.replace(/\bFilter_G\b/g, "Filter<sub>G</sub>");
  text = text.replace(/\bP_hat\b/g, "P̂");
  text = text.replace(/\bDelta H\b/g, "ΔH");
  text = text.replace(/\bDelta\b/g, "Δ");
  text = text.replace(/\|\s*([^|]+?)\s*\|/g, "|$1|");
  text = text.replace(/([A-Za-zΑ-ωπθρδγλεσωΣ𝔼ℓ]+)_\{([^}]+)\}/g, "$1<sub>$2</sub>");
  text = text.replace(/([A-Za-zΑ-ωπθρδγλεσωΣ𝔼ℓ]+)_([A-Za-z0-9]+(?:,[A-Za-z0-9]+)?)/g, "$1<sub>$2</sub>");
  text = text.replace(/([A-Za-zΑ-ωπθρδγλεσωΣ𝔼ℓ]+)\^\{([^}]+)\}/g, "$1<sup>$2</sup>");
  text = text.replace(/([A-Za-zΑ-ωπθρδγλεσωΣ𝔼ℓ]+)\^([A-Za-z0-9+\-]+)/g, "$1<sup>$2</sup>");
  text = text.replace(/\bpi\(/g, "π(");
  text = text.replace(/\bP\(/g, "P(");
  text = text.replace(/\bR\(/g, "R(");
  text = text.replace(/\s+/g, " ").trim();
  return `<span class="math-${mode}">${text}</span>`;
}

function renderMarkdown(value) {
  const segments = [];
  let text = String(value).replace(/\$([^$]+)\$/g, (_, math) => {
    const key = `@@MATH${segments.length}@@`;
    segments.push(renderMath(math, "inline"));
    return key;
  });
  text = escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
  segments.forEach((html, index) => {
    text = text.replace(`@@MATH${index}@@`, html);
  });
  return text;
}

function renderMaybeMath(value) {
  const raw = String(value);
  const formulaLike = /[_^]|sum|clip|min|KL|pi|theta|gamma|beta|lambda|omega|rho|sigma|Delta|E\[|->|proportional/.test(raw);
  return formulaLike ? renderMath(raw, "inline") : renderMarkdown(raw);
}

function colorOf(method) {
  return categories[method.category].color;
}

function setSelected(id, opts = {}) {
  selectedId = id;
  const method = byId[id];
  document.documentElement.style.setProperty("--node-color", colorOf(method));
  selectedFormulaPart = method.formulaParts[0]?.[0] || "";
  renderAll();
  if (opts.scrollTo) document.querySelector(opts.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderLegend() {
  const el = document.getElementById("route-legend");
  el.innerHTML = Object.entries(categories).map(([key, cat]) => `
    <span class="legend-chip"><span class="legend-dot" style="--chip-color:${cat.color}"></span>${categoryLabel(key)}</span>
  `).join("");
}

function renderGraph() {
  const svg = document.getElementById("edge-layer");
  const nodes = document.getElementById("node-layer");
  const related = new Set(edges.filter(([a, b]) => a === selectedId || b === selectedId).flat());

  svg.innerHTML = `
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8"></path>
      </marker>
      <marker id="arrow-active" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${colorOf(byId[selectedId])}"></path>
      </marker>
    </defs>
    ${edges.map(([a, b]) => {
      const ma = byId[a];
      const mb = byId[b];
      const active = a === selectedId || b === selectedId;
      const bend = Math.abs(ma.y - mb.y) > 120 ? 70 : 0;
      const midX = (ma.x + mb.x) / 2 + bend;
      const d = `M ${ma.x} ${ma.y} C ${midX} ${ma.y}, ${midX} ${mb.y}, ${mb.x} ${mb.y}`;
      return `<path class="edge ${active ? "active" : ""}" d="${d}" marker-end="url(#${active ? "arrow-active" : "arrow"})" style="--edge-active:${colorOf(byId[selectedId])}"></path>`;
    }).join("")}
  `;

  nodes.innerHTML = methods.map((m) => {
    const dim = selectedId !== m.id && related.size && !related.has(m.id);
    return `
      <button class="graph-node ${selectedId === m.id ? "active" : ""}" data-select="${m.id}" style="left:${m.x}px;top:${m.y}px;--node-color:${colorOf(m)};opacity:${dim ? 0.55 : 1}">
        <span class="node-year">${m.year}</span>
        <span class="node-name">${m.name}</span>
        <span class="node-branch">${mValue(m, "branch")}</span>
      </button>
    `;
  }).join("");
}

function renderFilters() {
  const holder = document.getElementById("category-filter");
  const chips = [["all", ui("allMethods")], ...Object.keys(categories).map((key) => [key, categoryLabel(key)])];
  holder.innerHTML = chips.map(([key, label]) => `
    <button class="chip ${activeCategory === key ? "active" : ""}" data-filter="${key}" style="--active-color:${key === "all" ? "#0f172a" : categories[key].color}">${label}</button>
  `).join("");
}

function renderTimeline() {
  const el = document.getElementById("timeline-strip");
  const labelDate = (m) => `${m.year}.${String(m.month || 1).padStart(2, "0")}`;
  el.innerHTML = [...methods].sort((a, b) => a.year - b.year || (a.month || 1) - (b.month || 1) || a.name.localeCompare(b.name)).map((m) => `
    <button class="timeline-card ${m.id === selectedId ? "active" : ""}" data-select="${m.id}" style="--node-color:${colorOf(m)}">
      <span class="year">${labelDate(m)}</span>
      <span class="name">${m.name}</span>
      <span class="venue">${m.venue}</span>
    </button>
  `).join("");
}

function renderTabs(targetId) {
  const el = document.getElementById(targetId);
  el.innerHTML = methods.map((m) => `
    <button class="method-tab ${m.id === selectedId ? "active" : ""}" data-select="${m.id}" style="--active-color:${colorOf(m)}">${m.name}</button>
  `).join("");
}

function renderPipeline() {
  const m = byId[selectedId];
  document.getElementById("pipeline-title").textContent = currentLang === "zh" ? `${m.name} 训练流程` : `${m.name} Pipeline`;
  const flow = document.getElementById("pipeline-flow");
  flow.innerHTML = mPipeline(m).map(([title, body], index) => `
    <article class="step-card" style="--node-color:${colorOf(m)}">
      <span class="step-index">${index + 1}</span>
      <strong>${renderMarkdown(title)}</strong>
      <span>${renderMaybeMath(body)}</span>
    </article>
  `).join("");

  document.getElementById("selected-summary").innerHTML = `
    <p class="eyebrow">${categoryLabel(m.category)}</p>
    <h2>${m.name}</h2>
    <p>${renderMarkdown(mValue(m, "oneLine"))}</p>
    <div class="summary-meta">
      <span class="pill">${m.year}</span>
      <span class="pill">${m.venue}</span>
      <span class="pill">${mValue(m, "openSource")}</span>
    </div>
    <ul class="summary-list" style="--node-color:${colorOf(m)}">
      <li><strong>${ui("motivation")}:</strong> ${renderMarkdown(mValue(m, "motivation"))}</li>
      <li><strong>${ui("advantageSignal")}:</strong> ${renderMaybeMath(mValue(m, "advantage"))}</li>
      <li><strong>${ui("credit")}:</strong> ${renderMaybeMath(mValue(m, "credit"))}</li>
    </ul>
  `;
}

function renderFormula() {
  const m = byId[selectedId];
  const formulaParts = mFormulaParts(m);
  document.getElementById("formula-title").textContent = currentLang === "zh" ? `${m.name} 公式拆解` : `${m.name} Formula Explain`;
  document.getElementById("formula-box").innerHTML = `
    <div class="formula-main">${renderMarkdown(mValue(m, "objective"))}</div>
    <div class="formula-part-row">
      ${formulaParts.map(([id, token]) => `
        <button class="formula-part ${id === selectedFormulaPart ? "active" : ""}" data-part="${id}" style="--node-color:${colorOf(m)}">${renderMath(token, "inline")}</button>
      `).join(" ")}
    </div>
  `;
  document.getElementById("component-grid").innerHTML = formulaParts.map(([id, token]) => `
    <button class="component-card ${id === selectedFormulaPart ? "active" : ""}" data-part="${id}" style="--node-color:${colorOf(m)}">
      <small>${id}</small>
      ${renderMath(token, "inline")}
    </button>
  `).join("");
  const part = formulaParts.find(([id]) => id === selectedFormulaPart) || formulaParts[0];
  document.getElementById("component-explain").innerHTML = `
    <p class="eyebrow">${ui("selectedComponent")}</p>
    <h3>${renderMarkdown(part[0])}</h3>
    <p>${renderMath(part[1], "display")}</p>
    <p>${renderMarkdown(part[2])}</p>
    <p><strong>${ui("objective")}:</strong> ${renderMarkdown(mValue(m, "objective"))}</p>
  `;
}

function renderCompareOptions() {
  const left = document.getElementById("compare-left");
  const right = document.getElementById("compare-right");
  const options = methods.map((m) => `<option value="${m.id}">${m.name} (${m.year})</option>`).join("");
  if (!left.innerHTML) {
    left.innerHTML = options;
    right.innerHTML = options;
    left.value = "grpo";
    right.value = "serl";
  }
}

function renderCompare() {
  renderCompareOptions();
  const left = byId[document.getElementById("compare-left").value] || byId.grpo;
  const right = byId[document.getElementById("compare-right").value] || byId.serl;
  const valueOf = (m, key) => {
    const value = mValue(m, key);
    if (key === "objective") return renderMarkdown(value);
    return Array.isArray(value) ? `<ul class="detail-list">${value.map((item) => `<li>${renderMaybeMath(item)}</li>`).join("")}</ul>` : renderMaybeMath(value);
  };
  document.getElementById("compare-grid").innerHTML = [
    `<div class="compare-row"><div class="compare-label">${ui("method")}</div><div><strong>${left.name}</strong><br>${renderMarkdown(mValue(left, "oneLine"))}</div><div><strong>${right.name}</strong><br>${renderMarkdown(mValue(right, "oneLine"))}</div></div>`,
    ...compareFields.map(([label, key]) => `
      <div class="compare-row">
        <div class="compare-label">${ui(label)}</div>
        <div>${valueOf(left, key)}</div>
        <div>${valueOf(right, key)}</div>
      </div>
    `)
  ].join("");
}

function methodVisible(m) {
  const query = document.getElementById("method-search")?.value.trim().toLowerCase() || "";
  const catOk = activeCategory === "all" || m.category === activeCategory;
  const translatedMods = mValue(m, "modifications") || [];
  const haystack = [
    m.name, m.paperTitle, m.oneLine, m.motivation, m.training, m.advantage, m.credit, m.feedback, m.framework,
    mValue(m, "oneLine"), mValue(m, "motivation"), mValue(m, "training"), mValue(m, "advantage"),
    mValue(m, "credit"), mValue(m, "feedback"), mValue(m, "framework"), mValue(m, "branch"),
    ...m.modifications, ...translatedMods, ...m.tags
  ].join(" ").toLowerCase();
  return catOk && (!query || haystack.includes(query));
}

function renderDetails() {
  const el = document.getElementById("details-grid");
  el.innerHTML = methods.map((m) => `
    <article class="detail-card ${methodVisible(m) ? "" : "hidden"}" style="--node-color:${colorOf(m)}">
      <header>
        <div>
          <p class="eyebrow">${categoryLabel(m.category)}</p>
          <h3>${m.name}</h3>
        </div>
        <button class="chip" data-select="${m.id}" style="--active-color:${colorOf(m)}">${ui("focus")}</button>
      </header>
      <p>${renderMarkdown(mValue(m, "oneLine"))}</p>
      <p class="detail-section-title">${ui("detailMotivation")}</p>
      <p>${renderMarkdown(mValue(m, "motivation"))}</p>
      <p class="detail-section-title">${ui("detailModifications")}</p>
      <ul class="detail-list">${mValue(m, "modifications").map((item) => `<li>${renderMaybeMath(item)}</li>`).join("")}</ul>
      <p class="detail-section-title">${ui("detailObjective")}</p>
      <p class="objective-line">${renderMarkdown(mValue(m, "objective"))}</p>
      <p class="detail-section-title">${ui("detailParadigm")}</p>
      <p>${renderMaybeMath(mValue(m, "training"))}</p>
    </article>
  `).join("");
}

function renderPapers() {
  const tbody = document.getElementById("paper-table-body");
  tbody.innerHTML = methods.map((m) => `
    <tr>
      <td><strong>${m.name}</strong>${m.paperTitle ? `<br><span class="paper-title">${renderMarkdown(m.paperTitle)}</span>` : ""}<br><span class="pill">${mValue(m, "openSource")}</span></td>
      <td><a href="${location.hostname.endsWith("github.io") ? m.source : m.pdf}" target="_blank" rel="noreferrer">${ui("localPdf")}</a></td>
      <td><a href="${m.source}" target="_blank" rel="noreferrer">${ui("sourcePdf")}</a></td>
      <td>${m.code ? `<a href="${m.code}" target="_blank" rel="noreferrer">${ui("codeProject")}</a>` : ui("notConfirmed")}</td>
      <td>${mValue(m, "framework")}</td>
    </tr>
  `).join("");
}

function bindEvents() {
  document.body.addEventListener("click", (event) => {
    const select = event.target.closest("[data-select]");
    if (select) {
      setSelected(select.dataset.select);
      return;
    }
    const filter = event.target.closest("[data-filter]");
    if (filter) {
      activeCategory = filter.dataset.filter;
      renderFilters();
      renderDetails();
      return;
    }
    const part = event.target.closest("[data-part]");
    if (part) {
      selectedFormulaPart = part.dataset.part;
      renderFormula();
    }
  });

  document.getElementById("method-search").addEventListener("input", renderDetails);
  document.getElementById("compare-left").addEventListener("change", renderCompare);
  document.getElementById("compare-right").addEventListener("change", renderCompare);
  document.getElementById("language-toggle").addEventListener("click", toggleLanguage);
  document.getElementById("compact-toggle").addEventListener("click", (event) => {
    const next = !document.body.classList.contains("compact");
    document.body.classList.toggle("compact", next);
    event.currentTarget.setAttribute("aria-pressed", String(next));
  });
}

function renderAll() {
  applyStaticCopy();
  renderLegend();
  renderGraph();
  renderFilters();
  renderTimeline();
  renderTabs("pipeline-tabs");
  renderTabs("formula-tabs");
  renderPipeline();
  renderFormula();
  renderCompare();
  renderDetails();
  renderPapers();
}

if (document.getElementById("route-board")) {
  renderAll();
  bindEvents();
  window.__llmToggleLanguage = toggleLanguage;
}
