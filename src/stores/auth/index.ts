import { defineStore } from 'pinia'
import axios from 'axios'
import type { User } from "./model"

interface AuthState {
  user: User | null
}

const BASE_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  }),

  actions: {
    async login({ email, password }: { email: string, password: string }) {
      try {
        const response = await axios.post(
          `${BASE_URL}${import.meta.env.VITE_API_AUTH_KEY}/auth/login`,
          { email, password }
        )
        this.user = { email, ...response.data }
        return response
      } catch (error) {
        console.error("Login error:", error)
        throw error
      }
    },
    async register({ email, password, username }: { email: string, password: string, username: string }) {
      try {
        const response = await axios.post(
          `${BASE_URL}${import.meta.env.VITE_API_AUTH_KEY}/auth/signup`,
          { email, password, username }
        )
        this.user = { email, ...response.data }
        return response
      } catch (error) {
        throw error
      }
    },
    async saveLoginSession() {
      try {
        localStorage.setItem('user', JSON.stringify(this.user))
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },

    checkUserLoginSession() {
      return JSON.stringify(localStorage.getItem('user'))
    },
    logout() {
      return localStorage.removeItem('user')
    }
  },
})
