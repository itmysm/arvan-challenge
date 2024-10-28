import { defineStore } from 'pinia';
import axios from 'axios';
import type { User, AuthState, LoginPayload, RegisterPayload } from "./auth/model";


interface AuthStoreModel {
  state: () => AuthState;
  actions: {
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => void;
    loadUserFromStorage: () => void;
  };
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
  }),

  actions: {
    async login({ email, password }: LoginPayload) {
      try {
        const response = await axios.post<{ user: User; token: string }>(
          `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_LOGIN_KEY}/auth/login`,
          {
            email,
            password,
          }
        );

        this.user = response.data.user;
        this.token = response.data.token;

        localStorage.setItem('authToken', this.token);
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      }
    },

    // async register({ email, password }: RegisterPayload) {
    //   try {
    //     const response = await axios.post<{ user: User; token: string }>(
    //       `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_LOGIN_KEY}/auth/register`,
    //       {
    //         email,
    //         password,
    //       }
    //     );

    //     this.user = response.data.user;
    //     this.token = response.data.token;

    //     localStorage.setItem('authToken', this.token);
    //   } catch (error) {
    //     console.error('Registration failed:', error);
    //     throw new Error('Registration failed');
    //   }
    // },

    // logout() {
    //   this.user = null;
    //   this.token = null;
    //   localStorage.removeItem('authToken');
    // },

    // loadUserFromStorage() {
    //   const storedToken = localStorage.getItem('authToken');
    //   if (storedToken) {
    //     this.token = storedToken;
    //   }
    // },
  },
} as AuthStoreModel);