import { useFormik } from 'formik'
import { ChangeEvent, useState } from 'react'
import http from '../../../http/http-common'
import InputFileGroup from '../../common/InputFileGroup'
import InputGroup from '../../common/InputGroup'
import { IRegisterError, IRegisterPage, ISelectItem } from './types'
import * as yup from 'yup'

const RegisterPage = () => {

  // екземлеяр на основі інтерфейсу IRegisterPage
  const init: IRegisterPage = {
    email: "",
    firstName: "",
    secondName: "",
    photo: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }

  // створено useState, які приймають певні параметри
  // const [data, setData] = useState<IRegisterPage>(init)
  const [error, setError] = useState<IRegisterError>()
  // const [countries, setCountries] = useState<ISelectItem[]>([
  //   {
  //     id: 1,
  //     name: "Україна"
  //   },
  //   {
  //     id: 2,
  //     name: "Польща"
  //   },
  //   {
  //     id: 3,
  //     name: "Чехія"
  //   }
  // ])

  // const validation = async (e: any) => {
  //   e.preventDefault()
  //
  //   const errors: IRegisterError = {} as IRegisterError
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  //   const phoneRegex = /^(\+38)?\s?(\(0\d{2}\)|0\d{2})\s?\d{3}\s?\d{2}\s?\d{2}$/
  //
  //   if (data.password.length < 5 || !data.password)
  //     errors.password = ['Пароль є обов\'язковим! Пароль повинен містити мінімум 5 символів']
  //   if (data.confirmPassword != data.password)
  //     errors.confirmPassword = ['Паролі не співпадають']
  //   if (!data.confirmPassword)
  //     errors.confirmPassword = ['Підтвердження паролю є обов\'язковим!']
  //   if (!data.firstName)
  //     errors.firstName = ['Це поле є обов\'язковим']
  //   if (!data.secondName)
  //     errors.secondName = ['Це поле є обов\'язковим']
  //   if (!emailRegex.test(data.email))
  //     errors.email = ['Пошта введена некоректно']
  //   if (!phoneRegex.test(data.phone))
  //     errors.phone = ['Номер телефону не відповідає українським нормам']
  //   if (!data.photo)
  //     errors.photo = ['Аватар не вибрано']
  //
  //   if (Object.keys(errors).length > 0) {
  //     setError(errors)
  //   } else {
  //     await onSubmitHandler(e)
  //   }
  // }

  // функція, яка "відправляє" дані на сервер
  // const onSubmitHandler = async (e: any) => {
  //   e.preventDefault()
  //
  //   // validation()
  //
  //   try {
  //     const response = await http.post("api/account/register", data)
  //
  //     console.log(response.data)
  //   } catch (e: any) {
  //     const error = e.response.data.errors as IRegisterError
  //     setError(error)
  //     console.log(e)
  //   }
  // }

  const onFormikSubmit = async (values: IRegisterPage) => {

  }

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
  //   setData({...data, [e.target.name]: e.target.value})
  // }

  const registerSchema = yup.object({
    email: yup.string()
      .required("Вкажіть пошту")
      .email("Введіть коректно пошту"),
    firstName: yup.string().required("Вкажіть ім'я"),
    secondName: yup.string().required("Вкажіть прізвище"),
    photo: yup.string().required("Оберіть фото"),
    phone: yup.string().required("Вкажіть телефон"),
    password: yup
      .string()
      .min(5, "Пароль повинен містити мініму 5 символів")
      .matches(/[0-9a-zA-Z]/, "Пароль може містить латинські символи і цифри")
      .required("Поле не повинне бути пустим"),
    confirmPassword: yup
      .string()
      .min(5, "Пароль повинен містити мініму 5 символів")
      .oneOf([yup.ref("password")], () => "Паролі повинні співпадати")
      .required("Поле не повинне бути пустим"),
  })

  const formik = useFormik({
    initialValues: init,
    onSubmit: onFormikSubmit,
    validationSchema: registerSchema
  })

  const {values, touched, errors, handleSubmit, handleChange, setFieldValue} = formik

  // змінна, яка записує інформації про країна з масиву countries, у якому для кожного елемента виконується map
  // const viewCountriesOption = countries.map((country) => (
  //   <option key={country.id} value={country.id}>{country.name}</option>
  // ))

  return (
    <>
      <h1 className="text-center">Реєстрація на сайт</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Електронна адреса"
              field="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              touched={touched.email}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Телефон"
              field="phone"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              touched={touched.phone}
            />
          </div>
        </div>

        {/*<div className="mb-3">*/}
        {/*  <label htmlFor="countryId" className="form-label">*/}
        {/*    Країна*/}
        {/*  </label>*/}
        {/*  <select name="countryId" value={data.countryId} onChange={onChangeHandler} className="form-select" id="countryId">*/}
        {/*    <option>Оберіть країну</option>*/}
        {/*    {viewCountriesOption}*/}
        {/*  </select>*/}
        {/*</div>*/}

        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Прізвище"
              field="secondName"
              value={values.secondName}
              onChange={handleChange}
              error={errors.secondName}
              touched={touched.secondName}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Ім'я"
              field="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              touched={touched.firstName}
            />
          </div>
        </div>

        <InputFileGroup
          label="Оберіть фото для аватарки"
          field="photo"
          onSelectFile={(base64) => {
            setFieldValue("photo", base64)
          }}
          error={errors.photo}
          touched={touched.photo}
        />

        <div className="row">
          <div className="col-md-6">
            <InputGroup
              label="Пароль"
              type="password"
              field="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              touched={touched.password}
            />
          </div>
          <div className="col-md-6">
            <InputGroup
              label="Підтвердіть пароль"
              type="password"
              field="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  )
}

export default RegisterPage