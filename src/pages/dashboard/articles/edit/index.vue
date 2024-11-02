<script lang="ts" setup>
import FormArticle from '@/components/pages/dashboard/create/FormArticle.vue'
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import { useAlertStore } from '@/stores/alert'
import { useDashboardStore } from '@/stores/dashboard'
import type { Article } from '@/stores/dashboard/model'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { showAlert } = useAlertStore()
const { getArticle } = useDashboardStore()
const route = useRoute()
const router = useRouter()
const articleId = route.params.articleId as string
const articleModel = ref<Article | null>(null)
const onGetArticle = async () => {
  if (articleId) {
    getArticle({ articleId })
      .then(response => {
        articleModel.value = response
      })
      .catch(error => {
        const errorMessages = error.response?.data?.message
        showAlert(errorMessages || 'Article not found ', 'danger')
        router.push('/dashboard/articles')
      })
  }
}

onMounted(() => {
  onGetArticle()
})
</script>

<template>
  <DashboardLayout>
    <div class="px-5 py-4">
      <h1 class="fs-2 mb-3">Edit Article</h1>
      <FormArticle
        v-if="articleModel"
        :initial-article-model="articleModel"
        :is-edit-mode="true"
      />
    </div>
  </DashboardLayout>
</template>
