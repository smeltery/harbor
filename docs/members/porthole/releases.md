# Releases and websites

Hab's automatic release flow runs after the `ci` workflow succeeds on a push to
`main`. It checks out that successful commit, reuses an existing semantic tag or
increments the latest patch version (starting at `v0.1.0`), then explicitly
dispatches `release.yml`. This avoids the GitHub token restriction that prevents
a pushed tag from triggering another workflow. Pull requests cannot cut releases.

The release workflow validates the tag, builds from that exact tag, and publishes
artifacts plus SHA-256 checksums. A failed release can be retried through workflow
dispatch with the same tag. Auto-release concurrency serializes tag creation.

Porthole distributes a universal Apple silicon/Intel ZIP. The release tag stamps
both the app's compiled version and its bundle metadata, keeping the updater
consistent. The app checks `smeltery/porthole` for updates; downloads must match
the GitHub digest, bundle identifier, version and a valid code signature.

CI uses ad-hoc signing. These builds are **not notarized**. For distribution with
your Developer ID, set `SIGNING_IDENTITY` to an installed certificate and
`NOTARY_PROFILE` to your stored notarytool profile, then run
`scripts/build-release.sh`. Never commit certificates or credentials.

A downloaded ad-hoc build may be blocked by Gatekeeper. Review its source and
checksums before allowing it in System Settings → Privacy & Security. Building
locally with `scripts/build-app.sh` is another option. No upstream developer's
signing identity is used.

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
