import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const message = ref('')
  const type = ref('primary')
  const visible = ref(false)

  const showAlert = (msg: string, alertType: string = 'primary') => {
    message.value = msg
    type.value = alertType
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  return { message, type, visible, showAlert }
})
