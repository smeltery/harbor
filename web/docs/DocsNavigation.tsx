import { docGroups, pages } from "./pages";
export function DocsNavigation({ current, onNavigate }: { current: string; onNavigate?: () => void }) {
  return <>
    <nav aria-label="Documentation pages">
      <a href="/docs/" onClick={onNavigate} aria-current={current === "/docs" ? "page" : undefined}>Overview</a>
      {docGroups.map((group) => <div className="docs-nav-group" key={group}>
        <p>{group}</p>
        {pages.filter((page) => page.group === group && page.path !== "/docs").map((page) =>
          <a key={page.path} href={`${page.path}/`} onClick={onNavigate} aria-current={current === page.path ? "page" : undefined}>{page.title}</a>)}
      </div>)}
    </nav>
    <a onClick={onNavigate} className="docs-home" href="/">← Back to Harbor</a>
  </>;
}
