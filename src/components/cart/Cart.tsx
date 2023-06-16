import React, { useEffect, useState } from 'react'
import { ImBin } from 'react-icons/im'
import { IProductItem } from '../admin/types'
import http from '../../http/http-common'
import { useDispatch, useSelector } from 'react-redux'
import { ICart } from './types'
import Count from './Count'
import { removeFromStorage } from '../../helpers/cart-utils'

const Cart = () => {
  const [list, setList] = useState<IProductItem[]>([])
  const {cart} = useSelector((store: any) => (store.cart as ICart))
  const dispatch = useDispatch()

  useEffect(() => {
    if (cart.flat().length > 0) {
      http.get('api/products/list')
        .then(res => {
          //const filteredProducts = res.data.filter((product: { id: number }) => cart.flat().some((id: number) => id === product.id))
          const filteredProducts = res.data.filter((product: { id: number }) => cart.flat().includes(product.id))
          setList(filteredProducts)
        })
        .catch(error => {
          console.log('Error fetching products:', error)
        })
    }
  }, [cart])

  const handleRemove = (productId: number) => {
    removeFromStorage(productId)
    setList(list.filter(x => x.id !== productId))
    // dispatch({type: CartActionType.CART_LIST, list})
  }

  const viewCart = list.map(i => (
    <div key={i.id} className="card rounded-3 mb-4">
      <div className="card-body p-4">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img
              src={`${import.meta.env.VITE_API_URL}images/300_${i.images[0]}`}
              className="img-fluid rounded-3" alt={i.name}/>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <p className="lead fw-normal mb-2">{i.name}</p>
            <p><span className="text-muted">Category: </span>{i.categoryName}</p>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
            <Count name={i.name}/>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 className="mb-0">₴{i.price}</h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <button className="btn text-danger" onClick={() => handleRemove(i.id)}>
              <ImBin/>
            </button>
          </div>
        </div>
      </div>
    </div>
  ))

  return (
    <div className="container h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-normal mb-0 text-black">Кошик</h3>
          </div>
          {viewCart}
          <button type="button" className="btn btn-warning btn-block btn-lg text-light w-100">Перейти до оплати</button>
        </div>
      </div>
    </div>
  )
}

export default Cart