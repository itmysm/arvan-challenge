<template>
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
</template>

<script lang="ts" setup>
import type { Article } from '@/stores/dashboard/model'

const convertDate = (timeStamp: number) => {
  const date = new Date(timeStamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const headers = [
  { title: '#' },
  { title: 'Title' },
  { title: 'Author' },
  { title: 'Tags' },
  { title: 'Excerpt' },
  { title: 'Created' },
]
const props = defineProps<{
  articles: Article[] | null
}>()
</script>
