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
  urlSlug: string
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
  id: number
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

export interface IProductItem {
  id: number
  name: string
  categoryName: string
  priority: number
  description: string
  images: string[]
  price: number
}

export interface IProductSearchResult {
  products: Array<IProductItem>
  pages: number
  currentPage: number
  total: number
  categoryName: string
}

export interface IProductSearch {
  name: string
  price: number | string
  categorySlug: string
  page: number | string
}

export interface IProductsEdit {
  id: number
  name: string
  priority: number
  categoryId: number
  price: number
  description: string
  ids: number[]
}

export interface IProductImageItem {
  id: number
  name: string
}

export interface IProductGetItem {
  id: number | string | undefined
  name: string
  priority: number
  categoryId: number
  price: number
  description: string
  images: IProductImageItem[]
}