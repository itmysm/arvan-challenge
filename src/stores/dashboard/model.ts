export interface getArticlesResponse {
  curPage: number | null,
  nextPage: number | null,
  prevPage: number | null,
  items: Article[]
}

export type getTagsResponse = Tag[]

export interface Tag {
  id: number,
  created_at: number,
  title: string,
}

export interface Article {
  id: number
  title: string,
  author: string,
  tags: string[],
  body: string,
  excerpt: string,
  created_at: number,
}