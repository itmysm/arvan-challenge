import { useAuthStore } from "@/stores/auth"
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const { checkUserLoginSession } = useAuthStore()

  const isLoggedIn = checkUserLoginSession() !== 'null'

  if (!to.matched.length) {
    if (isLoggedIn) {
      next({ path: '/dashboard/articles' })
    } else {
      next({ path: '/auth/login' })
    }
    return
  }

  if (isLoggedIn) {
    if (to.fullPath.startsWith('/auth') || to.fullPath === '/') {
      next({ path: '/dashboard/articles' })
    } else {
      next()
    }
  } else {
    if (to.fullPath === '/' || to.fullPath.startsWith('/dashboard')) {
      next('/auth/login')
    } else {
      next()
    }
  }
}
