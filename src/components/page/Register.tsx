import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { IRegisterPage } from '../../utils/types'

const Register = () => {

  const init: IRegisterPage = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
    file: ""
  }

  const [data, setData] = useState<IRegisterPage>(init)
  const [image, setImage] = useState<string | null>(null)

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({...data})
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onImageChange(e)
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className="container min-vh-100">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card w-100 p-4 mt-4 mb-5 border border-success text-light bg-dark">
              <h1 className="text-center mb-3">Register</h1>
              <form action="" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control bg-transparent text-light"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={data.firstName}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last name</label>
                  <input
                    type="text"
                    className="form-control bg-transparent text-light"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={data.lastName}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control bg-transparent text-light"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control bg-transparent text-light"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="re-password" className="form-label">Repeat password</label>
                  <input
                    type="password"
                    className="form-control bg-transparent text-light"
                    id="repeatPassword"
                    name="repeatPassword"
                    placeholder="Repeat password"
                    value={data.repeatPassword}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control bg-transparent text-light"
                    id="phone"
                    name="phone"
                    placeholder="Phone number"
                    value={data.phone}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">Select image</label>
                  <input
                    type="file"
                    className="form-control bg-transparent text-light"
                    id="file"
                    name="file"
                    placeholder="Select file"
                    value={data.file}
                    onChange={onChange}
                  />
                  {image && <img className="mt-3 w-100" src={image} alt="Image"/>}
                </div>
                <div className="d-flex flex-column text-center mt-3">
                  <button className="btn btn-lg btn-success w-100 mt-2 mb-3">Submit</button>
                  <p>Already has account? <Link className="text-success" to="/login">Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register