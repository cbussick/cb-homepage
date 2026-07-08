// Single numeric source of truth. CSS media queries can't consume this
// constant directly, so every `@media (min-width|max-width: 768px)` rule
// in *.module.css must hardcode this same literal and reference this file
// in a comment. Update all of them together if this value changes.
export const BREAKPOINT_MD = 768;
export const BREAKPOINT_LG = 1024;
