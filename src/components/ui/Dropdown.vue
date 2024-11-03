<script lang="ts" setup>
import 'bootstrap/js/dist/dropdown.js'
import type { DropdownItem, DropDownSides, Variants } from '@/types/bootstrap'
import { defineProps, defineEmits, computed } from 'vue'
import { RouterLink } from 'vue-router'
import IconMenu from '../icons/IconMenu.vue'

const props = defineProps<{
  menuItems: DropdownItem[]
  side?: DropDownSides | null
  variant?: Variants
  dropdownType: 'menu' | 'dropdown'
}>()

const emit = defineEmits(['handleAction'])

const handleAction = (action?: string) => {
  if (action) {
    emit('handleAction', action)
  }
}

const sideClass = computed(() => {
  switch (props.side) {
    case 'dropLeft':
      return 'dropstart'
    case 'dropRight':
      return 'dropend'
    case 'dropUp':
      return 'dropup'
    default:
      return ''
  }
})
</script>

<template>
  <div :class="['dropdown', sideClass]">
    <button
      class="btn dropdown-toggle"
      :class="`btn-${variant}`"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <component v-if="dropdownType === 'menu'" :is="IconMenu" />
      <span class="text-black" v-if="dropdownType === 'dropdown'">...</span>
    </button>
    <ul
      class="dropdown-menu"
      :class="{ 'dropdown-menu-end': side === 'dropRight' }"
      aria-labelledby="dropdownMenuButton"
    >
      <li v-for="(item, index) in menuItems" :key="`dropdown_${index}`">
        <template v-if="item.type === 'link'">
          <RouterLink :to="item.path || ''" class="dropdown-item">
            {{ item.label }}
          </RouterLink>
        </template>
        <template v-else-if="item.type === 'action'">
          <span
            class="dropdown-item"
            @click.prevent="handleAction(item.action)"
          >
            {{ item.label }}
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>

<style>
.dropdown-toggle {
  &::before {
    display: none !important;
  }
}
</style>
