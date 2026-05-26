# DrBones

DrBones is built from the PMP AI Project Skeleton and keeps the skeleton's governance/doctrine as durable project memory.

Use this file as the human-facing README for your new project. Replace this starter text with your project name, purpose, setup instructions, and current status.

Keep these nearby while you are setting up the project:

- [`examples/README.md`](examples/README.md) — read the day-in-the-life examples first
- [`readme_pmp.md`](readme_pmp.md) — the full PMP / AI Project Skeleton guide
- [`AGENTS.md`](AGENTS.md) — operating instructions for AI assistants and executor agents
- [`workorders/README.md`](workorders/README.md) — how to create and use workorders

## Getting started

1. Rewrite this README around your real project.
2. Read [`examples/README.md`](examples/README.md) to see the day-in-the-life workflow examples.
3. Read [`readme_pmp.md`](readme_pmp.md) at least once and keep it handy.
4. Read [`AGENTS.md`](AGENTS.md) before asking an AI assistant to change the repo.
5. Use a workorder for substantial, multi-file, architecture-sensitive, or process-sensitive work.
6. Run the available checks before treating work as complete.

## Foreground AI startup prompt

Replace `<path to your repo>` with your real repository path. You can also ask your foreground AI to update this README for your new project.

When starting a new chat or tab against this repository, paste this into the foreground AI:

```text
You are the foreground AI for <path to your repo>

Current repo state beats chat memory. Inspect the current repository state before giving architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder guidance first. Then identify current state, target, constraints, foreground/executor decision, and the smallest useful next move.
```

## Workorder shortcut

For substantial work, ask the foreground AI:

```text
Create a bounded workorder for this repository and show me a clean preview first.

Task:
  <describe the exact task>

Put only the workorder body in one clean copy/paste block. Do not put citations, assistant notes, explanations, links, or commentary inside the workorder block. After the preview, ask whether to save it to the repository or revise it.
```

## Checks

Run these from the repository root when available:

```text
python tools/pmp_check.py --area all
python -m pytest
```

## About PMP

PMP is a repo-native operating discipline for AI-assisted projects. The short version:

```text
intent captured
scope bounded
constraints preserved
executor instructed
checks required
completion tied back to source intent
```

The full explanation is in [`readme_pmp.md`](readme_pmp.md).
