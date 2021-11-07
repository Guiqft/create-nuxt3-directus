import { defineStore, getActivePinia } from "pinia"

export interface IUser {
    id: "string"
    email: "string"
    first_name?: string
    last_name?: string
    status?: "string"
    role: "string"
}

interface IAuthState {
    token?: string
    userData?: IUser
}

export const useAuthStore = defineStore({
    id: "auth",
    state: (): IAuthState => ({
        token: undefined,
        userData: undefined,
    }),
    getters: {
        token: (state) => {
            if (process.client) return useDirectus().auth.token
        },
    },
})
