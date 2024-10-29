import { useAuthStore } from "@/stores/auth"
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const { checkUserLoginSession } = useAuthStore()

  const isLoggedIn = checkUserLoginSession() !== 'null'

  if (isLoggedIn) {
    if (to.fullPath.startsWith('/auth') || to.fullPath === '/') {
      next({ path: '/dashboard' })
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
