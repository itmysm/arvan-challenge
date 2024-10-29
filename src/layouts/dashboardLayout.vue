<template>
  <div>
    <div class="w-100">
      <Navbar />
    </div>

    <div class="d-flex">
      <Sidebar />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/pages/dashboard/Navbar.vue'
import Sidebar from '@/components/pages/dashboard/Sidebar.vue'
</script>
