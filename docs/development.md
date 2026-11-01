# Development

Clone the repository, install [Flox](https://flox.dev), then run:

```sh
flox activate -- bun install --frozen-lockfile
flox activate -- bun run check
```

The committed Flox manifest and lock pin Bun, Git, GitHub CLI, ShellCheck,
Actionlint and pre-commit, plus Tart on Apple silicon Macs. Activation sets the repository's `.githooks` path.
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

Run `bun run dev:site` to build and serve the site at `http://127.0.0.1:4173`.
The landing page stays static; the documentation uses pre-rendered React pages
with bundled search, code highlighting and Mermaid diagrams. Fonts are local.
`bun run build:site` produces the complete deployable `dist/site` directory.

The documentation UI reuses Stoke's components and layout with Harbor branding.
Workspace guides live in `docs/`; Slipway and Porthole snapshots live in
`docs/members/`, pinned by `web/docs/snapshots.json`. Refresh them with
`bun run docs:sync`, then review the changes before committing. Builds need no
access to the member repositories. After building, run `bun run check:types`
for the docs UI.

The 2,700-line budget includes the shared documentation UI, search, Markdown
renderer, build tooling and tests. TSX files count toward both source limits.

## Social artwork

`assets/og.svg` is the editable 1200 × 630 share card. Export it at its native
size to `assets/og.png` after artwork changes. The README and site social metadata
use the PNG; the metadata uses its public GitHub URL until a site domain is chosen.
