<script setup lang="ts">
import Table from '@/components/pages/dashboard/articles/table.vue'
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import { useDashboardStore } from '@/stores/dashboard'
import type { Article } from '@/stores/dashboard/model'
import { onBeforeUpdate, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { getArticles } = useDashboardStore()
const articles = ref<Article[] | null>(null)
const paging = ref({
  curPage: 1,
  nextPage: 2,
  prevPage: null,
})

const onGetArticles = (page: string) => {
  if (page) {
    articles.value = null
    getArticles({ page }).then(response => {
      paging.value = {
        nextPage: response.nextPage,
        curPage: response.curPage,
        prevPage: response.prevPage,
      }

      articles.value = response.items
    })
  }
}

onBeforeUpdate(() => {
  const currentPage = useRoute().fullPath.split('articles/page/')[1] || '1'
  onGetArticles(currentPage)
})

onMounted(() => {
  const currentPage = useRoute().fullPath.split('articles/page/')[1] || '1'
  onGetArticles(currentPage)
})
</script>

<template>
  <DashboardLayout>
    <div class="px-5 py-4">
      <h1 class="fs-2 mb-3">All Posts</h1>
      <Table :articles="articles" />
    </div>

    <div class="d-flex justify-content-center">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="paging.prevPage ? '' : 'disabled'">
            <RouterLink
              :to="`/dashboard/articles${paging.nextPage ? '/page/' + paging.nextPage : ''}`"
              class="page-link"
              tabindex="-1"
              >Prev
            </RouterLink>
          </li>
          <li class="page-item" :class="paging.nextPage ? '' : 'disabled'">
            <RouterLink
              :to="`/dashboard/articles${paging.nextPage ? '/page/' + paging.nextPage : ''}`"
              class="page-link"
              tabindex="-1"
              >Next
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </DashboardLayout>
</template>
