import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import security from "eslint-plugin-security";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      security,
    },
    rules: {
      ...security.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-expressions": "off",
    },
  },
  tseslint.configs.recommended,
]);
