# Project Wiki

This wiki is a **navigation map** for this repository, not a replacement for source files.

Use this when starting new work so you do not need to rehydrate project context from chat.

## How to use this wiki

1. Start here and choose the page for your task.
2. Follow links back to source files before making decisions.
3. Preserve source authority (listed below).
4. If sources conflict, record the conflict in `needs-human-decision.md` instead of silently reconciling it.

## Source authority (highest to lowest for current operations)

1. Current repository state and executable checks (`tools/pmp_check.py`, tests).
2. Root governance (`AGENTS.md`, `workorders/README.md`, `workorders/TEMPLATE.md`).
3. Current project summaries (`README.md`, `readme_pmp.md`, release notes).
4. Invocable workflow examples (`examples/day-*/README.md`).
5. Demos and origin/history material (`examples/*demo*`, `docs/origin/*`) as illustrative context, not governing doctrine.

## Wiki pages

- [Project purpose](project-purpose.md)
- [Architecture boundaries](architecture-boundaries.md)
- [Workflows](workflows.md)
- [Examples and demos](examples-and-demos.md)
- [Checks and gates](checks-and-gates.md)
- [Needs human decision](needs-human-decision.md)
