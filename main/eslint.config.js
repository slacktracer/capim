import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  prettier,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-void": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/core/*", "!**/core/core.js", "!**/core/types"],
              message:
                "All imports from core must be made through core/core.js.",
            },
          ],
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "vue/attributes-order": [
        "error",
        {
          alphabetical: true,
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            ["UNIQUE", "SLOT"],
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT",
          ],
        },
      ],
      "vue/multi-word-component-names": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
