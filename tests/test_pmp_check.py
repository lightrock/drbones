from __future__ import annotations

import importlib.util
import re
import sys
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "tools" / "pmp_check.py"
spec = importlib.util.spec_from_file_location("pmp_check", MODULE_PATH)
pmp_check = importlib.util.module_from_spec(spec)
assert spec.loader is not None
sys.modules[spec.name] = pmp_check
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
    (repo / "workorders" / "next.md").write_text("# Invalid fixture", encoding="utf-8")
    (repo / "workorders" / "not-a-real-workorder.md").write_text("# Invalid fixture", encoding="utf-8")

    results = pmp_check.run_checks(repo, "workorders")
    messages = "\n".join(result.message for result in results if not result.ok)
    assert "reserved rolling workorder name exists" in messages
    assert "invalid workorder filename" in messages


def test_connector_safe_fixture_wording_rejects_old_heading(tmp_path: Path) -> None:
    repo = tmp_path
    (repo / "tests").mkdir()
    (repo / "tests" / "fixture_sample.md").write_text("# " + "Bad\n", encoding="utf-8")

    results = pmp_check.check_connector_safe_fixture_wording(repo)
    messages = "\n".join(result.message for result in results if not result.ok)

    assert "connector-unsafe fixture wording" in messages
    assert "tests/fixture_sample.md" in messages


def test_day_in_the_life_examples_are_indexed_and_triggered() -> None:
    repo = Path(__file__).resolve().parents[1]
    examples_dir = repo / "examples"
    agents_text = (repo / "AGENTS.md").read_text(encoding="utf-8")
    examples_index = (examples_dir / "README.md").read_text(encoding="utf-8")
    trigger_map = (examples_dir / "TRIGGER_MAP.md").read_text(encoding="utf-8")

    assert "examples/TRIGGER_MAP.md" in agents_text

    assert not list(examples_dir.glob("day-in-the-life-*/README.md")), "old numeric-only day example folders remain"

    example_paths = sorted(
        (
            path
            for path in examples_dir.glob("day-*/README.md")
            if re.fullmatch(r"day-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*", path.parent.name)
        ),
        key=lambda path: int(path.parent.name.split("-", 2)[1]),
    )
    assert example_paths, "expected semantic day examples to exist"

    missing_from_trigger_map: list[str] = []
    missing_from_index: list[str] = []

    for readme_path in example_paths:
        day_dir = readme_path.parent.name
        day_number = str(int(day_dir.split("-", 2)[1]))
        relative_path = f"examples/{day_dir}/README.md"
        index_link = f"{day_dir}/README.md"

        if f"Day {day_number}:" not in trigger_map or relative_path not in trigger_map:
            missing_from_trigger_map.append(relative_path)

        if index_link not in examples_index:
            missing_from_index.append(relative_path)

    assert not missing_from_trigger_map, "examples/TRIGGER_MAP.md is missing: " + ", ".join(missing_from_trigger_map)
    assert not missing_from_index, "examples/README.md is missing: " + ", ".join(missing_from_index)


def test_pmp_check_validates_semantic_day_examples() -> None:
    repo = Path(__file__).resolve().parents[1]
    results = pmp_check.check_day_examples(repo)
    assert all(result.ok for result in results), "\n".join(result.message for result in results if not result.ok)


def test_agents_router_links_to_routed_doctrine() -> None:
    repo = Path(__file__).resolve().parents[1]
    agents_text = (repo / "AGENTS.md").read_text(encoding="utf-8")

    for relative in pmp_check.ROUTED_DOCTRINE_FILES:
        assert relative in agents_text
        assert (repo / relative).exists(), relative

    results = pmp_check.check_routed_doctrine(repo)
    assert all(result.ok for result in results), "\n".join(result.message for result in results if not result.ok)


def test_github_surfaces_exist_and_name_required_checks() -> None:
    repo = Path(__file__).resolve().parents[1]

    for relative in pmp_check.GITHUB_SURFACE_FILES:
        assert (repo / relative).exists(), relative

    results = pmp_check.check_github_surfaces(repo)
    assert all(result.ok for result in results), "\n".join(result.message for result in results if not result.ok)


def test_pfem_lite_artifacts_exist_and_are_checked() -> None:
    repo = Path(__file__).resolve().parents[1]

    for relative in (*pmp_check.PFEM_LITE_SCHEMA_FILES, *pmp_check.PFEM_LITE_ARTIFACT_FILES):
        assert (repo / relative).exists(), relative

    results = pmp_check.check_pfem_lite_artifacts(repo)
    assert all(result.ok for result in results), "\n".join(result.message for result in results if not result.ok)
