<template>
  <AuthCardWrapper :is-login="true">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label text-charcoal-grey fw-semibold"
          >Email</label
        >
        <input
          type="email"
          class="form-control"
          id="email"
          required
          v-model="loginModel.email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label text-charcoal-grey fw-semibold"
          >Password</label
        >
        <input
          type="password"
          class="form-control is-invalid"
          id="password"
          v-model="loginModel.password"
          required
        />
        <div v-show="!loginModel.password" class="invalid-feedback">
          Required field
        </div>
      </div>
      <button
        :class="`btn btn-primary w-100 text-white mt-3 py-2`"
        :disabled="!isFormValid || loading.login"
        @click="onHandleLogin"
      >
        <div
          v-show="loading.login"
          class="spinner-border text-white spinner-border-sm"
          role="status"
        ></div>

        <span v-show="!loading.login">Login</span>
      </button>
    </form>
  </AuthCardWrapper>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'
import AuthCardWrapper from '@/components/pages/auth/AuthCardWrapper.vue'

const { showAlert } = useAlertStore()
const { push } = useRouter()
const { login, saveLoginSession } = useAuthStore()

const loginModel = reactive({
  email: null,
  password: null,
})

const loading = reactive({
  login: false,
})

const isFormValid = computed(() => {
  return loginModel.email && loginModel.password
})

const onHandleLogin = async () => {
  if (!isFormValid.value) return
  loading.login = true

  try {
    Promise.all([await login({ ...loginModel }), await onHandleSaveSession()])
    showAlert('Login was successful! Redirecting to home page', 'success')
    push('/')
  } catch (error) {
    const errorMessages = error.response?.data?.message
    showAlert(errorMessages || 'Can not reach the server', 'danger')
  } finally {
    loading.login = false
  }
}

const onHandleSaveSession = async () => {
  await saveLoginSession()
}
</script>
