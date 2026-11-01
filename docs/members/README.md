# Tool documentation snapshots

The Slipway and Porthole guides are copied from their source repositories at
the commits recorded in `web/docs/snapshots.json`. Each snapshot retains its
repository license and upstream provenance guide.

Run `bun run docs:sync` to refresh the guides from each repository's `main`
branch. Review both the documentation changes and pinned revisions together.
The site build uses these committed snapshots without network access.
