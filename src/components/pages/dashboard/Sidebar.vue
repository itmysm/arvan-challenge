<template>
  <div class="h-100 bg-primary px-3 py-3">
    <h2 class="fs-4 fw-normal text-white">Post</h2>
    <ul class="list-group list-group-flush px-5">
      <li v-for="(item, i) in sideBarItems" class="fs-5 fw-normal">
        <a class="text-white link-silver text-decoration-none" :href="item.path">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const sideBarItems = [
  { title: 'All Articles', path: '/all' },
  { title: 'New Article', path: '/new' },
]
</script>