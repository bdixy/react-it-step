import { ChangeEvent, FormEvent, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import setAuthToken from '../../../helpers/setAuthToken'
import http from '../../../http/http-common'
import InputGroup from '../../common/InputGroup'
import { ILoginPage, ILoginPageError, IUser } from './types'
import jwt_decode from 'jwt-decode'

const LoginPage = () => {

  // екземлеяр на основі інтерфейсу ILoginPage
  const init: ILoginPage = {
    email: "",
    password: ""
  }

  // створено useState, які приймають певні параметри
  const [data, setData] = useState<ILoginPage>(init)
  const [error, setError] = useState<ILoginPageError[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError([]) // очистка масиву помилок
    setLoading(true) // початок анамації

    // запит на сервер
    http.post("api/account/login", data)

      .then(res => { // якщо немає помилок, то виводить в консоль, що вхід успішний
        const token = res.data.token as string
        setAuthToken(token)
        const user = jwt_decode<IUser>(token)
        console.log("Вхід успішний", user.name)
      })
      .catch(badRequest => { // відловлення помилок
        const errors = badRequest.response.data.errors as ILoginPageError // приведення об'єкта до типу ILoginPageError
        console.log("Вхід не успішний", badRequest.response.data)
        console.log("Errors ", errors)
        setError([errors]) // запис помилок в масив
      })

    // щоб було видно анімацію
    setTimeout(() => {
      setLoading(false) // кінець анімації
    }, 500)
  }

  // const viewEmailError = error.map((e, index) => (
  //   <div key={index}>
  //     {e.email}
  //   </div>
  // ))

  // const viewPasswordError = error.map((e, index) => (
  //   <div key={index}>
  //     {e.password && e.password}
  //     {e.invalid && e.invalid}
  //   </div>
  // ))

  // функція, яка приймає тип помилки та відображає її
  const viewError = (type: string) => {
    return error.map((e, index) => (
      <div key={index}>
        {e[type]}
      </div>
    ))
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  return (
    <>
      <h1 className="text-center">Вхід на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <InputGroup
          label="Електронна адреса"
          field="email"
          value={data.email}
          onChange={onChangeHandler}
        />
        <div id="validationServerEmailFeedback" className="invalid-feedback mb-3" style={{display: 'block'}}>
          {viewError('email')}
        </div>

        <InputGroup
          label="Пароль"
          type="password"
          field="password"
          value={data.password}
          onChange={onChangeHandler}
        />
        <div id="validationServerPasswordFeedback" className="invalid-feedback mb-3" style={{display: 'block'}}>
          {viewError('password')}
          {viewError('invalid')}
        </div>

        <button type="submit" className="btn btn-primary">
          {loading && <Spinner animation="border" size="sm" variant="light"/>}
          {loading ? ' Завантаження...' : 'Вхід'}
        </button>
      </form>
    </>
  );
};

export default LoginPage