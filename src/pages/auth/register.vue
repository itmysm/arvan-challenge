<template>
  <AuthCardWrapper :is-login="false">
    <form>
      <div class="mb-3 mt-5">
        <label for="username" class="form-label text-charcoal-grey fw-semibold"
          >Username</label
        >
        <input
          type="username"
          class="form-control"
          id="email"
          required
          v-model="registerModel.username"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label text-charcoal-grey fw-semibold"
          >Email</label
        >
        <input
          type="email"
          class="form-control"
          id="email"
          required
          v-model="registerModel.email"
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
          v-model="registerModel.password"
          required
        />
        <div class="invalid-feedback">Required field</div>
      </div>
      <button
        :class="`btn btn-primary w-100 text-white mt-3 py-2`"
        :disabled="!isFormValid || loading.register"
        @click="onHandleRegister"
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

<script setup>
import { reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'
import AuthCardWrapper from '@/components/pages/auth/AuthCardWrapper.vue'

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

const isFormValid = computed(() => {
  return registerModel.email && registerModel.password && registerModel.username
})

const onHandleRegister = async () => {
  if (!isFormValid.value) return
  loading.register = true

  try {
    Promise.all([
      await register({ ...loginModel }),
      await onHandleSaveSession(),
    ])

    alertStore.showAlert(
      'Register was successful! Redirecting to dashboard page',
      'success',
    )
    push('/')
  } catch (error) {
    const errorMessages = error.response?.data?.message
    alertStore.showAlert(errorMessages || 'Can not reach the server', 'danger')
  } finally {
    loading.register = false
  }
}

const onHandleSaveSession = async () => {
  await saveLoginSession()
}
</script>
