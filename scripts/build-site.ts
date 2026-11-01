import { cp, mkdir, rm } from "node:fs/promises";
await rm("dist/site", { recursive: true, force: true });
await mkdir("dist/site", { recursive: true });
await cp("site", "dist/site", { recursive: true });
await cp("assets", "dist/site/assets", { recursive: true });
await cp("LICENSE", "dist/site/LICENSE");
const docs = Bun.spawn([process.execPath, "scripts/build-docs.tsx"], { stdout: "inherit", stderr: "inherit" });
if (await docs.exited !== 0) throw new Error("Documentation build failed");
console.log("Built dist/site");
