# Day in the life 9: invoke a project wiki build

This example is not about creating a permanent wiki agent.

It is about defining an invocable workflow: a repeatable request the human or foreground AI can run when project context is scattered across README files, architecture docs, issues, workorders, examples, release notes, decisions, and source files.

The point is simple:

```text
A useful wiki is not magic memory.
It is a navigable map back to source material.
```

## The human request

```text
Make or refresh a project wiki for this repo. Turn scattered project context into durable, auditable wiki pages without inventing authority or hiding uncertainty.
```

## The foreground AI response

```text
Current state:
  The repo has project knowledge spread across README files, AGENTS.md, workorders, examples, release notes, origin material, issues, schemas, tests, and implementation files.
  Some sources may be current doctrine, while others may be examples, old origin notes, release history, or stale references.

Target:
  Build or refresh a project wiki that helps humans and AI assistants navigate the project context, concepts, workflows, rules, and source material.

Constraint:
  Do not treat a wiki summary as authority by itself.
  Do not erase uncertainty or contradictions.
  Do not collapse current doctrine, examples, release notes, origin material, issues, and implementation behavior into one authority level.
  Do not invent missing architecture decisions.
  Preserve links back to source files.

Foreground/executor decision:
  This should become a workorder because it requires broad repo inspection, concept extraction, page organization, source linking, and likely file creation.

Next move:
  Create a dated project-wiki-build workorder for an executor.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1800-by-lightrock-build-project-wiki.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, and relevant folder-level AGENTS.md/README.md files.
3. Read examples, workorders, release notes, architecture docs, origin material, schemas, tests, and issues as relevant to the requested wiki scope.
4. Identify the major project concepts, workflows, roles, boundaries, checks, examples, and decision points.
5. Preserve source authority levels: current guidance, folder-specific guidance, workorders, examples, release notes, origin/legacy material, issues, and implementation behavior are not all equal.
6. Create or refresh a wiki index page.
7. Create wiki pages by concept or workflow, not by dumping file summaries.
8. Link each wiki claim back to source files, issues, workorders, or examples where possible.
9. Mark uncertain, stale, conflicting, or human-decision-needed material instead of smoothing it over.
10. Separate current doctrine from origin/legacy context.
11. Separate examples and demos from finished-product claims.
12. Add a "needs human decision" section where the repo does not clearly identify the source of truth.
13. Add TODOs or proposed follow-up workorders for missing pages, missing checks, or unresolved contradictions.
14. Do not change architecture doctrine unless the workorder explicitly asks for correction.
15. Run required repo checks if files are changed.
16. Keep working until checks pass or report a real blocker.
17. Create or propose a lesson learned if the wiki build reveals repeated context drift, missing source-of-truth rules, or unclear authority boundaries.
```

## Expected wiki shape

The exact folder and page names should follow the repository's existing documentation style.

A simple wiki shape might look like:

```text
docs/wiki/README.md
  - wiki index
  - how to use this wiki
  - source authority rules

docs/wiki/project-purpose.md
  - project purpose
  - current status
  - source links

docs/wiki/architecture-boundaries.md
  - concepts that must not be collapsed
  - source links
  - open questions

docs/wiki/workflows.md
  - foreground workflow
  - executor workflow
  - workorder workflow
  - release workflow
  - vigilance workflow
  - contradiction scan workflow

docs/wiki/examples-and-demos.md
  - day-in-the-life examples
  - demo artifacts
  - clickable links back to runnable demos
  - note: "This is what you can do when your AI has architecture cognition."
  - example link: [webgl_demo3.html](../../examples/webgl-demo-3/webgl_demo3.html)

docs/wiki/checks-and-gates.md
  - available checks
  - full gate/lite gate distinction
  - missing checks

docs/wiki/needs-human-decision.md
  - unresolved authority questions
  - stale/conflicting sources
  - proposed workorders
```

The wiki should remain a map, not a substitute for source files.

When the wiki references a runnable demo, it should include a clickable link back to the demo artifact instead of only summarizing it. For example, a wiki page about examples and demos should link to [`webgl_demo3.html`](../../examples/webgl-demo-3/webgl_demo3.html) with the note: "This is what you can do when your AI has architecture cognition."

## What the executor should report

```text
Changed files:
  - list every changed file

Wiki pages added or updated:
  - page path
  - purpose of page
  - primary sources used

Source authority handling:
  - current guidance sources
  - examples/demo sources
  - origin/legacy sources
  - release/history sources
  - unclear or conflicting sources

Uncertainty preserved:
  - stale references
  - contradictions
  - missing source of truth
  - human decision needed

Follow-up work proposed:
  - issues or workorders created/proposed
  - missing checks
  - missing wiki pages

Checks run:
  - python tools/pmp_check.py --area all, if applicable
  - python -m pytest, if applicable
  - any project-specific docs/wiki/check gate

Checks passed or failed:
  - report actual result

Checks not run and why:
  - report actual reason, if any

Lessons learned:
  - created, proposed, or not needed

Workorder:
  - workorders/2026-05-26-1800-by-lightrock-build-project-wiki.md
```

## What this demonstrates

A project wiki build is an invocable workflow.

It does not need to be an always-on agent.

The useful pattern is:

```text
collect scattered context
→ preserve source authority
→ organize by concept/workflow
→ link back to evidence
→ mark uncertainty
→ propose follow-up work only when needed
```

## The practical lesson

A good project wiki prevents three common AI-assisted failures:

```text
1. The AI treats stale or origin material as current doctrine.
2. The human has to manually re-explain the project every time.
3. Scattered docs become summaries with no links back to source authority.
```

Make context navigable. Keep authority inspectable.
