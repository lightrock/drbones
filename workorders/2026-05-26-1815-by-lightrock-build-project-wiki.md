# Build project wiki from current repo context

## Purpose

Create a small, durable project wiki for the PMP AI Project Skeleton repository so humans and AI assistants can navigate the project without rehydrating context from scratch every time.

This work invokes the Day in the life 9 workflow:

```text
examples/day-09-project-wiki-build/README.md
```

The wiki should be a map back to source material, not a replacement for source material.

## Scope

Create a first-pass `docs/wiki/` area that organizes the current project context into auditable wiki pages.

The wiki should help a reader answer:

```text
What is this project?
What is PMP trying to teach AI assistants?
What files are authoritative?
What are workorders?
What are invocable workflows?
What examples exist?
What checks/gates exist?
What still needs human decision or follow-up work?
```

Expected first-pass wiki shape:

```text
docs/wiki/README.md
docs/wiki/project-purpose.md
docs/wiki/architecture-boundaries.md
docs/wiki/workflows.md
docs/wiki/examples-and-demos.md
docs/wiki/checks-and-gates.md
docs/wiki/needs-human-decision.md
```

Use these exact filenames unless current repo guidance clearly requires a better local convention.

## Files/areas likely to change

Likely added files:

```text
docs/wiki/README.md
docs/wiki/project-purpose.md
docs/wiki/architecture-boundaries.md
docs/wiki/workflows.md
docs/wiki/examples-and-demos.md
docs/wiki/checks-and-gates.md
docs/wiki/needs-human-decision.md
```

Likely source files to read and link from:

```text
README.md
readme_pmp.md
AGENTS.md
workorders/README.md
workorders/TEMPLATE.md
examples/README.md
examples/day-01-normal-pmp-workflow/README.md
examples/day-02-repo-identity/README.md
examples/day-03-architecture-doctrine-migration/README.md
examples/day-04-distributed-guidance/README.md
examples/day-05-vendor-adapter-workflow/README.md
examples/day-06-release-surface-mapping/README.md
examples/day-07-vigilance-check/README.md
examples/day-08-contradiction-scan/README.md
examples/day-09-project-wiki-build/README.md
examples/webgl-demo-3/README.md
examples/webgl-demo-3/webgl_demo3.html
examples/hobbyist-mechanic-57-chevy/README.md
docs/architecture/semantic-folder-hierarchy.md
docs/origin/stream-of-consciousness.md
docs/releases/v0.3.1.md
schemas/workorder-contract.json
tools/pmp_check.py
tests/test_pmp_check.py
```

Do not assume this list is complete. Inspect the repo first.

## Out of scope

Do not rewrite the root `README.md`.

Do not rewrite `readme_pmp.md` unless a broken link or necessary wiki-discovery link is clearly required and small.

Do not change architecture doctrine.

Do not change workorder governance.

Do not create a full product documentation site, static-site generator, MkDocs/Sphinx/Docusaurus setup, custom CSS, images, diagrams, or generated website.

Do not convert examples into product claims.

Do not treat origin/legacy material as current doctrine.

Do not invent missing decisions.

Do not create a resident wiki agent, daemon, scheduler, or automation.

## Constraints

The wiki must preserve source authority levels.

Current guidance, folder-specific guidance, workorders, examples, release notes, origin/legacy material, issues, and implementation behavior are not all equal.

The wiki must link back to source files wherever possible.

The wiki should use relative Markdown links.

The wiki should be modest, readable, and easy to maintain.

The wiki should mark uncertainty instead of smoothing it over.

The wiki should separate examples and demos from finished-product claims.

The `docs/wiki/examples-and-demos.md` page must include a clickable link to:

```text
../../examples/webgl-demo-3/webgl_demo3.html
```

Use link text:

```text
webgl_demo3.html
```

Include this note near that link:

```text
This is what you can do when your AI has architecture cognition.
```

## Required checks

Run at least:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Also perform a focused manual link/path check for the new wiki files:

```text
- relative links from docs/wiki/*.md to root files
- relative links from docs/wiki/*.md to examples
- relative link to ../../examples/webgl-demo-3/webgl_demo3.html
```

The executor should keep working until the required checks pass unless blocked by missing authority, missing access, unsafe ambiguity, or a real conflict with repo doctrine.

If checks cannot be made to pass within scope, report which checks failed, what was tried, why the failure could not be fixed safely, and what human decision or follow-up workorder is needed.

## Expected result

The repository has a first-pass `docs/wiki/` folder.

The wiki index explains how to use the wiki and how source authority works.

The wiki pages organize project context by concept/workflow rather than dumping file summaries.

The wiki links back to source material.

The examples-and-demos wiki page links to the runnable WebGL demo and includes the architecture-cognition note.

The needs-human-decision page lists unresolved or uncertain items, or says none were found during this pass.

## Fallback behavior

If the wiki folder location is ambiguous, use `docs/wiki/`.

If a source appears stale or conflicting, mark it as stale/conflicting and link it instead of silently reconciling it.

If architecture doctrine appears contradictory, do not fix it inside this workorder. Record it in `docs/wiki/needs-human-decision.md` and propose a follow-up workorder.

If local checks cannot run because dependencies are unavailable, report that clearly and still complete the docs work if safe.

## Lessons learned

Create or propose a lesson learned if this work reveals a repeated context-drift problem, missing source-of-truth rule, broken link pattern, unclear authority boundary, or wiki-maintenance hazard that the repo should remember.

If no lesson learned is needed, say so in the completion note.

## Completion note

The executor should report:

```text
changed files
wiki pages added or updated
source files used
source authority decisions
uncertainty or human-decision items preserved
checks run
checks passed or failed
checks not run and why
lessons learned created or not needed
open questions
exact workorder path: workorders/2026-05-26-1815-by-lightrock-build-project-wiki.md
```
