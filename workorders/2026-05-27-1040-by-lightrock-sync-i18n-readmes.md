# Workorder: sync translated READMEs

Repository: `lightrock/drbones`

Created: 2026-05-27 10:40 America/Chicago

Release lane: `v0.5.1` cleanup. `v0.5.0` has already happened.

## Task

Sync the translated README files with the current canonical `README.md`.

Canonical source:

```text
README.md
```

Files to update:

```text
docs/i18n/README.es.md
docs/i18n/README.fr.md
docs/i18n/README.de.md
docs/i18n/README.pt-BR.md
docs/i18n/README.hi.md
```

## Required changes

The main README now includes a top-of-file usage clarification explaining that Doctor Bones can be used by pointing a foreground AI at the appropriate Doctor Bones-based repository instance. Users do not always need a local checkout, a running app, or an executor agent for planning/advice tasks.

Update each translated README so it preserves the same meaning, section structure, links, startup prompt semantics, checks, and About section as `README.md`.

Keep the startup prompt block itself in English and preserve this placeholder exactly:

```text
<your project repository URL>
```

The translated text around the prompt should make clear that the target is the user's copied project repository, not the public Doctor Bones source repository.

## Constraints

Do not add new concepts that are not in `README.md`.

Do not point users at `lightrock/drbones` as the place to create their own project workorders.

Do not remove Hindi from the language list.

Do not edit unrelated files.

If `README.md` itself has a source-template problem, report it before changing translations.

## Checks

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
```

## Completion report

Report changed files, exact checks run, check results, and any unresolved translation uncertainty.
