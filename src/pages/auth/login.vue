<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card px-4 pt-4 login-card shadow border-none">
      <h2 class="fs-1 text-center text-gray">LOGIN</h2>
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
          <label
            for="password"
            class="form-label text-charcoal-grey fw-semibold"
            >Password</label
          >
          <input
            type="password"
            class="form-control is-invalid"
            id="password"
            v-model="loginModel.password"
            required
          />
          <div class="invalid-feedback">Required field</div>
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
      <p class="text-start mt-3">
        Don’t have an account?
        <a
          href="/auth/register"
          class="text-charcoal-grey fw-bold text-decoration-none link-opacity-25-hover"
          >Register Now</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'

const alertStore = useAlertStore()
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
    const response = await login({ ...loginModel })
    await onHandleSaveSession()

    alertStore.showAlert(
      'Login was successful! Redirecting to home page',
      'success',
    )
    push('/')
  } catch (error) {
    alertStore.showAlert(
      'Login Failed!  User name and/or Password is invalid',
      'danger',
    )
  } finally {
    loading.login = false
  }
}

const onHandleSaveSession = async () => {
  await saveLoginSession()
}
</script>

<style lang="scss" scoped>
.login-card {
  max-width: 450px;
  width: 100%;
  border: none;
}
</style>
