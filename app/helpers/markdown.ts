import hljs from 'highlight.js';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

import ArticleMarkdownRenderer from './ArticleMarkdownRenderer';

export function renderMarkdown(markdown: string) {
  const md = marked(markdown, {
    gfm: true,
    renderer: new ArticleMarkdownRenderer(),
    highlight: (code, language) => {
      return hljs.highlight(code, { language }).value;
    },
  });
  return DOMPurify.sanitize(md);
}
