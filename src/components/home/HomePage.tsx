import React, { useEffect, useState } from 'react'
import http from '../../http/http-common'
import Carousel from './Carousel'
import { ICategoryItem } from './types'

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([])

  useEffect(() => {
    http.get<ICategoryItem[]>("api/Categories/list")
      .then(res => setList(res.data))
  }, [])

  const viewList = list.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>
        {item.image && <img src={`https://f21.allin.ml/images/50_${item.image}`} alt={item.image}/>}
      </td>
      <td>{item.title}</td>
    </tr>
  ))

  return (
    <>
      <Carousel/>
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