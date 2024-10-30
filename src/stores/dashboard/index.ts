import { defineStore } from 'pinia'
import axios from 'axios'
import type { getArticlesResponse } from "./model"

const BASE_URL = import.meta.env.VITE_API_URL

export const useDashboardStore = defineStore('dashboard', {
  actions: {
    getArticles: async (payload: { page: string }): Promise<getArticlesResponse> => {
      try {
        return await axios.get(`${BASE_URL}${import.meta.env.VITE_API_AUTH_KEY}/articles?page=${payload.page}`).then((response) => response.data)
      } catch (error) {
        throw error
      }
    }
  },
})
