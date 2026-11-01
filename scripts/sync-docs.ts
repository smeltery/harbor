import { mkdir } from "node:fs/promises";
import { dirname, posix } from "node:path";
import { members } from "../web/docs/catalog";

async function download(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Documentation download failed (${response.status}): ${url}`);
  return response.text();
}
const snapshots: Record<string, string> = {};
for (const [member, entries] of Object.entries(members)) {
  const repository = `https://github.com/smeltery/${member}`;
  const result = Bun.spawnSync(["git", "ls-remote", `${repository}.git`, "refs/heads/main"]);
  if (result.exitCode) throw new Error(result.stderr.toString());
  const revision = result.stdout.toString().split(/\s/)[0];
  if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error(`Missing main revision for ${member}`);
  snapshots[member] = revision;
  const included = new Set(entries.map(([slug]) => `docs/${slug}.md`));
  const directory = `docs/members/${member}`;
  await mkdir(directory, { recursive: true });
  for (const [slug] of entries) {
    const source = `docs/${slug}.md`;
    const markdown = (await download(`https://raw.githubusercontent.com/smeltery/${member}/${revision}/${source}`)).replace(
      /(\]\()([^\s)]+)(\))/g,
      (match, before, href, after) => {
        if (/^(?:[a-z]+:|#)/i.test(href)) return match;
        const [path, fragment] = href.split("#");
        const target = posix.normalize(posix.join(dirname(source), path));
        if (included.has(target)) return match;
        return `${before}${repository}/blob/${revision}/${target}${fragment ? `#${fragment}` : ""}${after}`;
      },
    );
    await Bun.write(`${directory}/${slug}.md`, markdown.trimEnd() + "\n");
  }
  await Bun.write(`${directory}/LICENSE`, await download(`https://raw.githubusercontent.com/smeltery/${member}/${revision}/LICENSE`));
}
await Bun.write("web/docs/snapshots.json", JSON.stringify(snapshots, null, 2) + "\n");
console.log("Synced member documentation and licenses at pinned commits.");
