# <Task title>

## Purpose

Explain why this work should happen.

## Scope

Describe exactly what should be changed or created.

## Files/areas likely to change

List likely files, folders, or project areas.

## Out of scope

List what must not be changed, implied, expanded, or silently added.

## Constraints

Record architecture, safety, naming, compatibility, style, or project-discipline constraints.

## Required checks

List required checks, such as:

```text
manual review
focused check
lite check
full gate
unit tests
schema validation
link check
example smoke test
python tools/pmp_check.py --area all
python -m pytest
```

The executor should keep working until the required checks pass unless blocked by missing authority, missing access, unsafe ambiguity, or a real conflict with the workorder or repo doctrine.

If checks cannot be made to pass within scope, the executor must report which checks failed, what was tried, why the failure could not be fixed safely, and what human decision or follow-up workorder is needed.

## Expected result

Describe what the repo should look like when the work is complete.

## Fallback behavior

Explain what the executor should do if the workorder is ambiguous, blocked, conflicting, or unsafe to complete as written.

The executor should stop and report a precise blocker instead of pretending completion.

## Lessons learned

State whether this work is likely to require a lesson learned.

Create or propose a lesson learned if the work reveals a repeated mistake, missing rule, fragile workflow, ambiguous command, misleading document, unsafe assumption, or architectural trap that the repo should remember.

If no lesson learned is needed, say so in the completion note.

## Completion note

The executor should report:

```text
changed files
checks run
checks passed or failed
checks not run and why
lessons learned created or not needed
open questions
exact workorder path
```
