import { Dispatch } from 'redux'
import { QueryItems } from '../../types'

import {
  User,
  Product,
  NewProduct,
  AsyncAction,
  ProductsData,
  ProductListActions,
  ProductCreateActions,
  ProductDeleteActions,
  ProductUpdateActions,
  ProductDetailsActions,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_RESET,
} from '../../types'

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://towelshopservice.herokuapp.com'

// PRODUCT LIST ACTION CREATORS
const productListRequest = (): ProductListActions => {
  return {
    type: PRODUCT_LIST_REQUEST,
  }
}

const productListSuccess = (
  products: Product[],
  totalPages: number
): ProductListActions => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: {
      products,
      totalPages,
    },
  }
}

const productListFailure = (error: string): ProductListActions => {
  return {
    type: PRODUCT_LIST_FAILURE,
    error: error,
  }
}

export const listProducts = (queryItems: QueryItems): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(productListRequest())

    const {
      page = '',
      name = '',
      size = '',
      variant = '',
      category = '',
    } = queryItems

    const response: any = await fetch(
      `${baseUrl}/api/v1/products?page=${
        page || '1'
      }&size=${size}&name=${name}&variant=${variant}&category=${category}`
    )

    if (response.ok) {
      const productsData: ProductsData = await response.json()

      return dispatch(
        productListSuccess(productsData.items, productsData.totalPages)
      )
    } else {
      dispatch(
        productListFailure(`${response.status}: Could not fetch products`)
      )
    }
  } catch (err) {
    dispatch(productListFailure(err.message))
  }
}

// PRODUCT DETAILS ACTION CREATORS
const productDetailsRequest = (): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
  }
}

const productDetailsSuccess = (product: Product): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: {
      product,
    },
  }
}

const productDetailsFailure = (error: string): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_FAILURE,
    error: error,
  }
}

export const productDetailsReset = (): ProductDetailsActions => {
  return {
    type: PRODUCT_DETAILS_RESET,
  }
}

export const getProductDetails = (id: string): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(productDetailsRequest())

    const response: any = await fetch(`${baseUrl}/api/v1/products/${id}`)

    if (response.ok) {
      let productsData: Product = await response.json()
      return dispatch(productDetailsSuccess(productsData))
    } else {
      dispatch(
        productDetailsFailure(`${response.status}: Could not fetch product`)
      )
    }
  } catch (err) {
    dispatch(productDetailsFailure(err.message))
  }
}

// PRODUCT CREATE ACTION CREATORS
const productCreateRequest = (): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_REQUEST,
  }
}

const productCreateSuccess = (product: Product): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_SUCCESS,
    payload: {
      product,
    },
  }
}

export const productCreateFailure = (error: string): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_FAILURE,
    error,
  }
}

export const productCreateReset = (): ProductCreateActions => {
  return {
    type: PRODUCT_CREATE_RESET,
  }
}

export const createProduct = (product: NewProduct): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(productCreateRequest())

    const { userLogin } = getState()

    if (
      !userLogin ||
      !userLogin.authedUser ||
      userLogin.authedUser.role !== 'admin'
    ) {
      throw new Error('403: You need to be an admin to create a product')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(`${baseUrl}/api/v1/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })

    if (response.ok) {
      const productData: Product = await response.json()
      return dispatch(productCreateSuccess(productData))
    } else {
      dispatch(
        productCreateFailure(`${response.status}: Could not create product`)
      )
    }
  } catch (err) {
    dispatch(productCreateFailure(err))
  }
}

//  PRODUCT DELETE ACTION CREATORS
const productDeleteRequest = (): ProductDeleteActions => {
  return {
    type: PRODUCT_DELETE_REQUEST,
  }
}

const productDeleteSuccess = (): ProductDeleteActions => {
  return {
    type: PRODUCT_DELETE_SUCCESS,
  }
}

const productDeleteFailure = (error: string): ProductDeleteActions => {
  return {
    type: PRODUCT_DELETE_FAILURE,
    error: error,
  }
}

export const deleteProduct = (productId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(productDeleteRequest())

    const { userLogin } = getState()

    if (
      !userLogin ||
      !userLogin.authedUser ||
      userLogin.authedUser.role !== 'admin'
    ) {
      throw new Error('403: You need to be an admin to delete a product')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(
      `${baseUrl}/api/v1/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.ok) {
      return dispatch(productDeleteSuccess())
    } else {
      dispatch(
        productDeleteFailure(`${response.status}: Could not delete product`)
      )
    }
  } catch (err) {
    dispatch(productDeleteFailure(err.message))
  }
}

// PRODUCT UPDATE ACTION CREATORS
const productUpdateRequest = (): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_REQUEST,
  }
}

const productUpdateSuccess = (product: Product): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_SUCCESS,
    payload: {
      product,
    },
  }
}

export const productUpdateFailure = (error: string): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_FAILURE,
    error,
  }
}

export const productUpdateReset = (): ProductUpdateActions => {
  return {
    type: PRODUCT_UPDATE_RESET,
  }
}

export const updateProduct = (product: Product): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(productUpdateRequest())

    const { userLogin } = getState()

    if (
      !userLogin ||
      !userLogin.authedUser ||
      userLogin.authedUser.role !== 'admin'
    ) {
      throw new Error('403: You need to be an admin to update a product')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(
      `${baseUrl}/api/v1/products/${product._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    )

    if (response.ok) {
      const productData: Product = await response.json()

      return dispatch(productUpdateSuccess(productData))
    } else {
      dispatch(
        productUpdateFailure(`${response.status}: Could not create product`)
      )
    }
  } catch (err) {
    dispatch(productUpdateFailure(err))
  }
}
