# Development workflow

`main` is the production branch and must remain deployable. All changes reach it through a pull request with a green CI quality check; direct pushes are not part of the normal workflow.

## Change flow

1. Create a short-lived branch from the latest `main`, using a descriptive prefix such as `feature/`, `fix/`, or `chore/`.
2. Commit and push the change to that branch.
3. Open a pull request targeting `main`.
4. Use Vercel's automatically created Preview deployment to review the change when useful. A ready Preview does not mean the change has passed CI or is ready for production.
5. Merge only after the GitHub Actions `quality` job passes.
6. Vercel deploys the merged `main` commit to Production immediately. CI does not run a second time on `main`.

## CI quality gate

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs on pull requests and executes:

- TypeScript type checking
- ESLint
- Stylelint
- Prettier's formatting check
- Playwright end-to-end tests against a production build

Fix failures on the pull request branch and push again. Do not bypass or disable a failing check to merge.

## Required GitHub ruleset

Repository settings must enforce the workflow because files in the repository cannot prevent a direct push by themselves. Configure an active branch ruleset targeting `main` with:

- Require a pull request before merging, with zero required approvals for this single-maintainer repository.
- Require the `quality` status check to pass before merging.
- Require the branch to be up to date before merging.
- Block force pushes and branch deletion.
- No routine bypass for the repository owner.

GitHub documents these controls under [available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets).

## Vercel behavior

Keep the repository connected through Vercel's Git integration and configure `main` as the Production Branch:

- Pull request branches receive isolated Preview deployments. These may finish before CI.
- A merge to `main` creates the Production deployment.
- No Vercel access token, deploy hook, or custom GitHub Actions deployment job is required.

See Vercel's documentation for [Git deployments and production branches](https://vercel.com/docs/git).

## Urgent fixes and rollback

Urgent changes still use a small branch and pull request; urgency does not bypass the quality gate. If a production deployment must be removed immediately, roll it back in Vercel first, then revert or fix the commit through the same pull request flow so `main` again matches Production.
