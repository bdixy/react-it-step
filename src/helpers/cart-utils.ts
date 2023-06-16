import { CartActionType } from '../components/cart/types'

export const addToCart = (productId: number) => ({
  type: CartActionType.CART_LIST,
  payload: productId
})

export const removeFromCart = (productId: number) => ({
  type: CartActionType.CART_REMOVE,
  payload: productId
})

export const setToStorage = (id: number | number[]) => {
  if (id) {
    let cart = localStorage.getItem('cart')
    let cartArray = []

    if (cart)
      cartArray = JSON.parse(cart)

    cartArray.push(id)

    localStorage.setItem('cart', JSON.stringify(cartArray))
  }
}

export const removeFromStorage = (id: number) => {
  const items = JSON.parse(localStorage.getItem('cart')!) as number[]
  const updated = items.filter(x => x !== id)
  localStorage.setItem('cart', JSON.stringify(updated))
}