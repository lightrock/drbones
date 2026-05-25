from __future__ import annotations

import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "tools" / "pmp_check.py"
spec = importlib.util.spec_from_file_location("pmp_check", MODULE_PATH)
pmp_check = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(pmp_check)


def test_markdown_headings_extracts_headings() -> None:
    text = """# Title

## Purpose

### Details
"""
    assert pmp_check.markdown_headings(text) == {"Title", "Purpose", "Details"}


def test_checker_accepts_empty_template_workorder_directory() -> None:
    repo = Path(__file__).resolve().parents[1]
    results = pmp_check.run_checks(repo, "workorders")
    assert results
    assert all(result.ok for result in results), "\n".join(result.message for result in results if not result.ok)


def test_invalid_workorder_filename_is_rejected(tmp_path: Path) -> None:
    repo = tmp_path
    (repo / "schemas").mkdir()
    (repo / "workorders").mkdir()
    (repo / "README.md").write_text("workorder", encoding="utf-8")
    (repo / "AGENTS.md").write_text("workorder", encoding="utf-8")
    (repo / "workorders" / "README.md").write_text(
        "workorder current-task.md latest.md next.md changed files checks run checks passed or failed "
        "checks not run and why lessons learned created or not needed open questions exact workorder path",
        encoding="utf-8",
    )
    (repo / "workorders" / "TEMPLATE.md").write_text("workorder", encoding="utf-8")
    (repo / "schemas" / "workorder-contract.json").write_text(
        (Path(__file__).resolve().parents[1] / "schemas" / "workorder-contract.json").read_text(encoding="utf-8"),
        encoding="utf-8",
    )
    (repo / "workorders" / "next.md").write_text("# Bad", encoding="utf-8")
    (repo / "workorders" / "not-a-real-workorder.md").write_text("# Bad", encoding="utf-8")

    results = pmp_check.run_checks(repo, "workorders")
    messages = "\n".join(result.message for result in results if not result.ok)
    assert "reserved rolling workorder name exists" in messages
    assert "invalid workorder filename" in messages
