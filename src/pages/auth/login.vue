
<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'
import AuthCardWrapper from '@/components/pages/auth/AuthCardWrapper.vue'
import { validateEmail } from '@/utils/validation'

const { showAlert } = useAlertStore()
const { push } = useRouter()
const { login, saveLoginSession } = useAuthStore()

const loginModel = reactive({
  email: null,
  password: null,
})

const isEmailValid = computed(() => validateEmail(loginModel.email))
const isPasswordValid = computed(() => loginModel.password)

const isFormValid = computed(() => {
  return isEmailValid.value && isPasswordValid.value
})
const loading = reactive({
  login: false,
})

const onHandleLogin = async () => {
  if (!isFormValid.value) return
  loading.login = true

  try {
    Promise.all([await login({ ...loginModel }), await onHandleSaveSession()])
    showAlert('Login was successful! Redirecting to home page', 'success')
    push('/')
  } catch (error: any) {
    const errorMessages = error.response?.data?.message

    if (error.status === 403) {
      showAlert('Login Failed!  Email and/or Password is invalid', 'danger')
    } else {
      showAlert(errorMessages || 'Can not reach the server', 'danger')
    }
  } finally {
    loading.login = false
  }
}

const onHandleSaveSession = async () => {
  await saveLoginSession()
}
</script>


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
          class="form-control"
          v-model="loginModel.password"
          required
          :class="{ 'is-invalid': !isPasswordValid }"
        />
        <div class="invalid-feedback">
          {{
            loginModel.password
              ? 'Password must be at least 8 characters long and contain both letters and numbers'
              : 'Password is required.'
          }}
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