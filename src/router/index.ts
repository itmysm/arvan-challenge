import Login from "@/pages/auth/login.vue"
import Register from "@/pages/auth/register.vue"
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      component: Login
    },
    {
      path: '/auth/register',
      component: Register
    }
  ]
})

export default router
