# Getting started

Local VMs require an Apple silicon Mac and [Tart](https://tart.run). Reserve
roughly 25 GB for the base image plus working disk space. The Flox environment includes Tart on Apple silicon; activate it before using
Slipway. If you prefer a standalone installation, install Tart with:

```sh
brew install cirruslabs/cli/tart
```

Install Slipway from source without needing Bun at runtime:

```sh
git clone https://github.com/smeltery/slipway.git
cd slipway
mkdir -p "$HOME/.local/bin"
install -m 755 slipway "$HOME/.local/bin/slipway.new"
mv "$HOME/.local/bin/slipway.new" "$HOME/.local/bin/slipway"
```

Put `~/.local/bin` in your PATH. The rename safely replaces an installed script
that another shell might be reading. Release assets provide the same executable
and a tarball with docs, licenses and the agent skill.

```sh
slipway setup
slipway note 'First test run'
slipway open build/MyApp.app
slipway ui MyApp
slipway shot MyApp
```

Setup downloads a macOS image, adds an SSH key, installs guest `cliclick` and
configures permissions. It changes the guest and installs a launch agent on the
host. Review [configuration](configuration.md) before setup. App builds must
support the guest's architecture and macOS version.

Install [Porthole](https://github.com/smeltery/porthole) to watch activity. For
agents, copy `skills/slipway` into the agent's skill directory and instruct it to
use Slipway whenever it tests Mac apps. Bun is only needed for development.
