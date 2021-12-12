import { Parser, Renderer, Slugger } from 'marked';

import { renderCodeBlock } from './codeblock';

type RenderThis = typeof Renderer & { parser: Parser };

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

  code(
    this: RenderThis,
    code: string,
    language: string | undefined,
    isEscaped: boolean
  ): string {
    language = language || 'plaintext';
    return renderCodeBlock(
      Renderer.prototype.code.call(this, code, language, isEscaped),
      language
    );
  }
}
