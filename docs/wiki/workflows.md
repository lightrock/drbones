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
- [`../../examples/day-11-playbook-packaging/README.md`](../../examples/day-11-playbook-packaging/README.md)
- [`../../examples/day-12-mcp-style-tool-agent-design/README.md`](../../examples/day-12-mcp-style-tool-agent-design/README.md)
- [`../../examples/day-13-outside-agent-pattern-distillation/README.md`](../../examples/day-13-outside-agent-pattern-distillation/README.md)
- [`../../examples/day-14-release-readiness-stabilization/README.md`](../../examples/day-14-release-readiness-stabilization/README.md)
- [`../../examples/day-15-reference-repository-context/README.md`](../../examples/day-15-reference-repository-context/README.md)
- [`../../examples/day-16-human-correction-into-repo-memory/README.md`](../../examples/day-16-human-correction-into-repo-memory/README.md)

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

## Outside agent pattern distillation

Outside agent demos can be useful, but they should not be copied blindly.

Use the Day 13 pattern when a human brings in an external agent idea, demo, Reddit post, product pitch, or workflow example. The goal is to extract the reusable pattern, classify risk, define authority boundaries, and decide whether the repo should ignore it, watch it, note it, open an issue, create an example, create a playbook, create a workorder, or ask for a human decision.

The governing phrase is:

```text
Steal the pattern, not the product.
```

## Release-readiness stabilization

Use the Day 14 pattern after rapid repo growth.

The goal is to stop adding new doctrine and check whether README files, AGENTS.md, examples, playbooks, wiki pages, checks, workorders, release notes, and authority boundaries still agree.

The governing pattern is:

```text
invent
→ capture
→ link
→ check
→ stabilize
→ release
```

## Reference repository context loading

Use the Day 15 pattern when the foreground AI should become smarter by reading selected reference repositories before giving architecture advice or writing plans.

The goal is to load context on purpose without smearing every repository into one soup.

Related repositories can inform the current repo. They do not automatically govern it.

## Human correction into repo memory

Use the Day 16 pattern when a human correction reveals a rule, trigger, checklist, or boundary that the repository should remember.

The goal is not merely to patch the visible text. The goal is to decide whether the correction belongs in README.md, AGENTS.md, a workorder, a playbook, an example, the wiki, or lessons learned.

The governing pattern is:

```text
human correction
→ identify the reusable lesson
→ choose the right repo surface
→ patch the rule where future AI will read it
→ keep user-facing docs clean
```

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
- outside agent pattern distillation
- release-readiness stabilization
- reference repository context loading
- human correction into repo memory

A project-knowledge-bank build is for creating project-specific reusable source material. It should not be populated in the generic template unless the content is explicitly safe for inheritance.

Workflow examples index:

- [`../../examples/README.md`](../../examples/README.md)
- [`../../examples/day-06-release-surface-mapping/README.md`](../../examples/day-06-release-surface-mapping/README.md)
- [`../../examples/day-07-vigilance-check/README.md`](../../examples/day-07-vigilance-check/README.md)
- [`../../examples/day-08-contradiction-scan/README.md`](../../examples/day-08-contradiction-scan/README.md)
- [`../../examples/day-09-project-wiki-build/README.md`](../../examples/day-09-project-wiki-build/README.md)
- [`../../examples/day-10-project-knowledge-bank/README.md`](../../examples/day-10-project-knowledge-bank/README.md)
- [`../../examples/day-11-playbook-packaging/README.md`](../../examples/day-11-playbook-packaging/README.md)
- [`../../examples/day-12-mcp-style-tool-agent-design/README.md`](../../examples/day-12-mcp-style-tool-agent-design/README.md)
- [`../../examples/day-13-outside-agent-pattern-distillation/README.md`](../../examples/day-13-outside-agent-pattern-distillation/README.md)
- [`../../examples/day-14-release-readiness-stabilization/README.md`](../../examples/day-14-release-readiness-stabilization/README.md)
- [`../../examples/day-15-reference-repository-context/README.md`](../../examples/day-15-reference-repository-context/README.md)
- [`../../examples/day-16-human-correction-into-repo-memory/README.md`](../../examples/day-16-human-correction-into-repo-memory/README.md)
