# <img src="assets/logo.svg" width="36" height="36" alt="" /> Harbor

**A quiet workspace for Mac app testing.**

[![CI](https://github.com/smeltery/harbor/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/harbor/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/harbor)](https://github.com/smeltery/harbor/releases)
[![Bash](https://img.shields.io/badge/Bash-native-4c766b?logo=bash)](docs/development.md)
[![Bun](https://img.shields.io/badge/Bun-tooling-282a36?logo=bun)](package.json)
[![Flox](https://img.shields.io/badge/Flox-reproducible-845ef7)](.flox/env/manifest.toml)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-blue)](LICENSE)

Harbor brings Slipway and Porthole together: isolated app testing for agents, with a native window into their work.

```sh
git clone https://github.com/smeltery/harbor.git
cd harbor
bash scripts/fleet.sh setup
```

[Install and start](docs/getting-started.md) · [Documentation](docs/README.md) ·
[Website](https://smeltery.github.io/harbor/) · [Releases](https://github.com/smeltery/harbor/releases)

Each tool stays in its own repository: [Slipway](https://github.com/smeltery/slipway)
and [Porthole](https://github.com/smeltery/porthole). Harbor clones and updates both.

Licensed under the exact [Smeltery Hab license](LICENSE).
