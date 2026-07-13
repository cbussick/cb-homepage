# Plan 003: Name the mobile drawer dialog programmatically

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- src/components/mobile-drawer/MobileDrawer.tsx tests/nav.spec.ts`
> If any in-scope file changed since this plan was written, compare the "Current state" notes against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-restore-formatting-baseline.md
- **Category**: bug
- **Planned at**: commit `c3fe108`, 2026-07-11
- **Issue**: none

## Why this matters

The mobile nav uses a native `<dialog>`, but the dialog itself has no programmatic name. Screen readers can open it, but they do not get a reliable label for what the dialog contains. This is a small change with a clear accessibility payoff and no visible layout impact.

## Current state

- `src/components/mobile-drawer/MobileDrawer.tsx:47-90` renders `<dialog>` without `aria-label` or `aria-labelledby`.
- The visible title at `src/components/mobile-drawer/MobileDrawer.tsx:52-55` is a `TextGradient` span, not a label attached to the dialog.
- `src/components/shared/TextGradient.tsx:1-20` does not forward arbitrary DOM props, so `aria-labelledby` would require a broader helper change. The minimal fix is to put `aria-label` on the dialog itself.
- `tests/nav.spec.ts:34-59` already opens and closes the drawer on mobile, so it is the right place to assert the dialog name.

## Commands you will need

| Purpose                   | Command                         | Expected on success |
| ------------------------- | ------------------------------- | ------------------- |
| Run the nav spec          | `npm test -- tests/nav.spec.ts` | exit 0              |
| Lint the component change | `npm run lint`                  | exit 0              |

## Scope

**In scope**:

- `src/components/mobile-drawer/MobileDrawer.tsx`
- `tests/nav.spec.ts`

**Out of scope**:

- Any change to `TextGradient`.
- Any change to the dialog's open/close behavior.
- Any refactor of the backdrop click logic.

## Steps

### Step 1: Give the dialog a stable accessible name

Add an `aria-label` to the `<dialog>` with the same site-owner name already shown in the visible title. Use the literal visible name so the test and the UI stay in sync without introducing a new helper.

Keep the existing trigger and close-button labels unchanged.

**Verify**: `npm run lint` -> exit 0.

### Step 2: Assert the dialog name in the mobile nav test

Update `tests/nav.spec.ts` so the mobile drawer test locates the dialog by role and name, not just by tag name. The expected name should match the label added in step 1.

Keep the open, Escape-close, and close-button checks.

**Verify**: `npm test -- tests/nav.spec.ts` -> exit 0.

## Test plan

- The mobile nav spec should fail if the dialog loses its accessible name.
- The existing open/close behavior should continue to pass.

## Done criteria

All must hold:

- [ ] The dialog has a programmatic name
- [ ] The mobile nav test asserts that name
- [ ] `npm test -- tests/nav.spec.ts` exits 0
- [ ] `npm run lint` exits 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- The dialog name would diverge from the visible title and no single source of truth is obvious.
- A broader `TextGradient` change becomes necessary to complete the fix cleanly.
- The mobile dialog test fails for a reason unrelated to naming, such as a browser bug in `<dialog>`.

## Maintenance notes

- If the site-owner name ever changes, update the dialog label and the visible title together.
- Any future dialog on this site should have an explicit name before it ships.
