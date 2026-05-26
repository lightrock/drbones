# Workflows

## Workorders

Workorders are durable task contracts for substantial or process-sensitive work.

- Naming pattern is permanent and timestamped.
- Scope and out-of-scope boundaries must be explicit.
- Required checks are mandatory, not decorative.
- Completion notes should report changed files, checks, unresolved items, and workorder path.

Key source docs:

- [`../../workorders/README.md`](../../workorders/README.md)
- [`../../workorders/TEMPLATE.md`](../../workorders/TEMPLATE.md)
- [`../../schemas/workorder-contract.json`](../../schemas/workorder-contract.json)

## Foreground vs executor lane

Foreground AI should capture intent and produce smallest useful next move. Executor AI performs bounded implementation scope from an existing workorder.

Primary guidance:

- [`../../AGENTS.md`](../../AGENTS.md)
- [`../../readme_pmp.md`](../../readme_pmp.md)

## Playbooks

Playbooks are vendor-independent, repo-owned instructions for reusable workflows.

Use playbooks when a workflow has become reusable enough that future workorders should reference a stable procedure instead of re-deriving it from examples.

Key source docs:

- [`../../playbooks/README.md`](../../playbooks/README.md)
- [`../../playbooks/mcp-style-agent-design/PLAYBOOK.md`](../../playbooks/mcp-style-agent-design/PLAYBOOK.md)
- [`../../examples/day-in-the-life-11/README.md`](../../examples/day-in-the-life-11/README.md)
- [`../../examples/day-in-the-life-12/README.md`](../../examples/day-in-the-life-12/README.md)

Authority rule:

```text
AGENTS.md remains global.
Workorders remain task contracts.
Playbooks remain reusable task-specific guidance.
```

If a task or workorder references a playbook, the executor should read the matching `playbooks/<workflow-name>/PLAYBOOK.md` before doing the task.

## MCP-style tool-agent design

MCP-style tool access is an architecture boundary, not a cool trick.

Use the MCP-style agent design playbook before exposing tools, APIs, scripts, command surfaces, external resources, or write-capable actions to an AI assistant.

The governing pattern is:

```text
mission
→ authority boundary
→ tool contract
→ approval gate
→ action
→ proof
→ completion report
```

Do not collapse recommendation, command, execution, and proof.

## Invocable workflows

Invocable workflows are executed intentionally when needed instead of relying on background autonomous agents.

Examples include:

- release-surface mapping
- vigilance checks
- contradiction scans
- project-wiki builds
- project-knowledge-bank builds
- playbook packaging
- MCP-style tool-agent design

A project-knowledge-bank build is for creating project-specific reusable source material. It should not be populated in the generic template unless the content is explicitly safe for inheritance.

Workflow examples index:

- [`../../examples/README.md`](../../examples/README.md)
- [`../../examples/day-in-the-life-6/README.md`](../../examples/day-in-the-life-6/README.md)
- [`../../examples/day-in-the-life-7/README.md`](../../examples/day-in-the-life-7/README.md)
- [`../../examples/day-in-the-life-8/README.md`](../../examples/day-in-the-life-8/README.md)
- [`../../examples/day-in-the-life-9/README.md`](../../examples/day-in-the-life-9/README.md)
- [`../../examples/day-in-the-life-10/README.md`](../../examples/day-in-the-life-10/README.md)
- [`../../examples/day-in-the-life-11/README.md`](../../examples/day-in-the-life-11/README.md)
- [`../../examples/day-in-the-life-12/README.md`](../../examples/day-in-the-life-12/README.md)
