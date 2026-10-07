import { afterEach, expect, test } from "bun:test";
import { cpSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const roots: string[] = [];
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
function fixture() {
  const root = mkdtempSync(join(tmpdir(), "harbor-test-")); roots.push(root);
  cpSync("scripts", `${root}/scripts`, { recursive: true });
  mkdirSync(`${root}/bin`);
  writeFileSync(`${root}/bin/git`, `#!/bin/bash
set -eu
printf '%s\\n' "$*" >> "$GIT_CAPTURE"
if [ "$1" = clone ]; then mkdir -p "$3/.git"; exit; fi
case "$3" in
 remote) echo "https://github.com/smeltery/$2.git" ;;
 status) printf '%s' "\${FAKE_DIRTY:-}" ;;
 symbolic-ref) echo "\${FAKE_BRANCH:-main}" ;;
esac
`, { mode: 0o755 });
  const run = (mode: string, env = {}) => Bun.spawnSync(["bash", "scripts/fleet.sh", mode], { cwd: root, env: { ...process.env, PATH: `${root}/bin:${process.env.PATH}`, GIT_CAPTURE: `${root}/calls`, ...env } });
  const calls = () => readFileSync(`${root}/calls`, "utf8");
  return { root, run, calls };
}
test("setup is idempotent and clones exactly the two members", () => {
  const { run, calls } = fixture();
  expect(run("setup").exitCode).toBe(0);
  expect(run("setup").exitCode).toBe(0);
  expect(calls().match(/clone /g)?.length).toBe(2);
});
test("updates skip dirty worktrees and feature branches", () => {
  const { run, calls } = fixture();
  run("setup");
  expect(run("update", { FAKE_DIRTY: " M README.md" }).exitCode).toBe(0);
  expect(run("update", { FAKE_BRANCH: "feature" }).exitCode).toBe(0);
  expect(calls()).not.toContain("pull");
  expect(run("update").exitCode).toBe(0);
  expect(calls().match(/pull --ff-only/g)?.length).toBe(2);
});
test("rejects unsafe manifest destinations before cloning", () => {
  const { root, run } = fixture();
  writeFileSync(`${root}/scripts/repos.txt`, "smeltery/slipway|../outside\n");
  expect(run("setup").exitCode).toBe(1);
});
