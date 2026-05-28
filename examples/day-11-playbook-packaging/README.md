# Day in the life 11: package a proven workflow as a playbook

This example is not about adopting Claude Skills, Codex-specific commands, or any other vendor-specific agent feature.

It is about defining a vendor-independent playbook: a repo-owned workflow guide that any capable human or AI assistant can read and follow.

The point is simple:

```text
Examples teach the move.
Playbooks make the move reusable.
```

## The human request

```text
The project-wiki build workflow worked. Package it as a vendor-independent playbook so Codex, Claude, ChatGPT, Gemini, or a human can invoke it without depending on one AI vendor's skill system.
```

## The foreground AI response

```text
Current state:
  The repo has day-in-the-life examples that teach useful workflows.
  Some workflows are now reusable enough to become playbooks.

Target:
  Create a vendor-independent playbook for the chosen workflow so future workorders can reference it directly.

Constraint:
  Do not create a Claude Skill or vendor-specific package as the source of truth.
  Do not make the playbook override AGENTS.md, workorders, required checks, or human approval gates.
  Do not create scripts or automation unless explicitly required.
  Do not turn the playbook into a persona.

Foreground/executor decision:
  This should become a workorder if creating or updating playbook files affects repo guidance, examples, checks, or future executor behavior.

Next move:
  Create a dated playbook-packaging workorder for an executor.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1845-by-lightrock-package-project-wiki-playbook.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, playbooks/README.md, and relevant folder guidance.
3. Read the source example or workflow being packaged.
4. Create playbooks/<workflow-name>/PLAYBOOK.md.
5. Preserve the workflow's purpose, scope, constraints, source authority rules, checks, approval gates, and completion-report expectations.
6. Do not copy every narrative teaching paragraph from the day-in-the-life example.
7. Convert the example into reusable operating instructions.
8. Make the playbook vendor-independent.
9. State that the playbook does not override AGENTS.md or workorders.
10. Add references from examples or docs only if needed for discoverability.
11. Run required checks.
12. Keep working until checks pass or report a real blocker.
13. Create or propose a lesson learned if packaging the workflow exposes repeated ambiguity or missing playbook governance.
```

## Expected playbook shape

```text
playbooks/project-wiki-build/PLAYBOOK.md
```

Example sections:

```text
# Project wiki build

## Purpose
## When to use
## When not to use
## Required source material
## Steps
## Source authority rules
## Required checks
## Human approval gates
## Completion report
```

The playbook should be direct and operational. The day-in-the-life example can remain narrative and explanatory.

## What the executor should report

```text
Changed files:
  - list every changed file

Playbook added or updated:
  - path
  - source workflow/example used

Vendor independence preserved:
  - no Claude-only, Codex-only, ChatGPT-only, or Gemini-only dependency

Authority boundaries preserved:
  - AGENTS.md remains global
  - workorder remains task contract
  - playbook remains reusable workflow guidance

Checks run:
  - python tools/pmp_check.py --area all, if applicable
  - python -m pytest, if applicable

Checks passed or failed:
  - report actual result

Lessons learned:
  - created, proposed, or not needed

Workorder:
  - workorders/2026-05-26-1845-by-lightrock-package-project-wiki-playbook.md
```

## What this demonstrates

A playbook is the vendor-independent version of a reusable skill.

It does not rely on any platform automatically discovering it.

The useful pattern is:

```text
proven workflow example
→ extract reusable procedure
→ preserve constraints and checks
→ store as repo-owned playbook
→ reference from future workorders
```

## The practical lesson

Playbooks prevent three common AI-assisted failures:

```text
1. A useful workflow stays trapped in a chat or example.
2. A vendor-specific skill becomes the only copy of operating knowledge.
3. A future executor has to rediscover the workflow instead of reading the repo-owned procedure.
```

Keep the playbook canonical. Vendor-specific packages are adapters, not the source of truth.
