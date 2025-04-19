import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
    rules: {
      'no-unused-vars': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'indent': ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      }],
      'space-before-blocks': 'error',
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'eol-last': ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'max-len': ['warn', { 'code': 200 }],
    },
  },
  {
    languageOptions: { globals: globals.node },
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    ...pluginJs.configs.recommended,
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-unused-vars': 'warn',
    },
  },
];
