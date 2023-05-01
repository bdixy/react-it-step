export interface IRegisterPage {
  email: string
  password: string
  image: File | null
  countryId: number
}

export interface ISelectItem {
  id: number
  name: string
}