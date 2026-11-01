import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseHTML } from "linkedom";
import { parsePage } from "../web/docs/parse";
import { searchPages } from "../web/docs/search/index";
import { pageMarkdown } from "../web/docs/actions/markdown";
import type { DocNode, DocPage } from "../web/docs/model";
import { highlightCode } from "../web/docs/rendering/highlight";

function parse(markdown: string, routes = new Map<string, string>()) {
  return parsePage({
    path: "/docs/example", file: "docs/example.md", title: "Example", group: "Workspace",
    source: "https://github.com/smeltery/harbor/blob/main/docs/example.md",
    edit: "https://github.com/smeltery/harbor/edit/main/docs/example.md", markdown,
  }, routes);
}
const flatten = (nodes: DocNode[]): DocNode[] => nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);

test("code highlighting covers guide languages and escapes plain text", () => {
  for (const [label, code] of [
    ["Terminal", 'export IMAGE="ghcr.io/smeltery/porthole:latest"'],
    ["yaml", "runner:\n  enabled: true"], ["json", '{"enabled":true}'],
  ]) {
    const html = highlightCode(code, label);
    const { document } = parseHTML(`<html><body><code>${html}</code></body></html>`);
    expect(document.querySelector('[class^="hljs-"]'), label).toBeTruthy();
    expect(document.querySelector("code")!.textContent).toBe(code);
  }
  expect(highlightCode("<script>alert(1)</script>", "text")).toBe("&lt;script&gt;alert(1)&lt;/script&gt;");
});

test("Markdown retains nested code, tables, all sections and stable heading anchors", () => {
  const page = parse('# Example\n\nIntroduction.\n\n## First\n\n- Item\n\n  ```sh\n  echo test\n  ```\n\n## First\n\n| Key | Value |\n| :-- | --: |\n| one | two |\n\n## Last\n\nLast section.');
  expect(page.description).toBe("Introduction.");
  expect(page.sections.map((section) => section.id)).toEqual(["first", "first-1", "last"]);
  expect(flatten(page.sections[0].nodes).some((node) => node.code === "echo test")).toBe(true);
  expect(flatten(page.sections[1].nodes).some((node) => node.tag === "table")).toBe(true);
  expect(page.sections[2].paragraphs.join(" ")).toContain("Last section.");
});

test("local documentation links resolve to site routes and raw HTML stays escaped", () => {
  const page = parse('# Example\n\nIntroduction.\n\n## Links\n\n[Install](getting-started.md#install)\n\n<script>alert(1)</script>', new Map([[resolve("docs/getting-started.md"), "/docs/getting-started"]]));
  const html = flatten(page.sections.flatMap((section) => section.nodes)).map((node) => node.html ?? "").join("");
  expect(html).toContain('href="/docs/getting-started/#install"');
  expect(html).not.toContain("<script>");
  expect(html).toContain("&lt;script&gt;");
  expect(pageMarkdown(page)).toContain("https://harbor-topaz.vercel.app/docs/getting-started/#install");
});

test("search finds content and command flags, with anchors into the matching section", () => {
  const page = parse('# Example\n\nMac app testing.\n\n## Preview\n\n```sh\nslipway wait MyApp --text Ready\n```');
  const result = searchPages([page], "--text");
  expect(result[0].href).toBe("/docs/example#preview");
  expect(result[0].excerpt).toContain("--text");
  expect(searchPages([page], "no-such-command")).toEqual([]);
});

test("all generated pages have content, unique anchors, working local links and assets", () => {
  const pages = JSON.parse(readFileSync("web/docs/content.generated.json", "utf8")) as DocPage[];
  expect(pages.length).toBe(24);
  const documents = new Map(pages.map((page) => [page.path, parseHTML(readFileSync(`dist/site${page.path}/index.html`, "utf8")).document]));
  for (const page of pages) {
    const document = documents.get(page.path)!;
    expect(document.querySelector("h1")?.textContent, page.path).toBeTruthy();
    expect(document.querySelector("title")?.textContent).toContain(page.title);
    const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
    expect(new Set(ids).size, `${page.path}: duplicate IDs`).toBe(ids.length);
    for (const element of document.querySelectorAll("[href], [src]")) {
      const href = element.getAttribute("href") ?? element.getAttribute("src")!;
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const url = new URL(href, `https://example.com${page.path}/`);
      if (url.pathname.startsWith("/docs")) {
        const target = documents.get(url.pathname.replace(/\/$/, ""));
        expect(target, `${page.path}: ${href}`).toBeTruthy();
        if (url.hash) expect(target!.getElementById(decodeURIComponent(url.hash.slice(1))), `${page.path}: ${href}`).toBeTruthy();
      } else if (url.pathname !== "/") {
        expect(existsSync(resolve("dist/site", `.${url.pathname}`)), `${page.path}: ${href}`).toBe(true);
      }
    }
  }
});
