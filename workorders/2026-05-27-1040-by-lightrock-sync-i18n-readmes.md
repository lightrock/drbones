# Workorder: sync translated READMEs

Repository: `lightrock/drbones`

Created: 2026-05-27 10:40 America/Chicago

Release lane: `v0.5.1` cleanup. `v0.5.0` has already happened.

## Purpose

Sync the translated README files with the current canonical `README.md` so public template guidance stays aligned across languages.

This workorder also repairs the workorder itself to satisfy the repository workorder contract headings.

## Scope

Use `README.md` as the canonical source.

Update these translated files as needed:

```text
docs/i18n/README.es.md
docs/i18n/README.fr.md
docs/i18n/README.de.md
docs/i18n/README.pt-BR.md
docs/i18n/README.hi.md
```

The canonical README includes a top-of-file usage clarification explaining that Doctor Bones can be used by pointing a foreground AI at the appropriate Doctor Bones-based repository instance. Users do not always need a local checkout, a running app, or an executor agent for planning/advice tasks.

Each translated README should preserve the same meaning, section structure, links, startup prompt semantics, checks, and remaining sections as canonical `README.md`.

Keep the startup prompt block itself in English and preserve this placeholder exactly:

```text
<your project repository URL>
```

The translated text around the prompt should make clear that the target is the user's copied project repository, not the public Doctor Bones source repository.

## Files/areas likely to change

```text
README.md
docs/i18n/README.es.md
docs/i18n/README.fr.md
docs/i18n/README.de.md
docs/i18n/README.pt-BR.md
docs/i18n/README.hi.md
workorders/2026-05-27-1040-by-lightrock-sync-i18n-readmes.md
```

## Out of scope

Do not edit unrelated documentation.

Do not change project doctrine beyond syncing the README translations to canonical `README.md`.

Do not change checks or tests to make this pass.

Do not point users at `lightrock/drbones` as the place to create their own project workorders.

Do not remove Hindi from the language list.

## Constraints

`README.md` is the canonical public template README.

Translated READMEs should not introduce concepts that are absent from `README.md`.

If `README.md` itself has a source-template problem, report it before changing translations.

If translation uncertainty remains, state it in the completion report instead of pretending certainty.

This work is `v0.5.1` cleanup. `v0.5.0` has already happened.

## Required checks

Run:

```text
python tools/pmp_check.py --area all
python -m pytest
```

Also manually verify:

```text
all translated READMEs include the same language list
all translated READMEs include the new top usage clarification
all translated startup prompts preserve <your project repository URL>
all translated workorder shortcut sections refer to the user's project repository
all translated READMEs match the current canonical README section structure, including any removed sections
```

If a local markdown/link checker exists, run it. If not, report that no such checker was found.

## Expected result

The translated READMEs match canonical `README.md` in structure and meaning.

The workorder satisfies the repository workorder contract headings.

The required checks pass, or any remaining failure is reported with exact command output and a real blocker.

## Fallback behavior

If the translations cannot be completed confidently in one pass, update the files that can be updated safely and report the remaining translation uncertainty clearly.

If checks fail because of this workorder or the translated READMEs, fix the smallest real cause and rerun the same checks.

If checks fail for an unrelated pre-existing issue, report the exact failure and explain why it is outside this workorder.

## Completion note

Report:

```text
changed files
checks run
checks passed or failed
checks not run and why
lessons learned created or not needed
open questions
exact workorder path
```
