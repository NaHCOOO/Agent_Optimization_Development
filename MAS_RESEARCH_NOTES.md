# LLM Multi-Agent System Design: Source Notes

The `system-design.html` module is backed by a locally verified corpus of 25 papers. The website prefers formal ICLR, ICML, NeurIPS, ACL, and COLM versions over arXiv landing pages.

## Parallel research planes

- **System design (`phi`)**: roles, team composition, topology, workflow, communication, routing, memory, and budget.
- **Model optimization (`theta`)**: policy, value, credit assignment, hierarchy, reinforcement learning, and on-policy distillation.

Their shared objective is:

```text
max_{theta, phi} E[R(trajectory)] - lambda * Cost(trajectory)
```

## Core corpus by route

| Route | Papers |
|---|---|
| Agent design | ReAct, MetaGPT, ChatDev, ADAS |
| Team selection | DyLAN, MaAS, Fleet of Agents |
| Workflow and topology | GPTSwarm, AFlow, AgentPrune, Flow |
| Communication | DIAL, TarMAC, MASIA, ReConcile, Language Grounded MARL, LatentMAS |
| Dynamic orchestration and joint training | Evolving Orchestration, MAPoRL |
| Reliability | Should We Be Going MAD?, MAS Resilience, MAST |
| MARL foundations | MADDPG, QMIX, MAPPO |

## Formal-version corrections

- MaAS is ICML 2025 Oral; GPTSwarm is ICML 2024 Oral.
- DyLAN has a formal COLM 2024 version.
- G-Designer is an ICLR 2025 FM-Wild Workshop paper, not an ICLR main-conference paper.
- RADAR is treated as an arXiv 2026 frontier paper.
- LatentMAS is an ICML 2026 Spotlight; the accepted author version is used while its proceedings link stabilizes.
- MASIA is a NeurIPS 2022 MARL communication paper and is presented as a transferable foundation, not an LLM-MAS method.
- Flow, AFlow, ADAS, and AgentPrune are separate methods. `Flow` should not be renamed `FlowMAS` without a precise source.

## Open source and frameworks

All 25 core entries have a public author-linked code, data, or reference repository. Reproducibility still varies because many projects require closed LLM APIs or benchmark-specific evaluators.

The dominant implementation pattern is custom Python orchestration. Notable substrates include MetaGPT, GPTSwarm, Hugging Face Transformers, vLLM, PyMARL, and the authors' own runtimes. veRL is not the default because most system-design papers freeze LLM weights and optimize prompts, graph edges, code, discrete workflows, or a controller. veRL and AReaL become more relevant on the parallel model-optimization page when LLM parameters are updated.

