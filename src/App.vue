<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useAlertStore } from './stores/alert'

const { checkServerStatus } = useAuthStore()
const { showAlert } = useAlertStore()

onMounted(() => {
  checkServerStatus().catch(() =>
    showAlert(
      'Problem connecting to the server! Please turn on your VPN',
      'danger',
    ),
  )
})
</script>

<template>
  <Alert classes="top-0 direction-right m-3" />
  <RouterView></RouterView>
</template>
