import { ChangeEvent, useState } from 'react'
import InputFileGroup from '../../common/InputFileGroup'
import InputGroup from '../../common/InputGroup'
import { IRegisterPage, ISelectItem } from './types'

const RegisterPage = () => {

  // екземлеяр на основі інтерфейсу IRegisterPage
  const init: IRegisterPage = {
    email: "",
    password: "",
    image: null,
    countryId: 0
  }

  // створено useState, які приймають певні параметри
  const [data, setData] = useState<IRegisterPage>(init)
  const [countries, setCountries] = useState<ISelectItem[]>([
    {
      id: 1,
      name: "Україна"
    },
    {
      id: 2,
      name: "Польща"
    },
    {
      id: 3,
      name: "Чехія"
    }
  ])

  // функція, яка "відправляє" дані на сервер
  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    console.log("Ми відправляємо на сервер", data)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  // змінна, яка записує інформації про країна з масиву countries, у якому для кожного елемента виконується map
  const viewCountriesOption = countries.map((country) => (
    <option key={country.id} value={country.id}>{country.name}</option>
  ))

  return (
    <>
      <h1 className="text-center">Реєстрація на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <InputGroup label="Електронна адреса" field="email" value={data.email} onChange={onChangeHandler}/>

        <div className="mb-3">
          <label htmlFor="countryId" className="form-label">
            Країна
          </label>
          <select name="countryId" value={data.countryId} onChange={onChangeHandler} className="form-select" id="countryId">
            <option>Оберіть країну</option>
            {viewCountriesOption}
          </select>
        </div>

        <InputFileGroup field="image" onSelectFile={(file) => setData({...data, image: file})}/>
        <InputGroup label="Пароль" type="password" field="password" value={data.password} onChange={onChangeHandler}/>

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  )
}

export default RegisterPage