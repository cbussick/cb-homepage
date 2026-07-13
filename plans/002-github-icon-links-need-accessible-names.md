# Plan 002: Give GitHub icon links explicit accessible names

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report - do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat c3fe108..HEAD -- src/components/header/Header.tsx src/components/project-card/ProjectCard.tsx src/components/shared/GitHubIcon.tsx tests/nav.spec.ts tests/projects.spec.ts`
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

Two GitHub links are currently icon-only. The hover tooltip is visual only, so assistive tech has no reliable accessible name for those links. Fixing the shared icon pattern and the two call sites at once keeps the site consistent and avoids papering over one location while leaving the other broken.

## Current state

- `src/components/header/Header.tsx:35-44` wraps the GitHub icon in a tooltip, but the tooltip is not associated with the anchor's accessible name.
- `src/components/project-card/ProjectCard.tsx:79-87` renders a GitHub icon link with no visible text at all.
- `src/components/shared/GitHubIcon.tsx:9-17` sets `role="img"` on the SVG but provides no title or label.
- `src/components/mobile-drawer/MobileDrawer.tsx:77-87` shows the repo's existing named-link pattern: icon plus visible text. Use that as the accessibility model, not the tooltip.

## Commands you will need

| Purpose                | Command                                                | Expected on success |
| ---------------------- | ------------------------------------------------------ | ------------------- |
| Run the targeted specs | `npm test -- tests/nav.spec.ts tests/projects.spec.ts` | exit 0              |
| Lint the JSX changes   | `npm run lint`                                         | exit 0              |

## Scope

**In scope**:

- `src/components/header/Header.tsx`
- `src/components/project-card/ProjectCard.tsx`
- `src/components/shared/GitHubIcon.tsx`
- `tests/nav.spec.ts`
- `tests/projects.spec.ts`

**Out of scope**:

- Any redesign of the tooltip component.
- Any text copy change beyond the accessible labels needed for the links.
- Any layout or spacing change.

## Steps

### Step 1: Make the icon decorative and move the accessible name to the anchors

Update `GitHubIcon` so the raw SVG is decorative by default. The recommended shape is `aria-hidden="true"` and `focusable="false"`, with no `role="img"`. Then add explicit `aria-label` values to the two icon-only links:

- `Header.tsx` should keep the visible tooltip text and label the link itself as `Me on GitHub`.
- `ProjectCard.tsx` should label each repo link with the project title, for example `View DiNAs Lab GitHub repository`.

Do not rely on the tooltip to supply the accessible name.

**Verify**: `npm run lint` -> exit 0.

### Step 2: Add regression assertions for both link types

Extend the Playwright coverage so the accessible names are part of the contract:

- In `tests/nav.spec.ts`, assert the header GitHub link by role/name.
- In `tests/projects.spec.ts`, assert one project-card GitHub link by role/name, using the project title in the accessible name.

Keep the existing nav and project assertions in place.

**Verify**: `npm test -- tests/nav.spec.ts tests/projects.spec.ts` -> exit 0.

## Test plan

- `tests/nav.spec.ts` should prove the header GitHub link has the expected accessible name.
- `tests/projects.spec.ts` should prove at least one project-card GitHub link has the expected accessible name.

## Done criteria

All must hold:

- [ ] Both GitHub link call sites have explicit accessible names
- [ ] `GitHubIcon` is decorative rather than a standalone, unnamed image
- [ ] The targeted Playwright specs pass
- [ ] `npm run lint` exits 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back if:

- You cannot make the icon decorative without breaking another visible affordance.
- The project-card link name would become misleading or duplicate text already visible to users.
- The verification fails twice after a reasonable fix attempt.

## Maintenance notes

- Any future icon-only link should follow the same pattern: the anchor gets the accessible name, the SVG stays decorative.
- If another icon needs to be announced on its own, give that SVG its own title instead of reusing this pattern blindly.
