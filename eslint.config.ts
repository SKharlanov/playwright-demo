import globals from 'globals';
import eslint from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/node_modules', '**/reports']),
  {
    files: ['**/*.ts'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/no-magic-numbers': 'error',
    },
  },
  {
    files: ['src/tests/**/*.spec.ts', 'src/tests/**/*.test.ts'],
    ...playwright.configs['flat/recommended'],
    rules: {
      'playwright/no-skipped-test': 'warn',
      'playwright/no-commented-out-tests': 'error',
    },
  },
  {
    files: ['**/*.{ajs,cjs,ts,mts,cts}'],
    plugins: { eslint },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-magic-numbers': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // Отключаем правило только для файлов определений типов
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
    },
  },
]);
