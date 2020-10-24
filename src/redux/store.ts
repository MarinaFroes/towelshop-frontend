/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { AppState } from '../types'
import logger from './logger'
import createRootReducer from './reducers'

const userLoginFromStorage = localStorage.getItem('userLogin') || null

const cartFromStorage = localStorage.getItem('cartItems') || null

const initState: AppState = {
  productDelete: {
    loading: false,
    error: null,
    success: false,
  },
  productCreate: {
    loading: false,
    error: null,
    product: null,
    success: false,
  },
  productList: {
    loading: false,
    error: null,
    products: [],
    totalPages: 1,
  },
  productDetails: {
    loading: false,
    error: null,
    product: null,
  },
  productUpdate: {
    loading: false,
    error: null,
    product: null,
    success: false,
  },
  cart: {
    inCart: cartFromStorage ? JSON.parse(cartFromStorage) : [],
    error: null,
    loading: false,
    success: false,
  },
  userLogin: {
    authedUser: userLoginFromStorage ? JSON.parse(userLoginFromStorage) : null,
    error: null,
    loading: false,
  },
  userSignup: {
    loading: false,
    error: null,
    userInfo: null,
    success: false,
  },
  userList: {
    loading: false,
    error: null,
    users: [],
  },
  userDelete: {
    loading: false,
    error: null,
    success: false,
  },
  userUpdateProfile: {
    loading: false,
    error: null,
    success: false,
    userInfo: null,
  },
  userBanUnban: {
    loading: false,
    error: null,
    success: false,
  },
  userDetails: {
    loading: false,
    error: null,
    user: null,
  },
}

export default function makeStore(initialState = initState) {
  const middlewares =
    process.env.NODE_ENV === 'development'
      ? [require('redux-immutable-state-invariant').default(), thunk, logger]
      : [thunk]

  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
