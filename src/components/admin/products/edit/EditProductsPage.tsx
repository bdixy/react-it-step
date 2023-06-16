import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import http from '../../../../http/http-common'
import { ICategorySelect, IProductGetItem, IProductImageItem, IProductsEdit } from '../../types'
import classNames from 'classnames'
import * as yup from 'yup'
import { useFormik } from 'formik'
import InputGroup from '../../../common/InputGroup'
import EditorTiny from '../../../common/EditorTiny'
import InputFileProductGroup from '../../../common/InputFileProductGroup'

type Params = {
  id: string
}

const EditProductsPage = () => {
  const {id} = useParams<Params>()
  const [categories, setCategories] = useState<ICategorySelect[]>([])
  const [imgViews, setImgViews] = useState<IProductImageItem[]>([])
  const navigate = useNavigate()

  const init: IProductsEdit = {
    id: id ? Number(id) : 0,
    name: '',
    priority: 0,
    categoryId: 0,
    price: 0,
    description: '',
    ids: []
  }

  const onFormikSubmit = async (values: IProductsEdit) => {
    try {
      await http.put('api/products/edit', {
        id: values.id,
        name: values.name,
        priority: values.priority,
        categoryId: values.categoryId,
        price: values.price,
        description: values.description,
        ids: values.ids
      })
      navigate('../..')
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
  })

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: validSchema
  })

  const viewCategoriesOption = categories.map((item) => (
    <option key={item.id} value={item.id}>{item.title}</option>
  ))

  const {values, touched, errors, handleSubmit, handleChange, setFieldValue} = formik

  useEffect(() => {
    http.get<ICategorySelect[]>("api/categories/list").then((resp) => {
      setCategories(resp.data)
      http.get<IProductGetItem>(`api/products/get/${id}`).then((res) => {
        const product = res.data

        setFieldValue("name", product.name)
        setFieldValue("categoryId", product.categoryId)
        setFieldValue("description", product.description)
        setFieldValue("price", product.price)
        setFieldValue("priority", product.priority)
        let ids = []
        for (let i = 0; i < product.images.length; i++)
          ids.push(product.images[i].id)
        setFieldValue("ids", ids)
        setImgViews(product.images)
      })
    })
  }, [id])

  return (
    <div>
      <h1 className="text-center">Зміна товару</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
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

        <InputGroup
          label="Ціна"
          type="number"
          field="price"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
          touched={touched.price}
        />

        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Оберіть категорію
          </label>
          <select
            className={classNames("form-select", {
              "is-invalid": errors.categoryId && touched.categoryId,
            })}
            value={values.categoryId}
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

        <EditorTiny
          label="Опис"
          field="description"
          value={values.description}
          error={errors.description}
          touched={touched.description}
          onEditorChange={(text) => setFieldValue("description", text)}
        />

        <InputFileProductGroup
          label="Оберіть фото товару"
          field="imageSelect"
          error={errors.ids}
          touched={touched.ids}
          onSelectFile={(id) => {
            setFieldValue("ids", [...values.ids, id])
          }}
          onRemoveFile={(id) => {
            setFieldValue(
              "ids",
              values.ids.filter((x) => x !== id)
            )
          }}
          imgView={imgViews}
        />

        <button type="submit" className="btn btn-primary">
          Зберегти
        </button>
      </form>
    </div>
  )
}

export default EditProductsPage