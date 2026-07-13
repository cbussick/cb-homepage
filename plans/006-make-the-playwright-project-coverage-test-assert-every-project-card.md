# Plan 006: Make the Playwright project coverage test assert every project card

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- tests/projects.spec.ts src/data/projects.tsx src/components/project-section/ProjectSection.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" notes against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests
- **Planned at**: commit `c3fe108`, 2026-07-11
- **Issue**: none

## Why this matters

The current Playwright coverage only checks four project titles even though the page renders five projects. That leaves a real regression hole: `cbussick.dev` can disappear and the test suite will still pass. The current assertion style also only proves attachment, not that the cards are actually visible in the rendered page.

## Current state

- `tests/projects.spec.ts:1-26` hardcodes four project headings and uses `toBeAttached()`.
- `src/data/projects.tsx:3-114` exports five projects, including `cbussick.dev` at lines 98-113.
- `src/components/project-section/ProjectSection.tsx:21-24` renders every entry in `projects`, so the test should follow that same source of truth.
- `tests/nav.spec.ts:1-59` shows the repo's Playwright style: `expect`, `test as it`, and `it.describe` blocks.

## Commands you will need

| Purpose                       | Command                              | Expected on success |
| ----------------------------- | ------------------------------------ | ------------------- |
| Run the focused spec          | `npm test -- tests/projects.spec.ts` | exit 0              |
| Keep the test file lint-clean | `npm run lint`                       | exit 0              |

## Scope

**In scope**:

- `tests/projects.spec.ts`

**Out of scope**:

- Any change to `src/data/projects.tsx`.
- Any layout or component change unless the test exposes a real bug.
- Any browser config change.

## Steps

### Step 1: Drive the assertions from the project data

Import `projects` from `@/data/projects` and iterate over it instead of hardcoding four titles. The test should fail if the data array changes and the UI does not render the same titles.

Keep the existing "no carousel controls" assertion.

**Verify**: `npm run lint` -> exit 0.

### Step 2: Strengthen the DOM assertion

Replace `toBeAttached()` with `toBeVisible()` for the project headings so the test proves the cards are actually rendered, not just present in the DOM tree.

Add one explicit check for the `cbussick.dev` card or CTA href so the previously omitted project is covered directly.

**Verify**: `npm test -- tests/projects.spec.ts` -> exit 0.

## Test plan

- The spec should loop over every exported project title.
- The spec should fail if `cbussick.dev` disappears.
- The spec should continue to assert that no carousel controls exist.

## Done criteria

All must hold:

- [ ] Every project in `src/data/projects.tsx` is asserted in the spec
- [ ] The `cbussick.dev` project is covered explicitly
- [ ] `npm test -- tests/projects.spec.ts` exits 0
- [ ] `npm run lint` exits 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- A project title is not exposed in the accessibility tree, which would mean the component itself needs work.
- The test would need a brittle CSS selector to distinguish one project card from another.
- The repo changes `projects` into a non-array structure before this plan lands.

## Maintenance notes

- New projects should be added to the data array and automatically covered by this spec.
- If the project cards become virtualized or lazy-rendered, this test will need a different assertion strategy.
