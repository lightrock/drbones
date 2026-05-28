# Day in the life 17: paste the failed test output and fix it

This example is about the simplest useful repair loop in an AI-assisted repo.

When checks fail, do not describe the failure from memory. Paste the exact output into the foreground AI and ask for the smallest safe fix.

## Human request

```text
The tests failed. Here is the output. Fix it.
```

## The pattern

```text
run checks
→ copy exact failure output
→ paste it into the foreground AI
→ classify the failure
→ decide direct patch or workorder
→ fix the smallest real cause
→ rerun the same checks
→ report what changed
```

## What to paste

Paste enough output for the foreground AI to see:

- the exact command that failed
- the failing test name or checker message
- the assertion/error text
- the file path and line number if present
- any relevant traceback
- the current working directory if repo identity may matter

Do not summarize a failure as only “it broke.”

## Foreground AI response

Current state:

- A check failed.
- The pasted output is the current evidence.
- The repo state still needs to be inspected before patching.

Target:

- Make the failing check pass without expanding scope.

Constraint:

- Do not invent a different failure.
- Do not patch around the test unless the test is truly wrong.
- Do not broaden the task into unrelated cleanup.
- Rerun the same check after the fix if execution is available.

Next move:

- Identify the failing contract.
- Patch the smallest responsible file.
- Rerun the same command.
- Report changed files and check results.

## Direct fix or workorder?

Use a direct patch when:

- the failure is small and localized
- the affected file is obvious
- no local runtime is needed beyond the named check
- the fix does not change architecture doctrine

Create a workorder when:

- the failure spans multiple areas
- the fix requires design judgment
- the failure reveals a new rule or missing checker
- the fix needs terminal debugging or repeated local execution
- the human wants another executor to perform the repair

## Practical lesson

The failed test output is evidence.

Treat it like evidence:

```text
exact command
+ exact failure
+ smallest fix
+ same check rerun
+ completion report
```

That loop keeps AI repair work grounded instead of becoming guesswork.
