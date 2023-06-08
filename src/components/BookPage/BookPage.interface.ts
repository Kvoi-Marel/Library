export interface IBook {
  id: string
  etag: string
  volumeInfo: {
    title: string
    description?: string
    categories?: string[]
    authors: string[]
    imageLinks?: {
      thumbnail: string
    }
  }
}
