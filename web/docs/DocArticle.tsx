import { createElement } from "react";
import { CodeBlock } from "./CodeBlock";
import { Diagram } from "./Diagram";
import type { DocNode, DocPage } from "./model";
import { pages } from "./pages";

function Node({ node }: { node: DocNode }) {
  if (node.code !== undefined) return node.language === "mermaid"
    ? <Diagram code={node.code} /> : <CodeBlock code={node.code} label={["sh", "bash", "shell"].includes(node.language ?? "") ? "Terminal" : node.language ?? "Example"} />;
  if (node.html !== undefined) return <span className="doc-inline" dangerouslySetInnerHTML={{ __html: node.html }} />;
  const { class: className, style, ...attrs } = node.attrs ?? {};
  const styles = style ? Object.fromEntries(style.split(";").filter(Boolean).map((rule) => {
    const [name, value] = rule.split(":");
    return [name.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value.trim()];
  })) : undefined;
  return createElement(node.tag ?? "div", { ...attrs, className, style: styles }, node.children?.map((child, i) => <Node key={i} node={child} />));
}
export function DocArticle({ page }: { page: DocPage }) {
  const overview = page.path === "/docs";
  const next = pages[pages.indexOf(page) + 1];
  return <>
    <header id={overview ? "overview" : undefined} className={`doc-article-heading ${overview ? "docs-overview" : ""}`}>
      <p className="eyebrow">{overview ? "DEVELOPER DOCUMENTATION" : page.group}</p>
      <h1>{overview ? <>Mac app testing.<br /><em>Room to focus.</em></> : page.title}</h1>
      <p className="docs-lead">{page.description}</p>
      {overview && <>
        <div className="docs-notice">One shared workspace. Two independent tools. Slipway gives agents their own Mac for testing; Porthole lets you watch the work. Your desktop stays yours.</div>
        <div className="docs-base"><span>Slipway + Porthole · focused Mac app testing</span><code>github.com/smeltery/harbor</code></div>
        <p className="docs-flow"><a href="/docs/getting-started/">Assemble the workspace</a>, <a href="/docs/slipway/getting-started/">set up your test Mac</a>, and <a href="/docs/porthole/usage/">follow the session</a>.</p>
      </>}
    </header>
    {page.sections.map((section) => <section id={section.id} key={section.id}>
      {section.id !== "overview" && <h2>{section.title}</h2>}
      {section.nodes.map((node, i) => <Node node={node} key={i} />)}
    </section>)}
    {next && <a className="doc-next" href={`${next.path}/`}><span>Continue reading</span>{next.title} →</a>}
  </>;
}
