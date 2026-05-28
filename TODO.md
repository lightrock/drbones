# Doctor Bones TODO

This is a working list, not a polished roadmap. It captures the current "still working on it" ideas so they live in the repository instead of only in chat.

## Current state snapshot — 2026-05-28

This pass compares the TODO list against the current repo state inspected during the Day 20 workflow.

Status key:

```text
Done enough for now = durable repo artifact exists and is wired where future AIs will read it
Partial = real repo artifact exists, but more depth, polish, checks, or integration remains
Prose-only = idea exists in docs/TODO/AGENTS/examples, but not yet as an executable or machine-checkable artifact
Missing = no meaningful repo artifact found yet
Executor needed = needs local checks, CI work, broad edits, or tool-specific validation
```

### Done enough for now

- `README.md` explains Doctor Bones as a vendor-independent repository template for AI-assisted development.
- `README.md` links to `TODO.md` from the working TODO section.
- `docs/index.html` has been aligned with the README framing and links to the TODO.
- `examples/README.md` lists day-in-the-life examples through Day 21.
- `examples/TRIGGER_MAP.md` includes a trigger map for day-in-the-life examples through Day 21, with `AGENTS.md` pointing to it.
- `examples/day-20-todo-state-review/README.md` now captures the TODO state-review workflow.
- The workorder system exists as real repo structure: `workorders/README.md`, `workorders/TEMPLATE.md`, and `schemas/workorder-contract.json`.
- `tools/pmp_check.py` exists and checks the current workorder contract and example indexing.
- `tests/test_pmp_check.py` includes a test that semantic day examples are indexed in both `examples/README.md` and `examples/TRIGGER_MAP.md`.
- PFEM-lite and PFCOMM-lite are present as embedded internal reference lenses and are referenced from `AGENTS.md` and the public docs page.

### Partial / still needs work

- README polish is partly done, but a clearer `Who this is for` / `What this is not` section may still help first-time visitors.
- The repo already has a workorder schema, but the broader schema set is not built yet.
- Rubric thinking exists in TODO and examples, but there is not yet a formal rubric file or evaluator contract.
- Examples exist and are wired, but the specific good/bad examples for rubric failures still need to be split into small durable files.
- Checks exist, but they mostly validate workorder governance and example wiring. They do not yet validate broader schema/rubric/completion-report behavior.
- Integration positioning is clear, but dedicated surfaces for Codex, Claude Code, Cursor, Copilot, PR templates, VS Code diagnostics, or CI gates are not yet built.
- Completion-report discipline exists in workorder guidance, but there is not yet a separate completion-report schema or example pack.

### Prose-only / concept captured but not executable yet

- Evidence / finding / remediation schemas.
- Evaluation-result schema.
- Handoff schema.
- Completion-report schema.
- PFEM-style rubric files with criterion/pass/fail/good-example/bad-example fields.
- GitHub comment-bot feedback contract.
- IDE diagnostic contract.
- CI gate for workorder plus completion-report hygiene beyond the current `pmp_check.py` scope.

### Missing / likely future work

- `.github/pull_request_template.md`
- GitHub Actions workflow for `python tools/pmp_check.py --area all`
- GitHub Actions workflow for `python -m pytest`
- Tool-specific guidance files, if desired, such as:
  - `CLAUDE.md`
  - `.cursor/rules`
  - `.codex/instructions.md`
  - `.vscode/`
- A small demo showing a TODO/rubric/schema/check loop from rough doctrine to executable validation.

### Next smallest useful moves

1. Add a `Who this is for` / `What this is not` section to `README.md` and mirror only the necessary idea in `docs/index.html`.
2. Add one formal rubric file for the first high-value rule: `patch is not verification`.
3. Add two tiny examples: bad agent completion vs. corrected agent completion.
4. Add a completion-report schema or template that matches the existing workorder completion-note guidance.
5. Add a GitHub Actions workflow that runs `python tools/pmp_check.py --area all` and `python -m pytest`.
6. Extend `pmp_check.py` only after the schema/example shape is stable.

## Near-term README polish

Status: Partial.

- [ ] Add a short "Who this is for" section.
- [ ] Add a short "What this is not" section.
- [ ] Add a five-minute quickstart path for first-time users.
- [x] Keep the top-level README clear that Doctor Bones is not trying to replace Cursor, Codex, Claude Code, Copilot, or GitHub bots.
- [x] Keep the positioning simple: Doctor Bones is the repo-native discipline layer that gives coding agents durable instructions, workorders, boundaries, examples, and checks.

## Turn doctrine into executable artifacts

Status: Partial.

The core advantage only becomes real if the repo carries usable artifacts, not just good language.

- [x] Convert core doctrine into stable repo files: `README.md`, `AGENTS.md`, `readme_pmp.md`, examples, workorders, internal references, docs.
- [x] Convert workorder doctrine into a schema and checker.
- [ ] Convert broader repo files into schemas, rubrics, examples, and checks.
- [ ] Convert checks into automation that foreground AIs, executor AIs, GitHub bots, IDE integrations, and CI can consume.
- [x] Keep the doctrine practical enough that it helps a real project move faster instead of becoming ceremonial documentation.

## Schema work

Status: Partial.

Create or refine machine-readable structures for the things Doctor Bones wants agents to preserve.

Current:

- [x] `schemas/workorder-contract.json`

Candidate schemas still remaining:

- [ ] `evidence.schema.json`
- [ ] `finding.schema.json`
- [ ] `remediation.schema.json`
- [ ] `evaluation-result.schema.json`
- [ ] `handoff.schema.json`
- [ ] `completion-report.schema.json`

Important boundary idea:

```text
raw evidence is not normalized evidence
normalized evidence is not a finding
finding is not a report
report is not a command
command is not execution
execution is not proof
AI recommendation is not authority
patch is not verification
```

## Rubrics / evaluator work

Status: Prose-only / early partial.

Turn PFEM-style boundary discipline into evaluator rubrics that can be used by humans, foreground AIs, executor AIs, comment bots, or CI checks.

Candidate rubric dimensions:

- [ ] Evidence integrity: does the agent identify evidence, inference, and unknowns?
- [ ] Boundary preservation: does the agent avoid collapsing evidence, findings, recommendations, commands, execution, and proof?
- [ ] Verification discipline: does the agent avoid claiming "done" without checks or a stated verification path?
- [ ] Scope control: does the agent stay inside the workorder and avoid drive-by refactors?
- [ ] Authority separation: does the agent avoid treating AI output as policy, approval, or operational authority?
- [ ] Traceability: do conclusions tie back to source intent, evidence, and checks?
- [ ] Completion reporting: does the agent say what changed, what was checked, what failed, and what remains unknown?

First useful rubric to create:

```text
patch is not verification
```

## Examples to add

Status: Partial.

Examples are how the repo teaches future agents without relying on chat memory.

Already present:

- [x] Day-in-the-life examples 1-20 are present.
- [x] Day 20 covers TODO state review.
- [x] Example indexing is checked by `tests/test_pmp_check.py`.

Still useful to add as small durable examples:

- [ ] A good workorder.
- [ ] A bad workorder.
- [ ] A good completion report.
- [ ] A bad completion report.
- [ ] A bad agent answer that claims a patch is verified without running checks.
- [ ] A corrected agent answer that distinguishes patch, expected effect, verification, and remaining risk.
- [ ] A boundary failure where an agent confuses evidence with a conclusion.
- [ ] A boundary failure where an agent treats a recommendation as authority.

## Checks to improve

Status: Partial.

The check layer should start small and stay useful.

Current:

- [x] `tools/pmp_check.py` exists.
- [x] `python tools/pmp_check.py --area all` is documented.
- [x] Workorder contract checks exist.
- [x] Governance-doc reference checks exist.
- [x] Day-in-the-life indexing test exists in `tests/test_pmp_check.py`.

Possible checks still remaining:

- [ ] Validate additional JSON schemas beyond `workorder-contract.json`.
- [ ] Validate completion reports include checks and known unknowns.
- [ ] Check examples for required labels such as good/bad/corrected.
- [ ] Add a CI path that runs `python tools/pmp_check.py --area all`.
- [ ] Add a CI path that runs `python -m pytest`.

## Integration targets

Status: Mostly prose-only.

Doctor Bones should feed existing tools instead of trying to replace them.

Potential consumers:

- [ ] Codex instructions.
- [ ] Claude Code / Cursor / Copilot-style repo rules.
- [ ] GitHub comment bots.
- [ ] PR checklists and review comments.
- [ ] VS Code diagnostics or inline warnings.
- [ ] Custom evaluator systems.
- [ ] CI gates for workorder and completion-report hygiene.

Current repo state supports the concept, but the dedicated integration files are not built yet.

## Product shape / positioning

Status: Mostly done for now.

Keep the public explanation grounded:

```text
Commercial AI coding tools are the execution layer.
Doctor Bones is the repo-native governance, instruction, and evaluation layer.
```

- [x] README and docs/index.html now reflect this lane.
- [x] TODO now tracks the remaining artifact work.
- [ ] A future README cleanup can make the positioning even more beginner-friendly.

Do not drift into building another IDE or another coding agent unless there is a very specific reason. The better lane is to make the existing hands more governable, testable, and less vague.

## Open cleanup questions

- Should the public name stay Doctor Bones everywhere, or should PMP/PFEM remain visible as internal architecture vocabulary?
- Where should PFEM/PFCOMM vocabulary live so it is useful but not overwhelming to first-time users?
- Which schemas should be part of the template by default, and which should be optional examples?
- How much of the evaluator/rubric layer should run locally versus inside GitHub Actions?
- What is the smallest demo that proves Doctor Bones improves an AI coding workflow?

## First useful milestone

Status: Partial.

A small first milestone could be:

1. [x] Add a concise PFEM/PFCOMM-lite vocabulary reference.
2. [x] Add a workorder schema.
3. [ ] Add finding/evidence/remediation draft schemas.
4. [ ] Add five good/bad agent-behavior examples.
5. [ ] Add one evaluator rubric: agent must not claim done without verification.
6. [ ] Add one check that validates the schema/examples.

That would move Doctor Bones from good repo doctrine toward executable AI-development discipline.

## What we are already sort of doing

Captured from working discussion. This section is intentionally rough and can be cleaned up later.

> alright, now tell me what we are already sort of doing in the todo, maybe not as precisely as you demand in there
>
> Thought for 4s
>
> Yes. A lot of the TODO is not brand new work. It is more like: “we already started doing this informally; now make it sharper and executable.”
>
> Here’s what we are already sort of doing.

### 1. Repo files

Already doing it.

You already have:

```text
README.md
AGENTS.md
readme_pmp.md
examples/
tools/pmp_check.py
TODO.md
```

That means Doctor Bones is already carrying project memory in repo files instead of only in chat.

What is still fuzzy: the files may not yet be divided perfectly into “doctrine,” “playbooks,” “rubrics,” “schemas,” “examples,” and “checks.” Some of the knowledge is probably still written as explanation instead of reusable machine-readable structure.

### 2. Workorders

Already doing it.

The whole foreground AI / executor AI pattern is already a workorder system:

```text
foreground AI clarifies intent
→ creates bounded workorder
→ executor AI performs file edits/checks/PR
```

What is still fuzzy: we probably need stricter required sections, maybe like:

```text
Repository
Task
Why
Files likely involved
Do not touch
Acceptance checks
Completion report expectations
```

Right now the discipline exists. The TODO says: make it harder for a dumb agent to ignore.

### 3. Boundary discipline

Already doing it conceptually.

We keep saying things like:

```text
patch is not verification
recommendation is not authority
evidence is not conclusion
execution is not proof
```

That is already PFEM/PFCOMM thinking.

What is still fuzzy: it is language right now. The TODO says: turn it into actual reusable docs, examples, rubrics, and eventually checks.

### 4. Rubrics

Already doing it informally.

Every time we say:

```text
Did the agent stay in scope?
Did it run the checks?
Did it preserve boundaries?
Did it avoid claiming done too early?
```

That is already a rubric.

What is missing is the formal version:

```text
Criterion
Pass condition
Fail condition
Example good answer
Example bad answer
```

So the TODO is not “invent rubrics from zero.” It is “write down the judging standards we already use.”

### 5. Examples

Already doing it in conversation.

We’ve already produced lots of examples like:

```text
bad: “I changed the file, therefore it is fixed”
good: “I changed the file; verification requires running X”
```

Doctor Bones already has an examples/ folder too.

What is still fuzzy: we need to collect the best examples into small durable files so the next AI can learn from them without needing this chat.

### 6. Checks

Already doing it at the starter level.

You already have:

```text
python tools/pmp_check.py --area all
python -m pytest
```

That means the concept of “don’t just claim done; run checks” is already in the repo.

What is still fuzzy: the checks probably don’t yet enforce all the doctrine. They may check file existence or formatting, but not much semantic behavior yet.

The TODO says: slowly move from “humans understand the rule” toward “tools can catch violations.”

### 7. Integration with existing AI tools

Already doing it by design.

The README already says Doctor Bones is not replacing Codex/Cursor/Claude/Copilot. It is feeding them:

```text
repo guidance
workorders
checks
examples
handoff rules
```

What is still fuzzy: there may not yet be dedicated files for each consumer, like:

```text
.codex/instructions.md
.cursor/rules
CLAUDE.md
.github/pull_request_template.md
.vscode/
```

The architecture is already compatible. The TODO says: make the adapter surfaces more explicit.

### 8. Completion discipline

Already doing it in spirit.

You already care about:

```text
what changed
what checks ran
what failed
what remains unknown
what should happen next
```

That is completion-report logic.

What is still fuzzy: completion reports may not yet have a standard template or schema.

### 9. “Who this is for / what this is not”

Already partially doing it.

The README already says it is a vendor-independent repo template for AI-assisted development, not a runtime that has to “run” somewhere.

What is still fuzzy: strangers may still ask:

```text
Is this an AI agent?
Is this a framework?
Is this a project manager?
Is this only for Codex?
```

So the TODO is mostly public-facing clarity, not deep invention.

### The honest summary

You are already doing the architecture and doctrine.

The TODO is about turning that into:

```text
repeatable files
stricter templates
schemas
rubrics
small examples
checks
integration hooks
```

So the work is not:

> “We need to figure out what Doctor Bones is.”

The work is:

> “We know what Doctor Bones is. Now make it precise enough that a fresh AI, fresh developer, GitHub bot, or IDE plugin can use it without Allen and GPT standing there explaining the damn thing every time.”

That is exactly the right next stage.
