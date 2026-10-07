# Using the workspace

```sh
bash scripts/fleet.sh setup
bash scripts/fleet.sh update
```

Setup clones missing members. Update clones missing members and fast-forwards
clean checkouts on `main`. Dirty worktrees, feature branches and detached HEADs
are skipped with a message. Diverged branches fail instead of being reset.
Unexpected remotes and invalid paths are rejected.

The manifest `scripts/repos.txt` is the source of truth: `owner/repo|directory`.
Commit tool changes inside the tool's own repository; commit workspace changes
in Harbor. Harbor does not vendor application code or pin member commits.

A daily testing flow is:

1. Build your `.app` on your development Mac.
2. Run `slipway note 'Testing search'` and `slipway open build/MyApp.app`.
3. Inspect controls with `slipway ui MyApp` and capture `slipway shot MyApp`.
4. Use Porthole to inspect the agent session, command output and screenshots.
