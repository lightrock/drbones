# Day in the life 6: map the release surface before automating release work

This example shows a PMP-style release workflow.

The human wants AI help with releases, but the real problem is not one broken command. The real problem is scattered release state: version fields, changelog locations, package metadata, deployment steps, approvals, generated artifacts, and final human checks.

The point is simple:

```text
Do not ask the AI to automate a release surface it has not mapped.
First make the release surface visible, durable, checked, and boring.
```

## The human request

```text
Releases are a mess. There are version numbers, changelogs, metadata files, generated artifacts, deployment steps, and manual review chores scattered across the repo and external systems. Create a workorder to map the release surface before automating anything.
```

## The foreground AI response

```text
Current state:
  The repo has release work spread across files, scripts, generated outputs, and manual platform or deployment steps.
  The release process is not yet captured as a durable repo-native map.

Target:
  Create a release surface map and runbook so future executor agents can bump versions, update notes, prepare artifacts, and run checks without guessing.

Constraint:
  Do not automate deployment before the release surface is mapped.
  Do not hide manual approval, review, signing, billing, compliance, privacy, or production-risk steps inside an "automatic" script.
  Do not treat generated artifacts, source metadata, changelogs, release notes, build outputs, and deployment state as the same thing.
  Do not invent release behavior that is not already present or explicitly requested.

Foreground/executor decision:
  This must become a workorder because it requires repo inspection, release-process discovery, documentation, possible scripts/checks, and a completion report.

Next move:
  Create a dated release-surface mapping workorder for a coding agent.
```

## The workorder created by the foreground AI

Example path:

```text
workorders/2026-05-26-1600-by-lightrock-map-release-surface.md
```

The workorder tells the coding agent to:

```text
1. Inspect the current repository state.
2. Read README.md, readme_pmp.md if present, AGENTS.md, and any folder-level AGENTS.md/README.md files that govern releases, scripts, builds, checks, docs, examples, and generated files.
3. Identify every file or setting that appears to carry version, build, package, changelog, release-note, metadata, generated-output, deployment, or release-status meaning.
4. Identify every release-related command, script, workflow, CI job, deployment path, generated artifact, and manual step already documented or discoverable in the repo.
5. Separate source-of-truth files from generated files.
6. Separate release notes from internal changelogs.
7. Separate local build steps from deployment steps.
8. Separate automated checks from human final-gate checks.
9. Create a release surface map document in the repo's release/docs area.
10. Create or update a release runbook showing the intended ship flow.
11. Add a manual-final-gates section for steps that should remain human-reviewed.
12. Add TODOs for missing checks, missing scripts, or unclear ownership instead of pretending the release process is complete.
13. Add lightweight checker rules or tests only if the repo already has an obvious checker/test pattern to extend safely.
14. Do not add secrets, credentials, live deployment tokens, or production publishing behavior.
15. Do not create new deployment automation unless the release surface map clearly identifies the safe source of truth and the human asked for automation.
16. Run the required project checks.
17. Keep working until checks pass or report a real blocker.
18. Create or propose a lesson learned if the work reveals a repeated release-governance hazard.
```

## Release surface map expected by the workorder

The release surface map should make scattered state visible.

Example sections:

```text
Version and build fields
  - file path
  - field name
  - current value
  - source of truth or derived/generated

Release notes and changelogs
  - file path
  - audience: internal, public, operator, customer, package manager, deployment system
  - generated or hand-authored

Package and metadata files
  - file path
  - owner
  - release impact

Build and artifact outputs
  - command or workflow
  - artifact name/path
  - generated location
  - should be committed or ignored

Deployment paths
  - local command, CI job, external dashboard, manual upload, or other path
  - target environment
  - required approvals

Manual final gates
  - screenshots, legal/compliance review, billing/pricing review, privacy/security review, production approval, customer-facing copy review, or similar project-specific checks

Checks and automation gaps
  - existing checks
  - missing checks
  - unsafe-to-automate steps
  - proposed future workorders
```

The exact section names should follow the repository's existing documentation style.

## What the coding agent should report

```text
Changed files:
  - list every changed file

Release surface discovered:
  - version/build fields
  - release notes/changelog locations
  - metadata/package files
  - scripts/workflows/commands
  - generated artifacts
  - deployment paths
  - manual final gates

Source-of-truth decisions:
  - what appears authoritative
  - what appears generated
  - what remains ambiguous

Documents added or updated:
  - release surface map
  - release runbook
  - manual final gates
  - TODO/future workorder list, if needed

Checks added or updated:
  - contracts, schemas, tests, fixtures, or checker rules if safely added

Checks run:
  - python tools/pmp_check.py --area all, if applicable
  - python -m pytest, if applicable
  - any project-specific release/check gate

Checks passed or failed:
  - report actual result

Checks not run and why:
  - report actual reason, if any

Automation intentionally not added:
  - list release steps that remain manual or need a future workorder

Lessons learned:
  - created, proposed, or not needed

Open questions:
  - unclear release ownership
  - missing release source of truth
  - external system state that cannot be inspected from the repo

Workorder:
  - workorders/2026-05-26-1600-by-lightrock-map-release-surface.md
```

## What this demonstrates

Release work is an architecture surface.

It is not just a checklist at the end of coding.

A coding agent can only release safely when the repo tells it where release state lives, which files are authoritative, which files are generated, which checks must pass, and which final decisions require a human.

## The practical lesson

A good release-surface workorder prevents three common AI-assisted failures:

```text
1. The AI bumps one version field and misses five others.
2. The AI updates public notes but forgets internal changelogs, generated metadata, or deployment instructions.
3. The AI automates a risky release step before the repo has a source of truth, checks, or human final gates.
```

Map first. Automate second.

The repo should make the safe release path boring and obvious.
