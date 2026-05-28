# Day in the life 19: add a new day-in-the-life example

This example is about teaching Doctor Bones how to extend its own example library without leaving loose documentation behind.

The point is simple:

```text
A new example is not wired until future AIs know when to read it.
```

## Human request

```text
Add a new day-in-the-life example for this pattern.
```

or:

```text
Doctor Bones should already know how to handle this. If it does not, add the missing day-in-the-life example and wire it in.
```

## What Doctor Bones should already know

Doctor Bones should already know that day-in-the-life examples are not just reading material.

A valid new day-in-the-life example needs three repo-visible pieces:

```text
examples/day-NN-short-slug/README.md
examples/README.md index entry
examples/TRIGGER_MAP.md trigger-map entry
```

The checker enforces this relationship. If a new `examples/day-NN-short-slug/README.md` exists but is not linked from both `examples/README.md` and `examples/TRIGGER_MAP.md`, the day-in-the-life indexing test should fail.

## When to use this example

Read this example when the human asks to:

- add a day-in-the-life example
- add a new recurring workflow pattern
- teach future AIs when to read a new example
- fix a loose example that exists but is not wired into the trigger map
- repair a failed check saying an example is missing from `examples/TRIGGER_MAP.md` or `examples/README.md`
- decide whether a pattern belongs in examples, playbooks, AGENTS.md, workorders, or lessons learned

## The pattern

```text
human names recurring workflow pattern
→ inspect existing examples
→ decide whether an existing example already covers it
→ if not covered, create the next numbered example
→ add the examples/README.md index entry
→ add the examples/TRIGGER_MAP.md trigger-map entry
→ preserve the distinction between examples, playbooks, workorders, lessons learned, and standing rules
→ run or name the indexing check
```

## Do not add a duplicate example

Before adding a new numbered example, inspect the existing examples.

Ask:

```text
Is this already covered by an existing day-in-the-life example?
Is this better as a cross-reference inside an existing example?
Is this a reusable procedure that belongs in playbooks instead?
Is this a standing AI rule that belongs in AGENTS.md instead?
Is this a one-time task that belongs in workorders instead?
Is this a repeated failure pattern that belongs in lessons learned instead?
```

If an existing example already covers the pattern, update that example or add a cross-reference instead of creating a redundant new day.

## Foreground AI response

Current state:

- The human has identified a recurring workflow pattern that future AIs should recognize.
- The current examples and trigger map must be inspected before adding another example.

Target:

- Preserve the pattern as a small, readable example and wire it so future foreground AIs know when to read it.

Constraint:

- Do not create doctrine sprawl.
- Do not add an example that duplicates an existing one.
- Do not put one-time task instructions in examples.
- Do not put reusable operational procedure in examples if it belongs in a playbook.
- Do not update only the new example file and forget the index or trigger map.

Next move:

- Inspect `examples/README.md`, `examples/TRIGGER_MAP.md`, and the root `AGENTS.md` pointer.
- Inspect the closest existing day-in-the-life examples.
- Create or update the smallest correct repo surface.

## Required edits when creating a new example

When a new day-in-the-life example is justified, perform these edits together:

```text
1. Create examples/day-NN-short-slug/README.md.
2. Add a one-line entry to examples/README.md.
3. Add a trigger-map entry to examples/TRIGGER_MAP.md.
4. Report the changed files and commit SHA.
5. Run the relevant check if execution is available, or state clearly that it was not run.
```

Use the next available integer for `N`.

Do not skip numbers unless the repository already has a reason to do so.

## Suggested example shape

A day-in-the-life README should usually include:

```text
# Day in the life N: short pattern name

This example is about...

The point is simple:

Human request
The problem or pattern
When to read this example
The pattern
Foreground AI response
Direct patch or workorder guidance, if relevant
Practical lesson
```

Do not force every example into a rigid template when the content needs a simpler shape, but keep it easy to scan.

## Trigger-map entry shape

The `examples/TRIGGER_MAP.md` trigger map should answer:

```text
Day N: short pattern name
  Read when the human asks about <specific recognizable prompt shape>.
  examples/day-NN-short-slug/README.md
```

The trigger should be specific enough that future AIs know when to read the example, but not so narrow that the pattern is missed.

## Index entry shape

The `examples/README.md` entry should answer:

```text
- [`day-NN-short-slug/`](day-NN-short-slug/README.md) — one plain-language sentence explaining the workflow pattern.
```

Keep it short. The full teaching story belongs in the example file.

## What to do when the checker fails

If the day-in-the-life indexing test fails, do not patch randomly.

The checker is likely telling you one of these is missing:

```text
examples/day-NN-short-slug/README.md exists
but examples/TRIGGER_MAP.md does not mention Day N or the path
```

or:

```text
examples/day-NN-short-slug/README.md exists
but examples/README.md does not link day-NN-short-slug/README.md
```

Repair the missing wiring, then rerun the same check if execution is available.

## Practical lesson

A day-in-the-life example is a recognition pattern.

It only works if future AIs know when to read it.

```text
example file
+ examples index
+ AGENTS trigger
+ check coverage
= durable workflow memory
```

If Doctor Bones should already know a workflow and does not, teach it in the repo where the next AI will actually look.
