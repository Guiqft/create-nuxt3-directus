<template>
    <div
        class="
            flex flex-column
            min-h-screen min-w-screen
            align-items-center
            justify-content-center
            bg-blue-900
            p-8
        "
    >
        <slot v-if="isMounted && isAuthenticated" />
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth"

const router = useRouter()
const authStore = useAuthStore()
const directus = useDirectus()

//checking if `access_token` exists on localstorage
const isAuthenticated = directus.auth.token
if (isAuthenticated) {
    const userData = await directus.users.me.read()
    authStore.setUser(userData)
} else {
    router.push("login")
}

//preventing server-side errors
//reference: https://github.com/nuxt/framework/issues/646#issuecomment-961456117
const isMounted = ref(false)
onMounted(() => {
    isMounted.value = true
})
</script>

<style></style>
