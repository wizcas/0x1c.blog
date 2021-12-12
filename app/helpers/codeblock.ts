export function renderCodeBlock(pre: string, language: string): string {
  return `<section class="code-block">
    ${pre}
    <div class="lang-hint" data-lang="${language}">${language}</div>
    </section>`;
}
