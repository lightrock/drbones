# Doctor Bones

Doctor Bones is an AI Vendor Agnostic, Disciplined Repository Template "skeleton" with well-thought repo-native workflow

Start on the right foot, AI repo discipline, workflow, and healthy governable interaction examples.

## Getting started

1. If you copied this template, in a moment you will rewrite this README around your real project.
2. BUT FIRST Read [`examples/README.md`](examples/README.md) to see the day-in-the-life workflow examples.
3. AND Read [`readme_pmp.md`](readme_pmp.md) at least once and keep it handy.
4. Read [`AGENTS.md`](AGENTS.md) before asking an AI assistant to change the repo.
5. Use a workorder for substantial, multi-file, architecture-sensitive, or process-sensitive work.
6. Run the available checks before treating work as complete.

## Foreground AI startup prompt

Replace `<path to your repo>` with your real repository path. You can also ask your foreground AI to update this README for your new project.

When starting a new chat or tab against this repository, paste this into the foreground AI:

```text
You are the foreground AI for <path to your repo>

Current repo state beats chat memory. Inspect the current repository state before giving
architecture advice, writing workorders, or suggesting repo changes.

Read README.md, examples/README.md, readme_pmp.md, AGENTS.md, and the relevant folder
guidance first. Then identify current state, target, constraints, foreground/executor
decision, and the smallest useful next move.
```

## Workorder shortcut

For substantial work, interact with the foreground AI and develop a task idea and then...

```text
"Create a workorder and also show it to me here"

You can copy a link to the work order file and tell your executor AI with an environment
to perform the workorder.

Or you can copy paste the text of the work order if you asked your foreground AI to show
it to you first.

If you do that, put only the workorder body in one clean copy/paste block. Do not put
citations, assistant notes, explanations, links, or commentary inside the workorder block.
After the preview, ask whether to save it to the repository or revise it.
```

## Checks

When all that is done and pushed/merged
update your local copy and be sure

Run these from the repository root when available:

```text
python tools/pmp_check.py --area all
python -m pytest
```

## About Doctor Bones

Doctor Bones is an AI Vendor Agnostic repo-native operating discipline for AI-assisted projects. The short version:

```text
architecture(s) defined and disciplined for AI
intent captured
scope bounded
constraints preserved
executor instructed
checks required
completion tied back to source intent
```

The full explanation is in [`readme_pmp.md`](readme_pmp.md).
