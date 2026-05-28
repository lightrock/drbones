# Day in the life 7: invoke a vigilance check

This example is not about building a new autonomous agent.

It is about defining an invocable workflow: a repeatable request the human or foreground AI can run when the project needs a watchful pass over sources that people do not reliably monitor by hand.

The point is simple:

```text
Some AI value is not glamorous generation.
Some AI value is disciplined vigilance over boring sources.
```

## The human request

```text
Run a vigilance check for this repo. Look for meaningful upstream changes, stale assumptions, dependency warnings, release-risk notes, or external signals that should become an issue or workorder.
```

## The foreground AI response

```text
Current state:
  The repo has external assumptions and moving parts that may change outside the normal coding flow.
  Those changes may affect releases, dependencies, vendor integrations, documentation, policy, or operational safety.

Target:
  Produce a bounded vigilance pass that identifies meaningful changes, cites evidence, and opens an issue or workorder only when action is justified.

Constraint:
  Do not spam the repo with low-value issues.
  Do not treat every upstream change as actionable.
  Do not silently update dependencies, policies, release docs, or generated files.
  Do not turn weak signals into authoritative findings.

Foreground/executor decision:
  This should become a workorder if it requires repo inspection, web/source review, issue creation, file edits, or checks.
  It can stay in foreground chat if the human only wants a quick classified report.

Next move:
  Create a dated vigilance-check workorder or run a read-only foreground review, depending on scope.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1700-by-lightrock-run-vigilance-check.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, and relevant folder-level guidance.
3. Identify the source categories to check: dependencies, vendor docs, platform docs, release notes, policy assumptions, schema contracts, generated-file assumptions, examples, or other project-specific sources.
4. Check only the requested or clearly relevant sources.
5. Record evidence for each meaningful change or stale assumption.
6. Classify each signal as ignore, watch, issue, workorder, or human decision required.
7. Do not update code or docs unless the workorder explicitly asks for edits.
8. If a signal should become work, create or propose a bounded issue/workorder with source evidence.
9. Run required repo checks if files were changed.
10. Keep working until checks pass or report a real blocker.
11. Create or propose a lesson learned if the vigilance pass reveals a repeated blind spot.
```

## Expected output

```text
Vigilance sources checked:
  - list source categories and exact source references

Signals found:
  - signal
  - source/evidence
  - why it matters or does not matter
  - classification: ignore/watch/issue/workorder/human decision

Actions taken:
  - issues opened
  - workorders created
  - docs updated, if explicitly allowed

Actions intentionally not taken:
  - noisy signals ignored
  - risky changes deferred
  - human-gated decisions left for review

Checks run:
  - list commands and results, if files changed

Lessons learned:
  - created, proposed, or not needed
```

## What this demonstrates

A vigilance check is an invocable project workflow.

It does not need to be a resident agent, a chatbot persona, or a daemon.

The value comes from making the watch pattern explicit:

```text
watch source
→ detect meaningful change
→ classify impact
→ attach evidence
→ open issue/workorder only when justified
```

## The practical lesson

Good vigilance prevents three common AI-assisted failures:

```text
1. The project misses upstream changes until something breaks.
2. The AI floods the repo with noisy issues because it cannot classify impact.
3. The AI updates important assumptions without evidence, review, or checks.
```

Make watching boring. Make escalation evidence-backed.
