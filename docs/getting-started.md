# Getting started

Harbor needs Git and Bash to assemble the workspace. Testing locally requires an
Apple silicon Mac, Tart, enough storage for a macOS image (roughly 25 GB before
VM growth), and a Mac app build. Porthole requires macOS 15 or newer.

```sh
git clone https://github.com/smeltery/harbor.git
cd harbor
bash scripts/fleet.sh setup
```

This clones `slipway/` and `porthole/` as independent repositories. Re-running
setup preserves existing work. Member directories are ignored by Harbor's Git.

Continue with [Slipway installation](members/slipway/getting-started.md)
and [Porthole installation](members/porthole/getting-started.md).
For contributor tooling, use [Flox](development.md).
