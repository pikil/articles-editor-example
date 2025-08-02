import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      'no-param-reassign': 'off',
      'no-void': 'off',
      'no-nested-ternary': 'off',
      'max-classes-per-file': 'off',
      'import/first': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'prefer-promise-reject-errors': 'off',
      'no-debugger': 'error',
      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'indent': ['error', 2, { SwitchCase: 1 }],
      'operator-linebreak': ['error', 'before'],
      'no-underscore-dangle': 'off',
      'no-continue': 'off',
      'no-console': 'error',
      'linebreak-style': ['off', 'error', 'windows'],
      'curly': 'off',
      'func-names': ['error', 'never'],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'comma-dangle': [2, 'never'],
      'semi': ['error', 'always'],
      'space-before-function-paren': ['error', 'always'],
      'prefer-template': 'off',
      'max-len': ['error', { code: 150 }],
      'nonblock-statement-body-position': ['error', 'below'],
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
      'no-plusplus': 'off',
      'radix': ['error', 'as-needed'],
      'quote-props': ['error', 'consistent'],
      'no-prototype-builtins': 'error',
      'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_$' }],
      'no-undef': 'error',
      'no-restricted-globals': 'error',
      'eol-last': ['error', 'always']
    }
  },
  {
    ignores: [
      '.vscode/*',
      '.git/*',
      '.DS_Store',
      'node_modules/*',
      'build/*',
      '.svelte-kit/*',
      '.env',
      '.env.*',
      'package-lock.json',
      'static/*',
      'tmp/*',
      'src/lib/vendor/*'
    ]
  },
  {
    files: [
      '**/*.svelte',
      '**/*.svelte.ts',
      '**/*.svelte.js'
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig
      }
    }
  }
);
