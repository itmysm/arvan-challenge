
<script lang="ts" setup>
import "bootstrap/js/dist/dropdown.js";
import type { DropdownItem } from '@/types/bootstrap';
import { defineProps, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
  menuItems: DropdownItem[];
}>();

const emit = defineEmits(['handleAction']);

const handleAction = (action?: string) => {
  if (action) {
    emit('handleAction', action);
  }
};
</script>

<template>
  <div class="dropdown">
    <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
      aria-expanded="false">
      ...
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li v-for="(item, index) in menuItems" :key="`dropdown_${index}`">
        <template v-if="item.type === 'link'">
          <RouterLink :to="item.path || ''" class="dropdown-item">{{ item.label }}</RouterLink>
        </template>
        <template v-else-if="item.type === 'action'">
          <span class="dropdown-item" @click.prevent="handleAction(item.action)">
            {{ item.label }}
          </span>
        </template>
      </li>
    </ul>
  </div>
</template>