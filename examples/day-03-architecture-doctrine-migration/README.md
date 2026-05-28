# Day in the life 3: change the governing architecture doctrine

This example shows a bigger PMP-style workflow.

The human is not asking for a small edit. The human is saying the project has changed its governing architecture doctrine.

The old doctrine used one organizing vocabulary. The new doctrine is PFEM/PFCOMM-style:

```text
polycentric evidence/command discipline
clear evidence boundaries
separate evidence from findings
separate findings from commands
authority before action
finite admissible work packets
audit before confidence
local autonomy with federated rollup
```

The point is simple:

```text
When the governing architecture changes, do not casually patch a few words.
Create a workorder, update AI guidance, refactor folder semantics, and update checks/tests so the repo teaches the new architecture.
```

## The human request

```text
We decided on new governing architecture principles.
No longer Miller, but PFEM-style.
Update the project AI guidance and refactor the folder structure and all doodads to correspond.
```

## The foreground AI response

```text
Current state:
  The repo appears to use the previous governing architecture vocabulary.
  Some folders, docs, examples, and AI guidance may still imply the old Miller/living-systems framing.

Target:
  Move the repo to PFEM/PFCOMM-style governing architecture:
  - evidence and command are separate
  - raw evidence, normalized evidence, findings, reports, commands, and rollups must not collapse into one bucket
  - local nodes can operate independently
  - federated rollups consume bounded evidence/command summaries
  - authority gates precede command execution
  - every durable output should be auditable

Constraint:
  This is an architecture-level migration, not a casual rename.
  Do not do this directly from chat.
  Do not silently move files without preserving intent.
  Do not break existing examples without explaining what supersedes them.
  Do not leave old doctrine in AGENTS.md or README if it now misleads future agents.

Foreground/executor decision:
  This must become a workorder because it requires many file edits, folder refactoring, terminology review, tests/checks, and probably lessons learned.

Next move:
  Create a dated architecture-migration workorder for a coding agent.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-25-1515-by-lightrock-pfem-governance-migration.md
```

The workorder tells the coding agent to:

```text
1. Inspect the current repository state.
2. Read README.md, AGENTS.md, workorders/README.md, workorders/TEMPLATE.md, docs/, examples/, schemas/, tools/, and tests/.
3. Identify all places that encode the old governing architecture doctrine.
4. Replace misleading old doctrine with PFEM/PFCOMM-style architecture language.
5. Preserve history where useful by moving deprecated doctrine into docs/origin/ or docs/architecture/legacy/ instead of deleting it blindly.
6. Refactor folder structure only where folder semantics now mis-teach the project.
7. Update AI guidance so future agents know the new governing architecture.
8. Update schemas/contracts if workorders or checks need new architecture-governance fields.
9. Update tools/pmp_check.py if the checker should enforce the new doctrine.
10. Update tests/test_pmp_check.py for any checker changes.
11. Update examples if they still demonstrate the old doctrine as current.
12. Add or propose a lesson learned explaining why governing architecture changes require a workorder instead of casual editing.
13. Run python tools/pmp_check.py --area all.
14. Run python -m pytest.
15. Keep working until checks pass or report a real blocker.
```

## PFEM/PFCOMM doctrine to install

The coding agent should express the new doctrine in plain repo language:

```text
PFEM asks:
  What finite evidence structures can be trusted, reviewed, and rolled up?

PFCOMM asks:
  What finite command structures can be authorized, bounded, executed, and audited?
```

The repo should teach these boundaries:

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

## Folder refactor intent

The workorder should not prescribe a fake final tree before inspection.

Instead, it should tell the executor to make the folder structure teach the architecture.

Possible target semantics:

```text
doctrine/ or docs/architecture/       governing principles and architecture rules
workorders/                           bounded task contracts
schemas/                              machine-readable contracts
checks/ or tools/                     governance/check runners
evidence/ or examples/evidence/       evidence-package examples, if present
commands/ or examples/commands/       command-workflow examples, if present
rollups/ or examples/rollups/         federated rollup examples, if present
lessons-learned/                      durable failure-pattern memory, if added
```

The executor should avoid moving files just to make a prettier tree.

Move or rename only when the current location teaches the wrong architecture.

## What the coding agent should report

```text
Changed files:
  - list every changed file

Moved/renamed files:
  - old path -> new path
  - why the move teaches the new architecture better

Architecture doctrine updated:
  - old doctrine removed, preserved, or marked legacy
  - new PFEM/PFCOMM doctrine installed

Checks run:
  - python tools/pmp_check.py --area all
  - python -m pytest

Checks passed or failed:
  - report actual result

Checks not run and why:
  - report actual reason, if any

Lessons learned:
  - created, proposed, or not needed

Open questions:
  - any doctrine/folder decisions needing human approval

Workorder:
  - workorders/2026-05-25-1515-by-lightrock-pfem-governance-migration.md
```

## What this demonstrates

Some requests are too large and too architectural for a foreground AI to execute casually.

Changing governing doctrine affects:

```text
README language
AGENTS.md instructions
workorder expectations
folder semantics
schemas/contracts
checks/tests
examples
future AI behavior
```

That is exactly when PMP should force a durable task contract.

## The practical lesson

Architecture vocabulary is not decoration.

In an AI-assisted repo, folder names, guidance docs, workorders, examples, schemas, and tests all teach future agents what the project is.

If the governing architecture changes, the repo must be migrated as an architecture system, not patched as prose.
