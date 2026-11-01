import content from "./content.generated.json";
import type { DocPage } from "./model";
export type { DocPage, DocSection } from "./model";
export const pages = content as DocPage[];
export const docGroups = ["Start here", "Workspace", "Slipway", "Porthole", "Project"];
export const findPage = (path: string) => pages.find((page) => page.path === path.replace(/\/$/, ""));
