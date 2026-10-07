# Development

Clone the repository, install [Flox](https://flox.dev), then run:

```sh
flox activate -- bun install --frozen-lockfile
flox activate -- bun run check
```

The committed Flox manifest and lock pin Bun, Git, GitHub CLI, ShellCheck,
Actionlint and pre-commit. Activation sets the repository's `.githooks` path.
The hook runs the complete CI gate. Alternatively run
`flox activate -- pre-commit run --all-files` using the included configuration.
Install dependencies before your first commit. Updating dependencies means
reviewing both `bun.lock` and `.flox/env/manifest.lock`.

The gate validates Markdown, parses every Mermaid block, checks local document
links, enforces `budget.json`, lints shell and Actions, runs tests and builds the
static site.

`budget.json` caps the total maintained code and individual source files.
Generated assets, dependencies and documentation prose do not count. Existing
large upstream files have explicit ceilings; do not split or compress code just
to evade review. Prefer deleting duplication before increasing a budget.

The test suites use fixtures and do not start VMs or interact with your desktop.
Real VM verification is a separate, opt-in integration step: create a disposable
VM, launch a sample build, list its controls, screenshot it, and confirm the run
appears in Porthole. Never capture private desktop content for site artwork.

Run `bun run build:site` to produce `dist/site`. Serve that directory with any
static HTTP server. The site has no framework, external fonts or runtime service.
