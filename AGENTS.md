# cb-homepage

Personal single-page portfolio site. Vite + React + TypeScript, hand-written CSS, no CSS framework or UI library.

This file keeps the project context needed for most tasks inline. Before starting
work, read any task-specific document below that applies and follow its
instructions throughout the task.

- [Development workflow](docs/development-workflow.md): before creating branches, committing, opening pull requests, or changing CI and deployment
- [Testing](docs/testing.md): when adding or changing tests, modifying user-visible behavior, or running the end-to-end suite
- [Font maintenance](docs/font-maintenance.md): before adding, replacing, or removing font files

## Architecture

- The site is a Vite-built React and TypeScript single-page application.
- Styling uses one global `src/styles/theme.css` for oklch design tokens and base element styles, plus one CSS Module per component. Do not add Tailwind, CSS-in-JS, or a UI library.
- Fraunces Variable (`--font-display`) and Karla (`--font-body`) are self-hosted from `public/fonts/`.
- Projects use a static two-column CSS masonry layout, collapsing to one column on mobile. Show every project at once and size each card to its content; do not introduce a carousel, autoplay, or JavaScript scroll logic.

## Verification

`package.json` is the source of truth for available scripts. Run checks
proportionate to the change:

- TypeScript or TSX: `npm run typecheck` and `npm run lint`
- CSS: `npm run lint:css`
- Any formatted file: `npm run format:check`
- User-visible behavior: `npm test`
- Build or Vite configuration: `npm run build`

Before opening a pull request, run the complete CI quality gate described in the
development workflow.

## Key locations

- `src/styles/theme.css`: global design tokens and base styles
- `src/components/`: section and shared UI components
- `src/data/projects.tsx`: portfolio project content
- `src/styles/`: shared styling utilities
- `tests/`: Playwright end-to-end tests

## Conventions

- One component = one `Component.tsx` + one colocated `Component.module.css`. Reference existing CSS custom properties from `theme.css` (`--primary`, `--secondary`, `--card`, `--foreground`, etc.) rather than hardcoding colors.
- Use the `@/*` alias for imports across source directories.
- Use `lucide-react` for icons.
- No `cn()`/clsx-style helper — conditional class joining is `[a, b].filter(Boolean).join(" ")` inline.
- Interactive widgets favor native platform primitives over libraries: the mobile drawer is a native `<dialog>`, the tooltip is CSS-only (`:hover`/`:focus-within`). Don't reach for a headless-UI library (Radix, Base UI, etc.) for these.
- Full-bleed sections: `Header`, `HeroSection`, `ProjectSection`, and `ReachOutSection` each render an outer `.section` (full viewport width, own `background-color`, `min-height: 100svh`) wrapping an inner `.sectionInner`/`.headerInner` (`max-width: 64rem`, centered) — not one shared centered wrapper in `App.tsx`. Section backgrounds alternate between `--background` and `--card` for visual rhythm.
