import { defineStore } from "pinia"

export interface IUser {
    id: "string"
    email: "string"
    first_name?: string
    last_name?: string
    status?: "string"
    role: "string"
}

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        userData: {} as IUser,
    }),
    actions: {
        setUser(data: IUser) {
            this.$patch({ userData: data })
        },
        clearUser() {
            this.$patch({ userData: undefined })
        },
    },
})
