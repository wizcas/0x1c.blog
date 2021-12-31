import flattenDeep from 'lodash/flattenDeep';
import { Parser, Renderer, Slugger } from 'marked';
import pinyin from 'pinyin';

import type { TocItem } from '~/services/blog/models';

import { renderCodeBlock } from './codeblock';
import { RendererWithToc } from './markdown';

type RenderThis = typeof Renderer & { parser: Parser };

export default class ArticleMarkdownRenderer
  extends Renderer
  implements RendererWithToc
{
  tocItems: TocItem[] = [];

  heading(
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: Slugger
  ) {
    const py = pinyin(slugger.slug(text), {
      style: pinyin.STYLE_NORMAL,
    });
    const slug = flattenDeep(py).join('-');
    const escaped = text.toLowerCase().replace(/[\s]+/g, '-');
    const href = `#${slug}`;
    this.tocItems.push({ id: slug, text: raw, level });
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

  generateToc() {
    const items: TocItem[] = [];
    const q: TocItem[][] = [items];
    let lastItem: TocItem;

    function push(item: TocItem) {
      q[q.length - 1].push(item);
    }

    this.tocItems.forEach((item) => {
      if (!lastItem || item.level === lastItem.level) {
        lastItem = item;
        push(item);
      } else if (item.level > lastItem.level) {
        lastItem.children ??= [];
        q.push(lastItem.children);
        push(item);
      } else if (item.level < lastItem.level) {
        q.pop();
        push(item);
      }
      lastItem = item;
    });
    return items;
  }
}
