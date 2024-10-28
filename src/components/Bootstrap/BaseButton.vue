<template>
  <button ref="button" :class="computedClasses" :type="type">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import Button from 'bootstrap/js/dist/button'
import type {
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@/types/bootstrapTypes'

const button = ref<HTMLButtonElement | null>(null)

const props = defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
}>()

const { variant = 'primary', size = '', type = 'button' } = props

const computedClasses = computed(() => {
  return ['btn', `btn-${variant}`, size ? `btn-${size}` : '']
})

onMounted(() => {
  if (button.value) {
    new Button(button.value)
  }
})
</script>
