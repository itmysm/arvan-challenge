<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'
import AuthCardWrapper from '@/components/pages/auth/AuthCardWrapper.vue'
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '@/utils/validation'

const alertStore = useAlertStore()
const { push } = useRouter()
const { register, saveLoginSession } = useAuthStore()

const registerModel = reactive({
  email: null,
  password: null,
  username: null,
})

const loading = reactive({
  register: false,
})

const isEmailValid = computed(() => validateEmail(registerModel.email))
const isUsernameValid = computed(() => validateUsername(registerModel.username))
const isPasswordValid = computed(() => validatePassword(registerModel.password))

const isFormValid = computed(() => {
  return isEmailValid.value && isUsernameValid.value && isPasswordValid.value
})

const onHandleRegister = async () => {
  if (!isFormValid.value) return
  loading.register = true

  try {
    await Promise.all([
      await register({ ...registerModel }),
      await onHandleSaveSession(),
    ])

    alertStore.showAlert(
      'Register was successful! Redirecting to dashboard page',
      'success',
    )
    push('/')
  } catch (error: any) {
    const errorMessages = error.response?.data?.message
    alertStore.showAlert(errorMessages || 'Cannot reach the server', 'danger')
  } finally {
    loading.register = false
  }
}

const onHandleSaveSession = async () => {
  await saveLoginSession()
}
</script>

<template>
  <AuthCardWrapper :is-login="false">
    <form @submit.prevent="onHandleRegister">
      <div class="mb-3 mt-2 mt-md-5">
        <label for="user" class="form-label text-charcoal-grey fw-semibold"
          >User</label
        >
        <input
          type="text"
          class="form-control"
          required
          v-model="registerModel.username"
          :class="{
            'is-invalid': !isUsernameValid && registerModel.username !== null,
          }"
        />
        <div
          v-if="!isUsernameValid && registerModel.username !== null"
          class="invalid-feedback"
        >
          Username is required and must be valid.
        </div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label text-charcoal-grey fw-semibold"
          >Email</label
        >
        <input
          type="email"
          id="email"
          name="email"
          class="form-control"
          required
          v-model="registerModel.email"
          :class="{
            'is-invalid': !isEmailValid && registerModel.email !== null,
          }"
        />
        <div
          v-if="!isEmailValid && registerModel.email !== null"
          class="invalid-feedback"
        >
          Enter a valid email address.
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label text-charcoal-grey fw-semibold"
          >Password</label
        >
        <input
          type="password"
          class="form-control"
          v-model="registerModel.password"
          required
          :class="{ 'is-invalid': !isPasswordValid }"
        />
        <div class="invalid-feedback">
          {{
            registerModel.password
              ? 'Password must be at least 8 characters long and contain both letters and numbers'
              : 'Password is required.'
          }}
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-primary w-100 text-white mt-3 py-2"
        :disabled="!isFormValid || loading.register"
      >
        <div
          v-show="loading.register"
          class="spinner-border text-white spinner-border-sm"
          role="status"
        ></div>
        <span v-show="!loading.register">Register</span>
      </button>
    </form>
  </AuthCardWrapper>
</template>
