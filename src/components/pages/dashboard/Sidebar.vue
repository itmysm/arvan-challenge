<template>
  <div class="h-100 bg-primary px-3 py-3">
    <h2 class="fs-4 fw-normal text-white">Post</h2>
    <div class="list-group">
      <RouterLink
        v-for="(item, itemIndex) in sideBarItems"
        :key="itemIndex"
        :to="item.path"
        class="list-group-item bg-transparent border-0 text-silver"
        :class="item.path.includes(useRoute().fullPath) ? 'bg-info' : ''"
      >
        {{ item.title }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const sideBarItems = [
  { title: 'All Articles', path: '/dashboard/articles' },
  { title: 'New Article', path: '/dashboard/articles/create' },
]
</script>
