# LLM Multi-Agent System Design: Source Notes

The `system-design.html` module now contains 37 papers, with formal sources and accepted author versions labeled separately. Its Q2/Q3 material shares the audited catalog in `workflow-data.js` with the focused `workflow.html` module. Audit date: 2026-10-07.

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

## Relationship-map policy

The website places the catalog on Q1-Q7 swimlanes with a separate Q8 bridge. Tracks expand to avoid collisions. Solid edges indicate conceptual progression within a question; dashed edges compare mechanisms across questions, not direct citations. Conference dates include planned dates for accepted papers such as FlowMAS; the dedicated Workflow page separately shows early public dates.

## Core corpus by workbench category

| Route | Papers |
|---|---|
| Agent design | ReAct; ADAS additionally tagged Q1 |
| Team selection | DyLAN, MaAS, Fleet of Agents, AgentVerse, LLM-Blender (ensemble comparator) |
| Workflow and topology | MetaGPT, ChatDev, AutoGen, LLM Debate, GPTSwarm, ADAS, G-Designer, AFlow, AgentPrune, Flow, GTD, CARD, RADAR, MAGE, CE-Graph, AutoRAS, FlowMAS |
| Communication medium | DIAL, Language Grounded MARL, LatentMAS |
| Information exchange and receiver processing | TarMAC, MASIA, ReConcile, Should We Be Going MAD?, MAS Resilience, MAST |
| Runtime adaptation | Evolving Orchestration |
| MARL joint optimization | MADDPG, QMIX, MAPPO, MAPoRL |

## Formal-version corrections

- MaAS is ICML 2025 Oral; GPTSwarm is ICML 2024 Oral.
- DyLAN has a formal COLM 2024 version.
- G-Designer has an ICML 2025 main-conference version, replacing the earlier workshop-only label.
- RADAR, MAGE, CE-Graph, and AutoRAS have ICML 2026 proceedings; GTD has ACL 2026 proceedings; CARD has an ICLR 2026 source.
- LatentMAS is an ICML 2026 Spotlight; the accepted author version is used while its proceedings link stabilizes.
- MASIA is a NeurIPS 2022 MARL communication paper and is presented as a transferable foundation, not an LLM-MAS method.
- Flow, AFlow, ADAS, and AgentPrune are distinct. FlowMAS is a separate NeurIPS 2026 accepted paper, using an author PDF while proceedings are pending. Acceptance is confirmed by the Xiamen University lab notice; the author's announced repository currently returns 404 to public access.
- Codebook Agent is a September 2026 preprint, shown in frontier context and the focused Workflow page.
- AutoGen, CARD, and DyLAN formal OpenReview PDF downloads returned 403. Their formal entries remain linked; locally read author copies are explicitly labeled. Venue verification does not imply a successful formal PDF download.

## Open source and frameworks

The previous corpus had public reference resources. In the expanded corpus, CE-Graph's public code is unconfirmed; MAGE and FlowMAS announce repositories whose public access returned 404 in this audit. A link announcement is not counted as a confirmed open-source release. Reproducibility still varies because closed LLM APIs and benchmark-specific evaluators are common.

The dominant implementation pattern is custom Python orchestration. Notable substrates include MetaGPT, GPTSwarm, Hugging Face Transformers, vLLM, PyMARL, and the authors' own runtimes. veRL is not the default because most system-design papers freeze LLM weights and optimize prompts, graph edges, code, discrete workflows, or a controller. veRL and AReaL become more relevant on the parallel model-optimization page when LLM parameters are updated.
