const plugin = require('tailwindcss/plugin');
const langStyles = {
  text: {
    content: 'Text',
    'background-color': '#eee',
    color: '#333',
  },
  js: {
    content: 'JavaScript',
    'background-color': '#f7df1e',
    color: black,
  },
  jsx: {
    content: 'JSX',
    'background-color': '#f7df1e',
    color: black,
  },
  ts: {
    content: 'TypeScript',
    'background-color': '#007acc',
    color: white,
  },
  tsx: {
    content: 'TSX',
    'background-color': '#007acc',
    color: white,
  },
  html: {
    content: 'HTML',
    'background-color': '#e34c26',
    color: white,
  },
  bash: {
    content: 'Bash',
    'background-color': '#ccc',
    color: black,
  },
  shell: {
    content: 'Shell',
    'background-color': '#ccc',
    color: black,
  },
  json: {
    content: 'JSON',
    'background-color': '#0193a1',
    color: white,
  },
  css: {
    content: 'CSS',
    'background-color': '#563d7c',
    color: black,
  },
  csharp: {
    content: 'C#',
    'background-color': '#189f20',
    color: white,
  },
  go: {
    content: 'Go',
    'background-color': '#00acd7',
    color: white,
  },
  dart: {
    content: 'Dart',
    'background-color': '#02589b',
    color: '#40c4f1',
  },
  python: {
    content: 'Python',
    'background-color': '#4382b4',
    color: '#ffe56c',
  },
  cpp: {
    content: 'C++',
    'background-color': '#004482',
    color: white,
  },
  sql: {
    content: 'SQL',
    'background-color': '#cc60b5',
    color: white,
  },
  powershell: {
    content: 'PowerShell',
    'background-color': '#044f75',
    color: white,
  },
};

module.exports = plugin(function ({ addUtilities }) {
  const langBadegs = Object.keys(langStyles).map((lang) => {
    // return {[`.lang`]: }
  });
});
