<template>
  <div class="h-100 bg-primary px-3 py-3">
    <h2 class="fs-4 fw-normal text-white">Post</h2>
    <div class="list-group">
      <RouterLink
        v-for="(item, i) in sideBarItems"
        :to="item.path"
        class="list-group-item list-group-item-action bg-transparent border-0 text-silver"
      >
        {{ item.title }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const sideBarItems = [
  { title: 'All Articles', path: '/dashboard/articles' },
  { title: 'New Article', path: '/dashboard/new-articles' },
]
</script>
