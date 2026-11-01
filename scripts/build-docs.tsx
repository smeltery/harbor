import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { workspace, members } from "../web/docs/catalog";
import { parsePage } from "../web/docs/parse";
import snapshots from "../web/docs/snapshots.json";

const entries: { path: string; file: string; title: string; group: string; repo: string; ref: string; original: string }[] = workspace.map(([path, file, title, group]) => ({ path, file, title, group, repo: "harbor", ref: "main", original: file }));
for (const [member, docs] of Object.entries(members)) {
  for (const [slug, title] of docs) entries.push({
    path: `/docs/${member}/${slug}`, file: `docs/members/${member}/${slug}.md`, title,
    group: member === "porthole" ? "Porthole" : "Slipway", repo: member,
    ref: snapshots[member as keyof typeof snapshots], original: `docs/${slug}.md`,
  });
}
const routes = new Map(entries.map((entry) => [resolve(entry.file), entry.path]));
const pages = await Promise.all(entries.map(async (entry) => parsePage({
  ...entry, markdown: await Bun.file(entry.file).text(),
  source: `https://github.com/smeltery/${entry.repo}/blob/${entry.ref}/${entry.original}`,
  edit: `https://github.com/smeltery/${entry.repo}/edit/main/${entry.original}`,
}, routes)));
await Bun.write("web/docs/content.generated.json", JSON.stringify(pages));
await mkdir("dist/site/assets/docs-licenses", { recursive: true });
for (const member of Object.keys(members)) await cp(`docs/members/${member}/LICENSE`, `dist/site/assets/docs-licenses/${member}.txt`);
const { renderToString } = await import("react-dom/server");
const { Docs } = await import("../web/docs/Docs");
const result = await Bun.build({
  entrypoints: ["web/docs/main.tsx"], outdir: "dist/site/assets/docs", target: "browser",
  minify: true, splitting: true, naming: { entry: "[name].[ext]", chunk: "[name]-[hash].[ext]" },
  define: { "process.env.NODE_ENV": '"production"' },
});
if (!result.success) throw new AggregateError(result.logs, "Documentation bundle failed");
const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const page of pages) {
  const directory = `dist/site${page.path}`;
  await mkdir(directory, { recursive: true });
  await Bun.write(`${directory}/index.html`, `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(page.title)} — Harbor documentation</title><meta name="description" content="${escape(page.description)}">
<meta name="theme-color" content="#FAF8F3"><link rel="canonical" href="https://harbor-topaz.vercel.app${page.path}/">
<meta property="og:title" content="${escape(page.title)} — Harbor documentation"><meta property="og:description" content="${escape(page.description)}">
<meta property="og:image" content="https://harbor-topaz.vercel.app/assets/og.png">
<link rel="icon" href="/assets/logo.svg"><link rel="stylesheet" href="/assets/docs-brand.css"><link rel="stylesheet" href="/assets/docs/main.css">
<script src="/assets/docs/main.js" type="module"></script></head><body><div id="docs-root">${renderToString(<Docs path={page.path} />)}</div></body></html>`);
}
console.log(`Built ${pages.length} searchable, server-rendered documentation pages.`);
