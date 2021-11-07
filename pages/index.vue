<template><Button>abc</Button></template>

<script setup>
import { useAuthStore } from "~/stores/auth"

const authStore = useAuthStore()
useDirectus()
</script>

<style scoped></style>
