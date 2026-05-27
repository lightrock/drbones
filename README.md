# Doctor Bones

Doctor Bones is a vendor-independent repository template for AI-assisted development.

It helps you keep project memory inside the repo instead of trapped in chat. It gives your human/AI team a shared operating discipline: workorders, playbooks, examples, checks, handoff rules, and release-readiness habits.

## Languages

- English: this file
- [Español](docs/i18n/README.es.md)
- [Français](docs/i18n/README.fr.md)
- [Deutsch](docs/i18n/README.de.md)
- [Português do Brasil](docs/i18n/README.pt-BR.md)
- [हिन्दी](docs/i18n/README.hi.md)

## What this is

Doctor Bones is not another coding agent.

It is a repo-native discipline layer for using AI assistants and coding agents without losing intent, constraints, checks, or project history.

The basic model is:

```text
human intent
→ foreground AI clarifies the task
→ repo captures durable guidance
→ executor AI performs bounded work
→ checks verify what can be verified
→ completion ties back to source intent
```

Think of the foreground AI as the planning and architecture assistant. Think of the executor AI as the worker with file access, a runtime environment, tests, and commit/PR tools.

The repo is the memory and discipline layer between them.

## Getting started

1. If you copied this template, rewrite this README around your real project soon.
2. Read [`examples/README.md`](examples/README.md) to see the day-in-the-life workflow examples.
3. Read [`readme_pmp.md`](readme_pmp.md) at least once and keep it handy.
4. Read [`AGENTS.md`](AGENTS.md) before asking an AI assistant to change the repo.
5. Use a workorder for substantial, multi-file, architecture-sensitive, or process-sensitive work.
6. Run the available checks before treating work as complete.

## Foreground AI startup prompt

This prompt is for a repository created from the Doctor Bones template. After copying this template, replace `<your project repository URL>` with your own project repository URL.

When starting a new chat or tab for your project repository, paste this into the foreground AI:

```text
You are the foreground AI for <your project repository URL>.

This project uses Doctor Bones as its repo-native AI development discipline template:
https://github.com/lightrock/drbones

Current repo state beats chat memory. Inspect the current project repository before giving
architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder
guidance from the project repository first. Then identify current state, target, constraints,
foreground/executor decision, and the smallest useful next move.
```

## Workorder shortcut

For substantial work in your copied project repository, talk with the foreground AI until the task is clear, then say:

```text
Create a workorder and also show it to me here.
```

You can copy a link to the workorder file and tell your executor AI, working in an environment for your project repository, to perform it.

You can also copy/paste the workorder body if you asked the foreground AI to show it first. Keep that copy/paste block clean: no citations, assistant notes, explanations, extra links, or commentary inside the workorder body.

## Checks

Run these from the repository root when available:

```text
python tools/pmp_check.py --area all
python -m pytest
```

If a check fails, paste the exact command output into the foreground AI and ask for the smallest safe fix.

## About Doctor Bones

Doctor Bones is an AI-vendor-agnostic operating discipline for AI-assisted projects.

The short version:

```text
intent captured
scope bounded
constraints preserved
executor instructed
checks required
completion tied back to source intent
```

The full explanation is in [`readme_pmp.md`](readme_pmp.md).
