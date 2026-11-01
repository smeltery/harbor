import { stat } from "node:fs/promises";
import { resolve, sep } from "node:path";

const root = resolve("dist/site");
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 4173,
  async fetch(request) {
    if (!["GET", "HEAD"].includes(request.method)) return new Response("Method not allowed", { status: 405 });
    let pathname: string;
    try { pathname = decodeURIComponent(new URL(request.url).pathname); }
    catch { return new Response("Bad request", { status: 400 }); }
    let filename = resolve(root, `.${pathname}`);
    if (filename !== root && !filename.startsWith(root + sep)) return new Response("Forbidden", { status: 403 });
    try {
      if ((await stat(filename)).isDirectory()) {
        if (!pathname.endsWith("/")) return Response.redirect(new URL(`${pathname}/${new URL(request.url).search}`, request.url), 308);
        filename = resolve(filename, "index.html");
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      return new Response("Not found", { status: 404 });
    }
    const file = Bun.file(filename);
    if (!await file.exists()) return new Response("Not found", { status: 404 });
    return new Response(request.method === "HEAD" ? null : file, { headers: { "Content-Type": file.type } });
  },
});
console.log(`Harbor preview: ${server.url}`);
