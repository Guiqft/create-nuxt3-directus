import { defineNuxtPlugin } from "#app"

import PrimeVue from "primevue/config"

// components
import Button from "primevue/button"
import Password from "primevue/password"
import InputText from "primevue/inputtext"
import ProgressSpinner from "primevue/progressspinner"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })

    nuxtApp.vueApp.component("Button", Button)
    nuxtApp.vueApp.component("Password", Password)
    nuxtApp.vueApp.component("InputText", InputText)
    nuxtApp.vueApp.component("ProgressSpinner", ProgressSpinner)
    //other components that you need
})
