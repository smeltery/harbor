import { useEffect, useId, useRef, useState } from "react";
export function Diagram({ code }: { code: string }) {
  const target = useRef<HTMLDivElement>(null);
  const id = useId().replaceAll(":", "");
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "neutral" });
        const result = await mermaid.render(`diagram-${id}`, code);
        if (active && target.current) target.current.innerHTML = result.svg;
      } catch {
        if (active) setError(true);
      }
    }
    void render();
    return () => { active = false; };
  }, [code, id]);
  return <figure className="doc-diagram">
    <div ref={target} role="img" aria-label="Workflow architecture diagram"><pre>{code}</pre></div>
    {error && <figcaption>Diagram unavailable. The Mermaid source is shown above.</figcaption>}
  </figure>;
}
