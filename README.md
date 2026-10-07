# Agentic System Research Atlas

An interactive bilingual research atlas with three connected modules:

- **Agent Optimization Development**: long-horizon, multi-turn LLM training, credit assignment, hierarchy, reinforcement learning, and on-policy distillation.
- **LLM Multi-Agent System Design**: 37 papers organized around eight questions covering Agent construction, teams, collaboration, communication, adaptation, and MARL transfer.
- **(Multi-)Agent System Workflow**: 22 methods on manual protocols, conditional structure generation, and execution-feedback optimization, deepening Q3 and parts of Q2.

The modules meet at the joint objective over model parameters `theta` and system parameters `phi`.

## Website

- Optimization: https://nahcooo.github.io/Agent_Optimization_Development/
- System design: https://nahcooo.github.io/Agent_Optimization_Development/system-design.html
- Workflow: https://nahcooo.github.io/Agent_Optimization_Development/workflow.html

Workflow venue, author, code, formula, and bilingual method data are maintained in `workflow-data.js`. `mas-workflow.js` shares the same audit with the MAS overview. See `WORKFLOW_RESEARCH_NOTES.md` for source/version exceptions.

## Local preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`.

The website is a dependency-free static application. KaTeX is loaded from jsDelivr for formula rendering.
