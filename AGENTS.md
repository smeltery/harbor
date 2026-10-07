# Harbor contributor instructions

Run `flox activate -- bun install --frozen-lockfile`, then
`flox activate -- bun run check` before committing. The same gate runs in CI
and the pre-commit hook. Swift builds require macOS and Xcode 26 or newer.

Keep application behavior covered by tests. Preserve the shared Slipway/Porthole
activity-log schema and SSH settings. The monitor observes; it never drives the VM.
Use conventional commits without attribution footers. Never modify installed
copies or launch test apps on the user's desktop. Keep each source file within
`budget.json`; explain any budget increase in review.

Use Bun for repository tooling, Bash for Slipway and Swift for Porthole.
Keep upstream notices in distributed artifacts and preserve `LICENSE`. Never add credentials, downloaded VM images or runtime logs.
