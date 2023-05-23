export interface ICategoryItem {
  id: number
  title: string
  urlSlug: string
  priority: number
  image: string
}

export interface ICategorySelect {
  id: number
  title: string
}

export interface IProducts {
  name: string
  priority: number
  categoryId: number
  price: number
  description: string
  ids: number[]
}

export interface IProductsPhoto {
  id: number,
  name: string
}

export interface IProductsItem {
  id: number
  name: string
  categoryName: string
  priority: number
  price: number
  description: string
  images: string[]
}