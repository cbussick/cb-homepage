# Plan 004: Declare the supported Node runtime in the manifest and docs

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- package.json README.md package-lock.json`
> If any in-scope file changed since this plan was written, compare the "Current state" notes against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `c3fe108`, 2026-07-11
- **Issue**: none

## Why this matters

The lockfile already says Vite 8.1.3 needs a newer Node runtime, but the manifest and README do not state that contract. That pushes version mismatches into runtime failures on new machines instead of catching them up front.

## Current state

- `package.json:5-39` defines scripts and dependencies, but no `engines` or `packageManager` field.
- `package-lock.json:4046-4063` records Vite's engine requirement as `^20.19.0 || >=22.12.0`.
- `README.md:7-17` only shows `npm run dev` and `npm test`; it does not tell contributors what Node/npm versions are expected.
- The repo already uses a single npm-based workflow, so this change is a manifest-and-docs contract update, not a package-manager migration.

## Commands you will need

| Purpose                       | Command                              | Expected on success                        |
| ----------------------------- | ------------------------------------ | ------------------------------------------ |
| Inspect the manifest metadata | `npm pkg get engines packageManager` | shows both fields with the expected values |
| Sanity-check the repo         | `npm run typecheck`                  | exit 0                                     |

## Scope

**In scope**:

- `package.json`
- `README.md`

**Out of scope**:

- Any dependency bump.
- Any lockfile rewrite unless npm changes it as a side effect of editing `package.json`.
- Any runtime code change.

## Steps

### Step 1: Add the runtime contract to `package.json`

Add an `engines.node` entry that matches Vite's supported range, and add a `packageManager` entry that pins the npm version used in this workspace. Use the current shell's npm version (`11.13.0`) if you need a concrete value.

Do not add a wider Node range than the lockfile supports.

**Verify**: `npm pkg get engines packageManager` -> shows the new fields with the expected values.

### Step 2: Document the requirement in the README

Update the getting-started text so a new contributor sees the supported Node version before they run the install or dev commands.

Keep the README terse; it should tell people which runtime to use, not add a long setup guide.

**Verify**: `npm run typecheck` -> exit 0.

## Test plan

- No new tests are needed.
- Verification is the manifest metadata plus the existing typecheck.

## Done criteria

All must hold:

- [ ] `package.json` contains `engines.node` and `packageManager`
- [ ] `README.md` states the supported runtime
- [ ] `npm pkg get engines packageManager` shows the expected values
- [ ] `npm run typecheck` exits 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The repo maintainers do not want `packageManager` pinned after all.
- The Node range in the lockfile changes while you are editing this plan.
- The metadata change causes an unexpected lockfile rewrite that is not just the normal npm metadata update.

## Maintenance notes

- If the project later moves to a different package manager, this plan should be replaced instead of layered on top of npm-specific guidance.
- When the Node support window changes, update `package.json`, the README, and the CI workflow together.
