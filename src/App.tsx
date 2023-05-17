import React from 'react'
import ListProductsPage from './components/admin/products/ListProductsPage'
import Categories from './components/Categories'
import AddProducts from './components/admin/products/AddProductsPage'
import AddCategoriesPage from './components/admin/categories/AddCategoriesPage'
import AdminLayout from './components/containers/admin/AdminLayout'
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
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="/admin/products/add" element={<AddProducts/>}/>
          <Route path="/admin/products/list" element={<ListProductsPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App