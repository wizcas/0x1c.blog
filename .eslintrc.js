// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'react', '@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: path.resolve(__dirname, 'tsconfig.json'),
      },
    },
  },
  rules: {
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    camelcase: 'off',
    'no-param-reassign': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'class-methods-use-this': 'off',

    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    'import/no-unresolved': ['error', { caseSensitive: false }],
    'import/extensions': ['error', { ts: 'never', tsx: 'never' }],
    'import/prefer-default-export': 'off',
    'import/order': [
      'warn',
      {
        pathGroups: [
          { pattern: '~/styles/**', group: 'object', position: 'after' },
          { pattern: '~/**', group: 'internal' },
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type',
          'object',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: false },
      },
    ],

    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'function-declaration' },
    ],
    'react/no-unescaped-entities': 'off',

    'jsx-a11y/label-has-associated-control': 'off',
  },
};
