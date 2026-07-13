# cb-homepage

Personal single-page portfolio site. Vite + React + TypeScript, hand-written CSS, no CSS framework or UI library.

## Stack

- **Build tool**: Vite (`@vitejs/plugin-react`)
- **UI**: React + TypeScript, JSX
- **Icons**: `lucide-react`
- **Styling**: one global `src/styles/theme.css` (oklch design tokens as CSS custom properties, base element styles) + one CSS Module per component. No Tailwind, no CSS-in-JS.
- **Fonts**: Fraunces Variable (headings/display, `--font-display`) + Karla (body, `--font-body`), self-hosted from `public/fonts/` with explicit `@font-face` rules in `src/styles/theme.css`. Critical fonts are preloaded in `index.html`.
- **Projects layout**: a static 2-column masonry (CSS `columns`, 1-column on mobile) showing all projects at once, sized to each project's own content — no carousel/autoplay, no JS scroll logic.
- **Testing**: Playwright (`tests/*.spec.ts`), run against a production build via `vite preview`, not the dev server.

## Commands

```bash
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # eslint .
npm run lint:css  # stylelint "src/**/*.css"
npm run format    # prettier --write .
npm run format:check  # prettier --check .
npm test          # playwright test (builds + previews automatically)
```

## Development workflow

Follow [`docs/development-workflow.md`](docs/development-workflow.md) for the branch, pull request, CI, and Vercel deployment process. Do not commit or push directly to `main`.

## Project structure

```
index.html                 # Vite entry point, holds <head> (title/meta)
src/
  main.tsx                  # React root, imports theme.css
  App.tsx + App.module.css  # top-level layout composing the sections below
  styles/theme.css          # oklch design tokens + base element styles (global)
  components/
    header/                 # sticky full-width nav + mounts MobileDrawer
    mobile-drawer/           # native <dialog>-based mobile nav
    project-card/            # single project card
    project-section/         # heading + project grid + ProjectCards
    hero-section/            # intro/bio section
    reach-out-section/       # contact section
    shared/                  # TextGradient, GitHubIcon, Tooltip
  data/projects.tsx          # project content (title, description, links)
  hooks/useIsMobile.ts       # matchMedia-based mobile breakpoint hook
tests/                       # Playwright specs (smoke, nav, projects)
```

## Conventions

- One component = one `Component.tsx` + one colocated `Component.module.css`. Reference existing CSS custom properties from `theme.css` (`--primary`, `--secondary`, `--card`, `--foreground`, etc.) rather than hardcoding colors.
- Path alias `@/*` maps to `./src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- No `cn()`/clsx-style helper — conditional class joining is `[a, b].filter(Boolean).join(" ")` inline.
- Interactive widgets favor native platform primitives over libraries: the mobile drawer is a native `<dialog>`, the tooltip is CSS-only (`:hover`/`:focus-within`). Don't reach for a headless-UI library (Radix, Base UI, etc.) for these.
- Font files in `public/fonts/` are deployed as-is by Vite and must keep license provenance current in `public/fonts/LICENSE.md`. If adding, replacing, or removing font files, update that notice with the relevant copyright statements and full license text, and confirm the font license allows self-hosted redistribution.
- Named exports only, exported inline at declaration (`export function Foo() {}`), matching the global TypeScript convention.
- Full-bleed sections: `Header`, `HeroSection`, `ProjectSection`, and `ReachOutSection` each render an outer `.section` (full viewport width, own `background-color`, `min-height: 100svh`) wrapping an inner `.sectionInner`/`.headerInner` (`max-width: 64rem`, centered) — not one shared centered wrapper in `App.tsx`. Section backgrounds alternate between `--background` and `--card` for visual rhythm.

## Testing notes

- Import `test as it` from `@playwright/test` and write cases as `it("should ...", ...)`, including nested cases inside `it.describe` blocks.
- Playwright's `webServer` config builds and previews the site automatically — don't hand-start a preview server before running `npm test` unless debugging.
