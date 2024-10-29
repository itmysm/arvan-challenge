<template>
  <div
    class="alert-box position-absolute d-flex justify-content-between align-items-center"
    v-if="visible"
    :class="`alert alert-${type} ${classes}`"
    role="alert"
  >
    <span class="me-4">{{ message }}</span>

    <button
      type="button"
      class="btn-close fs-6 fw-bold text-black d-flex justify-content-center"
      aria-label="Close"
      @click="closeAlert"
    >
      <IconClose />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
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

const visible = ref(true)
const closeAlert = () => {
  visible.value = false
}

onMounted(() => {
  setTimeout(() => {
    if (visible.value) {
      visible.value = false
    }
  }, 3000)
})
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
