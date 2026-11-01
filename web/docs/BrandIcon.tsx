export function BrandIcon({ name, size = 19 }: { name: string; size?: number }) {
  const icons: Record<string, string> = {
    GitHub: "github", ChatGPT: "chat/chatgpt", Claude: "chat/claude",
    v0: "chat/v0", "T3 Chat": "chat/t3", Scira: "chat/scira", Cursor: "chat/cursor",
  };
  return icons[name] ? <img className="brand-icon" src={`/assets/brands/${icons[name]}.svg`} width={size} height={size} alt="" /> : null;
}
