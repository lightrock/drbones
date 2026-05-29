#!/usr/bin/env python3
"""Lightweight PMP repository governance checker.

This checker intentionally uses only the Python standard library.
It is a first-pass contract check, not a replacement for project-specific tests.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


DEFAULT_CONTRACT_PATH = Path("schemas/workorder-contract.json")

ROUTED_DOCTRINE_FILES = (
    "docs/agent-operating-model.md",
    "docs/repo-boundaries.md",
    "docs/architecture-lenses.md",
    "docs/repo-maintenance.md",
    "examples/TRIGGER_MAP.md",
    "workorders/README.md",
    "playbooks/README.md",
    "lessons-learned/README.md",
)

ROUTED_DOCTRINE_TERMS = {
    "docs/agent-operating-model.md": (
        "Foreground AI behavior",
        "Executor AI behavior",
        "start a new tab",
        "Break words",
    ),
    "docs/repo-boundaries.md": ("lightrock/drbones", "External repository read-only safety"),
    "docs/architecture-lenses.md": ("PFEM-lite", "PFCOMM-lite", "docs/internal-reference/pfem-lite.md"),
    "docs/repo-maintenance.md": ("README and translations", "Pull requests and merge conflicts", "Full gates"),
    "examples/TRIGGER_MAP.md": ("Day-in-the-life trigger map",),
    "workorders/README.md": ("Filename pattern", "Completion note"),
    "playbooks/README.md": ("Playbooks", "Executor rule"),
    "lessons-learned/README.md": ("Lessons learned", "When to create or propose one"),
}

GITHUB_SURFACE_FILES = (
    ".github/pull_request_template.md",
    ".github/workflows/checks.yml",
)

GITHUB_PR_TEMPLATE_TERMS = (
    "## Summary",
    "## Workorder",
    "## Checks",
    "## Lessons learned",
    "## Open questions / risks",
    "Not workorder-driven:",
)

GITHUB_CHECK_WORKFLOW_TERMS = (
    "python tools/pmp_check.py --area all",
    "python -m pytest",
    "pull_request:",
    "push:",
)

PFEM_LITE_SCHEMA_FILES = (
    "schemas/evidence.schema.json",
    "schemas/finding.schema.json",
    "schemas/remediation.schema.json",
    "schemas/evaluation-result.schema.json",
    "schemas/handoff.schema.json",
    "schemas/completion-report.schema.json",
)

PFEM_LITE_ARTIFACT_FILES = (
    "rubrics/patch-is-not-verification.md",
    "examples/pfem-lite-boundary-artifacts/README.md",
    "examples/pfem-lite-boundary-artifacts/completion-report-good.md",
    "examples/pfem-lite-boundary-artifacts/completion-report-failure.md",
    "examples/pfem-lite-boundary-artifacts/completion-report-corrected.md",
)

PFEM_LITE_REQUIRED_SCHEMA_KINDS = {
    "schemas/evidence.schema.json": "evidence",
    "schemas/finding.schema.json": "finding",
    "schemas/remediation.schema.json": "remediation",
    "schemas/evaluation-result.schema.json": "evaluation-result",
    "schemas/handoff.schema.json": "handoff",
    "schemas/completion-report.schema.json": "completion-report",
}

PATCH_VERIFICATION_RUBRIC_TERMS = (
    "Patch Is Not Verification",
    "A patch is an action.",
    "Verification is evidence",
    "Pass condition",
    "Fail condition",
    "Good example",
    "Failure example",
    "Corrected example",
)

COMPLETION_REPORT_EXAMPLE_TERMS = (
    "Checks run",
    "Checks not run",
    "Verification status",
)


@dataclass(frozen=True)
class CheckResult:
    ok: bool
    message: str


@dataclass(frozen=True)
class WorkorderContract:
    filename_pattern: str
    reserved_filenames: tuple[str, ...]
    required_headings: tuple[str, ...]
    completion_note_items: tuple[str, ...]


def repo_relative_path(path: Path, repo_root: Path) -> str:
    """Return a stable repo-relative path for checker messages."""
    return path.relative_to(repo_root).as_posix()


def load_contract(repo_root: Path) -> WorkorderContract:
    contract_file = repo_root / DEFAULT_CONTRACT_PATH
    if not contract_file.exists():
        raise FileNotFoundError(f"missing contract file: {contract_file}")

    raw = json.loads(contract_file.read_text(encoding="utf-8"))
    contract = raw.get("x-pmp-contract")
    if not isinstance(contract, dict):
        raise ValueError(f"{contract_file} is missing x-pmp-contract")

    return WorkorderContract(
        filename_pattern=str(contract["filename_pattern"]),
        reserved_filenames=tuple(contract["reserved_filenames"]),
        required_headings=tuple(contract["required_headings"]),
        completion_note_items=tuple(contract["completion_note_items"]),
    )


def markdown_headings(text: str) -> set[str]:
    headings: set[str] = set()
    for line in text.splitlines():
        match = re.match(r"^(#{1,6})\s+(.+?)\s*$", line)
        if match:
            headings.add(match.group(2).strip())
    return headings


def iter_workorder_files(workorders_dir: Path) -> Iterable[Path]:
    if not workorders_dir.exists():
        return []
    return sorted(path for path in workorders_dir.glob("*.md") if path.name != "README.md" and path.name != "TEMPLATE.md")


def check_workorders(repo_root: Path, contract: WorkorderContract) -> list[CheckResult]:
    results: list[CheckResult] = []
    workorders_dir = repo_root / "workorders"
    pattern = re.compile(contract.filename_pattern)

    if not workorders_dir.exists():
        return [CheckResult(False, "missing workorders/ directory")]

    for reserved in contract.reserved_filenames:
        reserved_path = workorders_dir / reserved
        if reserved_path.exists():
            results.append(CheckResult(False, f"reserved rolling workorder name exists: {reserved_path}"))

    for workorder in iter_workorder_files(workorders_dir):
        if workorder.name in contract.reserved_filenames:
            continue
        if not pattern.match(workorder.name):
            results.append(CheckResult(False, f"invalid workorder filename: {workorder}"))
            continue

        text = workorder.read_text(encoding="utf-8")
        headings = markdown_headings(text)
        missing = [heading for heading in contract.required_headings if heading not in headings]
        if missing:
            results.append(CheckResult(False, f"{workorder} missing required headings: {', '.join(missing)}"))
        else:
            results.append(CheckResult(True, f"{workorder} satisfies required headings"))

    if not any(path.name not in {"README.md", "TEMPLATE.md"} for path in workorders_dir.glob("*.md")):
        results.append(CheckResult(True, "no permanent workorders found yet"))

    return results


def check_contract_references(repo_root: Path, contract: WorkorderContract) -> list[CheckResult]:
    results: list[CheckResult] = []
    required_docs = [
        repo_root / "README.md",
        repo_root / "AGENTS.md",
        repo_root / "workorders" / "README.md",
        repo_root / "workorders" / "TEMPLATE.md",
    ]

    for doc in required_docs:
        if not doc.exists():
            results.append(CheckResult(False, f"missing required governance doc: {doc}"))
            continue
        text = doc.read_text(encoding="utf-8")
        if "workorder" not in text.lower():
            results.append(CheckResult(False, f"governance doc does not mention workorders: {doc}"))
        else:
            results.append(CheckResult(True, f"governance doc mentions workorders: {doc}"))

    workorders_readme = repo_root / "workorders" / "README.md"
    if workorders_readme.exists():
        text = workorders_readme.read_text(encoding="utf-8")
        for reserved in contract.reserved_filenames:
            if reserved not in text:
                results.append(CheckResult(False, f"workorders/README.md does not name reserved filename: {reserved}"))
        for item in contract.completion_note_items:
            if item not in text:
                results.append(CheckResult(False, f"workorders/README.md does not name completion note item: {item}"))

    return results


def check_connector_safe_fixture_wording(repo_root: Path) -> list[CheckResult]:
    """Catch fixture headings that have caused connector write friction before."""
    results: list[CheckResult] = []
    scanned_roots = [repo_root / "tests", repo_root / "examples", repo_root / "workorders"]
    flagged: list[str] = []

    for root in scanned_roots:
        if not root.exists():
            continue
        for path in sorted(root.rglob("*")):
            if not path.is_file() or path.suffix not in {".md", ".py", ".txt", ".json"}:
                continue
            text = path.read_text(encoding="utf-8")
            if "# Bad" in text:
                flagged.append(repo_relative_path(path, repo_root))

    if flagged:
        results.append(
            CheckResult(
                False,
                "connector-unsafe fixture wording found; use neutral contract-specific wording: " + ", ".join(flagged),
            )
        )
    else:
        results.append(CheckResult(True, "connector-safe fixture wording check passed"))

    return results



def day_example_sort_key(path: Path) -> tuple[int, str]:
    match = re.fullmatch(r"day-(\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*", path.parent.name)
    if not match:
        return (10_000, path.parent.name)
    return (int(match.group(1)), path.parent.name)


def check_day_examples(repo_root: Path) -> list[CheckResult]:
    """Ensure semantic day example folders are indexed and trigger-mapped."""
    results: list[CheckResult] = []
    examples_dir = repo_root / "examples"
    examples_index = examples_dir / "README.md"
    trigger_map = examples_dir / "TRIGGER_MAP.md"
    agents_file = repo_root / "AGENTS.md"

    for required in [examples_index, trigger_map, agents_file]:
        if not required.exists():
            results.append(CheckResult(False, f"missing day-example governance file: {required}"))
            return results

    agents_text = agents_file.read_text(encoding="utf-8")
    index_text = examples_index.read_text(encoding="utf-8")
    trigger_text = trigger_map.read_text(encoding="utf-8")

    if "examples/TRIGGER_MAP.md" not in agents_text:
        results.append(CheckResult(False, "AGENTS.md must point day-in-the-life routing to examples/TRIGGER_MAP.md"))

    old_style = sorted(examples_dir.glob("day-in-the-life-*/README.md"))
    if old_style:
        results.append(
            CheckResult(
                False,
                "old numeric-only day example folders remain: "
                + ", ".join(repo_relative_path(path, repo_root) for path in old_style),
            )
        )

    example_paths = sorted(
        (path for path in examples_dir.glob("day-*/README.md") if re.fullmatch(r"day-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*", path.parent.name)),
        key=day_example_sort_key,
    )
    if not example_paths:
        results.append(CheckResult(False, "expected semantic day examples to exist"))
        return results

    missing_from_trigger_map: list[str] = []
    missing_from_index: list[str] = []

    for readme_path in example_paths:
        day_dir = readme_path.parent.name
        day_number = str(int(day_dir.split("-", 2)[1]))
        relative_path = f"examples/{day_dir}/README.md"
        index_link = f"{day_dir}/README.md"

        if f"Day {day_number}:" not in trigger_text or relative_path not in trigger_text:
            missing_from_trigger_map.append(relative_path)

        if index_link not in index_text:
            missing_from_index.append(relative_path)

    if missing_from_trigger_map:
        results.append(CheckResult(False, "examples/TRIGGER_MAP.md is missing: " + ", ".join(missing_from_trigger_map)))
    if missing_from_index:
        results.append(CheckResult(False, "examples/README.md is missing: " + ", ".join(missing_from_index)))
    if not missing_from_trigger_map and not missing_from_index and not old_style:
        results.append(CheckResult(True, "semantic day examples are indexed and trigger-mapped"))

    return results


def check_routed_doctrine(repo_root: Path) -> list[CheckResult]:
    """Ensure root AGENTS.md remains a router to the semantic doctrine files."""
    results: list[CheckResult] = []
    agents_file = repo_root / "AGENTS.md"

    if not agents_file.exists():
        return [CheckResult(False, "missing AGENTS.md router")]

    agents_text = agents_file.read_text(encoding="utf-8")
    missing_links: list[str] = []
    missing_files: list[str] = []
    missing_terms: list[str] = []

    for relative in ROUTED_DOCTRINE_FILES:
        if relative not in agents_text:
            missing_links.append(relative)

        path = repo_root / relative
        if not path.exists():
            missing_files.append(relative)
            continue

        text = path.read_text(encoding="utf-8")
        for term in ROUTED_DOCTRINE_TERMS.get(relative, ()):
            if term not in text:
                missing_terms.append(f"{relative}: {term}")

    if missing_links:
        results.append(
            CheckResult(False, "AGENTS.md is missing routed doctrine links: " + ", ".join(missing_links))
        )
    if missing_files:
        results.append(CheckResult(False, "missing routed doctrine files: " + ", ".join(missing_files)))
    if missing_terms:
        results.append(
            CheckResult(False, "routed doctrine files are missing expected terms: " + ", ".join(missing_terms))
        )

    if not missing_links and not missing_files and not missing_terms:
        results.append(CheckResult(True, "AGENTS.md links to routed doctrine files"))

    return results


def check_github_surfaces(repo_root: Path) -> list[CheckResult]:
    """Ensure GitHub PR and CI surfaces preserve Doctor Bones workflow discipline."""
    results: list[CheckResult] = []
    missing_files: list[str] = []
    missing_terms: list[str] = []

    for relative in GITHUB_SURFACE_FILES:
        path = repo_root / relative
        if not path.exists():
            missing_files.append(relative)

    pr_template = repo_root / ".github" / "pull_request_template.md"
    if pr_template.exists():
        text = pr_template.read_text(encoding="utf-8")
        for term in GITHUB_PR_TEMPLATE_TERMS:
            if term not in text:
                missing_terms.append(f".github/pull_request_template.md: {term}")

    workflow = repo_root / ".github" / "workflows" / "checks.yml"
    if workflow.exists():
        text = workflow.read_text(encoding="utf-8")
        for term in GITHUB_CHECK_WORKFLOW_TERMS:
            if term not in text:
                missing_terms.append(f".github/workflows/checks.yml: {term}")

    if missing_files:
        results.append(CheckResult(False, "missing GitHub surfaces: " + ", ".join(missing_files)))
    if missing_terms:
        results.append(CheckResult(False, "GitHub surfaces are missing expected terms: " + ", ".join(missing_terms)))

    if not missing_files and not missing_terms:
        results.append(CheckResult(True, "GitHub PR and CI surfaces are present"))

    return results


def check_pfem_lite_artifacts(repo_root: Path) -> list[CheckResult]:
    """Ensure PFEM-lite boundary ideas exist as small concrete artifacts."""
    results: list[CheckResult] = []
    missing_files: list[str] = []
    invalid_schemas: list[str] = []
    missing_terms: list[str] = []

    for relative in (*PFEM_LITE_SCHEMA_FILES, *PFEM_LITE_ARTIFACT_FILES):
        if not (repo_root / relative).exists():
            missing_files.append(relative)

    for relative, expected_kind in PFEM_LITE_REQUIRED_SCHEMA_KINDS.items():
        path = repo_root / relative
        if not path.exists():
            continue
        try:
            raw = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            invalid_schemas.append(f"{relative}: invalid JSON: {exc}")
            continue

        contract = raw.get("x-doctor-bones-contract")
        if not isinstance(contract, dict):
            invalid_schemas.append(f"{relative}: missing x-doctor-bones-contract")
            continue
        if contract.get("record_kind") != expected_kind:
            invalid_schemas.append(f"{relative}: expected record_kind {expected_kind}")
        if "boundary_rule" not in contract:
            invalid_schemas.append(f"{relative}: missing boundary_rule")
        if "required" not in raw or not isinstance(raw["required"], list):
            invalid_schemas.append(f"{relative}: missing required field list")

    rubric = repo_root / "rubrics" / "patch-is-not-verification.md"
    if rubric.exists():
        text = rubric.read_text(encoding="utf-8")
        for term in PATCH_VERIFICATION_RUBRIC_TERMS:
            if term not in text:
                missing_terms.append(f"rubrics/patch-is-not-verification.md: {term}")

    for relative in (
        "examples/pfem-lite-boundary-artifacts/completion-report-good.md",
        "examples/pfem-lite-boundary-artifacts/completion-report-failure.md",
        "examples/pfem-lite-boundary-artifacts/completion-report-corrected.md",
    ):
        path = repo_root / relative
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        for term in COMPLETION_REPORT_EXAMPLE_TERMS:
            if term not in text:
                missing_terms.append(f"{relative}: {term}")

    examples_index = repo_root / "examples" / "README.md"
    if examples_index.exists() and "pfem-lite-boundary-artifacts/README.md" not in examples_index.read_text(encoding="utf-8"):
        missing_terms.append("examples/README.md: pfem-lite-boundary-artifacts/README.md")

    architecture_lenses = repo_root / "docs" / "architecture-lenses.md"
    if architecture_lenses.exists() and "rubrics/patch-is-not-verification.md" not in architecture_lenses.read_text(encoding="utf-8"):
        missing_terms.append("docs/architecture-lenses.md: rubrics/patch-is-not-verification.md")

    if missing_files:
        results.append(CheckResult(False, "missing PFEM-lite artifacts: " + ", ".join(missing_files)))
    if invalid_schemas:
        results.append(CheckResult(False, "invalid PFEM-lite schemas: " + ", ".join(invalid_schemas)))
    if missing_terms:
        results.append(CheckResult(False, "PFEM-lite artifacts are missing expected terms: " + ", ".join(missing_terms)))

    if not missing_files and not invalid_schemas and not missing_terms:
        results.append(CheckResult(True, "PFEM-lite schemas, rubric, and completion examples are present"))

    return results

def run_checks(repo_root: Path, area: str) -> list[CheckResult]:
    contract = load_contract(repo_root)
    results: list[CheckResult] = []

    if area in {"workorders", "all"}:
        results.extend(check_workorders(repo_root, contract))
        results.extend(check_contract_references(repo_root, contract))
        results.extend(check_connector_safe_fixture_wording(repo_root))
        results.extend(check_day_examples(repo_root))
        results.extend(check_routed_doctrine(repo_root))
        results.extend(check_github_surfaces(repo_root))
        results.extend(check_pfem_lite_artifacts(repo_root))

    return results


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run PMP repository governance checks.")
    parser.add_argument("--repo-root", default=".", help="Repository root to check. Defaults to current directory.")
    parser.add_argument("--area", choices=["workorders", "all"], default="all", help="Area to check.")
    args = parser.parse_args(argv)

    repo_root = Path(args.repo_root).resolve()
    try:
        results = run_checks(repo_root, args.area)
    except Exception as exc:  # pragma: no cover - top-level CLI guard
        print(f"FAIL: {exc}")
        return 2

    failed = [result for result in results if not result.ok]
    for result in results:
        prefix = "OK" if result.ok else "FAIL"
        print(f"{prefix}: {result.message}")

    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
