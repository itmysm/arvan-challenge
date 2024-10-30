export interface getArticlesResponse {
  curPage: number,
  nextPage: number,
  prevPage: null,
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