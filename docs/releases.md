# Releases and websites

Hab's automatic release flow runs after the `ci` workflow succeeds on a push to
`main`. It checks out that successful commit, reuses an existing semantic tag or
increments the latest patch version (starting at `v0.1.0`), then explicitly
dispatches `release.yml`. This avoids the GitHub token restriction that prevents
a pushed tag from triggering another workflow. Pull requests cannot cut releases.

The release workflow validates the tag, builds from that exact tag, and publishes
artifacts plus SHA-256 checksums. A failed release can be retried through workflow
dispatch with the same tag. Auto-release concurrency serializes tag creation.

Harbor distributes its workspace scripts, documentation and license as a tarball.

## Website deployment

The landing site is ready for Vercel. Import this repository as a separate
Vercel project with the repository root as its Root Directory. The committed
`vercel.json` selects the Other framework preset, skips dependency installation,
copies the static site and brand assets, and publishes `dist/site`.
No Bun, Swift or Flox installation is needed on the Vercel builder.

Deployment is managed by the repository owner in Vercel. GitHub Actions only
validates the site; it does not deploy it. Once domains are assigned, update
repository homepages and the family links in `site/index.html`. Those links
currently point to each tool's GitHub repository.

See [Vercel's static configuration reference](https://vercel.com/docs/project-configuration/vercel-json).
