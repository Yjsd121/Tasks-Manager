import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "uploads/**"
    ]
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node
    },
    ...js.configs.recommended
  },

  {
    files: ["**/*.ts"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic
    ],
    languageOptions: {
      globals: globals.node
    }
  }
]);