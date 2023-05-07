import classNames from 'classnames'
import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
import http from '../../http/http-common'
import InputFileGroup from '../common/InputFileGroup'
import InputGroup from '../common/InputGroup'

interface ICategories {
  title: string
  urlSlug: string
  priority: number
  image: string | null
}

const AddCategoriesPage = () => {
  const init: ICategories = {
    title: "",
    urlSlug: "",
    priority: 0,
    image: ""
  }

  const [data, setData] = useState<ICategories>(init)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const onSubmitHandler = async (e: any) => {
    e.preventDefault()

    setLoading(true)

    try {
      await http.post('api/categories/add', data)
      navigate("/")
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
      <h1 className="text-center">Додавання категорій</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <InputGroup
          label="Назва категорії"
          type="text"
          field="title"
          value={data.title}
          onChange={onChangeHandler}
        />

        <InputGroup
          label="Slug"
          type="text"
          field="urlSlug"
          value={data.urlSlug}
          onChange={onChangeHandler}
        />

        <InputGroup
          label="Приорітет"
          type="text"
          field="priority"
          value={data.priority}
          onChange={onChangeHandler}
        />

        <InputFileGroup
          label="Оберіть фото для категорії"
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

export default AddCategoriesPage