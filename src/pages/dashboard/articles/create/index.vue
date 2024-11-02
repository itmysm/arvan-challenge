<script setup lang="ts">
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import FormArticle from '@/components/pages/dashboard/create/FormArticle.vue'
</script>

<template>
  <DashboardLayout>
    <div class="px-5 py-4">
      <h1 class="fs-2 mb-3">New Article</h1>
      <FormArticle />
    </div>
  </DashboardLayout>
</template>
