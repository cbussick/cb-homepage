# Plan 007: Remove stale scroll-snap guidance from AGENTS.md

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- AGENTS.md src`
> If any in-scope file changed since this plan was written, compare the "Current state" notes against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `c3fe108`, 2026-07-11
- **Issue**: none

## Why this matters

`AGENTS.md` still tells future agents that the sections use `scroll-snap-align` and that `scroll-snap-type` lives on `html`, but the implementation no longer contains any scroll-snap code. That mismatch will mislead the next maintainer and can produce bad follow-up changes.

## Current state

- `AGENTS.md:49-57` still describes full-bleed sections with `scroll-snap-align: start` and a root `scroll-snap-type` rule.
- `rg -n 'scroll-snap|scroll-snap-align' src AGENTS.md` returns only that AGENTS bullet.
- `src/components/hero-section/HeroSection.module.css:1-10` and `src/components/project-section/ProjectSection.module.css:1-9` have full-bleed wrappers, but no snap behavior.
- `src/styles/theme.css:113-120` currently only defines smooth scrolling and reduced-motion behavior.

## Commands you will need

| Purpose                        | Command             | Expected on success               |
| ------------------------------ | ------------------- | --------------------------------- |
| Confirm the stale text is gone | `rg -n 'scroll-snap | scroll-snap-align' AGENTS.md src` | no output |
| Sanity-check the markdown diff | `git diff --check`  | no output                         |

## Scope

**In scope**:

- `AGENTS.md`

**Out of scope**:

- Reintroducing scroll snapping in code.
- Any CSS or component change.
- Any wording change outside the stale instruction block unless it is needed to keep the file coherent.

## Steps

### Step 1: Rewrite the stale instruction

Update the AGENTS bullet so it describes the live layout accurately: full-bleed sections with alternating backgrounds and `min-height: 100svh`. Remove the `scroll-snap` claims unless the implementation changes in the same commit.

**Verify**: `git diff --check` -> no output.

### Step 2: Confirm the repository no longer advertises snap behavior

Search the repo for `scroll-snap` and `scroll-snap-align`. After the edit, the search should not return any matches in AGENTS or source code.

**Verify**: `rg -n 'scroll-snap|scroll-snap-align' AGENTS.md src` -> no output.

## Test plan

- No new tests are needed.
- Verification is the repository search plus the clean diff check.

## Done criteria

All must hold:

- [ ] The AGENTS instruction matches the live code
- [ ] No `scroll-snap` guidance remains in AGENTS or `src`
- [ ] `git diff --check` produces no output
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The codebase starts using scroll snapping again while you are editing the docs.
- You find another instruction file with the same stale claim and need to decide which source of truth should be updated.

## Maintenance notes

- If scroll snapping is reintroduced later, update the implementation and AGENTS.md together in one change.
- Keep the AGENTS guidance strictly aligned with the live layout behavior; it is part of the executor contract.
