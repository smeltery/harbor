export interface DocNode {
  tag?: string;
  attrs?: Record<string, string>;
  html?: string;
  children?: DocNode[];
  code?: string;
  language?: string;
}
export interface DocSection {
  id: string;
  title: string;
  paragraphs: string[];
  nodes: DocNode[];
}
export interface DocPage {
  path: string;
  title: string;
  group: string;
  description: string;
  markdown: string;
  source: string;
  edit: string;
  sections: DocSection[];
}
