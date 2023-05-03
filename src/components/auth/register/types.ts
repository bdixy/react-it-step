export interface IRegisterPage {
  email: string
  firstName: string
  secondName: string
  photo: string
  phone: string
  password: string
  confirmPassword: string
  //countryId: number
}

export interface IRegisterError {
  email: string[]
  firstName: string[]
  secondName: string[]
  phone: string[]
  photo: string[]
  password: string[]
  confirmPassword: string[]
}

export interface ISelectItem {
  id: number
  name: string
}