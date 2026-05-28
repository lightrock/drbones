# Playbooks

Playbooks are vendor-independent, repo-owned instructions for reusable workflows.

They are not Claude Skills, Codex features, ChatGPT memory, or vendor-specific prompt packs.

A playbook is a durable workflow guide that any capable human or AI assistant can read and follow.

## Relationship to other repo guidance

```text
AGENTS.md
  Global operating rules for all AI assistants and executor agents.

workorders/
  One-time bounded task contracts.

examples/day-*/
  Teaching examples that show workflows in context.

playbooks/*/PLAYBOOK.md
  Reusable task-specific workflow guidance.
```

A playbook does not override `AGENTS.md`.

A playbook does not override a workorder.

A playbook does not bypass required checks, human approval gates, source authority rules, or safety constraints.

## When to create a playbook

Create a playbook only after a workflow has proven useful enough to reuse.

Good candidates include:

```text
release-surface mapping
vigilance checks
contradiction scans
project-wiki builds
project-knowledge-bank builds
workorder creation/review
```

Do not create playbooks for one-off work that belongs in a workorder.

Do not create playbooks as mascot/persona theater.

## Expected shape

Use this folder pattern:

```text
playbooks/<workflow-name>/PLAYBOOK.md
```

Optional supporting files may live under the same folder when needed:

```text
playbooks/<workflow-name>/examples.md
playbooks/<workflow-name>/checklist.md
playbooks/<workflow-name>/fixtures/
playbooks/<workflow-name>/scripts/
```

Scripts inside playbooks are code-adjacent assets. Do not run them unless the workorder or human explicitly authorizes that execution.

## Required playbook sections

A useful `PLAYBOOK.md` should include:

```text
# <Workflow name>

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

## Executor rule

When a task or workorder references a playbook, the executor must read the matching `PLAYBOOK.md` before doing the task.

The executor must still follow `AGENTS.md`, the workorder, repo doctrine, and required checks.

## Vendor adapters

A playbook may later be wrapped or exported into vendor-specific formats.

For example, a Claude-compatible skill wrapper could be generated from a playbook.

The playbook remains the source of truth.

```text
Playbook is the doctrine.
Vendor skill/package is a compatibility format.
```
