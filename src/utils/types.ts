export interface IRegisterPage {
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
  phone: string
  file: string
}

export interface IProductItem {
  id?: number
  name: string
  price: number
  description: string
  image?: File | null
}