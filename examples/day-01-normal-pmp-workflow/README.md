# Day in the life 1: governance update through a foreground AI and coding agent

This example shows a normal PMP-style workflow.

The point is not that the exact task below is special. The point is the operating pattern:

```text
human intent
  -> foreground AI clarifies and bounds the work
  -> repo-visible workorder captures the task contract
  -> coding agent executes the bounded task
  -> checks prove completion
  -> completion note records what happened
```

## The human request

```text
Update the AI repo guidance to say foreground agents must not expose every MCP tool to every task.
The workorder should require allow-listed tools only.
Also don't allow coding agents to invent missing file paths.
Update the checker/tests so this rule is enforced.
```

## The foreground AI response

```text
Current state:
  The repo already has AGENTS.md, workorder guidance, a workorder contract, and a lightweight governance checker.

Target:
  Add tool-boundary guidance and path-hallucination guardrails.

Constraint:
  Do not broaden this into a general MCP framework. Keep it as repo governance for bounded AI-assisted work.

Foreground/executor decision:
  This should become a workorder because it requires multiple coordinated repo edits and test updates.

Next move:
  Create a dated workorder for the coding agent.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-25-1430-by-lightrock-tool-boundary-governance.md
```

The workorder tells the coding agent to:

```text
1. Read README.md, AGENTS.md, workorders/README.md, and workorders/TEMPLATE.md.
2. Update AGENTS.md with tool-boundary guidance.
3. Update workorders/TEMPLATE.md if the template needs to mention allowed tools or forbidden tools.
4. Update schemas/workorder-contract.json if the required workorder contract needs new governance fields.
5. Update tools/pmp_check.py if the checker should enforce the new rule.
6. Update tests/test_pmp_check.py so the rule is covered.
7. Do not create a general MCP framework.
8. Do not expose all tools to all tasks.
9. Do not allow coding agents to invent missing file paths.
10. Run python tools/pmp_check.py --area all.
11. Run python -m pytest.
12. Keep working until checks pass or report a real blocker.
13. Create or propose a lesson learned if this exposes a repeated governance gap.
```

## The instruction handed to the coding agent

```text
Read workorders/2026-05-25-1430-by-lightrock-tool-boundary-governance.md and execute it.
```

## The coding agent completion note

The coding agent reports:

```text
Changed files:
  - AGENTS.md
  - workorders/TEMPLATE.md
  - schemas/workorder-contract.json
  - tools/pmp_check.py
  - tests/test_pmp_check.py

Checks run:
  - python tools/pmp_check.py --area all
  - python -m pytest

Checks passed or failed:
  - pmp_check passed
  - pytest passed

Checks not run and why:
  - none

Lessons learned:
  - not needed, because the rule was added directly to existing governance

Open questions:
  - none

Workorder:
  - workorders/2026-05-25-1430-by-lightrock-tool-boundary-governance.md
```

## What this demonstrates

The chat does not have to remember everything.

The repository holds the durable intent.

The workorder bounds the task.

The coding agent executes instead of improvising.

The checker and tests make governance inspectable.

The completion note ties the finished work back to the original task contract.

## The practical lesson

When a request becomes more than a small bounded edit, the foreground AI should stop acting like a coding environment and create a workorder for an executor.

That is how PMP keeps AI-assisted work from turning into chat memory, tool sprawl, and unreviewable agent improvisation.
