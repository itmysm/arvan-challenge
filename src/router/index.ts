import { authMiddleware } from "@/middleware/authMiddleware"
import Login from "@/pages/auth/login.vue"
import Register from "@/pages/auth/register.vue"
import Dashboard from "@/pages/dashboard/index.vue"
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
    },
    {
      path: '/dashboard',
      component: Dashboard
    }
  ]
})

router.beforeEach((to, from, next) => {
  return authMiddleware(to, from, next)
})
export default router
