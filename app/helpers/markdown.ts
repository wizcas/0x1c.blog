import hljs from 'highlight.js';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import ArticleMarkdownRenderer from './ArticleMarkdownRenderer';

export function renderMarkdown(markdown: string) {
  const rdr = new ArticleMarkdownRenderer();
  const md = marked(markdown, {
    gfm: true,
    renderer: rdr,
    highlight: (code, language) => {
      return hljs.highlight(code, { language }).value;
    },
  });
  const toc = rdr.generateToc();
  return { html: DOMPurify.sanitize(md), toc };
}
