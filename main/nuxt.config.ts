// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  imports: {
    autoImport: false,
  },
  modules: ["@pinia/nuxt"],
  runtimeConfig: { public: { baseURL: "" } },
  sourcemap: { client: true },
  ssr: false,
});
