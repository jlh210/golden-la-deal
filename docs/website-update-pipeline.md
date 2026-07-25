# Website updates from Slack

Richard or Jackie posts a request in Slack, and it arrives here as a pull
request for review before anything goes live.

```
Slack request
  -> Make.com scenario
  -> repository_dispatch (website_update_request) on this repo
  -> .github/workflows/website-update.yml
  -> Claude Code reads the codebase, makes the edit, opens a PR
  -> Richard + Jackie review and merge
  -> Lovable deploys from main
```

Nothing reaches the live site without a human merging the PR.

## Setup this depends on

1. The Claude GitHub App is installed on this repo.
2. `ANTHROPIC_API_KEY` exists as a repository secret
   (Settings > Secrets and variables > Actions).
3. The workflow job grants three permissions:

   ```yaml
   permissions:
     contents: write # commit the change to a branch
     pull-requests: write # open the PR
     id-token: write # required by claude-code-action
   ```

   `id-token: write` is easy to miss because the other two are the obvious
   ones. It was added in commit 95a6f20; this document landed via the
   diagnostic run that confirmed the pipeline works end to end with it in
   place.

## Notes for whoever maintains this

- Claude Code cannot edit files under `.github/workflows/` from these runs —
  the app token has no `workflow` scope, so a run that tries to change the
  workflow will fail to push. Workflow edits have to be made by hand.
- Requests are handed to Claude Code verbatim, so a vague Slack message
  produces a vague PR. Naming the page or route helps.
- Route files live in `src/routes/` and use TanStack Start file-based
  routing — see `src/routes/README.md` before adding a page.
