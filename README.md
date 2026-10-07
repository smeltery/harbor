# <img src="assets/logo.svg" width="36" height="36" alt="" /> harbor

[![CI](https://github.com/smeltery/harbor/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/harbor/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/harbor)](https://github.com/smeltery/harbor/releases)
[![Bash](https://img.shields.io/badge/Bash-native-4c766b?logo=bash)](docs/development.md)
[![Bun](https://img.shields.io/badge/Bun-tooling-282a36?logo=bun)](package.json)
[![Flox](https://img.shields.io/badge/Flox-reproducible-845ef7)](.flox/env/manifest.toml)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-blue)](LICENSE)

Harbor is the home of Smeltery's Mac app testing tools: one workspace that
clones, sets up and updates the whole family.

Each tool has its own repository and releases. [Slipway](https://github.com/smeltery/slipway)
gives coding agents a headless Mac for testing. [Porthole](https://github.com/smeltery/porthole)
shows the live screen, agent sessions and command history. Harbor brings them
together without taking over your desktop.

## Documentation

See [docs/](docs/README.md) for installation, usage, configuration and architecture.
The [development guide](docs/development.md) covers Flox, contribution checks and
pre-commit hooks. Agent instructions live in [AGENTS.md](AGENTS.md).

## Quick setup

```sh
git clone https://github.com/smeltery/harbor.git
cd harbor
bash scripts/fleet.sh setup
```

Setup is idempotent: existing repositories stay in place, and missing members
are cloned. Follow the [getting-started guide](docs/getting-started.md) to
configure your first test VM.

## Updating

```sh
cd harbor
bash scripts/fleet.sh update
```

Updates fast-forward clean checkouts on `main`. Worktrees with uncommitted changes,
feature branches and detached HEADs are skipped. See [workspace usage](docs/usage.md).

## Directory structure

The member directories are cloned at setup time and are not tracked by Harbor.

```text
harbor/
├── assets/             # Shared family logos
├── docs/               # User and contributor documentation
├── scripts/            # Setup, update and quality checks
│   ├── repos.txt       # Fleet manifest
│   └── fleet.sh        # Workspace setup and update commands
├── site/               # Landing site, ready for Vercel
├── tests/              # Workspace behavior tests
├── slipway/            # Headless Mac app testing CLI
└── porthole/           # Native test-session monitor
```

## Repositories

| Logo | Repository | What it does |
| --- | --- | --- |
| <img src="assets/slipway.svg" width="24" height="24" alt="Slipway" /> | [slipway](https://github.com/smeltery/slipway) | Launch, inspect and drive Mac app builds in a headless VM or remote Mac. |
| <img src="assets/porthole.svg" width="24" height="24" alt="Porthole" /> | [porthole](https://github.com/smeltery/porthole) | Watch the live screen and follow each agent's commands, output and screenshots. |

[`scripts/repos.txt`](scripts/repos.txt) is the source of truth for the fleet.

## License

Licensed under [PolyForm Shield 1.0.0](LICENSE).
