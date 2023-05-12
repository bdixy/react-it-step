import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { AuthReducer } from '../components/auth/auth-reducer'

export const rootReducer = combineReducers({
  auth: AuthReducer
})

// старий спосіб
// export const store = createStore(rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)))

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk]
})