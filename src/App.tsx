import React from 'react'
import Categories from './components/Categories'
import AddCategoriesPage from './components/categories/AddCategoriesPage'
import DefaultLayout from './components/containers/default/DefaultLayout'
import HomePage from './components/home/HomePage'
import LoginPage from './components/auth/login/LoginPage'
import RegisterPage from './components/auth/register/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import Profile from './components/profile/Profile'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
          {/*<Route path="categories" element={<Categories/>}/>*/}
          <Route path="categories" element={<AddCategoriesPage/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App