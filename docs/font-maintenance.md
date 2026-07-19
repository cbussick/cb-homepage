# Font maintenance

Fraunces Variable and Karla are self-hosted from `public/fonts/`. Their explicit
`@font-face` rules live in `src/styles/theme.css`, and critical font files are
preloaded in `index.html`.

Font files are deployed as-is by Vite. Before adding, replacing, or removing a
font file:

1. Confirm that its license permits self-hosted redistribution.
2. Update `public/fonts/LICENSE.md` with the relevant copyright statements and
   full license text.
3. Keep the `@font-face` rules and critical preloads synchronized with the files
   that remain in `public/fonts/`.
