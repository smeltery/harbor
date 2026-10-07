import { cp, mkdir, rm } from "node:fs/promises";
await rm("dist/site", { recursive: true, force: true });
await mkdir("dist/site", { recursive: true });
await cp("site", "dist/site", { recursive: true });
await cp("assets", "dist/site/assets", { recursive: true });
console.log("Built dist/site");
