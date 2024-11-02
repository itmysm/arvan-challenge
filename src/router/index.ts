import { authMiddleware } from "@/middleware/authMiddleware"
import Login from "@/pages/auth/login.vue"
import Register from "@/pages/auth/register.vue"
import CreateArticle from "@/pages/dashboard/articles/create/index.vue"
import Articles from "@/pages/dashboard/articles/index.vue"
import EditArticle from "@/pages/dashboard/articles/edit/index.vue"
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    component: Login,
    meta: { title: 'Login - Arvan Challenge' }
  },
  {
    path: '/auth/register',
    component: Register,
    meta: { title: 'Register - Arvan Challenge' }
  },
  {
    path: '/dashboard/articles',
    component: Articles,
    meta: { title: 'Articles - Arvan Challenge' }
  },
  {
    path: '/dashboard/articles/page/:pageNumber',
    name: 'ArticlesPage',
    component: Articles,
    props: true,
  },
  {
    path: '/dashboard/articles/create',
    name: 'CreateArticle',
    component: CreateArticle,
  },
  {
    path: '/dashboard/articles/edit/:articleId',
    name: 'EditArticle',
    component: EditArticle,
    props: true,
    meta: { title: 'Edit Article - Arvan Challenge' }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  return authMiddleware(to, from, next)
})

router.afterEach((to) => {
  const title = to.meta?.title as string | undefined
  if (title) {
    document.title = title
  }
})

export default router