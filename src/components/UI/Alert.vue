<template>
  <div
    class="alert-box position-absolute d-flex justify-content-between align-items-center"
    v-if="alertStore.visible"
    :class="`alert alert-${alertStore.type} ${classes}`"
    role="alert"
  >
    <span class="me-4">{{ alertStore.message }}</span>
    <button
      type="button"
      class="btn-close fs-6 fw-bold text-black d-flex justify-content-center"
      aria-label="Close"
      @click="alertStore.visible = false"
    >
      <IconClose />
    </button>
  </div>
</template>

<script setup>
import { useAlertStore } from '@/stores/alert'
import IconClose from '@/components/icons/IconClose.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  message: {
    type: String,
    default: 'This',
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
  classes: {
    type: String,
    default: 'top-0 direction-left',
  },
})

const alertStore = useAlertStore()
</script>

<style scoped>
.alert-box {
  min-width: 250px;
}
.direction-right {
  right: 0;
}
.direction-left {
  left: 0;
}
</style>
