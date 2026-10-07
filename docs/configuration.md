# Configuration

Slipway and Porthole share `~/.config/slipway/config`. For settings both tools
read, use literal `KEY=value` lines, optionally single- or double-quoted, with
comments on separate lines. Do not use variable interpolation, `export`, shell
commands or inline comments in shared settings. Slipway sources this trusted
local file as shell; Porthole parses literal values only.

```sh
VM=slipway
VM_IMAGE=ghcr.io/cirruslabs/macos-sequoia-base:latest
VM_CPUS=4
VM_MEMORY=8192
VM_DISPLAY=1512x982
TEST_HOST=
TEST_USER=admin
```

`VM`, `TEST_HOST`, `TEST_USER` and `KEY` affect both tools. `KEY` must be an
absolute path; its default is `~/.ssh/slipway_ed25519` under your home directory.
Image, CPU, memory and display settings configure new VMs during `slipway setup`.
To resize an existing VM, stop it first and use `tart set`.

For a real remote Mac, set `TEST_HOST=mini.local` and `TEST_USER=your-user`.
Enable Remote Login on that Mac, authorize Slipway's public key and install
`cliclick` there. Grant SSH the Screen Recording and Accessibility permissions
needed by your workflow. An interactive desktop session must be logged in.
Remote mode does not create, start or stop a Tart VM.

| Purpose | Path |
| --- | --- |
| Configuration | `~/.config/slipway/config` |
| SSH private key | `~/.ssh/slipway_ed25519` |
| Activity events | `~/Library/Logs/slipway/activity.jsonl` |
| Captured command output | `~/Library/Logs/slipway/runs/<id>.txt` |
| Screenshots | `/tmp/slipway` |
| Shared SSH socket | `/tmp/slipway-ssh-%C` |
| VM launch agent | `~/Library/LaunchAgents/io.smeltery.slipway.plist` |

## Migration

The ports use new paths and a new default VM name. They do not overwrite the
upstream tools. To reuse an existing `mac-test` VM, set `VM=mac-test` and set
`KEY` to the absolute path of its authorized key. Stop its previous launch agent
before starting it through Slipway; never run two controllers for one VM.
Copy only settings you understand. Keep historical logs separate if their
screenshot or output paths still reference the old locations.

## Privacy

Activity logs can contain command arguments, typed text, AppleScript and output.
Porthole also reads the first prompt from supported local agent transcripts.
Keep credentials out of test commands. Neither tool uploads this history.
Porthole contacts GitHub for update checks; SSH connects to the configured Mac.
Disable automatic update checks with:

```sh
defaults write io.smeltery.porthole AppUpdaterAutomaticChecks -bool false
```
