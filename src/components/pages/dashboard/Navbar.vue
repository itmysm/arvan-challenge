<script lang="ts" setup>
import { useAlertStore } from '@/stores/alert'
import { useAuthStore } from '@/stores/auth'
import { RouterLink, useRouter } from 'vue-router'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/collapse.js'
import Dropdown from '@/components/ui/Dropdown.vue'
const { user } = useAuthStore()

const { push } = useRouter()
const { showAlert } = useAlertStore()
const { logout } = useAuthStore()
const onHandleLogout = () => {
  logout()
  showAlert('You have successfully logged out', 'info')
  push('/auth/login')
}

const handleDropdownAction = (actionType: string) => {
  if (actionType === 'logout') {
    onHandleLogout()
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-charcoal-grey">
    <div class="container-fluid d-flex justify-container-between">
      <div class="d-flex flex-column flex-md-row align-items-md-center">
        <RouterLink to="/dashboard/articles" class="navbar-brand text-white"
          >Arvan Challenge</RouterLink
        >
        <h1 class="fs-6 fw-normal mb-0 text-white">
          Welcome
          <span class="fs-6 fs-md-5 fw-bold">{{ user?.username }}</span>
        </h1>
      </div>

      <div class="d-md-none">
        <Dropdown
          :menu-items="[
            {
              label: 'All Articles',
              type: 'link',
              path: '/dashboard/articles',
            },
            {
              label: 'New Article',
              type: 'link',
              path: '/dashboard/articles/create',
            },
            {
              label: 'Logout',
              type: 'action',
              action: 'logout',
            },
          ]"
          dropdown-type="menu"
          variant="primary"
          side="dropLeft"
          @handleAction="
            (actionType: string) => handleDropdownAction(actionType)
          "
        />
      </div>

      <button
        class="d-none d-md-block btn btn-outline-info"
        type="submit"
        @click="onHandleLogout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>
