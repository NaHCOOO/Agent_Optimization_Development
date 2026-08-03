# LLM Multi-Agent System Design: Source Notes

The `system-design.html` module is backed by a locally verified corpus of 25 papers. The website prefers formal ICLR, ICML, NeurIPS, ACL, and COLM versions over arXiv landing pages.

## Parallel research planes

- **System design (`phi`)**: roles, team composition, topology, workflow, communication, routing, memory, and budget.
- **Model optimization (`theta`)**: policy, value, credit assignment, hierarchy, reinforcement learning, and on-policy distillation.

Their shared objective is:

```text
max_{theta, phi} E[R(trajectory)] - lambda * Cost(trajectory)
```

## Eight core research questions

1. How should a single Agent be designed?
2. Which Agents should form a task-specific team, and how should they be selected?
3. How should Agents connect and follow a collaboration workflow?
4. In what form should Agents communicate?
5. What information should Agents send, and how should receivers process it?
6. How should the system adapt during execution?
7. How can parameter-level joint optimization from MARL transfer to LLM-MAS?
8. How can LLMs be trained for Agentic Systems and long-horizon multi-turn tasks?

Q1-Q6 define the system-design module. Q7 is the bridge to traditional MARL. Q8 links to the parallel LLM Optimization module. Reliability, cost, and safety are evaluation constraints across Q1-Q6 rather than a separate system layer.

## Core corpus by workbench category

| Route | Papers |
|---|---|
| Agent design | ReAct, MetaGPT, ChatDev, ADAS |
| Team selection | DyLAN, MaAS, Fleet of Agents |
| Workflow and topology | GPTSwarm, AFlow, AgentPrune, Flow |
| Communication medium | DIAL, Language Grounded MARL, LatentMAS |
| Information exchange and receiver processing | TarMAC, MASIA, ReConcile, Should We Be Going MAD?, MAS Resilience, MAST |
| Runtime adaptation | Evolving Orchestration |
| MARL joint optimization | MADDPG, QMIX, MAPPO, MAPoRL |

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
