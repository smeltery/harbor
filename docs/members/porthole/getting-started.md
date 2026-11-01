# Getting started

Porthole runs on macOS 15 or newer, on Apple silicon or Intel. A local Tart VM
requires Apple silicon; Intel Macs can observe an existing remote Mac instead.
Install and configure [Slipway](https://github.com/smeltery/slipway) first.

Download the ZIP from [releases](https://github.com/smeltery/porthole/releases),
unzip it and move `Porthole.app` to your Applications folder. CI builds are
ad-hoc signed, not notarized; see [signing and Gatekeeper](releases.md).

To build yourself, install Xcode 26+ and Flox:

```sh
git clone https://github.com/smeltery/porthole.git
cd porthole
flox activate -- bun install --frozen-lockfile
flox activate -- bun run check
```

The universal app is written to `dist/Porthole.app`. Launch it yourself when you
are ready, then run `slipway note 'First Porthole session'`. Its live view shows
the configured target and recent activity. The app never starts or drives a VM.
