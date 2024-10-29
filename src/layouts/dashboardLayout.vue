<template>
  <div class="vh-100">
    <div class="w-100">
      <Navbar />
    </div>

    <div class="row w-100 dashboard-content h-100">
      <div class="d-none d-md-block col-md-4 col-xl-3">
        <Sidebar />
      </div>
      <div class="col-md-8 col-xl-9">
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
</style>