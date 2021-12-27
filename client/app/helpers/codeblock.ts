const LANG_NAMES: Record<string, string> = {
  text: 'Text',
  plaintext: 'Text',
  js: 'JavaScript',
  jsx: 'JSX',
  ts: 'TypeScript',
  tsx: 'TSX',
  html: 'HTML',
  bash: 'Bash',
  shell: 'Shell',
  json: 'JSON',
  css: 'CSS',
  csharp: 'C#',
  go: 'Go',
  dart: 'Dart',
  python: 'Python',
  cpp: 'C++',
  'c++': 'C++',
  sql: 'SQL',
  powershell: 'PowerShell',
  yml: 'YAML',
  yaml: 'YAML',
};

export function renderCodeBlock(pre: string, language: string): string {
  const langName = LANG_NAMES[language];
  return `<section class="code-block hljs">
    ${pre}
    ${
      langName
        ? `<div class="lang-hint" data-lang="${language}">${LANG_NAMES[language]}</div>`
        : ''
    }
    </section>`;
}
