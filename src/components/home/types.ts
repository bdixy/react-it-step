import { IProductItem } from '../admin/types'

export interface IProductHomePage {
  products: Array<IProductItem>
  pages: number
  currentPage: number
  total: number
  categoryName: string
}