import React, { useEffect, useState } from 'react'
import { IProductHomePage } from './types'
import http from '../../http/http-common'
import Carousel from './Carousel'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart, removeFromStorage, setToStorage } from '../../helpers/cart-utils'
import { ImBin } from 'react-icons/im'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const HomePage = () => {
  const [list, setList] = useState<IProductHomePage>()
  const [addedProducts, setAddedProducts] = useState<number[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    http.get<IProductHomePage>(`api/products/search`).then((res) => {
      setList(res.data)
    })
  }, [])

  useEffect(() => {
    const storedProducts = localStorage.getItem('cart')
    if (storedProducts)
      setAddedProducts(JSON.parse(storedProducts))
  }, [])

  const handleAdd = (productId: number) => {
    setToStorage(productId)
    setAddedProducts(prevProducts => [...prevProducts, productId])
    dispatch(addToCart(productId))
  }

  const handleRemove = (productId: number) => {
    removeFromStorage(productId)
    setAddedProducts(addedProducts.filter(id => id !== productId))
    dispatch(removeFromCart(productId))
  }

  return (
    <>
      <Carousel/>
      <h1 className="text-center">Товари</h1>
      <div className="row my-3">
        {list?.products.map(p => (
          <div key={p.id} className="col-md-4 mt-3">
            <div className="card h-100">
              <img
                style={{width: '100%', height: '250px', objectFit: 'contain'}}
                src={`${import.meta.env.VITE_API_URL}images/300_${p.images[0]}`}
                className="card-img-top p-2"
                alt="Козачка"
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/products/${p.id}`} className="text-decoration-none text-dark">
                    {p.name}
                  </Link>
                </h5>
                <p className="card-text">{p.categoryName}</p>
                <div className="d-flex justify-content-between">
                  <Link to="#" className="btn btn-primary">
                    Купить
                  </Link>
                  {addedProducts.includes(p.id) ? (
                    <button onClick={() => handleRemove(p.id)} className="btn text-danger">
                      <ImBin style={{width: '25px', height: '25px'}}/>
                    </button>
                  ) : (
                    <button onClick={() => handleAdd(p.id)} className="btn text-success">
                      <AiOutlineShoppingCart style={{width: '25px', height: '25px'}}/>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage