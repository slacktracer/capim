// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  hooks: {
    // What is going on here? Had to set as _any_ because tsc-files. But fails only for "lint staged".
    // Do I need tsc-files AND nuxi typecheck?
    // TODO: review type checking processes
    "prepare:types"({ tsConfig }: any) {
      // https://github.com/nuxt/framework/issues/7277#issuecomment-1252390503
      const aliasesToRemoveFromAutocomplete = [
        "~~",
        "~~/*",
        "@@",
        "@@/*",
        "~",
        "~/*",
        "@",
        "@/*",
      ];

      for (const alias of aliasesToRemoveFromAutocomplete) {
        if (tsConfig.compilerOptions?.paths[alias]) {
          delete tsConfig.compilerOptions.paths[alias];
        }
      }
    },
  },
  imports: {
    autoImport: false,
  },
  modules: ["@pinia/nuxt"],
  runtimeConfig: { public: { baseURL: "" } },
  sourcemap: { client: true },
  ssr: false,
});
