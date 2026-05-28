# Rename day-in-the-life example folders to semantic day slugs

## Purpose

Rename the day-in-the-life example folders so the folder names carry both the teaching order and the semantic workflow meaning.

Current folders such as:

```text
examples/day-in-the-life-21/README.md
```

are useful as chronology, but weak for AI retrieval and repo navigation. Future humans and AI agents should be able to infer the workflow from the path name without opening every README.

Target shape:

```text
examples/day-01-normal-pmp-workflow/README.md
examples/day-02-repo-identity/README.md
examples/day-03-architecture-doctrine-migration/README.md
...
examples/day-21-workflow-automation-architecture/README.md
```

The index text should still preserve the human-facing phrase:

```text
Day 21 — Workflow automation architecture
```

The folder should carry the semantic machine-readable slug.

## Scope

Implement a repo-wide rename from numeric-only `day-in-the-life-N` folders to semantic `day-NN-short-slug` folders.

The executor should:

1. Inspect all existing folders under `examples/day-in-the-life-*/`.
2. Choose stable semantic slugs based on each example README title and index description.
3. Rename folders using git-aware moves so history is preserved as well as practical.
4. Update every repo reference to the old paths.
5. Update tests/checks so they accept the new naming convention.
6. Preserve the day order in `examples/README.md` and `examples/TRIGGER_MAP.md`.
7. Keep the public wording readable for humans.

Recommended slug map based on current examples:

```text
day-in-the-life-1  -> day-01-normal-pmp-workflow
day-in-the-life-2  -> day-02-repo-identity
day-in-the-life-3  -> day-03-architecture-doctrine-migration
day-in-the-life-4  -> day-04-distributed-guidance
day-in-the-life-5  -> day-05-vendor-adapter-workflow
day-in-the-life-6  -> day-06-release-surface-mapping
day-in-the-life-7  -> day-07-vigilance-check
day-in-the-life-8  -> day-08-contradiction-scan
day-in-the-life-9  -> day-09-project-wiki-build
day-in-the-life-10 -> day-10-project-knowledge-bank
day-in-the-life-11 -> day-11-playbook-packaging
day-in-the-life-12 -> day-12-mcp-style-tool-agent-design
day-in-the-life-13 -> day-13-outside-agent-pattern-distillation
day-in-the-life-14 -> day-14-release-readiness-stabilization
day-in-the-life-15 -> day-15-reference-repository-context
day-in-the-life-16 -> day-16-human-correction-into-repo-memory
day-in-the-life-17 -> day-17-failed-test-repair-loop
day-in-the-life-18 -> day-18-external-workflow-output-repair
day-in-the-life-19 -> day-19-example-extension
day-in-the-life-20 -> day-20-todo-state-review
day-in-the-life-21 -> day-21-workflow-automation-architecture
```

The executor may adjust a slug if the current file title makes a clearer semantic name obvious, but should not over-polish or rename concepts beyond this workorder.

## Files/areas likely to change

Likely areas:

```text
examples/day-in-the-life-*/README.md
examples/day-*/README.md
examples/README.md
examples/TRIGGER_MAP.md
tests/test_pmp_check.py
tools/pmp_check.py
README.md
AGENTS.md
docs/index.html
docs/wiki/*.md
docs/releases/*.md
workorders/*.md
```

The executor should search the whole repo for:

```text
day-in-the-life-
examples/day-in-the-life-
Day 1:
Day 2:
Day 3:
```

and update only the references that are path or naming-convention sensitive.

## Out of scope

Do not rewrite the content of every day-in-the-life example.

Do not change the teaching pattern, doctrine, or day sequence.

Do not add new day-in-the-life examples as part of this rename.

Do not remove the phrase `day-in-the-life` from explanatory prose where it describes the category rather than a path.

Do not convert this into a broad docs cleanup.

Do not make connector-only whole-file replacement edits for this task. This is a local/executor job because it involves many file moves, search/replace, and checks.

## Constraints

Current repo state beats this workorder if the repo has changed.

Read before editing:

```text
README.md
AGENTS.md
examples/README.md
examples/TRIGGER_MAP.md
tests/test_pmp_check.py
tools/pmp_check.py
playbooks/connector-github-edits/PLAYBOOK.md
```

Preserve the distinction:

```text
folder/path = semantic machine-readable slug
index text = human-readable Day N title and summary
```

Keep the root `AGENTS.md` small. Do not re-expand the full trigger map into `AGENTS.md`.

Use neutral fixture wording in tests. Follow:

```text
lessons-learned/connector-safe-fixtures.md
```

If this task reveals another repeated friction pattern, create or propose a lesson learned.

## Required checks

Run:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Also run a repository search to confirm no stale path references remain:

```text
day-in-the-life-
examples/day-in-the-life-
```

Acceptable remaining matches must be explanatory prose about the pattern, not broken links or old paths.

If the repo has a link checker or documentation checker available by the time this work is executed, run it too.

## Expected result

The repo uses semantic day folders such as:

```text
examples/day-21-workflow-automation-architecture/README.md
```

`examples/README.md` and `examples/TRIGGER_MAP.md` still present the examples as ordered day-in-the-life teaching patterns.

Tests/checks validate the new naming convention and catch missing index/trigger-map entries.

No broken internal links to old `examples/day-in-the-life-N/README.md` paths remain.

## Fallback behavior

If the rename becomes too large for one safe pass, stop after creating a branch and report the partial state. Do not leave mixed old/new paths on the default branch.

If tests fail because the current check logic assumes `day-in-the-life-N`, update the check logic to understand `day-NN-semantic-slug` instead of weakening the test.

If stale references are ambiguous, leave a note in the completion report and do not guess.

If local tooling is unavailable, do not perform the rename. Report that this workorder requires a local git checkout or capable executor environment.

## Completion note

The executor completion note must include:

```text
changed files
checks run
checks passed or failed
checks not run and why
lessons learned created or not needed
open questions
exact workorder path
```

Also include:

```text
old-to-new folder map used
confirmation that examples/README.md and examples/TRIGGER_MAP.md were updated
confirmation that stale old-path references were searched
```
