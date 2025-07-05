import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    ignores: ['./dist/**.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error', // or "error"
        {
          argsIgnorePattern: ['warn', '^_'],
          varsIgnorePattern: ['warn', '^_'],
          caughtErrorsIgnorePattern: ['warn', '^_'],
        },
      ],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: ['warn', '^_'],
          varsIgnorePattern: ['warn', '^_'],
          caughtErrorsIgnorePattern: ['warn', '^_'],
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: { globals: globals.node },
    ignores: ['./dist/**.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error', // or "error"
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  tseslint.configs.recommended,
])
