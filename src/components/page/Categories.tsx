import axios from 'axios'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'

interface ICategories {
  id: number
  title: string
  urlSlug: string
  priority: number
  image: string | null
}

const Categories = () => {
  const [categories, setCategories] = useState<ICategories[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onClick = async () => {
    setLoading(true)

    try {
      const request = await axios.get("https://f21.allin.ml/api/Categories/list")
      setCategories(request.data)
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  const categoriesView = categories.map((category) => (
    <div className="col-md-4 mt-3" key={category.id}>
      <div className="card w-100 bg-dark text-light border border-success">
        <div className="card-body">
          <h5 className="card-title">{category.title}</h5>
          <p className="card-text">urlSlug: {category.urlSlug}</p>
          <p className="card-text">priority: {category.priority}</p>
          {category.image && <img src={`https://f21.allin.ml/images/100_${category.image}`} alt={category.image}/>}
        </div>
      </div>
    </div>
  ))

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-4">
          <button onClick={onClick} className="btn btn-success w-75">
            {loading && <Spinner animation="border" size="sm" variant="light"/>}
            {loading ? ' Завантаження...' : 'Загрузити'}
          </button>
        </div>
      </div>
      <div className="row">
        {categoriesView}
      </div>
    </div>
  )
}

export default Categories