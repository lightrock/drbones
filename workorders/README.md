# Workorders

Workorders are durable task contracts.

Use them when a task is substantial, process-sensitive, intended for another executor, likely to affect future contributor behavior, or needs durable intent before implementation.

A workorder is not a chat transcript.

A workorder is not a generic pull request summary.

A workorder explains what the next human, AI assistant, coding agent, or review process is supposed to do.

## Filename pattern

Use one permanent dated file per substantial task:

```text
workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md
```

Do not use:

```text
workorders/current-task.md
workorders/latest.md
workorders/next.md
```

Those names destroy history.

## Required sections

Start from [`TEMPLATE.md`](TEMPLATE.md).

A useful workorder should include:

```text
# <Task title>

## Purpose
## Scope
## Files/areas likely to change
## Out of scope
## Constraints
## Required checks
## Expected result
## Fallback behavior
```

## Executor instruction

After a workorder exists, give the executor one exact line:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

Use the real filename.

## Completion note

For workorder-driven changes, cite the exact workorder path in completion notes and pull request text.

Suggested PR body block:

```text
## Workorder
Executed: workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md
```
