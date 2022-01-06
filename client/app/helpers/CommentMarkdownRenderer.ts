import { Parser, Renderer } from 'marked';

import { renderCodeBlock } from './codeblock';

type RenderThis = typeof Renderer & { parser: Parser };

export default class CommentMarkdownRenderer extends Renderer {
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
