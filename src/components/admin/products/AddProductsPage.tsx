import classNames from 'classnames'
import { useFormik } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import * as yup from 'yup'
import http from '../../../http/http-common'
import InputGroup from '../../common/InputGroup'
import { ICategorySelect, IProducts } from '../types'
import InputFileProductGroup from '../../common/InputFileProductGroup'
import { useNavigate } from 'react-router-dom'

const AddProductsPage = () => {
  const [products, setProducts] = useState<ICategorySelect[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const init: IProducts = {
    name: '',
    priority: 0,
    categoryId: 0,
    price: 0,
    description: '',
    ids: []
  }

  const navigate = useNavigate()

  useEffect(() => {
    http.get<ICategorySelect[]>('api/categories/list')
      .then(res => setProducts(res.data))
  }, [])

  const onFormikSubmit = async (values: IProducts) => {
    try {
      await http.post("api/products/add", values)
      navigate("/admin/products/list")
    } catch (e) {
      console.log(e)
    }
  }

  const validSchema = yup.object({
    name: yup.string().required("Вкажіть назву"),
    priority: yup.number().min(1, 'Приорітет має бути більше 0'),
    categoryId: yup.number().min(1, 'Оберіть категорію'),
    description: yup.string().required("Вкажіть опис"),
    price: yup.number().required("Вкажіть ціну"),
    ids: yup.array().of(yup.number())
      .min(1, 'Мінімум одна фотка для товару')
      .required('Оберіть хочаб одне фото'),
  });

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

            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Оберіть категорію
              </label>
              <select
                className={classNames("form-select", {
                  "is-invalid": errors.categoryId && touched.categoryId,
                })}
                defaultValue={values.categoryId}
                aria-label="Default select example"
                onChange={handleChange}
                name="categoryId"
                id="categoryid"
              >
                <option value="0" disabled>
                  Оберіть категорію
                </option>
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

        <InputFileProductGroup
          label="Оберіть фото для товару"
          field="image"
          error={errors.ids}
          touched={touched.ids}
          onSelectFile={(id) => setFieldValue('ids', [...values.ids, id])}
        />

        <button type="submit" className={classNames('btn btn-primary', {
          'disabled': loading
        })}>
          {loading && <Spinner animation="border" size="sm" variant="light"/>}
          {loading ? ' Завантаження...' : 'Додати'}
        </button>
      </form>
    </>
  )
}

export default AddProductsPage