# Day in the life 15: make your foreground AI smarter with reference repos

This example is about giving a foreground AI focused architecture context before it writes advice, plans, or repo changes.

The point is simple:

```text
Load relevant reference repositories on purpose.
Keep the current repo boundary clear.
Say what you actually read.
Do not mutate external repositories during analysis.
```

## Human request

```text
Before you give architecture advice for this repo, load up on the following reference repositories.
```

## Simple PFEM-lite invocation

To ask for a lightweight PFEM-style external repository analysis, the human can say:

```text
Go analyze my other repo <repo URL or owner/name> with PFEM-lite analysis capabilities.
```

The foreground AI should then:

```text
1. Read current Doctor Bones guidance.
2. Read docs/internal-reference/pfem-lite.md.
3. Inspect the target repository files using read-only operations.
4. Inspect the target repository's tests/checks enough to understand PFEM-lite boundary coverage.
5. Separate source-backed observations from PFEM-lite architectural inference.
6. Say clearly that this is PFEM-lite, not a full live PFEM repo analysis.
```

Expected honesty boundary:

```text
I used Doctor Bones' embedded PFEM-lite reference for this analysis.
I inspected <target repo files actually read>.
I inspected <target repo test/check files or workflows actually read>.
I did not inspect the full live PFEM repository.
I did not write to the external repository.
```

## Simple PFCOMM-lite invocation

To ask for a lightweight PFCOMM-style external repository analysis, the human can say:

```text
Go analyze my other repo <repo URL or owner/name> with PFCOMM-lite analysis capabilities.
```

The foreground AI should then:

```text
1. Read current Doctor Bones guidance.
2. Read docs/internal-reference/pfcomm-lite.md.
3. Inspect the target repository files using read-only operations.
4. Separate source-backed observations from PFCOMM-lite architectural inference.
5. Say clearly that this is PFCOMM-lite, not a full live PFCOMM repo analysis.
```

Expected honesty boundary:

```text
I used Doctor Bones' embedded PFCOMM-lite reference for this analysis.
I inspected <target repo files actually read>.
I did not inspect the full live PFCOMM repository.
I did not write to the external repository.
```

## Combined PFEM/PFCOMM-lite invocation

To ask for both evidence-governance and command/coordination analysis, the human can say:

```text
Go analyze my other repo <repo URL or owner/name> with PFEM-lite and PFCOMM-lite analysis capabilities.
```

Use PFEM-lite for evidence, provenance, confidence, findings, packages, reports, and rollups. Use PFCOMM-lite for command intent, authority context, tasking, assignments, resources, operational status, action receipts, coordination messages, decision logs, and after-action accountability.

Do not collapse the two lenses. PFEM owns evidence governance. PFCOMM owns command/coordination/accountability. MCP or other tool surfaces are callable interfaces, not the domain authority.

## External repository safety

Reference repositories and other people's repositories are **read-only by default**.

Allowed actions:

```text
fetch files
search files
read repository metadata
read issues, pull requests, commits, diffs, workflows, or logs when relevant
prepare suggested issues, comments, workorders, or patches as text only
```

Forbidden unless the human gives a separate, explicit write instruction for that exact external repository:

```text
create file
update file
delete file
create branch
create pull request
open issue
post comment
apply label
change settings
run release or deployment action
```

If a tool or action is ambiguous, stop and use the read-only operation instead.

Example reference repositories:

- `lightrock/PFEM`
- `lightrock/PFCOMM`

These are examples. A different project may name different reference repositories.

A reference repo can be:

- an architecture repo
- a method library
- a playbook collection
- a standards/example repo
- a prior project with reusable patterns
- another person's repo being analyzed for architecture lessons or issue suggestions

For example, a repository like `skills-for-humanity` could be loaded as a method-library reference repo. The foreground AI should inspect it, identify portable reasoning procedures, and use them only when the human asks to port, adapt, compare, or load up on that source.

Another example is [`ZhixiangLuo/10xProductivity`](https://github.com/ZhixiangLuo/10xProductivity), which can be loaded as a workflow-pattern reference repo for local-agent-as-universal-client, tool-connection recipes, and cross-tool productivity workflows. The foreground AI should treat it as reference material, not automatic DrBones doctrine.

A premier example of intelligent reference-repo analysis is [`bawbel/scanner`](https://github.com/bawbel/scanner). The foreground AI can inspect that repo against a current-repo architecture lens such as PFEM, compare evidence boundaries, contracts, schemas, testing discipline, runtime/static separation, confidence versus severity, lifecycle handling, and output contracts, then produce respectful GitHub issue suggestions. The point is not to criticize another repo from memory; the point is to read the source, identify what it already does well, name the real architectural gap if one exists, and preserve the boundary between source-backed observation and inference.

## PFEM-lite test/check coverage pass

A PFEM-lite analysis should include a reasonable but not exhaustive look at the target repository's tests and checks.

Inspect likely test/check surfaces such as:

- test directories
- fixtures
- schema tests
- contract tests
- golden output snapshots
- validation scripts
- CI workflows
- documented gates
- smoke tests

The goal is not to audit every test. The goal is to answer whether the repo appears to prove the PFEM-lite boundaries it claims or depends on.

For PFEM-lite, look for proof around:

- source input to normalized record
- normalized record to finding
- finding to report, package, or rollup
- confidence preservation
- provenance preservation
- tool/MCP read-vs-mutate authority boundaries
- stale, missing, contradictory, or error input handling
- public output contracts, schemas, or golden examples

Report which test/check files or workflows were inspected. If test coverage was not inspected or could not be determined from available files, say that clearly.

## PFEM-lite and PFCOMM-lite fallback

Doctor Bones carries small embedded reference snapshots at:

```text
docs/internal-reference/pfem-lite.md
docs/internal-reference/pfcomm-lite.md
```

Use PFEM-lite when the human asks for a PFEM-style first-pass analysis and the live `lightrock/PFEM` repo is not being inspected.

PFEM-lite is enough to support a useful analysis of:

- evidence boundaries
- provenance
- normalization
- confidence
- MCP/tool authority boundaries
- findings, reports, packages, rollups, and proof discipline
- workorders and checks as durable project discipline

Use PFCOMM-lite when the human asks for a PFCOMM-style first-pass analysis and the live `lightrock/PFCOMM` repo is not being inspected.

PFCOMM-lite is enough to support a useful analysis of:

- command intent
- authority context
- tasking
- assignments
- resources
- operational status
- action receipts
- escalation requests
- coordination messages
- decision logs
- after-action records
- MCP/tool authority boundaries
- workorders and checks as durable project discipline

Do not overclaim either embedded reference.

Use this wording when appropriate:

```text
I used Doctor Bones' embedded PFEM-lite and/or PFCOMM-lite reference for this analysis.
I did not inspect the full live PFEM and/or PFCOMM repository unless listed below.
```

If the human asks for a full PFEM or PFCOMM comparison, inspect current `lightrock/PFEM` or `lightrock/PFCOMM` files and report which files were actually read.

## Source roles

Current repo:

- The repository being changed or advised on.
- Owns its own workorders, playbooks, examples, checks, handoff rules, and current repo state.

Reference repo example: PFEM

- PFEM is an evidence architecture source.
- It may be useful for evidence boundaries, provenance, normalization, findings, reports, packages, rollups, and proof discipline.
- The embedded PFEM-lite reference is a first-pass lens, not a substitute for a full live PFEM repo scan.

Reference repo example: PFCOMM

- PFCOMM is a command and coordination architecture source.
- It may be useful for command intent, authority context, tasking, assignments, resources, action receipts, operational status, decision logs, coordination, and after-action accountability.
- The embedded PFCOMM-lite reference is a first-pass lens, not a substitute for a full live PFCOMM repo scan.

Reference repo example: method library

- A method-library repo is a source of reusable procedures.
- It may be useful for extracting named reasoning workflows, routing patterns, checklists, or playbook candidates.
- It should not be copied wholesale. The foreground AI should classify what is portable, what is vendor-specific, and what belongs only in the reference repo.

Reference repo example: workflow-pattern repo

- A workflow-pattern repo is a source of reusable operating patterns, setup flows, tool-connection recipes, or automation examples.
- It may be useful for comparing how another project structures agent-readable playbooks, local setup, tool connections, and cross-tool workflows.
- It should not be treated as permission to copy security assumptions, credentials flows, automation claims, or product positioning into the current repo.

Reference repo example: external architecture analysis

- An external repo can be analyzed to learn architecture lessons or draft useful issue suggestions.
- The foreground AI should read actual files from the external repo before making claims.
- The foreground AI should separate what the external repo already does well from what appears to be missing.
- The foreground AI should label source-backed observations separately from architectural inference.
- The output should be respectful, concrete, and useful to the external maintainer.

## Checklist

Before writing advice based on reference repositories, the foreground AI should answer:

- Which current-repo files were read?
- Which reference repositories were named by the human?
- Which reference files were read?
- Was `docs/internal-reference/pfem-lite.md` used instead of live PFEM inspection?
- Was `docs/internal-reference/pfcomm-lite.md` used instead of live PFCOMM inspection?
- Which target-repo test/check files or workflows were inspected for PFEM-lite boundary coverage, if any?
- What transfers cleanly into the current repo?
- What belongs only in a reference repo?
- What is source-backed?
- What is inference?
- What should the current repo do next, if anything?
- Was the external repository kept read-only?

## Practical lesson

A smarter foreground AI is not just a longer prompt.

It is a source-aware setup:

- current repo first
- selected reference repos second
- embedded fallback references only when clearly named
- clear transfer rules
- bounded next action
- read-only external repository analysis unless explicitly authorized otherwise

Load more context. Keep sharper boundaries. Say what you actually read.
