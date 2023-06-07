import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IProductItem } from '../admin/types'
import http from '../../http/http-common'
import { Spinner } from 'react-bootstrap'
import parse from 'html-react-parser'

type Params = {
  id: string
}

type Image = {
  name: string
}

const ProductDetail = () => {
  const {id} = useParams<Params>()

  const [product, setProduct] = useState<IProductItem | null>(null)

  useEffect(() => {
    http.get(`/api/products/get/${id}`)
      .then(res => setProduct(res.data))
  }, [id])

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <Spinner animation="grow"/>
      </div>
    )
  }

  return (
    <div className="container min-vh-100">
      <div className="row justify-content-center mt-3">
        <div className="col-md-6 col-lg-4">
          {product.images.map((img: Image | string) => (
            typeof img === 'object' ? (
              <img key={(img as Image).name} src={`${import.meta.env.VITE_API_URL}images/300_${(img as Image).name}`}
                   alt={(img as Image).name}/>
            ) : null
          ))}
        </div>
        <div className="col-md-6 col-lg-4">
          <h1>{product.name}</h1>
          <h3 className="">₴{product.price}</h3>
          <div>

          </div>
          <div>
            <h6>Інформація про товар</h6>
            <div>{parse(product.description)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail