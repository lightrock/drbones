# MCP-style agent design

This playbook is vendor-independent guidance for designing tool-using AI agents and MCP-style integrations.

It does not require a specific AI vendor, protocol implementation, SDK, hosted agent product, or runtime.

The goal is to design agents that use tools without collapsing evidence, authority, command, execution, and proof.

## Purpose

Use this playbook when a project needs an AI assistant or agent to interact with tools, APIs, repositories, documents, local services, vendor systems, dashboards, command surfaces, or other external resources.

The core idea:

```text
The agent may reason and recommend.
Tools may observe, query, draft, package, or execute bounded actions.
Authority, execution, and proof must remain explicit.
```

## When to use

Use this playbook for work such as:

```text
- designing an MCP-style server or tool surface
- deciding what tools an agent should receive
- creating a tool manifest or tool contract
- wrapping repository workflows as invocable tools
- exposing safe project actions to AI assistants
- designing local agents that call scripts, APIs, or services
- creating workorders for tool-using executor agents
- separating read-only tools from action tools
- defining approval gates before destructive or external actions
```

## When not to use

Do not use this playbook to justify vague autonomous-agent behavior.

Do not use it when a simple workorder, README update, script, or manual process is enough.

Do not expose tools just because an AI can call them.

Do not create action tools without explicit scope, inputs, outputs, logs, failure behavior, and approval gates.

## Required source material

Before designing the agent or tool surface, inspect the current repo state and read:

```text
README.md
AGENTS.md
readme_pmp.md, if present
workorders/README.md
playbooks/README.md
relevant folder-level AGENTS.md or README.md files
relevant schemas, tests, examples, and architecture docs
```

If the design is influenced by PFEM/PFCOMM-style doctrine, preserve these boundaries:

```text
raw evidence is not normalized evidence
normalized evidence is not a finding
a finding is not a report
a report is not a command
a command is not execution
execution is not proof
local evidence is not global truth
rollup status is not raw evidence
AI recommendation is not authority
```

## Design steps

### 1. Name the mission

Describe the agent's job in one plain sentence.

Bad:

```text
Build an autonomous AI agent that handles operations.
```

Better:

```text
Build a read-first repository assistant that can inspect workorders, propose follow-up issues, and draft completion notes without modifying files unless a workorder grants that authority.
```

### 2. Separate agent role from tool authority

Record what the agent may do and what each tool may do.

Use this split:

```text
Agent role:
  reason, classify, draft, recommend, request confirmation

Read tools:
  inspect files, issues, docs, schemas, logs, status, external source material

Draft tools:
  create proposed text, patches, reports, workorders, issue bodies

Action tools:
  write files, open issues, run commands, call APIs, publish, deploy, send, delete, charge, authorize

Proof tools:
  run tests, check schemas, validate links, query status, inspect logs, verify outcomes
```

The agent is not the authority just because it can call a tool.

### 3. Define every tool as a contract

For each tool, document:

```text
name
purpose
allowed inputs
forbidden inputs
outputs
side effects
failure behavior
timeout/retry behavior
logging/audit behavior
approval requirement
checks after use
```

If a tool has side effects, say so loudly.

### 4. Prefer read-only first

Start with read-only and draft-only tools.

Add action tools only after the workflow is understood, bounded, logged, and checked.

A safe progression is:

```text
read source
→ draft proposal
→ human review
→ bounded action
→ proof/check
→ completion report
```

### 5. Keep source authority explicit

Do not let the agent flatten all sources into one story.

Preserve authority levels such as:

```text
current repo state
AGENTS.md / root governance
workorder task contract
playbook task guidance
schemas and tests
examples and demos
release notes
origin or legacy material
external documentation
model-generated recommendation
```

### 6. Keep command and execution separate

A command is an instruction or authorized request.

Execution is the tool or system doing the requested thing.

Proof is the evidence that the requested thing actually happened.

Do not collapse these.

Example:

```text
Command:
  create docs/wiki/examples-and-demos.md

Execution:
  file write tool updates that path

Proof:
  git diff shows the file exists, checks pass, and links resolve
```

### 7. Add approval gates where harm can happen

Human approval is required before tools do high-impact work, such as:

```text
publishing externally
deploying
sending email or messages
spending money
changing permissions
deleting data
modifying production systems
claiming legal, medical, financial, security, or safety authority
changing architecture doctrine
opening broad automation pathways
```

### 8. Design failure behavior

Agents and tools should fail safely.

For each high-impact workflow, define:

```text
what to do on partial failure
how to roll back or stop
what evidence to preserve
what to report to the human
which follow-up workorder is needed
```

Never let the agent hide failure behind a polished summary.

### 9. Require proof after action

Every action tool should have a follow-up proof path.

Examples:

```text
file changed → inspect diff or fetch file
issue opened → fetch issue and link it
command run → capture command, exit code, output summary
schema updated → run schema checks
release prepared → verify version map and notes
external API called → record request class, response class, and audit reference
```

### 10. Make the first version boring

The first version should be small, inspectable, and low-authority.

Prefer:

```text
one agent role
one narrow workflow
read-only first
explicit tool contracts
manual approval for action
checks before completion
```

Avoid:

```text
general autonomous agent
broad filesystem access
silent network access
unbounded shell execution
hidden memory
uncited source synthesis
production changes without proof
```

## Source authority rules

The order of authority is:

```text
1. Human instruction for the current task, if safe and lawful.
2. Current repo state and committed governance docs.
3. Workorder scope and constraints.
4. Referenced playbook guidance.
5. Schemas, tests, and checks.
6. Examples and demos as teaching material.
7. External docs as source material, not automatic doctrine.
8. AI-generated recommendation as advisory only.
```

If these conflict, stop and report the conflict.

## Required checks

At minimum, an executor applying this playbook should run or define:

```text
- governance/docs check for any changed guidance
- schema or contract validation for tool manifests, if present
- tests for scripts or adapters, if present
- manual review of side-effect tools
- link/path check for docs and examples
- python tools/pmp_check.py --area all, if present
- python -m pytest, if present
```

Do not mark an agent/tool design complete if the tool authority and approval gates are unclear.

## Human approval gates

A human must approve before:

```text
- enabling write/delete/publish/deploy/send/payment tools
- granting broad repo, network, browser, email, calendar, account, cloud, or filesystem access
- changing security, safety, legal, financial, compliance, or production-facing behavior
- converting a read-only assistant into an action agent
- storing persistent user/project memory outside the repo without a stated policy
```

## Completion report

The executor should report:

```text
agent mission
agent role
read tools
draft tools
action tools
proof tools
tool contracts added or proposed
approval gates
source authority rules
checks added or run
checks passed or failed
open risks
follow-up workorders needed
lessons learned created or not needed
```

## Practical lesson

Tool-using agents are not magic workers.

They are controlled participants in a workflow.

Design the workflow first, then expose the smallest useful tools.
