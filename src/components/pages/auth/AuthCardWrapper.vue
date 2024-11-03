<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card px-4 pt-4 login-card bg-silver shadow-sm border-none">
      <h2 class="fs-1 text-center text-gray">
        {{ isLogin ? 'LOGIN' : 'Register' }}
      </h2>
      <slot />

      <p class="text-start mt-3">
        {{ isLogin ? 'Don’t have account?' : 'Already Registered?' }}
        <a
          :href="`/auth/${isLogin ? 'register' : 'login'}`"
          class="text-charcoal-grey fw-bold text-decoration-none link-opacity-25-hover"
        >
          {{ isLogin ? 'Register Now' : 'Login' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isLogin: {
    type: Boolean,
  },
})
</script>

<style lang="scss" scoped>
.login-card {
  max-width: 450px;
  width: 100%;
  border: none;
}
</style>
