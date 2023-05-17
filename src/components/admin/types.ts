export interface ICategoryItem {
  id: number
  title: string
  urlSlug: string
  priority: number
  image: string
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