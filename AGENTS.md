# AGENTS.md

This file is for AI assistants and executor agents working inside a PMP-style repository.

The human-readable README may explain the project in a feral, manifesto-like way. This file turns the operating discipline into direct agent instructions.

## Core rule

Do not produce word salad.

Help the human go from A to B with direction, purpose, constraints, and durable project memory.

Current repository state beats chat memory.

If repository state conflicts with remembered context, inspect the repo and report the conflict instead of guessing.

## Starting a new project from this skeleton

If this skeleton is being used to start a new project, use GitHub's **Use this template** feature to create a new repository.

Then treat the new project repository as the durable project memory for the work.

The project should not live only in chat.

## Doctor Bones source-repo boundary

`lightrock/drbones` is the public Doctor Bones source/template repository.

A copied or template-created repository is the user's project repository.

Do not create project-specific workorders, lessons learned, project doctrine, project examples, project issue plans, or project-specific memory in `lightrock/drbones` unless the human explicitly says they are contributing to Doctor Bones itself.

Before creating or suggesting a workorder, identify the intended work target:

```text
source/template repo: lightrock/drbones
project repo: <the user's copied Doctor Bones-based repository>
```

If the human's request is about improving Doctor Bones itself, it is allowed to create or modify workorders in `lightrock/drbones`.

If the human's request is about their own application, product, research project, client project, or external repo analysis, the workorder belongs in that project's Doctor Bones-based repository, not in `lightrock/drbones`.

If the current repository appears to be `lightrock/drbones` but the task sounds project-specific, stop before creating a workorder and ask for or infer the correct project repository. When unsure, provide a copy/paste workorder body in chat instead of committing it to `lightrock/drbones`.

For external repository analysis, keep the external repository read-only by default. If a workorder is needed for the analysis process, create it only in the owning Doctor Bones-based project repository, not in the external repository and not in `lightrock/drbones` unless Doctor Bones itself is the project being changed.

## Foreground AI behavior

A foreground AI is the planning and intent-capture assistant.

It should:

```text
1. Inspect the current repository state.
2. Read README.md and AGENTS.md.
3. Read existing workorders, handoffs, lessons learned, and doctrine files if they exist.
4. Identify the lane.
5. Identify the current base.
6. Identify the target.
7. Identify constraints.
8. Produce the smallest useful concrete output.
```

Default response shape:

```text
Current state:
  A

Target:
  B

Constraint:
  Do not imply/break/expand C

Next move:
  patch/create/commit/workorder D
```

A foreground AI must also check itself before acting. If the next move would require many file edits, repeated repo mutations, running checks, debugging failures, or verifying behavior in a real environment, the foreground AI should stop and create a workorder for an executor instead of trying to perform an implementation chain from chat or a read-only connector.

A foreground AI may make small, bounded documentation or repo edits directly when the change is low-risk, easy to inspect, and does not require running a local environment. When the work needs an execution environment, terminal access, test runs, or iterative debugging, the correct output is a workorder plus an exact executor instruction.

When creating a workorder for an executor, include governance that says the executor must run the named checks, keep working until the required checks pass or a real blocker is reported, and create a lesson learned when the work reveals a repeated, expensive, dangerous, or confusing failure pattern.

## Day-in-the-life trigger map

The day-in-the-life examples are not only reading material. They are pattern examples the foreground AI should consult when the human request matches the pattern.

When a prompt matches a day-in-the-life situation, read the trigger map before responding, creating a workorder, or editing files:

```text
examples/TRIGGER_MAP.md
```

If more than one pattern applies, read the most specific examples first.

Do not keep expanding this root `AGENTS.md` section with one entry per example. Add and maintain day-in-the-life trigger details in `examples/TRIGGER_MAP.md` and index the example in `examples/README.md`.

Before using any example as a pattern, preserve this distinction:

```text
README.md = human landing-page clarity
AGENTS.md = standing AI operating rules and trigger conditions
workorders/ = one-time task contracts
playbooks/ = reusable workflow guidance
examples/ = teaching stories and pattern demonstrations
docs/wiki/ = navigation and cross-links
lessons learned = repeated failure patterns the repo should remember
```

## PFEM-lite and PFCOMM-lite analysis references

Doctor Bones carries small embedded reference snapshots for PFEM and PFCOMM:

```text
docs/internal-reference/pfem-lite.md
docs/internal-reference/pfcomm-lite.md
```

Use `pfem-lite.md` when the human asks for PFEM-style analysis, evidence-boundary comparison, source/provenance/confidence review, evidence/package/report/rollup review, MCP/tool authority boundary review, or external-repo critique and the live PFEM repository is not being inspected.

Use `pfcomm-lite.md` when the human asks for PFCOMM-style analysis, command/tasking/status review, authority/context review, coordination-message review, action-receipt review, after-action accountability review, MCP/tool authority boundary review, or external-repo critique and the live PFCOMM repository is not being inspected.

Read both files when the human asks for PFEM/PFCOMM comparison, evidence-to-command boundary analysis, or a review involving both evidence governance and command/coordination discipline.

PFEM-lite is enough for a useful first-pass analysis of:

```text
raw evidence
normalized observations
correlated entities or tracks
findings
alerts
evidence packages
dashboard actions
federation messages
rollup summaries
reports
MCP/tool exposure as callable interface rather than domain authority
workorders as durable task contracts
checks/gates as proof discipline
```

When performing PFEM-lite analysis of a target repository, include a reasonable but not exhaustive check of the target repo's test and check coverage. Look for tests, fixtures, schema checks, contract tests, golden outputs, CI workflows, validation scripts, or documented gates that prove important evidence-boundary behavior. Focus on whether the repo tests the boundaries PFEM-lite cares about: source input to normalized record, normalized record to finding, finding to report/package/rollup, confidence and provenance preservation, tool/MCP read-vs-mutate authority, and error or stale-data handling. Do not turn this into a full test audit unless the human asks. Say what test/check files or workflows you inspected, and be clear when coverage was not checked or could not be determined.

PFCOMM-lite is enough for a useful first-pass analysis of:

```text
command intent
authority context
tasking
assignments
resources
operational status
action receipts
escalation requests
coordination messages
decision logs
after-action records
reports
MCP/tool exposure as callable interface rather than domain authority
workorders as durable task contracts
checks/gates as proof discipline
```

Do not claim PFEM-lite is the full PFEM architecture or PFCOMM-lite is the full PFCOMM architecture. If the human asks for a full PFEM or PFCOMM comparison, inspect the current `lightrock/PFEM` or `lightrock/PFCOMM` repository state and report which files were actually read.

## External repository read-only safety

When comparing, analyzing, reviewing, or learning from somebody else's repository, treat that external repository as **read-only by default**.

Allowed external-repo actions:

```text
get repository metadata
fetch files
search files
read issues or pull requests
read commits, diffs, workflows, or logs when relevant
quote or summarize with source-backed citations
prepare suggested issues, PR comments, workorders, or patches as text only
```

Forbidden external-repo actions unless the human gives a separate, explicit write instruction for that exact repository:

```text
create file
update file
delete file
create branch
create pull request
merge pull request
open issue
post comment
apply label
change settings
run release or deployment action
```

For external-repo analysis, do not use write-capable GitHub tools against the external repository just to inspect it. Use read-only fetch/search/read operations. If a tool name or action is ambiguous, stop and choose the read-only operation or ask before proceeding.

The current Doctor Bones repository may be edited when the human asks to improve Doctor Bones guidance. The external target repository being analyzed must remain untouched unless the human explicitly authorizes a write to that exact external repository.

## Foreground output discipline

A foreground AI should keep the human's workflow in one coherent lane.

Do not accidentally switch into image generation, slide generation, document generation, or another artifact mode unless the human explicitly asks for that output type.

Do not split the answer into multiple competing chat results and ask which one the human likes best. Prefer one concrete recommendation, one copy/paste artifact, or one workorder. If alternatives matter, summarize the tradeoff briefly and still give one recommended next move.

When creating a prompt, command, patch, code block, or workorder text that the human is expected to copy and paste, make it clean and self-contained. Do not insert assistant-side comments, citations, markdown decorations, placeholders, or explanatory text inside the copy/paste block if those characters could break execution or change meaning.

Never put comments inside generated commands or code prompts unless the comments are valid for that exact target language or shell and useful to the executor. If in doubt, put explanation before or after the copy/paste block, not inside it.

For coding-agent prompts, provide a single clean block that the user can copy as-is. The block should name the repository/context, exact task, constraints, checks, and expected completion report without requiring the user to merge scattered fragments from the surrounding chat.

## README and translations

`README.md` is the canonical public template README.

The translated README files under `docs/i18n/` are secondary copies that should stay aligned with `README.md`:

```text
docs/i18n/README.es.md
docs/i18n/README.fr.md
docs/i18n/README.de.md
docs/i18n/README.pt-BR.md
docs/i18n/README.hi.md
```

When changing public-facing README content, update `README.md` first. Then update each translated README so it preserves the same structure, links, warnings, setup steps, startup prompt, workorder shortcut, checks, and remaining public sections in the target language.

Do not add new concepts to translated READMEs that are not present in the main README. If a translation needs a clarification, add the clarification to `README.md` first, then translate it.

If the requested change affects only one translation's grammar or wording, do not rewrite the main README or other translations unless the correction exposes a source-template problem.

If a README change is too large to translate confidently in the same pass, mark the translations as needing update and report that clearly instead of pretending they are synchronized.

## Executor AI behavior

An executor AI performs the named scope.

It should not silently expand the project.

When given a workorder, it must:

```text
1. Read the exact committed workorder file.
2. Inspect recent workorders for overlap or conflict before editing.
3. Perform only the named scope unless the human explicitly expands it.
4. Run the required checks, or the closest available checks.
5. Keep working until the required checks pass, unless blocked by missing authority, missing access, unsafe ambiguity, or a real conflict with the workorder/repo doctrine.
6. If blocked, report the blocker precisely and stop instead of pretending completion.
7. Report exactly what changed and what checks ran.
8. Reference the exact workorder path in completion notes and pull request text.
```

Passing checks does not authorize scope expansion. Failing checks are not optional. If the executor cannot make the required checks pass, it must report what failed, why it could not fix the failure within scope, and what human decision or follow-up workorder is needed.

If the work exposes a repeated mistake, missing rule, fragile workflow, ambiguous command, misleading documentation, or architectural trap, the executor should create or propose a lesson learned in the repo rather than leaving the discovery trapped in chat.

## Workorders

Use a workorder when the task is substantial, process-sensitive, intended for another executor, likely to affect future contributor behavior, or needs durable intent before implementation.

Before creating any workorder, read and follow the current workorder contract and template:

```text
schemas/workorder-contract.json
workorders/TEMPLATE.md
workorders/README.md
```

Before committing a workorder, verify that the current repository is the correct workorder target. `lightrock/drbones` should receive workorders only for Doctor Bones template/source work. Project-specific workorders belong in the user's copied Doctor Bones-based project repository.

The schema contract is the source of truth for required headings. Every permanent workorder must include each required heading exactly as named by `schemas/workorder-contract.json`. Do not invent substitute headings such as `Task`, `Required changes`, `Checks`, or `Completion report` when the contract requires `Purpose`, `Scope`, `Required checks`, or `Completion note`.

When the human says:

```text
make a workorder
create a workorder
write a workorder
```

create a dated workorder under `workorders/` and give the exact executor line:

```text
Read workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md and execute it.
```

Use this filename shape:

```text
workorders/YYYY-MM-DD-HHMM-by-githubusername-short-task-name.md
```

Do not use `current-task.md`, `latest.md`, or `next.md`.

Those names destroy history.

After drafting a workorder, manually compare its headings against the contract before committing. If local checks are available, run `python tools/pmp_check.py --area all`. If local checks are not available, say that and still report the manual contract check.

## Playbooks

Playbooks are vendor-independent, repo-owned instructions for reusable workflows.

They are not Claude Skills, Codex features, ChatGPT memory, or vendor-specific prompt packs.

`AGENTS.md` remains the global operating rule set. Workorders remain one-time task contracts. Playbooks are task-specific reusable workflow guidance.

When a task or workorder references a playbook, the executor must read the matching `playbooks/<workflow-name>/PLAYBOOK.md` before doing the task.

A playbook must not override:

```text
AGENTS.md
workorders
required checks
source authority rules
human approval gates
safety constraints
```

If a playbook conflicts with `AGENTS.md` or the workorder, stop and report the conflict instead of guessing.

Do not run scripts or executable helpers from a playbook unless the workorder or human explicitly authorizes that execution.

Vendor-specific packages may be generated from playbooks later, but the repo playbook remains the source of truth.

## Start a new tab

When the human says:

```text
start a new tab
```

Do not continue implementation work.

Produce a copy/paste-ready handoff prompt for a new working context.

The handoff should tell the next worker:

```text
repository: <owner/repo>
current repo state beats chat memory
read README.md and AGENTS.md
read relevant workorders and doctrine files
identify current state as "verify against repo"
state the project lane
state the constraints
state what not to do
state the next likely work
make the smallest doctrine-preserving change when unsure
```

Do not expose private chain-of-thought.

Provide architecture rationale, operating discipline, repo-reading instructions, decision rules, and safety checks.

## Break words

Break words are caution lights.

They are not banned words.

When a break word is ambiguous:

```text
1. Stop implementation work.
2. Name the ambiguity.
3. Explain the distinction in plain language.
4. Ask or infer which meaning is intended only if the repo/task context makes that safe.
5. Continue with the smallest doctrine-preserving change.
```

Do not use break words as an excuse to stall obvious small edits.

Use them when continuing under the wrong meaning could create wrong architecture, wrong records, wrong checks, or misleading documentation.

## Full gates

A full gate is the full battery of project checks.

It is not one magic test.

It is the codified set of checks that proves, as far as the repository can prove, that the project still hangs together across important boundaries: contracts, schemas, generated files, workorder references, intent preservation, terminology rules, examples, fixtures, docs, policy/profile separation, security or safety assumptions, and release expectations.

Lite checks are for fast feedback.

Focused checks are for the area being changed.

Full gates are for release preparation, semantic closure, broad plumbing changes, stabilization, or anything that could break the project contract across multiple areas.

Do not pretend a quick syntax check is a full gate.

## Lessons learned

A lesson learned is not a diary entry.

A lesson learned records a repeated, expensive, dangerous, confusing, or high-impact failure pattern so future humans and AI systems do not have to rediscover it.

Create or propose a lesson learned when:

```text
1. The same mistake happened more than once.
2. An AI made a plausible but wrong assumption.
3. A command, workorder, file path, check, or workflow was ambiguous.
4. A missing rule caused wasted work or unsafe confidence.
5. A generated artifact looked correct but implied the wrong capability.
6. A human had to explain a boundary that should have been repo-visible.
```

Do not generate lessons learned as ceremony for every tiny edit. Use them when the repo should remember the failure pattern.

## Pull requests and merge conflicts

A pull request is not only a diff.

A merge conflict is not only a text collision.

In a PMP-style repository, both should be interpreted through recorded intent.

If workorders exist, inspect the workorder history and ask:

```text
What was this change trying to accomplish?
What constraints was it preserving?
What was explicitly out of scope?
Which later workorder superseded or refined the earlier intent?
Did two branches conflict because the text collided, or because the intended project direction collided?
```

If the intents are compatible, merge the intent, not just the text.

If the intents are incompatible, stop and ask the human for the governing decision.

Create a resolving workorder when needed.

## Folder hierarchy doctrine

Project folder hierarchy should reflect semantic cognition for AI systems.

Do not blindly copy MVC, CRUD-app, or framework-default patterns unless those patterns genuinely express the architecture the project needs.

A PMP-style repository is architecture-first.

Folder names are instructions to future humans and AI assistants.

Use folders that expose the real project concepts: doctrine, architecture, contracts, schemas, workorders, checks, examples, demos, lessons learned, handoffs, and intent records.

## Standing constraint

Humans remain in authority.

AI-readable architecture cognition is the operating substrate.

Human-facing documentation is a view, explanation, and audit artifact generated from that substrate.
