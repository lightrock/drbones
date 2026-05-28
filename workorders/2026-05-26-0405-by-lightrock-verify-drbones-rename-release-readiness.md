# Verify DrBones rename and release readiness

## Purpose

Verify that the repository rename from `pmp-ai-project-skeleton` to `drbones` is handled cleanly, and combine that rename-impact verification with a Day 14-style release-readiness stabilization pass.

The goal is not to blindly rename everything.

The goal is to make the public project identity coherent while preserving useful PMP / AI Project Skeleton origin material where it is historically or architecturally appropriate.

## Scope

The executor should inspect the current repository state and perform a bounded stabilization pass covering:

```text
- public project name and repository URL references
- README.md and readme_pmp.md public framing
- AGENTS.md operating instructions
- examples/README.md and day-in-the-life examples
- playbooks/README.md and playbook references
- docs/wiki/ pages and local navigation links
- workorders/ guidance and template references
- docs/releases/ notes and version/status language
- docs/architecture/ and docs/origin/ references
- schemas, tools, tests, and checker command references
- GitHub repo metadata references if visible in docs
```

The work should verify that current docs make sense after the GitHub repository has been renamed to:

```text
https://github.com/lightrock/drbones
```

## Files/areas likely to change

Likely files include, but are not limited to:

```text
README.md
readme_pmp.md
AGENTS.md
docs/wiki/*.md
docs/releases/*.md
docs/architecture/*.md
examples/README.md
examples/day-*/README.md
playbooks/README.md
playbooks/*/PLAYBOOK.md
workorders/README.md
workorders/TEMPLATE.md
```

Potential compatibility files or references to inspect:

```text
tools/pmp_check.py
tests/test_pmp_check.py
schemas/workorder-contract.json
```

## Out of scope

Do not perform a broad project rename by blind search/replace.

Do not delete PMP / AI Project Skeleton origin language merely because it contains the old name.

Do not rename `tools/pmp_check.py` or `tests/test_pmp_check.py` unless the workorder is explicitly expanded to include compatibility wrappers and test updates.

Do not break existing documented commands such as:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Do not rename the repo again.

Do not add new architecture doctrine unless required to resolve a contradiction introduced by the rename.

Do not add new day-in-the-life examples, new playbooks, or new feature workflows during this stabilization pass.

Do not convert this into a branding manifesto.

## Constraints

Use these naming rules unless the human decides otherwise:

```text
DrBones
  Public project name.

drbones
  Repository slug, URLs, command-friendly lowercase name.

PMP / AI Project Skeleton
  Legacy/origin doctrine name, preserved where historically useful.

PMP-style
  May remain where it describes the inherited discipline, unless the surrounding text is public landing-page branding that should now say DrBones.
```

Do not imply that DrBones is a finished product, hosted service, autonomous agent platform, legal/compliance system, or production safety tool.

Preserve the current doctrine:

```text
AGENTS.md = global operating rules
workorders/ = one-time task contracts
playbooks/*/PLAYBOOK.md = reusable task-specific workflow guidance
examples/day-*/ = teaching artifacts
docs/wiki/ = navigable project map
```

Preserve these authority boundaries:

```text
raw evidence is not normalized evidence
normalized evidence is not a finding
a finding is not a report
a report is not a command
a command is not execution
execution is not proof
local evidence is not global truth
rollup status is not raw evidence
AI recommendation is not authority
```

## Required verification steps

The executor must:

```text
1. Inspect the current repository state.
2. Confirm the repo is now `lightrock/drbones` or report if it is not.
3. Search for `pmp-ai-project-skeleton`, `PMP AI Project Skeleton`, old GitHub URLs, and related old public-name references.
4. Classify each old-name reference as one of:
   - update to DrBones public identity
   - preserve as origin/legacy doctrine
   - preserve temporarily for command compatibility
   - needs human decision
5. Search for `drbones` and `DrBones` and verify casing is used consistently.
6. Verify startup prompts point to the current repository URL.
7. Verify examples, playbooks, wiki pages, and repo maps link to current paths.
8. Verify Day 14 release-readiness guidance is discoverable.
9. Verify Day 13 trend-to-product language remains safely framed.
10. Verify Day 12 MCP-style/tool-agent language does not imply unsafe autonomous action.
11. Verify examples remain communication artifacts, not finished-product claims.
12. Verify workorders remain one-time task contracts and playbooks remain reusable workflow guidance.
13. Verify the checker command remains documented and still named correctly if no wrapper is added.
14. Record any unresolved naming or branding decisions instead of guessing.
```

## Required checks

Run these from the repository root:

```text
python tools/pmp_check.py --area all
python -m pytest
```

If local execution is not available, the executor must report that clearly and perform the closest available static review.

Also perform a manual path/link review for changed Markdown files.

If a local Markdown/link checker exists, run it. If no such checker exists, report that none exists and manually inspect relative links touched by this work.

## Expected result

A completed pass should leave the repo in this state:

```text
- Public-facing docs refer to the project as DrBones where appropriate.
- Repository URLs point to https://github.com/lightrock/drbones where appropriate.
- PMP / AI Project Skeleton language remains only where it is legacy, origin, doctrine, or compatibility language.
- Existing commands still work or are explicitly preserved as compatibility commands.
- README, long guide, AGENTS, examples, playbooks, wiki, and repo map do not contradict each other.
- Release-readiness/stabilization guidance remains visible.
- No new feature doctrine was introduced during the rename pass.
```

## Completion note

(Completion report format follows.)

## Completion report

The executor must report:

```text
Workorder:
  workorders/2026-05-26-0405-by-lightrock-verify-drbones-rename-release-readiness.md

Repository verified:
  lightrock/drbones or actual observed repository

Changed files:
  - list every changed file

Old-name references found:
  - updated
  - preserved as legacy/origin
  - preserved for compatibility
  - needs human decision

Consistency findings:
  - README / readme_pmp / AGENTS alignment
  - examples / playbooks / wiki alignment
  - repo map and links
  - checker command compatibility

Checks run:
  - exact commands

Checks passed or failed:
  - actual results

Checks not run:
  - why

Release-readiness recommendation:
  - ready to tag
  - ready after small fixes
  - not ready; blockers listed

Lessons learned:
  - created, proposed, or not needed
```

## Fallback behavior

If the executor finds a high-impact naming or doctrine decision that is ambiguous, it must stop that part of the change and record it as a human decision rather than guessing.

If checks fail, keep working until the required checks pass unless blocked by missing authority, missing local environment, unsafe ambiguity, or a real conflict with repo doctrine.

If the executor cannot complete all rename verification safely, it should still complete the safe portions and report the remaining blockers precisely.
