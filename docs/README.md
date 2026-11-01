# Harbor documentation

Harbor brings Slipway and Porthole into one workspace for Mac app testing. Slipway gives agents their own desktop; Porthole lets you watch the work.

## Assemble your workspace

Clone Harbor and set up the pair. Each tool keeps its own source, history and releases.

```sh
git clone https://github.com/smeltery/harbor.git
cd harbor
bash scripts/fleet.sh setup
```

Setup clones the source repositories. Follow [getting started](getting-started.md) for requirements, then [install Slipway](members/slipway/getting-started.md) and [Porthole](members/porthole/getting-started.md).

## Your first test session

Build your Mac app on your development machine, then send it to the test Mac:

```sh
slipway note 'Testing search'
slipway open build/MyApp.app
slipway ui MyApp
slipway shot MyApp
```

Open Porthole to follow the live screen, agent sessions, command output and screenshots. Porthole observes the target; Slipway controls it.

## The working pair

| Tool | Responsibility | Documentation |
| --- | --- | --- |
| Harbor | Assemble and update the workspace | [Workspace usage](usage.md) |
| Slipway | Launch, inspect and drive Mac app builds | [Command reference](members/slipway/usage.md) |
| Porthole | Watch the screen and follow agent activity | [Session monitor](members/porthole/usage.md) |

## Choose your test Mac

Use a headless macOS VM on an Apple silicon Mac, or connect to an existing remote Mac over SSH. Slipway and Porthole share the same target settings and SSH key.

See [configuration](configuration.md) for VM settings, remote Macs, activity paths and privacy. Local Tart VMs require Apple silicon; Porthole requires macOS 15 or newer.

## Keep your desktop yours

Clicks, keystrokes and screenshots stay on the test Mac. Porthole reads the [shared activity log](architecture.md) and connects each command to the agent and chat that ran it.

Use [workspace updates](usage.md) to keep clean checkouts current, or [troubleshooting](troubleshooting.md) to recover from common failures. For command details and installation, use the Slipway and Porthole sections in the sidebar. Search includes their guides and code examples.

Contributors can follow [development](development.md) for Flox, tests and hooks, and [releases and deployment](releases.md) for CI and website publishing.
