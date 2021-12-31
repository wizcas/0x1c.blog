import hljs from 'highlight.js';
import DOMPurify from 'isomorphic-dompurify';
import { marked, Renderer } from 'marked';

import { TocItem } from '~/services/blog/models';

export interface RendererWithToc {
  generateToc(): TocItem[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isRendererWithToc(v: any): v is RendererWithToc {
  return 'generateToc' in v && typeof v.generateToc === 'function';
}

export function renderMarkdown(markdown: string, renderer: Renderer) {
  const md = marked(markdown, {
    baseUrl: process.env.SERVER_BASE_URL,
    gfm: true,
    renderer,
    highlight: (code, language) => {
      return hljs.highlight(code, { language }).value;
    },
  });
  let toc: TocItem[] = [];
  if (isRendererWithToc(renderer)) {
    toc = renderer.generateToc();
  }
  return { html: DOMPurify.sanitize(md), toc };
}
