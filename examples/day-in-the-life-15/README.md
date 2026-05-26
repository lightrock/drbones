# Day in the life 15: make your foreground AI super-smart with cross-repo context

This example is not about dumping random links into a chat and hoping the AI becomes psychic.

It is about deliberately loading a foreground AI with selected source repositories so it can reason across a family of related projects without confusing source authority, copying stale doctrine, or polluting the current repo.

The point is simple:

```text
Load the brain on purpose.
Do not let the brain smear every repo into one soup.
```

## The human request

```text
Make my foreground AI smarter for this project. Load up your brain on the following related repositories before you write architecture advice or workorders.
```

Example source repositories:

```text
lightrock/PFEM
lightrock/pfem-legal-billing
lightrock/pfem_friction_diction
lightrock/pfem-mission-program-mesh
lightrock/skywrong
lightrock/drbones
```

## The foreground AI response

```text
Current state:
  The current repo is DrBones.
  The human wants the foreground AI to use related repositories as source context.
  Those repositories may contain useful doctrine, examples, architecture boundaries, workflows, and lessons learned.

Target:
  Load cross-repo context in a governed way so the foreground AI can make better architecture recommendations and create better workorders.

Constraint:
  Do not treat all repositories as equal authority.
  Do not copy doctrine blindly from one repo into another.
  Do not assume stale external repo state is current.
  Do not turn DrBones into a junk drawer for PFEM, PFCOMM, SkyWrong, or domain-specific material.
  Do not leak private or project-specific assumptions into a public template unless intentionally generalized.

Foreground/executor decision:
  This can start as a foreground context-loading pass.
  It should become a workorder if it will create or update repo files, cross-repo maps, doctrine summaries, examples, playbooks, or checks.

Next move:
  Create a cross-repo context map and, if needed, a bounded workorder for adding a durable reference page.
```

## The workflow

```text
current task
→ identify current repo authority
→ identify related repositories
→ inspect landing docs and key doctrine files
→ classify each repo's role
→ extract transferable patterns
→ mark non-transferable/project-specific material
→ decide what belongs in the current repo
→ produce advice, workorder, playbook, or context map
```

## Source authority ladder

When using cross-repo context, the foreground AI should keep a clear authority ladder:

```text
1. Human instruction for the current task, if safe and lawful.
2. Current repo state and current repo governance files.
3. Current repo workorders and playbooks.
4. Current repo schemas, tests, and checks.
5. Related repo source material, cited and classified.
6. External/public sources.
7. AI-generated synthesis or recommendation.
```

Related repositories can inform the current repo. They do not automatically govern it.

## Example repository roles

A foreground AI might classify the source repos like this:

```text
lightrock/drbones
  Current repo. Repo-native operating discipline, workorders, playbooks, examples, checks, and AI/human handoff rules.

lightrock/PFEM
  Core evidence/provenance/rollup architecture. Strong source for evidence boundaries, provenance, packages, reports, rollups, and MCP exposure discipline.

lightrock/pfem-legal-billing
  Domain fork proving PFEM-style discipline in law-firm billing, prebill review, guideline checks, findings, exceptions, and exports.

lightrock/pfem_friction_diction
  Tribal-memory and operational-friction capture pattern. Strong source for turning recurring pain into reusable doctrine, checks, and workorders.

lightrock/pfem-mission-program-mesh
  Program/proposal/mission-package layer. Strong source for proposal framing, evaluation plans, demo scenarios, risk registers, transition plans, and mission-program handoffs.

lightrock/skywrong
  Critical-infrastructure sensor/evidence/rollup mission pattern. Strong source for operational UI, adapter, evidence package, geofence, emergency, and local-node lessons.
```

## What to extract

The foreground AI should extract reusable patterns, such as:

```text
authority boundaries
source-of-truth rules
workorder structure
playbook patterns
agent/tool approval gates
evidence/proof distinctions
schema/check discipline
release-readiness habits
handoff rules
operator-facing examples
failure patterns
terminology warnings
```

## What not to extract blindly

The foreground AI should not blindly import:

```text
private domain assumptions
project-specific acronyms
old names or stale doctrine
experimental implementation details
security-sensitive paths or credentials
vendor-specific workflows
unfinished product claims
mission-specific operational rules
legal/compliance claims
```

If something is useful but too domain-specific, generalize it first or keep it as a cited example.

## Context-loading checklist

Before writing advice or a workorder based on multiple repos, answer:

```text
Which repository is the current authority?
Which repositories are only reference material?
What exact files were inspected?
What claims are directly supported by source files?
What is inference or synthesis?
What doctrine transfers cleanly?
What doctrine is domain-specific?
What seems stale, contradictory, or unresolved?
What should be added to the current repo, if anything?
What should remain only in the source repo?
```

## Workorder shape

If the cross-repo context should become durable repo work, the foreground AI creates a workorder like:

```text
workorders/YYYY-MM-DD-HHMM-by-githubusername-build-cross-repo-context-map.md
```

The workorder tells the executor to:

```text
1. Inspect the current repository state.
2. Read README.md, AGENTS.md, readme_pmp.md if present, examples/README.md, playbooks/README.md, and relevant wiki pages.
3. Inspect the named related repositories and record exactly which files were read.
4. Classify each related repo's role.
5. Extract only transferable patterns.
6. Mark domain-specific material that should not be generalized into the current repo.
7. Preserve source authority and citations/links.
8. Create a cross-repo context map, reference page, playbook update, or workorder only if explicitly requested.
9. Do not blindly copy text across repositories.
10. Do not change architecture doctrine unless the workorder authorizes it.
11. Run required checks if files are changed.
12. Keep working until checks pass or report a real blocker.
13. Create or propose a lesson learned if cross-repo context reveals a repeated confusion pattern.
```

## Expected output

A useful cross-repo context report should include:

```text
Current repo:
  - name
  - authority role

Related repos inspected:
  - repo
  - files read
  - role
  - useful transferable patterns
  - non-transferable/domain-specific material
  - open contradictions or stale areas

Recommended current-repo action:
  - no action
  - note/wiki page
  - issue
  - workorder
  - playbook
  - example
  - human decision

Evidence:
  - links or citations to inspected files

Boundary statement:
  - what the current repo owns
  - what the related repos own
```

## What this demonstrates

A smart foreground AI is not just a larger prompt.

It is a source-aware reasoning setup:

```text
current repo authority
+ related repo doctrine
+ explicit source roles
+ transfer/not-transfer classification
+ bounded next action
```

That is how the AI becomes smarter without becoming messier.

## The practical lesson

Cross-repo context is powerful, but it needs discipline.

If you do it badly, the AI mixes every project into one incoherent stew.

If you do it well, the AI can write better workorders, preserve architectural intent, and spot useful patterns that belong in the current repo.

```text
Load more context.
Keep sharper boundaries.
```
