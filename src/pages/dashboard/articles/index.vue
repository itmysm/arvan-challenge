<script setup lang="ts">
import Dropdown from '@/components/UI/Dropdown.vue'
import Modal from '@/components/UI/Modal.vue'
import DashboardLayout from '@/layouts/dashboardLayout.vue'
import { useAlertStore } from '@/stores/alert'
import { useDashboardStore } from '@/stores/dashboard'
import type { Article } from '@/stores/dashboard/model'
import type { DropdownItem } from '@/types/bootstrap'
import { convertDate } from '@/utils/convertDate'
import { onBeforeUpdate, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { getArticles } = useDashboardStore()
const articles = ref<Article[] | null>(null)
const { deleteArticle } = useDashboardStore()
const { showAlert } = useAlertStore()

const articleToDelete = ref<number | null>(null)
const showDeleteDialog = ref(false)
const loading = ref({ delete: false })
const paging = ref<Record<string, number | null>>({
  curPage: 1,
  nextPage: 2,
  prevPage: 0,
})

const headers = [
  { title: '#' },
  { title: 'Title' },
  { title: 'Author' },
  { title: 'Tags' },
  { title: 'Excerpt' },
  { title: 'Created' },
]

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

const handleDropdownAction = (action: string, articleId: number) => {
  if (action === 'delete') {
    handleShowDeleteDialog(articleId)
  }
}

const handleShowDeleteDialog = (articleId: number) => {
  showDeleteDialog.value = true
  articleToDelete.value = articleId
}

const onHandleDelete = () => {
  if (articleToDelete.value) {
    loading.value.delete = true

    deleteArticle({ id: articleToDelete.value })
      .then(() => {
        articles.value =
          articles.value?.filter(
            article => article.id !== articleToDelete.value,
          ) || null
        articleToDelete.value = null
        showAlert('Well done! Article deleted successful', 'success')
      })
      .finally(() => {
        loading.value.delete = false
        showDeleteDialog.value = false
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

      <table class="table">
        <thead>
          <tr>
            <th
              v-for="(header, headerIndex) in headers"
              :key="`header_${headerIndex}`"
              scope="col"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody v-if="articles && articles.length">
          <tr v-for="(article, index) in articles" :key="index">
            <th scope="row">{{ article.id }}</th>
            <td>{{ article.title }}</td>
            <td>{{ article.author }}</td>
            <td>{{ article.tags.join(',') }}</td>
            <td>{{ article.excerpt }}</td>
            <td>{{ convertDate(article.created_at) }}</td>
            <td>
              <Dropdown
                :menu-items="[
                  {
                    label: 'Edit',
                    type: 'link',
                    path: '/dashboard/articles/edit/' + article.id,
                  },
                  {
                    label: 'Delete',
                    type: 'action',
                    action: 'delete',
                  },
                ]"
                @handleAction="
                  (actionType: string) =>
                    handleDropdownAction(actionType, article.id)
                "
              />
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="articles === null">
          <tr
            v-for="placeholderIndex in 6"
            :key="`placeholder_${placeholderIndex}`"
          >
            <td v-for="rowIndex in headers.length" :key="`row_${rowIndex}`">
              <h5 class="placeholder-glow">
                <span class="placeholder col-4"></span>
              </h5>
            </td>
          </tr>
        </tbody>
        <p v-else>No Record Found</p>
      </table>
    </div>

    <Modal
      title="Delete Article"
      message="Are you sure to delete Article?"
      cancel-text="No"
      confirm-text="Yes"
      :is-visible="showDeleteDialog"
      :loading="loading.delete"
      @confirm="onHandleDelete"
    />

    <div
      v-if="paging.prevPage && paging.nextPage"
      class="d-flex justify-content-center"
    >
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="paging.prevPage ? '' : 'disabled'">
            <RouterLink
              :to="`/dashboard/articles${paging.prevPage && paging.prevPage > 1 ? '/page/' + paging.prevPage : ''}`"
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
