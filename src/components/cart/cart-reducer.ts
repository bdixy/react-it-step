import { CartActionType, ICart } from './types'

const initState: ICart = {
  cart: []
}

export const cartReducer = (state = initState, action: any): ICart => {
  switch (action.type) {
    case CartActionType.CART_LIST:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    case CartActionType.CART_REMOVE:
      return {
        ...state,
        cart: state.cart.filter((productId) => productId !== action.payload)
      }
  }

  return state
}