# Day in the life 8: invoke a contradiction scan

This example is not about creating a permanent autonomous agent.

It is about defining an invocable workflow: a repeatable request the human or foreground AI can run when a project may contain conflicting claims across docs, issues, workorders, examples, requirements, support notes, or implementation behavior.

The point is simple:

```text
Summarizing context is useful.
Finding contradictions across context is often more valuable.
```

## The human request

```text
Run a contradiction scan. Check whether our README, workorders, examples, architecture docs, issues, and current implementation are saying different things about the same project rule or workflow.
```

## The foreground AI response

```text
Current state:
  The repo has multiple places where intent and rules may be recorded: README files, AGENTS.md, workorders, examples, issues, schemas, tests, and implementation files.
  Some of those sources may have drifted or may describe the same concept differently.

Target:
  Produce an evidence-backed contradiction report that identifies real conflicts, harmless wording differences, stale docs, and places where a workorder or issue is needed.

Constraint:
  Do not treat every wording difference as a contradiction.
  Do not rewrite doctrine casually.
  Do not collapse current repo state, old release notes, origin material, examples, and active guidance into one authority level.
  Do not change architecture-level guidance without a workorder.

Foreground/executor decision:
  This should become a workorder if the scan requires broad repo inspection, file edits, tests, or issue/workorder creation.
  It can stay in foreground chat if the human only wants a read-only report.

Next move:
  Create a dated contradiction-scan workorder or run a read-only foreground review, depending on scope.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1730-by-lightrock-run-contradiction-scan.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, and relevant folder-level AGENTS.md/README.md files.
3. Identify the project concepts to scan: workflow rules, architecture boundaries, release process, workorder governance, examples, checks, naming, or other requested concepts.
4. Gather claims from docs, workorders, issues, examples, schemas, tests, and implementation files.
5. Preserve source authority levels: current guidance, folder-specific guidance, workorders, examples, release notes, origin/legacy material, and implementation behavior are not all equal.
6. Group claims by concept.
7. Classify each group as consistent, wording drift, stale reference, real contradiction, missing source of truth, or human decision required.
8. Cite exact file paths and line references when possible.
9. Do not edit architecture doctrine unless the workorder explicitly asks for correction.
10. If correction is needed, propose a bounded workorder or issue.
11. Run required repo checks if files are changed.
12. Keep working until checks pass or report a real blocker.
13. Create or propose a lesson learned if the scan reveals a repeated contradiction pattern.
```

## Expected output

```text
Concepts scanned:
  - list concepts or workflows reviewed

Claim groups:
  - concept
  - source files
  - claims found
  - authority level of each source

Classification:
  - consistent
  - wording drift
  - stale reference
  - real contradiction
  - missing source of truth
  - human decision required

Recommended actions:
  - no action
  - small doc fix
  - issue
  - workorder
  - human architecture decision

Actions taken:
  - files changed, if allowed
  - issues/workorders created, if allowed

Checks run:
  - list commands and results, if files changed

Lessons learned:
  - created, proposed, or not needed
```

## What this demonstrates

A contradiction scan is an invocable project workflow.

It does not need to be an always-on agent.

The useful pattern is:

```text
collect claims
→ preserve source authority
→ compare concepts
→ classify drift vs contradiction
→ cite evidence
→ open issue/workorder only when needed
```

## The practical lesson

Good contradiction scanning prevents three common AI-assisted failures:

```text
1. The AI follows stale docs because it does not know which source is authoritative.
2. The repo slowly teaches different rules in different folders.
3. The human has to personally remember every architecture correction ever made.
```

Make contradictions visible. Make authority explicit.
