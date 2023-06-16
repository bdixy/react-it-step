export interface ICart {
  cart: number[]
}

export enum CartActionType {
  CART_LIST='CART_LIST',
  CART_REMOVE='CART_REMOVE'
}