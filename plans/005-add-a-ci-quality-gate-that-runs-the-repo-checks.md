# Plan 005: Add a CI quality gate that runs the repo checks

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- .github/workflows/ci.yml package.json README.md`
> If any in-scope file changed since this plan was written, compare the "Current state" notes against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/001-restore-formatting-baseline.md, plans/004-declare-the-supported-node-runtime-in-the-manifest-and-docs.md
- **Category**: dx
- **Planned at**: commit `c3fe108`, 2026-07-11
- **Issue**: none

## Why this matters

There is no workflow in the repo today, so the local checks in `package.json` only fail on a maintainer's machine. A small GitHub Actions job makes the same gate visible on every pull request and catches regressions before they are merged.

## Current state

- `package.json:5-14` already exposes the checks the workflow should run.
- `playwright.config.ts:1-20` already wires the end-to-end tests to build and preview the production app automatically.
- `AGENTS.md:15-25` documents the local commands, but there is no `.github/workflows` directory in the repository.
- `README.md:7-19` also does not mention CI yet, so the workflow will be the first shared gate.

## Commands you will need

| Purpose                        | Command                                                                                     | Expected on success |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ------------------- |
| Run the repo checks locally    | `npm run typecheck && npm run lint && npm run lint:css && npm run format:check && npm test` | exit 0              |
| Sanity-check the workflow file | `git diff --check`                                                                          | no output           |

## Scope

**In scope**:

- `.github/workflows/ci.yml`

**Out of scope**:

- Any application code.
- Any dependency change.
- Any release or deployment automation beyond this single PR gate.

## Steps

### Step 1: Create the workflow

Add `.github/workflows/ci.yml` with one job that checks out the repo, sets up the supported Node version, installs dependencies with npm, and then runs the repo checks in this order:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run lint:css`
4. `npm run format:check`
5. `npm test`

Use the Node version declared in plan 004. Keep the workflow minimal; no matrix is needed unless a browser-specific failure later proves you need one.

**Verify**: `rg -n 'npm run typecheck|npm run lint|npm run lint:css|npm run format:check|npm test' .github/workflows/ci.yml` -> shows the five commands in that order.

### Step 2: Prove the workflow commands are green locally

Run the same checks the workflow will run, in the same order. This is the practical verification for a YAML-only change.

**Verify**: `npm run typecheck && npm run lint && npm run lint:css && npm run format:check && npm test` -> exit 0.

## Test plan

- No new application tests are needed.
- The workflow is validated by the same commands it will execute in CI.

## Done criteria

All must hold:

- [ ] `.github/workflows/ci.yml` exists and runs the repo checks
- [ ] The workflow uses the runtime declared in plan 004
- [ ] Local verification commands all exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The workflow needs a different trigger policy than `push`/`pull_request`.
- Any repo check still fails after a reasonable fix attempt.
- Adding the workflow would require changing unrelated release automation.

## Maintenance notes

- If the supported Node version changes, update this workflow in the same change as `package.json` and `README.md`.
- If the repo later adds more checks, append them here in the same order you want contributors to run them locally.
