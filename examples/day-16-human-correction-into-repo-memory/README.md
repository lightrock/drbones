# Day in the life 16: turn a human correction into repo memory

This example is about what to do when a human correction reveals something the repository should remember.

A correction may be only a small edit.

But sometimes it exposes a missing rule, trigger, checklist, or boundary that future AI assistants should see.

## Human request

```text
How will the foreground AI know to use this example later unless the repo tells it when to read it?
```

## The pattern

```text
human correction
→ identify the reusable lesson
→ choose the right repo surface
→ patch the rule where future AI will read it
→ keep user-facing docs clean
```

## Repo surfaces

```text
README.md
  Human landing page.

AGENTS.md
  Standing AI operating rules and trigger conditions.

workorders/
  One-time task contracts.

playbooks/
  Reusable workflow guidance.

examples/
  Teaching stories.

docs/wiki/
  Navigation and cross-links.
```

## Checklist

Before turning a correction into repo memory, ask:

- Is this only a wording preference?
- Could a future AI make the same mistake?
- Is the fix user-facing or agent-facing?
- Where will the future AI actually read it?
- Should this be a direct patch, a workorder, a playbook update, or a lesson learned?

## Example

If an example contains a checklist, but nothing tells the foreground AI when to read that example, the checklist may not affect future work.

The cleaner fix is:

```text
1. Keep the example readable.
2. Add the trigger rule to AGENTS.md.
3. Tell future foreground AIs when the example applies.
```

## Practical lesson

Do not merely patch the visible text.

Ask whether the correction should become durable repo memory.

That is how the project gets smarter over time.
