<template>
    <form class="flex flex-column p-card w-8 mx-auto min-w-min col-12">
        <h2 class="text-blue-900 text-center">Directus Login</h2>
        <div class="p-inputgroup my-2">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>

            <InputText v-model="email" placeholder="E-mail" />
        </div>

        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
            </span>

            <Password
                v-model="password"
                placeholder="Password"
                :feedback="false"
                :promptLabel="'test'"
            />
        </div>

        <Button
            type="submit"
            label="Submit"
            class="mt-3 align-self-center"
            @click.prevent="onSubmit()"
        />
    </form>
</template>

<script lang="ts">
export default {
    layout: "auth",
}
</script>

<script setup lang="ts">
import { inject, ref } from "vue"
import { useAuthStore, IUser } from "../stores/auth"

const directus = useDirectus()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref("")
const password = ref("")

const onSubmit = async () => {
    try {
        if (email.value && password.value) {
            const loginResponse = await directus.auth.login({
                email: email.value,
                password: password.value,
            })

            const userData = (await directus.users.me.read()) as IUser
            authStore.$patch({
                userData,
                token: loginResponse.access_token,
            })

            // sending back to home
            window.location.href = "/"
        }
    } catch (e) {
        console.log("Error on login:", e)
    }
}
</script>
