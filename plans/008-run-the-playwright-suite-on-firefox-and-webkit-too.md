# Plan 008: Run the Playwright suite on Firefox and WebKit too

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- playwright.config.ts src/components/mobile-drawer/MobileDrawer.module.css tests/nav.spec.ts tests/projects.spec.ts`
> If any in-scope file changed since this plan was written, compare the "Current state" notes against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: plans/003-name-the-mobile-drawer-dialog-programmatically.md
- **Category**: tests
- **Planned at**: commit `c3fe108`, 2026-07-11
- **Issue**: none

## Why this matters

The Playwright suite only runs Chromium today, plus a mobile Chromium emulation. That leaves browser-specific regressions around native `<dialog>`, `overlay`, `allow-discrete`, and `@starting-style` unchecked in Firefox and WebKit. This site is small enough that broader coverage is cheap and worth it.

## Current state

- `playwright.config.ts:1-20` defines only two projects: `chromium` and `mobile` (Pixel 5).
- `src/components/mobile-drawer/MobileDrawer.module.css:21-69` uses native dialog styling with `allow-discrete` transitions and `@starting-style`.
- `tests/nav.spec.ts:34-59` already exercises dialog open and close behavior, but only in the configured matrix.
- `tests/projects.spec.ts` is browser-agnostic, so the extra engine coverage should mostly affect the nav/drawer path.

## Commands you will need

| Purpose                                       | Command        | Expected on success |
| --------------------------------------------- | -------------- | ------------------- |
| Run the full suite in all configured browsers | `npm test`     | exit 0              |
| Keep the config and tests lint-clean          | `npm run lint` | exit 0              |

## Scope

**In scope**:

- `playwright.config.ts`
- `tests/nav.spec.ts` only if a real browser-specific failure needs a test adjustment

**Out of scope**:

- Any application code change unless a browser exposes a genuine bug.
- Any reduction of the existing Chromium or mobile coverage.

## Steps

### Step 1: Expand the Playwright project matrix

Add Firefox and WebKit desktop projects to the existing Playwright config. Keep the Chromium and Pixel 5 entries so the current coverage stays intact.

Do not change the `baseURL`, `webServer`, or reduced-motion settings.

**Verify**: `rg -n 'chromium|firefox|webkit|Pixel 5' playwright.config.ts` -> shows all four configured projects.

### Step 2: Run the suite across the broader matrix

Run the full Playwright suite after expanding the matrix. If Firefox or WebKit exposes a real issue, fix the assertion or component, but do not weaken the test just to make the matrix green.

**Verify**: `npm test` -> exit 0, and the Playwright report shows all four projects passing.

## Test plan

- `tests/nav.spec.ts` should continue to pass in Chromium, Firefox, WebKit, and mobile.
- `tests/projects.spec.ts` should continue to pass in all configured projects.

## Done criteria

All must hold:

- [ ] The config includes Firefox and WebKit
- [ ] The existing Chromium and mobile coverage still runs
- [ ] `npm test` exits 0 in every configured project
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- A browser failure is caused by a genuine product decision, not a test issue.
- Supporting Firefox or WebKit would require dropping the native dialog behavior or another intentionally chosen feature.
- The matrix becomes too slow only after a real measurement, not just by intuition.

## Maintenance notes

- Any future CSS that relies on newer platform behavior should be checked in all three desktop engines before it lands.
- Keep the browser matrix small unless a failure pattern justifies expanding it further.
