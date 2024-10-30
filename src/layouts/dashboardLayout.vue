<template>
  <div class="vh-100">
    <div class="w-100">
      <Navbar />
    </div>

    <div class="d-flex w-100 dashboard-content h-100">
      <div class="d-none d-md-block parent-sidebar">
        <Sidebar />
      </div>
      <div class="w-100 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/pages/dashboard/Navbar.vue'
import Sidebar from '@/components/pages/dashboard/Sidebar.vue'
</script>

<style lang="scss">
.dashboard-content {
  max-height: calc(100vh - 56px);
}

.parent-sidebar {
  min-width: 295px;
}
</style>
