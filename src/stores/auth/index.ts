import { defineStore } from 'pinia'
import axios from 'axios'
import type { CheckServerStatus, LoginPayload, LoginResponse, RegisterPayload, User } from "./model"

interface AuthState {
  user: User | null
}

const BASE_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  }),

  actions: {
    async login({ email, password }: LoginPayload): Promise<LoginResponse> {
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/login`,
          { email, password }
        )
        this.user = response.data
        return response.data
      } catch (error) {
        throw error
      }
    },
    async register({ email, password, username }: RegisterPayload) {
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/signup`,
          { email, password, username }
        )
        this.user = response.data
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
    },
    async checkServerStatus(): Promise<CheckServerStatus> {
      try {
        const response = await axios.get(
          `${BASE_URL}/status`,
          { timeout: 5000 }
        )
        return response.data
      } catch (error) {
        throw error
      }
    },
  },
})
