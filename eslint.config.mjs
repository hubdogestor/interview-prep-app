// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [{
  ignores: ["node_modules/**", ".next/**", "public/**", "coverage/**", "dist/**", "backup_pre_v0/**"],
}, {
  ...js.configs.recommended,
  languageOptions: {
    sourceType: "module",
  },
}, {
  files: ["**/*.{ts,tsx,js,jsx}"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
      sourceType: "module",
      ecmaVersion: "latest",
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
    "@next/next": nextPlugin,
    "simple-import-sort": simpleImportSort,
    "unused-imports": unusedImports,
  },
  settings: {
    react: {
      version: "detect",
    },
    next: {
      rootDir: ["./"],
    },
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs["jsx-runtime"].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs["core-web-vitals"].rules,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"],
          ["^react", "^next", "^@?\\w"],
          ["^@/"],
          ["^\\."],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/purity": "off",
  },
}, {
  files: ["**/*.mjs"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    "simple-import-sort": simpleImportSort,
    "unused-imports": unusedImports,
  },
  rules: {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"],
          ["^react", "^next", "^@?\\w"],
          ["^@/"],
          ["^\\."],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
}, {
  files: ["scripts/**/*.mjs"],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: {
      project: "./tsconfig.scripts.json",
      tsconfigRootDir: __dirname,
    },
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    "simple-import-sort": simpleImportSort,
    "unused-imports": unusedImports,
  },
  rules: {
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"],
          ["^react", "^next", "^@?\\w"],
          ["^@/"],
          ["^\\."],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
}, ...storybook.configs["flat/recommended"]];



