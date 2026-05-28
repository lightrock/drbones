# Day in the life 12: design an MCP-style tool agent correctly

This example is not about making a magical autonomous agent.

It is about designing a tool-using AI workflow with clear architecture boundaries before exposing tools, APIs, scripts, or command surfaces to an assistant.

Related companion note:

- [`real-world-mcp-comparison.md`](real-world-mcp-comparison.md) — compares Day 12 against typical working MCP-style examples and explains the difference between capability demos and authority-governed agent design.

The point is simple:

```text
Do not give an AI tools until you know what authority those tools carry.
```

## The human request

```text
I want to create an MCP-style agent for this project. It should be able to inspect repo state, use tools, maybe open issues or workorders, and help with project governance. Make a workorder that designs this correctly instead of just wiring random tools into an agent.
```

## The foreground AI response

```text
Current state:
  The repo has durable governance docs, workorders, examples, playbooks, checks, and wiki pages.
  It now has a vendor-independent playbook for MCP-style agent design.

Target:
  Create a bounded architecture workorder for designing a tool-using agent surface.
  The design should separate agent role, read tools, draft tools, action tools, proof tools, approval gates, and checks.

Constraint:
  Do not create a broad autonomous agent.
  Do not expose write/delete/publish/deploy/send/payment tools without explicit approval gates.
  Do not collapse evidence, finding, report, command, execution, and proof.
  Do not treat AI recommendation as authority.
  Do not make a vendor-specific agent package the source of truth.

Foreground/executor decision:
  This should become a workorder because it affects future tool authority, repo governance, security boundaries, and agent behavior.

Next move:
  Create a dated MCP-style agent design workorder that references playbooks/mcp-style-agent-design/PLAYBOOK.md.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1900-by-lightrock-design-mcp-style-agent.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, playbooks/README.md, and playbooks/mcp-style-agent-design/PLAYBOOK.md.
3. Identify the agent mission in one plain sentence.
4. Separate the agent role from tool authority.
5. Classify proposed tools as read tools, draft tools, action tools, or proof tools.
6. Define every proposed tool as a contract: purpose, inputs, forbidden inputs, outputs, side effects, failure behavior, logs, approval requirement, and checks after use.
7. Start read-only first unless the human explicitly requested action tools.
8. Preserve PFEM/PFCOMM-style boundaries: raw evidence is not normalized evidence, normalized evidence is not a finding, finding is not report, report is not command, command is not execution, execution is not proof, local evidence is not global truth, rollup status is not raw evidence, AI recommendation is not authority.
9. Define source authority levels for repo docs, workorders, playbooks, schemas, tests, examples, external docs, and AI-generated recommendations.
10. Add human approval gates for high-impact actions.
11. Define proof/check behavior after any action tool.
12. Produce an architecture note, tool contract sketch, or follow-up workorder list according to repo conventions.
13. Do not implement broad tool access unless this workorder explicitly authorizes it.
14. Run required checks if files are changed.
15. Keep working until checks pass or report a real blocker.
16. Create or propose a lesson learned if the design reveals a repeated agent/tool authority hazard.
```

## Expected design output

A first-pass design should include:

```text
Agent mission
  - one plain sentence

Agent role
  - what the agent may reason about, classify, draft, recommend, or request

Read tools
  - repo file read
  - issue read
  - docs/source read
  - schema/test inspection

Draft tools
  - workorder draft
  - issue draft
  - completion note draft
  - report/proposal draft

Action tools
  - file write
  - issue creation
  - command execution
  - external API call
  - publish/deploy/send/delete/payment, if ever allowed

Proof tools
  - diff inspection
  - fetch created issue/file
  - run checks
  - validate schema
  - inspect logs/status

Approval gates
  - what requires explicit human authorization

Source authority rules
  - how conflicts are handled

Checks
  - what proves the design still hangs together

Open risks
  - what should not be automated yet
```

## What this demonstrates

MCP-style tool access is an architecture boundary, not a cool trick.

The useful pattern is:

```text
mission
→ authority boundary
→ tool contract
→ approval gate
→ action
→ proof
→ completion report
```

PFEM/PFCOMM-style discipline matters because tool agents can otherwise collapse important boundaries:

```text
observed source material
→ AI summary
→ recommendation
→ command
→ execution
→ claimed success
```

Those are not the same thing.

## The practical lesson

Good MCP-style agent design prevents three common AI-assisted failures:

```text
1. The agent gets tools before anyone defines what authority those tools carry.
2. A recommendation silently becomes an action.
3. The agent reports success without proof that the action happened correctly.
```

Design the authority boundary first. Then expose the smallest useful tools.
