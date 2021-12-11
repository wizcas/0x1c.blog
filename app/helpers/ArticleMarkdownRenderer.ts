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
}
