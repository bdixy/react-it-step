import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'font-awesome/css/font-awesome.min.css'
import jwt_decode from 'jwt-decode'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthUserActionType, IUser } from './components/auth/types'
import setAuthToken from './helpers/setAuthToken'
import { store } from './store'
import { CartActionType } from './components/cart/types'

if (localStorage.token) {
  setAuthToken(localStorage.token)
  const user = jwt_decode<IUser>(localStorage.token)
  store.dispatch({type: AuthUserActionType.LOGIN_USER, payload: user})
}

if(localStorage.cart.length > 0) {
  const cartIds = JSON.parse(localStorage.getItem('cart') || '[]') as number
  store.dispatch({type: CartActionType.CART_LIST, payload: cartIds})
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
