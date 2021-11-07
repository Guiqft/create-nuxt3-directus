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
        <slot v-if="isAuthenticated" />
        <ProgressSpinner v-else class="loader" />
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth"

const router = useRouter()
const authStore = useAuthStore()

console.log(authStore.$state.token)
console.log(useDirectus().auth.token)
const isAuthenticated = authStore.token

if (!isAuthenticated) {
    router.push("login")
}
</script>

<style>
@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: var(--blue-100);
    }
    40% {
        stroke: var(--blue-100);
    }
    66% {
        stroke: var(--blue-100);
    }
    80%,
    90% {
        stroke: var(--blue-100);
    }
}
</style>
