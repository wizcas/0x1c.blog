import { Parser, Renderer, Slugger } from 'marked';

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
    const pre = Renderer.prototype.code.call(this, code, language, isEscaped);
    return `<section class="code-block">
    ${pre}
    <div class="lang-hint" data-lang="${language}">${language}</div>
    </section>`;
  }
}
