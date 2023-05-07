// інтерфейс, який описує 2 властивості типу string
export interface ILoginPage {
  email: string
  password: string
}

// інтерфейс, який описує 4 властивості типу string
export interface ILoginPageError {
  [type: string]: string | string[]
  email: string[]
  password: string[]
  invalid: string[]
}

export interface IUser {
  name: string
  image: string
  roles: string
}