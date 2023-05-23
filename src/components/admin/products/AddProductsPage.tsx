import classNames from 'classnames'
import { useFormik } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import * as yup from 'yup'
import http from '../../../http/http-common'
import InputGroup from '../../common/InputGroup'
import { ICategorySelect, IProducts, IProductsPhoto } from '../types'

const AddProductsPage = () => {
  const [products, setProducts] = useState<ICategorySelect[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [photos, setPhotos] = useState<string | null>(null)

  const init: IProducts = {
    name: "",
    priority: 0,
    categoryId: 0,
    price: 0,
    description: "",
    ids: []
  }

  useEffect(() => {
    http.get<ICategorySelect[]>("api/categories/list")
      .then(res => setProducts(res.data))
  }, [])

  const onFormikSubmit = async (values: IProducts) => {
    // try {
    //   const file = values.ids && values.image[0]
    //   if (file) {
    //     const url = URL.createObjectURL(file)
    //     setPhotos(url)
    //     await uploadImage(file)
    //     console.log("Upload photo")
    //   }
    // } catch (error) {
    //   console.error("Error uploading photo", error)
    // }
  }

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("image", file)
      await http.post("api/products/upload", formData)
    } catch (error) {
      console.error("Error uploading image", error)
      throw error
    }
  }

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPhotos(url)
    }
  }

  const validSchema = yup.object({
    name: yup.string()
      .required("Вкажіть назву"),
    priority: yup.number().required("Вкажіть приорітет"),
    categoryId: yup.number().required("Вкажіть категорію (id)"),
    price: yup.number().required("Вкажіть ціну"),
    description: yup.string().required("Вкажіть опис")
  })

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: validSchema
  })

  const viewCategoriesOption = products.map((item) => (
    <option key={item.id} value={item.id}>{item.title}</option>
  ))

  const {values, touched, errors, handleSubmit, handleChange, setFieldValue} = formik

  return (
    <>
      <h1 className="text-center">Додавання товарів</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Назва товару"
              type="text"
              field="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
            />

            <InputGroup
              label="Приорітет"
              type="number"
              field="priority"
              value={values.priority}
              onChange={handleChange}
              error={errors.priority}
              touched={touched.priority}
            />

            {/*<InputGroup*/}
            {/*  label="ID категорії"*/}
            {/*  type="number"*/}
            {/*  field="categoryId"*/}
            {/*  value={values.categoryId}*/}
            {/*  onChange={handleChange}*/}
            {/*  error={errors.categoryId}*/}
            {/*  touched={touched.categoryId}*/}
            {/*/>*/}

            <div className="my-3">
              <label className="form-label" htmlFor="categoryId">
                Оберіть категорію
              </label>
              <select
                className="form-select"
                defaultValue={values.categoryId}
                aria-label="Default select example"
                name="categoryId"
                id="categoryId"
                onChange={handleChange}
              >
                <option value="0" disabled>Оберіть категорію</option>
                {viewCategoriesOption}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Ціна"
              type="number"
              field="price"
              value={values.price}
              onChange={handleChange}
              error={errors.price}
              touched={touched.price}
            />

            <InputGroup
              label="Опис"
              type="text"
              field="description"
              value={values.description}
              onChange={handleChange}
              error={errors.description}
              touched={touched.description}
            />
          </div>
        </div>

        {/*<InputFileGroup*/}
        {/*  label="Оберіть фото для товару"*/}
        {/*  field="image"*/}
        {/*  onSelectFile={(base64) => setData({...data, image: base64})}*/}
        {/*/>*/}

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