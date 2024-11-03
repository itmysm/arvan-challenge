<script lang="ts" setup>
import 'bootstrap/js/dist/modal.js'
import { defineProps } from 'vue'

const props = defineProps<{
  isVisible: boolean
  title: string
  loading: boolean
  message: string
  confirmText: string
  cancelText: string
}>()

const emits = defineEmits(['confirm', 'close'])

const handleConfirm = async () => {
  await emits('confirm')
}

const handleClose = () => {
  emits('close')
}
</script>

<template>
  <div
    v-if="isVisible"
    class="modal fade show"
    tabindex="-1"
    role="dialog"
    style="display: block; background: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title || 'Confirm Action' }}</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="handleClose"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-info text-black"
            @click="handleClose"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="btn btn-danger text-white"
            :disabled="loading"
            @click="handleConfirm"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else>
              {{ confirmText }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal.show {
  display: block;
}
</style>
