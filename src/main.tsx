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
import { IUser } from './components/auth/login/types'
import { AuthUserActionType } from './components/auth/types'
import setAuthToken from './helpers/setAuthToken'
import { store } from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
  const user = jwt_decode<IUser>(localStorage.token)
  store.dispatch({type: AuthUserActionType.LOGIN_USER, payload: user})
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
