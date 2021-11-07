import { Directus } from "@directus/sdk"

const DirectusComposable = () => {
    const nuxtApp = useNuxtApp()

    return new Directus(nuxtApp.$config.directusApiUrl)
}

declare global {
    // @ts-ignore
    const useDirectus: typeof DirectusComposable
}

// It will be available as useDirectus() (pascalCase of file name without extension)
export default DirectusComposable
