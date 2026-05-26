# Checks and Gates

## Current executable checks in this skeleton

- `python tools/pmp_check.py --area all`
- `python -m pytest`

These provide lightweight governance coverage and a small test safety net.

## What full gates mean here

A full gate is a codified, multi-boundary validation set. It is not a single syntax/test command.

In this repository, available checks are intentionally lightweight; they validate workorder contract shape and related governance references. Treat these as baseline checks for this skeleton, and expand in downstream projects.

## Source links

- [`../../tools/pmp_check.py`](../../tools/pmp_check.py)
- [`../../tests/test_pmp_check.py`](../../tests/test_pmp_check.py)
- [`../../AGENTS.md`](../../AGENTS.md)
- [`../../workorders/README.md`](../../workorders/README.md)
