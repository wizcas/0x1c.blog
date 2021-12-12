import hljs from 'highlight.js';
import { Renderer, Slugger } from 'marked';

export default class ArticleMarkdownRenderer extends Renderer {
  heading(
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    _: string,
    slugger: Slugger
  ) {
    const slug = slugger.slug(text);
    const escaped = text.toLowerCase().replace(/[\s]+/g, '-');
    const href = `#${slug}`;
    return `<h${level}>
    ${text}
    <a href="${href}" name="${escaped}" class="anchor" id="${slug}">
    #
    </a>
    </h${level}>`;
  }

  code = (
    code: string,
    language: string | undefined,
    isEscaped: boolean
  ): string => {
    const pre = super.code(code, language, isEscaped);
    return `<section class="code-block">
    ${pre}
    <div class="lang-hint" data-lang="${language}">${language}</div>
    </section>`;
    // const hlcode = language ? hljs.highlight(code, { language }).value : code;
    // const result = `<pre>
    // <code class="language-${language}">
    // ${hlcode}
    // </code>
    // </pre>`;
    // return result;
    // return super.code(code, language, true);
  };
}
