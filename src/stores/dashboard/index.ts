import { defineStore } from 'pinia'
import axios from 'axios'
import type { Article, getArticlesResponse, getTagsResponse, Tag } from "./model"

const BASE_URL = import.meta.env.VITE_API_URL

export const useDashboardStore = defineStore('dashboard', {
  actions: {
    getArticles: async (payload: { page: string }): Promise<getArticlesResponse> => {
      try {
        return await axios.get(`${BASE_URL}/articles?page=${payload.page}`).then((response) => response.data)
      } catch (error) {
        throw error
      }
    },
    getArticle: async (payload: { articleId: string }): Promise<Article> => {
      try {
        return await axios.get(`${BASE_URL}/articles/${payload.articleId}`).then((response) => response.data)
      } catch (error) {
        throw error
      }
    },
    deleteArticle: async (payload: { id: number }): Promise<getArticlesResponse> => {
      try {
        return await axios.delete(`${BASE_URL}/articles/${payload.id}`).then((response) => response.data)
      } catch (error) {
        throw error
      }
    },
    addArticle: async (payload: { title: string, tags: string[], excerpt: string, author: string }): Promise<Article> => {
      try {
        return await axios.post(`${BASE_URL}/articles`, payload).then((response) => response.data)
      } catch (error) {
        throw error
      }
    },
    updateArticle: async (payload: { articles_id: number, title: string, tags: string[], excerpt: string, author: string }): Promise<Article> => {
      try {
        return await axios.patch(`${BASE_URL}/articles/${payload.articles_id}`, payload).then((response) => response.data)
      } catch (error) {
        throw error
      }
    },
    getTagsList: async (): Promise<getTagsResponse> => {
      try {
        return await axios.get(`${BASE_URL}/tags`).then((response) => response.data)
      } catch (error) {
        throw error
      }
    },
    addTagItem: async (payload: { title: string }): Promise<Tag> => {
      try {
        return await axios.post(`${BASE_URL}/tags`, payload).then((response) => response.data)
      } catch (error) {
        throw error
      }
    }
  },
})
