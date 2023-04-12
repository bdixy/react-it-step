import React, { useState } from 'react'
import { IProductItem,  } from '../../utils/types'

const Home = () => {
  const [products, setProducts] = useState<IProductItem[]>([
    {
      id: 1,
      name: "Milk",
      price: 34,
      description: "Something desc about milk"
    },
    {
      id: 2,
      name: "Butter",
      price: 100,
      description: "Something desc about butter"
    },
    {
      id: 3,
      name: "Bread",
      price: 47,
      description: "Something desc about bread"
    }
  ])

  const onClick = () => {
    const item: IProductItem = {
      id: Date.now(),
      name: "New product",
      price: Math.round(Math.random() * 100),
      description: "Something desc about new product"
    }

    setProducts([...products, item])
  }

  const productView = products.map((product) => (
    <div className="col-md-4 mt-3" key={product.id}>
      <div className="card w-100 bg-dark text-light border border-success">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}.</p>
          <p>{product.price} UAH</p>
        </div>
      </div>
    </div>
  ))

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-4">
            <button onClick={onClick} className="btn btn-success w-75">Add new product</button>
          </div>
        </div>
        <div className="row">
          {productView}
        </div>
      </div>
    </>
  )
}

export default Home