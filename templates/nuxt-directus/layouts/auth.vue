<template>
    <div
        class="
            flex flex-column
            min-h-screen min-w-screen
            align-item-center
            justify-content-center
            bg-blue-900
            py-8
        "
    >
        <slot v-if="isMounted && !isAuthenticated" />
    </div>
</template>

<script setup>
const router = useRouter()
const directus = useDirectus()

//checking if `access_token` exists on localstorage
const isAuthenticated = directus.auth.token
if (isAuthenticated) {
    router.push("/")
}

//preventing server-side errors
//reference: https://github.com/nuxt/framework/issues/646#issuecomment-961456117
const isMounted = ref(false)
onMounted(() => {
    isMounted.value = true
})
</script>

<style></style>
