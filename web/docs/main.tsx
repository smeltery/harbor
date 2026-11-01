import { hydrateRoot } from "react-dom/client";
import { Docs } from "./Docs";
import "./theme.css";
const root = document.getElementById("docs-root");
if (!root) throw new Error("Missing documentation root");
hydrateRoot(root, <Docs path={window.location.pathname} />);
