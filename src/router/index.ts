import { authMiddleware } from "@/middleware/authMiddleware"
import Login from "@/pages/auth/login.vue"
import Register from "@/pages/auth/register.vue"
import Articles from "@/pages/dashboard/articles/index.vue"
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
      path: '/dashboard/articles',
      component: Articles
    },
    {
      path: '/dashboard/articles/page/:pageNumber',
      name: 'ArticlesPage',
      component: Articles,
      props: true,
    }
  ]
})

router.beforeEach((to, from, next) => {
  return authMiddleware(to, from, next)
})
export default router
