// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  
  // Add CSS files to be processed
  css: ["~/assets/css/main.css"],
  
  // Icon configuration at root level, not inside ui property
  icon: {
    collections: ['heroicons']
  },

  pinia: {
    storesDirs: ["~/stores"],
  },

  imports: {
    dirs: ["stores"],
  },

  compatibilityDate: "2025-03-31",
});