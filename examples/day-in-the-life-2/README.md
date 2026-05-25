# Day in the life 2: make startup instructions repo-specific

This example shows a normal PMP-style documentation/governance task.

The human wants the README startup instructions to include the current project repository, and wants workorders to tell coding agents which repo they are working in.

The point is simple:

```text
A new AI chat should not have to guess the repository.
A coding agent executing a workorder should not have to guess the repository.
```

## The human request

```text
Update my README.md so that the copyable first instructions to an AI chat references my repo https://blahdiblah/blah and make sure that the coding agent knows the current repo when given workorders.
```

## The foreground AI response

```text
Current state:
  The README has a Foreground AI quickstart block that users can copy into a new AI chat.
  Workorder guidance tells agents to read exact workorder paths, but may not force the repository identity into the copied startup block or executor instruction.

Target:
  Make the startup block explicitly name the repository.
  Make workorder handoff instructions tell the coding agent the current repository before execution.

Constraint:
  Do not turn this into a new workflow system.
  Keep the change small and documentation/governance-focused.
  Do not assume https://blahdiblah/blah is a real GitHub URL beyond using it as the example repository named by the human.

Foreground/executor decision:
  This is probably safe as a small documentation update if only README/workorder guidance changes.
  If tests or checker behavior must change, create a workorder for a coding agent.

Next move:
  Update README.md and any workorder guidance needed so repo identity is explicit in startup and executor handoff text.
```

## Possible README startup change

The copyable startup block should include a repository line near the top:

```text
You are the foreground AI for this PMP-style repository.

Repository:
  https://blahdiblah/blah

Current repository state beats chat memory.
```

That way a fresh AI chat has the repo identity before it starts reasoning.

## Possible workorder handoff change

Instead of giving a coding agent only this:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

Give it this:

```text
Repository: https://blahdiblah/blah
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md in that repository and execute it.
Current repo state beats chat memory.
```

## Why this matters

AI assistants often work across many repositories, copied prompts, old chats, and stale assumptions.

A workorder path without a repository can be ambiguous when:

```text
1. The user has multiple related repos.
2. The AI has old project memory from another repo.
3. The coding agent starts in the wrong checkout.
4. A copied workorder instruction is reused in a different chat.
5. The repo was forked, renamed, or templated.
```

Naming the repository is cheap. Recovering from wrong-repo edits is not.

## What the coding agent should report

A coding agent executing this task should report:

```text
Changed files:
  - README.md
  - workorders/README.md or AGENTS.md if updated

Checks run:
  - python tools/pmp_check.py --area all
  - python -m pytest

Checks passed or failed:
  - report actual result

Checks not run and why:
  - report actual reason, if any

Lessons learned:
  - create one if the repo did not previously make repository identity explicit enough for copied startup/workorder prompts

Workorder:
  - exact path if a workorder was used
```

## What this demonstrates

The repository identity is part of the task contract.

A startup prompt should say which repo the AI is helping with.

A workorder handoff should say which repo the coding agent must inspect.

This prevents a common AI-assisted development failure:

```text
right task shape
wrong repository context
```

## The practical lesson

Every copyable AI startup prompt and every coding-agent workorder handoff should make the repository explicit.

Do not rely on chat memory or vibes to identify the repo.
