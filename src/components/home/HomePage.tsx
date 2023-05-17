import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import http from '../../http/http-common'
import DeleteModal from '../common/Modals/DeleteModal'
import Carousel from './Carousel'
import { ICategoryItem } from '../admin/types'

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([])
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    http.get<ICategoryItem[]>("api/Categories/list")
      .then(res => {
        setList(res.data)
      })
  }, [])

  const onDeleteHandle = async () => {
    try {
      await http.delete(`api/categories/delete/${deleteId}`)
    } catch (e) {
      console.log(e)
    }

    setShowModal(false)
  }

  const onDelete = (id: number) => {
    setDeleteId(id)
    setShowModal(true)
  }

  const viewList = list.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>
        {item.image && <img src={`${import.meta.env.VITE_API_URL}images/50_${item.image}`} alt={item.image}/>}
      </td>
      <td>{item.title}</td>
      <td>
        <button onClick={() => onDelete(item.id)} type="button" className="btn btn-danger">Видалити</button>
      </td>
    </tr>
  ))

  return (
    <>
      <DeleteModal show={showModal} onClose={() => setShowModal(false)} onDelete={onDeleteHandle}/>
      <Carousel/>
      <h1 className="text-center">Головна сторінка</h1>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Фото</th>
          <th scope="col">Назва</th>
          <th scope="col">Кнопка видалення</th>
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