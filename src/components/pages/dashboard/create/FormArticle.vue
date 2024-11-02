<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useAlertStore } from '@/stores/alert'
import { useDashboardStore } from '@/stores/dashboard'
import type { Article, Tag } from '@/stores/dashboard/model'

interface ExtendedTag extends Tag {
  checked: boolean
}

const props = defineProps<{
  initialArticleModel?: Article
  isEditMode?: boolean
}>()

const { addArticle, getTagsList, addTagItem, updateArticle } =
  useDashboardStore()
const { showAlert } = useAlertStore()

const articleForm = ref()
const articleModel = ref({
  id: 0,
  title: '',
  description: '',
  body: '',
  selectedTags: [] as string[],
})

const loading = ref({
  submit: false,
  tags: true,
})

const newTag = ref<string | null>(null)
const tagList = ref<ExtendedTag[] | null>(null)

const addTag = () => {
  if (newTag.value && tagList.value?.some(tag => tag.title === newTag.value)) {
    showAlert('Tag already exists.', 'danger')
  } else if (newTag.value) {
    addTagItem({ title: newTag.value })
      .then(response => {
        const addedTag = { ...response, checked: true }
        loading.value.tags = true
        newTag.value = null
        showAlert('Tag added successfully', 'success')
        tagList.value?.push(addedTag)
        updateSelectedTags(addedTag)
      })
      .finally(() => (loading.value.tags = false))
  }
}

const onGetTagList = async () => {
  loading.value.tags = true
  const tags = await getTagsList()
  tagList.value = tags.map(tag => ({
    ...tag,
    checked: articleModel.value.selectedTags.includes(tag.title),
  }))
  loading.value.tags = false
}

onMounted(() => {
  if (props.isEditMode && props.initialArticleModel) {
    const { id, title, excerpt, body, tags } = props.initialArticleModel
    articleModel.value = {
      id,
      title,
      description: excerpt,
      body,
      selectedTags: tags.map(tag => tag),
    }
  }
  onGetTagList()
})

const isFormValid = computed(() => {
  return (
    articleModel.value.title.trim() !== '' &&
    articleModel.value.selectedTags.length > 0
  )
})

const titleError = computed(() => !articleModel.value.title.trim())

const updateSelectedTags = (tag: ExtendedTag) => {
  if (tag.checked) {
    if (!articleModel.value.selectedTags.includes(tag.title)) {
      articleModel.value.selectedTags.push(tag.title)
    }
  } else {
    articleModel.value.selectedTags = articleModel.value.selectedTags.filter(
      title => title !== tag.title,
    )
  }
}

const onSubmitArticle = () => {
  loading.value.submit = true
  const articleData = {
    articles_id: articleModel.value.id,
    title: articleModel.value.title,
    excerpt: articleModel.value.description,
    tags: articleModel.value.selectedTags,
    author: 'admin',
  }

  if (props.isEditMode) {
    updateArticle(articleData)
      .then(() => {
        showAlert('Well done! Article updated successfully', 'success')
        onResetForm()
      })
      .catch(error => {
        const errorMessages = error.response?.data?.message
        showAlert(errorMessages || 'Cannot reach the server', 'danger')
      })
      .finally(() => (loading.value.submit = false))
  } else {
    addArticle(articleData)
      .then(() => {
        showAlert('Well done! Article created successfully', 'success')
        onResetForm()
      })
      .catch(error => {
        const errorMessages = error.response?.data?.message
        showAlert(errorMessages || 'Cannot reach the server', 'danger')
      })
      .finally(() => (loading.value.submit = false))
  }
}

const onResetForm = () => {
  articleModel.value = {
    id: 0,
    title: '',
    description: '',
    body: '',
    selectedTags: [],
  }
}
</script>

<template>
  <form @submit.prevent="onSubmitArticle" ref="articleForm">
    <div class="w-100 row">
      <div class="col-8">
        <div class="mb-3">
          <label for="title" class="form-label fw-semibold text-charcoal-grey"
            >Title</label
          >
          <input
            type="text"
            id="title"
            v-model="articleModel.title"
            :class="['form-control', titleError ? 'is-invalid' : '']"
            placeholder="Enter title"
            required
          />
          <div v-if="titleError" class="invalid-feedback">Required field</div>
        </div>

        <div class="mb-3">
          <label
            for="description"
            class="form-label fw-semibold text-charcoal-grey"
            >Description</label
          >
          <input
            type="text"
            id="description"
            v-model="articleModel.description"
            class="form-control"
            placeholder="Enter description"
          />
        </div>

        <div class="mb-3">
          <label for="body" class="form-label fw-semibold text-charcoal-grey"
            >Body</label
          >
          <textarea
            id="body"
            v-model="articleModel.body"
            class="form-control"
            rows="5"
            placeholder="Enter body"
          ></textarea>
        </div>
      </div>

      <div class="mb-3 col-4">
        <div class="w-100">
          <label for="newTag" class="form-label fw-semibold text-charcoal-grey"
            >Tags</label
          >
          <input
            type="text"
            id="newTag"
            v-model="newTag"
            class="form-control"
            placeholder="New tag"
            @change="addTag"
          />
        </div>
        <div class="w-100">
          <label class="form-label fw-semibold text-charcoal-grey mt-3"
            >Select Tags</label
          >
          <div class="border px-3 py-1" style="height: 220px; overflow-y: auto">
            <div v-if="loading.tags">
              <div
                v-for="placeholderItem in 10"
                class="d-flex placeholder-glow my-2"
              >
                <span class="placeholder w-25"></span>
              </div>
            </div>

            <div
              v-else
              v-for="(tag, index) in tagList"
              :key="index"
              class="form-check"
            >
              <input
                type="checkbox"
                :id="'tag-' + index"
                class="form-check-input"
                v-model="tag.checked"
                @change="updateSelectedTags(tag)"
              />
              <label :for="'tag-' + index" class="form-check-label">{{
                tag.title
              }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex">
      <button
        type="submit"
        class="btn btn-primary fw-light text-white mt-3 px-4 py-2"
        :disabled="!isFormValid || loading.submit"
      >
        <div
          v-show="loading.submit"
          class="spinner-border text-white spinner-border-sm"
          role="status"
        ></div>
        <span v-show="!loading.submit">
          {{ isEditMode ? 'Update' : 'Submit' }}
        </span>
      </button>
    </div>
  </form>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin-top: 20px;
}
</style>
