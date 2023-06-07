import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import http from '../../../http/http-common'
import { IProductSearch, IProductSearchResult } from '../types'
import classNames from 'classnames'
import ModalDeleteLesson from '../../common/Modals/ModalDeleteLesson'
import parse from 'html-react-parser'

const ListProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [list, setList] = useState<IProductSearchResult>()
  const [search, setSearch] = useState<IProductSearch>({
    page: searchParams.get("page") || 1
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
      setSearch({page: 1})
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
      <td>{item.categoryName}</td>
      <td>{parse(item.description)}</td>
      <td>
        <ModalDeleteLesson
          id={item.id}
          text={`Ви дійсно бажаєте видалити '${item.name}'?`}
          deleteFunc={onDelete}
        />
      </td>
    </tr>
  ))

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <Link to="/admin/products/add" className="btn btn-success">
        Додати
      </Link>

      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Фото</th>
          <th scope="col">Назва</th>
          <th scope="col">Категорія</th>
          <th scope="col">Опис</th>
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