# Plan 001: Restore formatting baseline in the CSS files

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- src/components/hero-section/HeroSection.module.css src/styles/theme.css`
> If either file changed since this plan was written, compare the "Current state" notes against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `c3fe108`, 2026-07-11
- **Issue**: none

## Why this matters

`npm run format:check` currently fails on two CSS files, so the repo does not have a clean formatting baseline. This is low-risk work, but it blocks a clean CI gate and makes later diffs harder to review because the formatter noise is already present.

## Current state

- `src/components/hero-section/HeroSection.module.css:1-74` is one of the two files flagged by the formatter check.
- `src/styles/theme.css:1-220` is the other flagged file.
- `src/components/project-section/ProjectSection.module.css:1-36` shows the same CSS Module style the repo already expects; keep the selector structure and token names intact.
- This plan is format-only. Do not change any selector names, CSS custom property names, or layout behavior.

## Commands you will need

| Purpose                    | Command                                                                                        | Expected on success |
| -------------------------- | ---------------------------------------------------------------------------------------------- | ------------------- |
| Format the flagged files   | `npx prettier --write src/components/hero-section/HeroSection.module.css src/styles/theme.css` | exits 0             |
| Re-check the same files    | `npx prettier --check src/components/hero-section/HeroSection.module.css src/styles/theme.css` | exits 0             |
| Repo-wide formatting check | `npm run format:check`                                                                         | exits 0             |
| Whitespace sanity check    | `git diff --check`                                                                             | no output           |

## Scope

**In scope**:

- `src/components/hero-section/HeroSection.module.css`
- `src/styles/theme.css`

**Out of scope**:

- Any semantic CSS change, even if it looks adjacent to the formatter output.
- Any React component or test change.
- Any repo-wide refactor or selector rename.

## Steps

### Step 1: Reformat only the two flagged CSS files

Use Prettier on `src/components/hero-section/HeroSection.module.css` and `src/styles/theme.css` only. Do not let the formatter rewrite unrelated files.

**Verify**: `npx prettier --check src/components/hero-section/HeroSection.module.css src/styles/theme.css` -> exit 0.

### Step 2: Confirm the repo is clean

Run the repo-level formatting check and a whitespace diff check.

**Verify**: `npm run format:check` -> exit 0, and `git diff --check` -> no output.

## Test plan

- No new tests are needed.
- Verification is the formatter check itself, plus the clean diff check.

## Done criteria

All must hold:

- [ ] `npx prettier --check src/components/hero-section/HeroSection.module.css src/styles/theme.css` exits 0
- [ ] `npm run format:check` exits 0
- [ ] `git diff --check` produces no output
- [ ] No files outside the two scoped CSS files are modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- Prettier wants to touch any file outside the two scoped CSS files.
- `npm run format:check` still fails after one reformat pass.
- The code at the listed file locations does not match the current-state notes.

## Maintenance notes

- Future CSS edits in these files should preserve the existing token names and module structure.
- If the formatter starts surfacing additional files, treat that as a separate plan instead of widening this one.
