# Day in the life 20: TODO state review

This example is about turning a rough TODO list into a current-state review without pretending the repo is more complete than it is.

The point is simple:

```text
A TODO list should not become stale project folklore.
```

If the repo already does part of the TODO, say so. If the repo only gestures at an idea, say that too. Then update the remaining work so the next AI does not rediscover the same status from scratch.

## Human request

```text
Evaluate the TODO.md list vs. repo state, update the items remaining and where we are.
```

or:

```text
Read the TODO and tell me what is already done, what is partial, and what still needs work.
```

## What Doctor Bones should already know

Doctor Bones should already know that current repository state beats chat memory.

That means a TODO review is not a vibes pass. The foreground AI should inspect the actual repo surfaces that prove progress:

```text
README.md
TODO.md
AGENTS.md
examples/README.md
examples/day-*/README.md
workorders/README.md
workorders/TEMPLATE.md
schemas/
tools/pmp_check.py
tests/
docs/index.html
docs/internal-reference/
.github/ or other CI surfaces if present
```

The review should distinguish:

```text
done enough for now
partially implemented
present as prose only
not present yet
blocked or needs executor work
```

## When to read this example

Read this example when the human asks to:

- evaluate `TODO.md` against current repo state
- update a roadmap or TODO list after recent repo changes
- mark items done, partial, or still remaining
- convert rough captured thinking into an actionable status list
- compare aspirational doctrine against files, schemas, examples, checks, or integration surfaces
- prevent stale TODO items from misleading the next AI

## The pattern

```text
human asks for TODO / roadmap state review
→ read TODO.md first
→ inspect the repo surfaces that correspond to each TODO area
→ classify each item as done, partial, prose-only, missing, or blocked
→ update TODO.md with a dated current-state section
→ avoid deleting rough historical notes unless the human asks for cleanup
→ add follow-up TODOs only where the repo state actually supports them
→ run or name the relevant checks
```

## Foreground AI response

Current state:

- The repo has a TODO list that captures rough working intent.
- Some items may already be implemented in README, AGENTS, examples, workorders, schemas, checks, or docs.
- Some items may still exist only as language in TODO.

Target:

- Add a current-state review that tells future humans and AIs where the repo really stands.

Constraint:

- Do not turn the TODO into a fake roadmap with false confidence.
- Do not delete rough captured notes unless the human explicitly asks for cleanup.
- Do not mark an item done just because it exists as prose.
- Do not claim checks were run unless they were actually run.
- Do not create broad implementation work from a chat connector when a workorder would be safer.

Next move:

- Inspect the matching files.
- Update `TODO.md` with a dated status section.
- If this is a recurring workflow, wire this example into `examples/README.md` and `AGENTS.md`.

## Practical review rubric

Use a small rubric when evaluating TODO state:

```text
Done:
  The repo has a durable file/check/example/schema/integration and it is wired where future AIs will read it.

Partial:
  The repo has a real artifact, but it is incomplete, not wired everywhere, not checked, or not polished.

Prose-only:
  The idea exists in README, TODO, AGENTS, examples, or docs, but no machine-readable or executable artifact exists yet.

Missing:
  No meaningful repo artifact found.

Blocked / executor needed:
  The next step requires local checks, broad edits, CI setup, generated artifacts, or tool-specific validation.
```

## Example completion note

```text
Updated TODO.md with a repo-state review.

Changed files:
- TODO.md
- examples/day-20-todo-state-review/README.md
- examples/README.md
- AGENTS.md

Checks:
- Not run here because this connector cannot run the local test suite.
- Manual check: Day 20 is linked from examples/README.md and examples/TRIGGER_MAP.md trigger map.

Remaining risk:
- Local `python tools/pmp_check.py --area all` and `python -m pytest` should still be run by an executor.
```

## Practical lesson

A TODO list is a living evidence surface.

It should answer:

```text
What did we already make real?
What only exists as explanation?
What still needs a schema, rubric, example, check, or integration hook?
What does a future AI need to inspect before touching this area again?
```

That is how Doctor Bones keeps project memory in the repo instead of forcing the human to re-explain the same status every time.
