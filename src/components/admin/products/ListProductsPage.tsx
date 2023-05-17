import { useEffect, useState } from 'react'
import http from '../../../http/http-common'
import { IProductsItem } from '../types'

const HomePage = () => {
  const [list, setList] = useState<IProductsItem[]>([])

  useEffect(() => {
    http.get('api/products/list').then(res => setList(res.data)).catch(e => console.log(e))
  }, [])

  const viewList = list.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>
        {item.images && <img src={`${import.meta.env.VITE_API_URL}images/50_${item.images[0]}`} alt={item.images[0]}/>}
      </td>
      <td>{item.name}</td>
    </tr>
  ))

  return (
    <>
      <h1 className="text-center">Головна сторінка</h1>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Фото</th>
          <th scope="col">Назва</th>
        </tr>
        </thead>
        <tbody>
        {viewList}
        </tbody>
      </table>
    </>
  )
}

export default HomePage