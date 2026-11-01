import { DocsSearch } from "./search/DocsSearch";
import { DocActions } from "./actions/DocActions";
import { BrandIcon } from "./BrandIcon";
import { DocArticle } from "./DocArticle";
import { findPage } from "./pages";
import { MobileNavigation } from "./MobileNavigation";
import { DocsNavigation } from "./DocsNavigation";
export function Docs({ path }: { path: string }) {
  const page = findPage(path);
  if (!page) throw new Error(`Unknown documentation page: ${path}`);
  const toc = page.sections.map((section) => ({ href: `#${section.id}`, title: section.title }));
  if (page.path === "/docs") toc.unshift({ href: "#overview", title: "Overview" });
  return <div className="docs-page">
    <header className="docs-header">
      <a className="skip-link" href="#docs-main">Skip to content</a>
      <MobileNavigation current={page.path} />
      <a className="brand" href="/" aria-label="Harbor home"><img src="/assets/logo.svg" width="32" height="32" alt="" />harbor</a>
      <span className="docs-header-label">Documentation</span>
      <nav aria-label="Documentation"><a href="/docs/slipway/usage/">Command reference</a><a href="/docs/porthole/usage/">Session monitor</a><a className="brand-heading" href="https://github.com/smeltery/harbor"><BrandIcon name="GitHub" size={16} />GitHub ↗</a></nav>
      <DocsSearch />
    </header>
    <div className="docs-layout">
      <aside className="docs-sidebar"><DocsNavigation current={page.path} /></aside>
      <main className="docs-main" id="docs-main">
        <details className="mobile-toc"><summary>On this page</summary><nav aria-label="On this page">{toc.map((item) => <a key={item.href} href={item.href}>{item.title}</a>)}</nav></details>
        <DocArticle page={page} />
        <div className="mobile-doc-actions"><DocActions page={page} /></div>
        <footer className="docs-footer"><a href="/">← Harbor home</a><a href={page.source}>View documentation source ↗</a></footer>
      </main>
      <aside className="docs-toc"><p>ON THIS PAGE</p>{toc.map((item) => <a key={item.href} href={item.href}>{item.title}</a>)}<DocActions page={page} /></aside>
    </div>
  </div>;
}
