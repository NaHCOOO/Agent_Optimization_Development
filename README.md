# Agentic System Research Atlas

An interactive bilingual research atlas with two parallel modules:

- **Agent Optimization Development**: 27 methods for long-horizon, multi-turn LLM training, credit assignment, hierarchy, reinforcement learning, and on-policy distillation.
- **LLM Multi-Agent System Design**: 25 formal papers on Agent construction, team selection, topology, workflow, communication, runtime adaptation, reliability, and MARL transfer.

The modules meet at the joint objective over model parameters `theta` and system parameters `phi`.

## Website

- Optimization: https://nahcooo.github.io/Agent_Optimization_Development/
- System design: https://nahcooo.github.io/Agent_Optimization_Development/system-design.html

## Local preview

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/`.

The website is a dependency-free static application. KaTeX is loaded from jsDelivr for formula rendering.
