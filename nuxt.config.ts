import { defineNuxtConfig } from "nuxt3"

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: [
        "primevue/resources/themes/saga-blue/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
        "primeflex/primeflex.css",
    ],
    buildModules: ["@pinia/nuxt"],
    publicRuntimeConfig: {
        directusApiUrl: "http://localhost:8055",
    },
})
