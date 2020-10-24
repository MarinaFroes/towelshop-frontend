import { Dispatch } from 'redux'

import {
  Product,
  CartActions,
  AsyncAction,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAILURE,
} from '../../types'

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://towelshopservice.herokuapp.com'

// CART ADD ITEM ACTION CREATORS
const cartAddItemRequest = (): CartActions => {
  return {
    type: CART_ADD_ITEM_REQUEST,
  }
}

const cartAddItemSuccess = (productData: Product, qty: number): CartActions => {
  const { _id, name, mediaUrl, price, countInStock } = productData

  return {
    type: CART_ADD_ITEM_SUCCESS,
    payload: {
      productId: _id,
      name,
      mediaUrl: mediaUrl || '',
      price,
      countInStock,
      qty,
    },
  }
}

const cartAddItemFailure = (error: string): CartActions => {
  return {
    type: CART_ADD_ITEM_FAILURE,
    error,
  }
}

export const addToCart = (
  productId: string,
  qty: number
): AsyncAction => async (dispatch: Dispatch, getState) => {
  try {
    dispatch(cartAddItemRequest())

    const response: any = await fetch(`${baseUrl}/api/v1/products/${productId}`)

    if (response.ok) {
      let productData: Product = await response.json()

      dispatch(cartAddItemSuccess(productData, qty))

      localStorage.setItem('cartItems', JSON.stringify(getState().cart.inCart))
    } else {
      throw new Error(`${response.status}: Could not fetch product`)
    }
  } catch (err) {
    dispatch(cartAddItemFailure(err.message))
  }
}

// CART REMOVE ITEM ACTION CREATORS
const cartRemoveItemAction = (productId: string): CartActions => {
  return {
    type: CART_REMOVE_ITEM,
    productId,
  }
}

export const removeFromCart = (productId: string): AsyncAction => (
  dispatch: Dispatch,
  getState
) => {
  dispatch(cartRemoveItemAction(productId))

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.inCart))
}
