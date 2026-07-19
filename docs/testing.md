# Testing

The end-to-end suite uses Playwright against a production build served by Vite
Preview.

## Conventions

- Import `test as it` from `@playwright/test`.
- Write cases as `it("should ...", ...)`, including nested cases inside
  `it.describe` blocks.

## Running the suite

Run `npm test`. Playwright's `webServer` configuration builds and previews the
site automatically, so do not hand-start a preview server first unless you are
debugging it.
