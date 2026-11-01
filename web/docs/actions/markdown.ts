import type { DocPage } from "../model";
export function pageMarkdown(page: DocPage) {
  return `${page.markdown.replaceAll("](/docs", "](https://harbor-topaz.vercel.app/docs")}\n\nSource: ${page.source}\n`;
}
