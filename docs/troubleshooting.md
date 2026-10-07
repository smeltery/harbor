# Troubleshooting

| Symptom | Check and recovery |
| --- | --- |
| Flox cannot resolve packages | Check network access, then retry `flox activate -- true`; do not discard the lock to bypass a failure. |
| Hook reports missing modules | Run `flox activate -- bun install --frozen-lockfile`. |
| Tart is missing | Install Tart on an Apple silicon Mac and ensure it is in your PATH. |
| VM does not start | Run `slipway status`, then inspect `~/Library/Logs/slipway.log`. |
| SSH cannot connect | Confirm Remote Login, the selected user, the key and the target address. |
| Screenshot or clicks fail | Grant the guest's SSH session Screen Recording and Accessibility permissions. |
| Porthole shows no activity | Both tools must use the same home directory and `~/.config/slipway/config`. Run `slipway note 'Connectivity check'`. |
| Old screenshot is missing | Images live in `/tmp/slipway`; temporary files may disappear after reboot. Take a new screenshot. |
| Two agents interfere | Pause one session; Porthole detects overlap but does not lock or schedule input. |
| Remote host key changed | Verify the Mac's identity before updating your known-hosts entry. |

Do not delete VM images, keys, configs or another agent's test data as a first
recovery step. To migrate from the upstream tools, use the instructions in
[configuration](configuration.md); the new paths intentionally avoid collisions.
