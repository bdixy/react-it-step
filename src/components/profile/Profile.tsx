import React, { useEffect, useState } from 'react'
import http from '../../http/http-common'
import { ICategoryItem } from '../admin/types'

interface IUserData {
  id: number
  email: string
  photo: string
}

const Profile = () => {
  const [data, setData] = useState<IUserData | null>(null)

  useEffect(() => {
    http.get<IUserData>("api/account/profile")
      .then(res => setData(res.data))
  }, [])

  return (
    <div className="container min-vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card w-100 p-4 mt-4 mb-5 border border-success text-light bg-dark">
            <h1 className="text-center mb-3">Profile</h1>
            <p>Email: {data?.email}</p>
            <p>ID: {data?.id}</p>
            {data?.photo && <img src={`${import.meta.env.VITE_API_URL}images/50_${data?.photo}`} alt={data?.photo}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile