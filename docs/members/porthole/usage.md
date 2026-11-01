# Using Porthole

The Live view refreshes the target's screen while the window is visible. Recent
agent sessions show their first prompt, latest note and current command.
An overlap warning appears when sessions share the desktop; it is advisory.

Select a chat to see its timeline, or an app to see who deployed its latest
build. Search across commands. Select a command to inspect its original command
line, output, screenshot and agent identity. Missing temporary screenshots have
a placeholder instead of failing the timeline.

Cursor, Codex and Claude Code sessions are recognized from Slipway metadata and
local transcript files. Terminal commands are shown as user activity.

Use the app menu to reload, toggle screen refresh, reveal the activity log or
check for updates. Updates download only when requested; automatic checks can
be disabled in [configuration](configuration.md#privacy).

Porthole reads local logs and uses SSH for screenshots and running-app discovery.
It never sends clicks, types, launches apps or starts/stops the VM.
