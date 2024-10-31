export interface getArticlesResponse {
  curPage: number | null,
  nextPage: number | null,
  prevPage: number | null,
  items: Article[]
}

export interface Article {
  id: number
  title: string
  author: string
  tags: string[]
  excerpt: string
  created_at: number
}