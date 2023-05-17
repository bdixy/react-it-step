import classNames from 'classnames'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
import http from '../../../http/http-common'
import InputFileGroup from '../../common/InputFileGroup'
import InputGroup from '../../common/InputGroup'

interface IProducts {
  name: string
  priority: number
  categoryId: number
  price: number
  image: string | null
  description: string
}

const AddProductsPage = () => {
  const init: IProducts = {
    name: "",
    priority: 0,
    categoryId: 0,
    price: 0,
    image: "",
    description: ""
  }

  const [data, setData] = useState<IProducts>(init)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const onSubmitHandler = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    try {
      await http.post('api/products/add', data)
      navigate("/admin/products/list")
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <>
      <h1 className="text-center">Додавання товарів</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Назва товару"
              type="text"
              field="name"
              value={data.name}
              onChange={onChangeHandler}
            />

            <InputGroup
              label="Приорітет"
              type="number"
              field="priority"
              value={data.priority}
              onChange={onChangeHandler}
            />

            <InputGroup
              label="ID категорії"
              type="number"
              field="categoryId"
              value={data.categoryId}
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Ціна"
              type="number"
              field="price"
              value={data.price}
              onChange={onChangeHandler}
            />

            <InputGroup
              label="Опис"
              type="text"
              field="description"
              value={data.description}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <InputFileGroup
          label="Оберіть фото для товару"
          field="image"
          onSelectFile={(base64) => setData({...data, image: base64})}
        />

        <button type="submit" className={classNames("btn btn-primary", {
          "disabled": loading
        })}>
          {loading && <Spinner animation="border" size="sm" variant="light"/>}
          {loading ? ' Завантаження...' : 'Додати'}
        </button>
      </form>
    </>
  )
}

export default AddProductsPage