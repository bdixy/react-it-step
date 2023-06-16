import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import http from '../../../http/http-common'
import { ICategorySelect, IProductSearch, IProductSearchResult } from '../types'
import classNames from 'classnames'
import ModalDeleteLesson from '../../common/Modals/ModalDeleteLesson'
import parse from 'html-react-parser'
import { useFormik } from 'formik'
import InputGroup from '../../common/InputGroup'

const ListProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [list, setList] = useState<IProductSearchResult>()
  const [search, setSearch] = useState<IProductSearch>({
    name: searchParams.get('name') || '',
    price: searchParams.get('price') || '',
    categorySlug: searchParams.get('categorySlug') || '',
    page: searchParams.get('page') || 1
  })
  const [categories, setCategories] = useState<ICategorySelect[]>([])

  useEffect(() => {
    http.get<ICategorySelect[]>('api/categories/list')
      .then(res => setCategories(res.data))
  }, [])

  const onSubmitSearch = (values: IProductSearch) => {
    setSearch(values)
  }

  const formik = useFormik({
    initialValues: search,
    onSubmit: onSubmitSearch
  })

  useEffect(() => {
    http.get<IProductSearchResult>('api/products/search', {
      params: search
    })
      .then(res => setList(res.data))
      .catch(e => console.log(e))
  }, [search])

  const {products, pages, currentPage} = list || {pages: [], currentPage: 0}

  const buttons = []
  for (let i = 1; i <= pages; i++) {
    buttons.push(i)
  }

  const pagination = buttons.map(item => (
    <li key={item} className={classNames('page-item', {
      'active': item === currentPage
    })}>
      <Link
        className="page-link"
        to={`?page=${item}`}
        onClick={() => setSearch({...search, page: item})}
      >
        {item}
      </Link>
    </li>
  ))

  const onDelete = async (id: number) => {
    try {
      await http.delete(`/api/products/delete/${id}`)
      setSearch({...search, page: 1})
    } catch (e) {
      console.log(e)
    }
  }

  const viewList = products?.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>
        {item.images.map(img => (
          img && <img key={img} src={`${import.meta.env.VITE_API_URL}images/50_${img}`} alt={img}/>
        ))}
        {/*{item.images && <img src={`${import.meta.env.VITE_API_URL}images/50_${item.images[0]}`} alt={item.images[0]}/>}*/}
      </td>
      <td>
        <Link className="text-decoration-none text-dark" to={`/admin/products/${item.id}`}>{item.name}</Link>
      </td>
      <td>{item.price}</td>
      <td>{item.categoryName}</td>
      <td>{parse(item.description)}</td>
      <td>
        <ModalDeleteLesson
          id={item.id}
          text={`Ви дійсно бажаєте видалити '${item.name}'?`}
          deleteFunc={onDelete}
        />
        {/*&nbsp;*/}
      </td>
      <td>
        <Link className="btn btn-primary" to={`edit/${item.id}`}>Змінити</Link>
      </td>
    </tr>
  ))

  const {values, touched, errors, handleSubmit, handleChange, setFieldValue} = formik

  const viewCategoriesOption = categories.map((item) => (
    <option key={item.id} value={item.id}>{item.title}</option>
  ))

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <InputGroup
              label="Назва"
              field="name"
              value={values.name}
              onChange={handleChange}
              error={errors.name}
              touched={touched.name}
            />
          </div>
          <div className="col-md-3">
            <InputGroup
              label="Ціна"
              field="price"
              value={values.price}
              onChange={handleChange}
              error={errors.price}
              touched={touched.price}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="categorySlug" className="form-label">
              Оберіть категорію
            </label>
            <select
              className={classNames("form-select", {
                "is-invalid": errors.categorySlug && touched.categorySlug,
              })}
              defaultValue={values.categorySlug}
              aria-label="Default select example"
              onChange={handleChange}
              name="categorySlug"
              id="categorySlug"
            >
              <option value="0">
                Оберіть категорію
              </option>
              {viewCategoriesOption}
            </select>
          </div>
          <div className="col-md-3">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Шукати
            </button>
          </div>
        </div>
      </form>

      <Link to="/admin/products/add" className="btn btn-success">
        Додати
      </Link>

      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Фото</th>
          <th scope="col">Назва</th>
          <th scope="col">Ціна</th>
          <th scope="col">Категорія</th>
          <th scope="col">Опис</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>{viewList}</tbody>
      </table>

      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled">
            <span className="page-link">Previous</span>
          </li>
          {pagination}
          <li className="page-item">
            <a className="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default ListProductsPage