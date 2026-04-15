import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(...tseslint.configs.recommended, prettier, {
  languageOptions: {
    globals: { ...globals.browser, ...globals.node },
  },
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "no-void": "off",
  },
});
