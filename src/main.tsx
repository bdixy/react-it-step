import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthUserActionType } from './components/auth/types'
import setAuthToken from './helpers/setAuthToken'
import { store } from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
  store.dispatch({type: AuthUserActionType.LOGIN_USER})
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
