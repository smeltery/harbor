import { $ } from "bun";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { lint } from "markdownlint/promise";
import { parseHTML } from "linkedom";
const files = (await $`git ls-files --cached --others --exclude-standard -- '*.md'`.text()).trim().split("\n").filter(Boolean);
const results = await lint({ files, config: { default: true, MD013: false, MD033: false, MD041: false, MD060: false } });
const errors = Object.entries(results).filter(([, issues]) => issues.length);
if (errors.length) throw new Error(JSON.stringify(errors, null, 2));
const { window } = parseHTML("<html><body></body></html>");
Object.assign(globalThis, { window, document: window.document, DOMParser: window.DOMParser, navigator: window.navigator });
const mermaid = (await import("mermaid")).default;
mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
let diagrams = 0;
for (const file of files) {
  const text = await Bun.file(file).text();
  for (const [, diagram] of text.matchAll(/^```mermaid\s*\n([\s\S]*?)^```\s*$/gm)) {
    try { await mermaid.parse(diagram); } catch (error) { throw new Error(`${file}: ${error}`); }
    diagrams++;
  }
  const prose = text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "");
  for (const [, link] of prose.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (/^(?:[a-z]+:|#)/i.test(link)) continue;
    const target = resolve(dirname(file), decodeURIComponent(link.split("#")[0]));
    if (!existsSync(target)) throw new Error(`${file}: broken local link ${link}`);
  }
}
if (!diagrams) throw new Error("Expected at least one Mermaid diagram");
console.log(`Validated ${files.length} Markdown files and ${diagrams} Mermaid diagrams`);
