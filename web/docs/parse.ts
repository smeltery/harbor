import MarkdownIt from "markdown-it";
import { parseHTML } from "linkedom";
import { dirname, relative, resolve } from "node:path";
import type { DocNode, DocPage, DocSection } from "./model";

export function headingId(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").trim().replace(/\s/g, "-");
}

export function parsePage(
  input: Omit<DocPage, "sections" | "description"> & { file: string },
  routes: Map<string, string>,
): DocPage {
  const markdown = new MarkdownIt({ html: false, linkify: true });
  const rewrite = (href: string) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(href)) return href;
    const [path, hash] = href.split("#");
    const target = resolve(dirname(input.file), decodeURIComponent(path));
    const route = routes.get(target);
    if (route) return `${route}/${hash ? `#${hash}` : ""}`;
    const local = relative(resolve("."), target);
    if (local.startsWith("assets/")) return `/${local}${hash ? `#${hash}` : ""}`;
    return `https://github.com/smeltery/harbor/blob/main/${local}${hash ? `#${hash}` : ""}`;
  };
  const defaultLink = markdown.renderer.rules.link_open!;
  markdown.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
    const token = tokens[index];
    token.attrSet("href", rewrite(String(token.attrGet("href") ?? "")));
    return defaultLink ? defaultLink(tokens, index, options, env, renderer) : renderer.renderToken(tokens, index, options);
  };
  const plain = (html: string) => parseHTML(`<html><body>${html}</body></html>`).document.body.textContent ?? "";
  const used = new Map<string, number>();
  const id = (title: string) => {
    const base = headingId(title), count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return `${base}${count ? `-${count}` : ""}`;
  };
  const portable = input.markdown.replace(/(\]\()([^\s)]+)(\))/g, (_, before, href, after) => `${before}${rewrite(href)}${after}`);
  const tokens = markdown.parse(portable, {});
  const sections: DocSection[] = [{ id: "overview", title: "Overview", paragraphs: [], nodes: [] }];
  let section = sections[0];
  let cursor = 0;
  function nodes(until?: string): DocNode[] {
    const result: DocNode[] = [];
    while (cursor < tokens.length) {
      const token = tokens[cursor++];
      if (token.nesting === -1 && token.tag === until) break;
      if (token.type === "fence" || token.type === "code_block") {
        result.push({ code: token.content.trimEnd(), language: token.info.trim() || "text" });
      } else if (token.type === "inline") {
        result.push({ html: markdown.renderer.renderInline(token.children ?? [], markdown.options, {}) });
      } else if (token.type === "hr") {
        result.push({ tag: "hr" });
      } else if (token.type === "heading_open" && token.tag === "h1") {
        nodes(token.tag);
      } else if (token.type === "heading_open" && token.tag === "h2" && !until) {
        const title = plain(markdown.renderer.renderInline(tokens[cursor].children ?? [], markdown.options, {}));
        cursor += 2;
        section.nodes.push(...result.splice(0));
        section = { id: id(title), title, paragraphs: [], nodes: [] };
        sections.push(section);
      } else if (token.nesting === 1) {
        const attrs = Object.fromEntries((token.attrs ?? []).map(([name, value]) => [name, String(value)]));
        if (/^h[3-6]$/.test(token.tag)) attrs.id = id(tokens[cursor].content);
        const child = { tag: token.tag, attrs, children: nodes(token.tag) };
        result.push(token.tag === "table" ? { tag: "div", attrs: { class: "docs-table" }, children: [child] } : child);
      } else if (token.nesting === 0) {
        result.push({ html: markdown.renderer.render([token], markdown.options, {}) });
      }
    }
    return result;
  }
  const remaining = nodes();
  section.nodes.push(...remaining);
  const text = (node: DocNode): string => node.code ?? (node.html ? plain(node.html) : (node.children ?? []).map(text).join(" "));
  for (const item of sections) item.paragraphs = item.nodes.map(text);
  const description = sections[0].nodes[0]?.tag === "p" ? text(sections[0].nodes[0]) : `${input.title} for ${["Slipway", "Porthole"].includes(input.group) ? input.group : "the Harbor workspace"}.`;
  if (sections[0].nodes[0]?.tag === "p") sections[0].nodes.shift();
  return { ...input, markdown: portable, description, sections: sections.filter((item) => item.nodes.length) };
}
