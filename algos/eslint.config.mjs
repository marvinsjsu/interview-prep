import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
// import { eslintRecommended } from "@eslint/js"; // Import recommended rules
// import prettier from "eslint-config-prettier"; // Import Prettier config


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,jsx}']},
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  // eslintRecommended(),
  // prettier,
  {
    'rules': {
      'quotes': ['error', 'single'], // Enforce single quotes
      'semi': ['error', 'always'], // Enforce semicolons
      'indent': ['error', 4] // Enforce 2-space indentation
    }
  }
];