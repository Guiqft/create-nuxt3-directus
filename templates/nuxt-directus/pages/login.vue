<template>
    <form class="flex flex-column p-card w-8 mx-auto min-w-min col-12">
        <h2 class="text-blue-900 text-center">Directus Login</h2>
        <div class="p-inputgroup my-2">
            <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
            </span>

            <InputText
                v-model="email"
                placeholder="E-mail"
                autocomplete="email"
            />
        </div>

        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
            </span>

            <Password
                v-model="password"
                placeholder="Password"
                autocomplete="current-password"
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
import { useAuthStore, IUser } from "../stores/auth"

const router = useRouter()
const authStore = useAuthStore()
const directus = useDirectus()

const email = ref("")
const password = ref("")

const onSubmit = async () => {
    try {
        if (email.value && password.value) {
            //this automatically sets `access_token` on local storage
            await directus.auth.login({
                email: email.value,
                password: password.value,
            })

            const userData = (await directus.users.me.read()) as IUser
            authStore.setUser(userData)

            // sending back to home
            router.push("/")
        }
    } catch (e) {
        console.log("Error on login:", e)
    }
}
</script>
