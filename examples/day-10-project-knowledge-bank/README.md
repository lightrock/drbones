# Day in the life 10: invoke a project knowledge bank build

This example is not about creating a content agent, fake personas, or an always-on marketing machine.

It is about defining an invocable workflow: a repeatable request the human or foreground AI can run when a project needs reusable source material instead of making the AI invent from blank context every time.

The point is simple:

```text
A wiki helps you navigate what the project knows.
A knowledge bank stores reusable source material the project can safely draw from.
```

## The human request

```text
Build a project knowledge bank. Find reusable examples, stories, decisions, phrases, lessons, boundaries, and do-not-say rules from the repo so future AI work can draw from source material instead of generic vibes.
```

## The foreground AI response

```text
Current state:
  The repo has useful source material scattered across README files, workorders, examples, release notes, origin material, issues, lessons, tests, and implementation notes.
  Some of that material is reusable. Some is current doctrine. Some is example/demo material. Some is origin/legacy context.

Target:
  Create a project knowledge bank that preserves reusable source material with source links, authority levels, intended uses, and reuse constraints.

Constraint:
  Do not invent stories, examples, claims, customer facts, product claims, metrics, or authority.
  Do not turn examples into finished-product claims.
  Do not treat origin/legacy material as current doctrine.
  Do not create fake personas.
  Do not create an outbound content automation system.
  Preserve source links and reuse constraints.

Foreground/executor decision:
  This should become a workorder because it requires repo inspection, source extraction, page organization, authority handling, and likely file creation.

Next move:
  Create a dated project-knowledge-bank workorder for an executor.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1830-by-lightrock-build-project-knowledge-bank.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, and relevant folder-level AGENTS.md/README.md files.
3. Read examples, workorders, release notes, architecture docs, origin material, schemas, tests, and issues as relevant to the requested bank scope.
4. Identify reusable project source material: examples, stories, decision records, architecture boundaries, phrases, break words, lessons learned, workorder patterns, completion-note patterns, demo notes, and do-not-say rules.
5. Preserve source authority levels: current guidance, folder-specific guidance, workorders, examples, release notes, origin/legacy material, issues, and implementation behavior are not all equal.
6. Create or refresh a knowledge-bank index page.
7. Create bank pages by reuse purpose, not by dumping file summaries.
8. Link each bank item back to source files, issues, workorders, examples, or docs where possible.
9. For each reusable item, record intended use, reuse constraint, and source authority.
10. Mark uncertain, stale, conflicting, or human-decision-needed material instead of smoothing it over.
11. Separate current doctrine from origin/legacy context.
12. Separate examples and demos from finished-product claims.
13. Add a do-not-use or needs-human-review section for risky material.
14. Add TODOs or proposed follow-up workorders for missing banks, missing checks, or unresolved source-of-truth questions.
15. Do not change architecture doctrine unless the workorder explicitly asks for correction.
16. Run required repo checks if files are changed.
17. Keep working until checks pass or report a real blocker.
18. Create or propose a lesson learned if the knowledge-bank build reveals repeated reuse hazards, context drift, unclear source authority, or missing source-of-truth rules.
```

## Expected knowledge bank shape

The exact folder and page names should follow the repository's existing documentation style.

A simple knowledge bank might look like:

```text
docs/banks/README.md
  - bank index
  - how to use these banks
  - source authority rules
  - reuse rules

docs/banks/examples.md
  - reusable examples
  - source links
  - intended use
  - reuse constraints

docs/banks/architecture-boundaries.md
  - boundaries and distinction rules
  - source links
  - do-not-collapse notes

docs/banks/workorder-patterns.md
  - reusable workorder shapes
  - preview vs quiet mode
  - completion-note patterns

docs/banks/invocable-workflows.md
  - release-surface map
  - vigilance check
  - contradiction scan
  - project-wiki build
  - knowledge-bank build

docs/banks/language-and-phrases.md
  - useful phrases
  - terms of art
  - words to use carefully

docs/banks/do-not-say.md
  - claims the project should not make
  - stale/origin material that needs caution
  - product claims requiring human review
```

The knowledge bank should remain source-backed reusable material, not a substitute for source files.

## What the executor should report

```text
Changed files:
  - list every changed file

Knowledge bank pages added or updated:
  - page path
  - purpose of page
  - primary sources used

Reusable material captured:
  - examples
  - phrases
  - architecture boundaries
  - workorder patterns
  - invocable workflow patterns
  - do-not-say rules
  - lessons or decision patterns

Source authority handling:
  - current guidance sources
  - examples/demo sources
  - origin/legacy sources
  - release/history sources
  - unclear or conflicting sources

Reuse constraints preserved:
  - where material may be reused
  - where human review is required
  - what claims must not be made

Follow-up work proposed:
  - issues or workorders created/proposed
  - missing banks
  - missing checks
  - unresolved authority questions

Checks run:
  - python tools/pmp_check.py --area all, if applicable
  - python -m pytest, if applicable
  - any project-specific docs/bank/check gate

Checks passed or failed:
  - report actual result

Checks not run and why:
  - report actual reason, if any

Lessons learned:
  - created, proposed, or not needed

Workorder:
  - workorders/2026-05-26-1830-by-lightrock-build-project-knowledge-bank.md
```

## What this demonstrates

A project knowledge bank is an invocable workflow.

It does not need to be an always-on agent.

The useful pattern is:

```text
collect reusable source material
→ preserve source authority
→ organize by intended reuse
→ link back to evidence
→ mark constraints and do-not-use rules
→ propose follow-up work only when needed
```

## The practical lesson

A good knowledge bank prevents three common AI-assisted failures:

```text
1. The AI writes generic mush because it has no reusable project material.
2. The AI reuses examples, origin language, or stale claims in the wrong context.
3. The human has to keep re-teaching the same phrases, boundaries, examples, and do-not-say rules.
```

Give the AI source-backed material. Tell it how that material may be reused.
