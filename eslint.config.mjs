import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig([
  { ignores: ['build/**', '.docusaurus/**', '**/node_modules/**', '**/.*'] },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
    extends: [
      js.configs.recommended,
      ...ts.configs['flat/recommended'],
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: '18' } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]);
