<template>
    <Button @click="onClick">logout</Button>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth"

const authStore = useAuthStore()
const directus = useDirectus()
const router = useRouter()

const onClick = async () => {
    //this removes `access_token` from localstorage
    await directus.auth.logout()
    authStore.clearUser()

    router.push("login")
}
</script>
