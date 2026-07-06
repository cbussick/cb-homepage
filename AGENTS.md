# cb-homepage

Personal single-page portfolio site. Vite + React + TypeScript, hand-written CSS, no CSS framework or UI library.

## Stack

- **Build tool**: Vite (`@vitejs/plugin-react`)
- **UI**: React + TypeScript, JSX
- **Icons**: `lucide-react`
- **Styling**: one global `src/styles/theme.css` (oklch design tokens as CSS custom properties, base element styles) + one CSS Module per component. No Tailwind, no CSS-in-JS.
- **Carousel**: `embla-carousel-react` + `embla-carousel-autoplay` — kept deliberately; do not replace with a hand-rolled scroll implementation (see below).
- **Testing**: Playwright (`tests/*.spec.ts`), run against a production build via `vite preview`, not the dev server.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # eslint .
npm run format    # prettier --write .
npm run format:check  # prettier --check .
npm test          # playwright test (builds + previews automatically)
```

## Project structure

```
index.html                 # Vite entry point, holds <head> (title/meta/font link)
src/
  main.tsx                  # React root, imports theme.css
  App.tsx + App.module.css  # top-level layout composing the sections below
  styles/theme.css          # oklch design tokens + base element styles (global)
  components/
    header/                 # desktop nav + mounts MobileDrawer
    mobile-drawer/           # native <dialog>-based mobile nav
    carousel/                # Embla-based project carousel
    project-card/            # single project card
    project-section/         # heading + Carousel + ProjectCards
    hero-section/            # intro/bio section
    reach-out-section/       # contact section
    shared/                  # TextGradient, GitHubIcon, Tooltip
  data/projects.tsx          # project content (title, description, links)
  hooks/useIsMobile.ts       # matchMedia-based mobile breakpoint hook
tests/                       # Playwright specs (smoke, nav, carousel)
```

## Conventions

- One component = one `Component.tsx` + one colocated `Component.module.css`. Reference existing CSS custom properties from `theme.css` (`--primary`, `--secondary`, `--card`, `--foreground`, etc.) rather than hardcoding colors.
- Path alias `@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- No `cn()`/clsx-style helper — conditional class joining is `[a, b].filter(Boolean).join(" ")` inline.
- Interactive widgets favor native platform primitives over libraries: the mobile drawer is a native `<dialog>`, the tooltip is CSS-only (`:hover`/`:focus-within`). Don't reach for a headless-UI library (Radix, Base UI, etc.) for these.
- Named exports only, exported inline at declaration (`export function Foo() {}`), matching the global TypeScript convention.

## Testing notes

- Import `test as it` from `@playwright/test` and write cases as `it("should ...", ...)`, including nested cases inside `it.describe` blocks.
- Playwright's `webServer` config builds and previews the site automatically — don't hand-start a preview server before running `npm test` unless debugging.
- The carousel's animation is transform-based (Embla); prefer polling the actual DOM state (e.g. a `data-testid` on the track element) over `toBeInViewport()` for asserting which slide is active — the latter has shown timing-related flakiness against this structure.
