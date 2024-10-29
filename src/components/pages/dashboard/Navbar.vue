<template>
  <nav class="navbar navbar-expand-lg bg-charcoal-grey">
    <div class="container-fluid d-flex justify-container-between">
      <div class="d-flex align-items-center">
        <a class="navbar-brand text-white" href="#">Arvan Challenge</a>
        <h1 class="fs-6 fw-normal mb-0 text-white">Welcome {{ 'meysam' }}</h1>
      </div>

      <button class="btn btn-outline-info" type="submit" @click="onHandleLogout">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAlertStore } from '@/stores/alert';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const { push } = useRouter()
const { logout } = useAuthStore()
const { showAlert } = useAlertStore()
const onHandleLogout = () => {
  logout()
  showAlert('you have successfully logged out', 'info')
  push('/auth/login')
}

</script>