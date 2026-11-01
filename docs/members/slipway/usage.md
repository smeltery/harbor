# Command reference

| Command | Behavior |
| --- | --- |
| `open <App.app> [args]` | Copy a build, replace the running copy, launch and wait for its window. |
| `open <Name>` | Relaunch a previously copied app. |
| `install <App.app>` | Copy a build without launching it. |
| `shot [Name] [out.png]` | Capture the screen or the named app's front window. |
| `ui <Name>` | List controls, labels and click coordinates. |
| `click <x> <y>` | Click at screen coordinates in points. |
| `type <text>` | Type into the frontmost app. |
| `key <combo>` | Send `cmd+n`, `cmd+shift+s`, `return`, `esc` or arrow keys. |
| `script [args]` | Read AppleScript from stdin and execute it remotely. |
| `quit <Name>` | Quit the selected app. |
| `logs <Name>` | Print the app's captured stdout/stderr. |
| `push <local> [remote]` | Copy files or folders into the target. |
| `pull <remote> [local]` | Copy files out of the target. |
| `run <command>` | Run a shell command over SSH. |
| `ssh` | Open an interactive SSH session. |
| `start`, `stop`, `status` | Manage or inspect the VM. |
| `setup` | Download and configure the guest. |
| `note <text>` | Add test intent to Porthole's session view. |
| `capabilities [--json]` | Print agent-oriented capabilities. |
| `help`, `--version` | Print help or version without contacting the VM. |

Commands that need the VM start it automatically. Read `ui` before choosing
coordinates; window placement changes. Use `note` at the start of every task.
Do not run concurrent click/type/key sessions against the same desktop.

```sh
slipway note 'Checking search results'
slipway open build/MyApp.app
slipway ui MyApp
slipway click 300 120
slipway type 'release'
slipway key return
slipway shot MyApp
```

Exit status preserves remote command failures. Logs are best-effort and must not
change the result of the test command. Scripts and output can include sensitive
content; see [privacy](configuration.md#privacy).
