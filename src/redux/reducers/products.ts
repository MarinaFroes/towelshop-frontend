import {
  ProductCreateActions,
  ProductDeleteActions,
  ProductDetailsActions,
  ProductUpdateActions,
  ProductListActions,
  ProductCreateState,
  ProductDeleteState,
  ProductDetailsState,
  ProductListState,
  ProductUpdateState,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_RESET,
} from '../../types'

// PRODUCT CREATE REDUCER
const productCreateInit: ProductCreateState = {
  loading: false,
  error: null,
  product: null,
  success: false,
}

export function productCreateReducer(
  state: ProductCreateState = productCreateInit,
  action: ProductCreateActions
): ProductCreateState {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      }
    case PRODUCT_CREATE_SUCCESS:
      const { product } = action.payload

      return {
        ...state,
        product,
        success: true,
        loading: false,
      }
    case PRODUCT_CREATE_FAILURE:
      const { error } = action

      return {
        ...state,
        success: false,
        error,
        loading: false,
      }
    case PRODUCT_CREATE_RESET:
      return {
        loading: false,
        error: null,
        product: null,
        success: false,
      }
    default:
      return state
  }
}

// PRODUCT DELETE REDUCER
const productDeleteInit: ProductDeleteState = {
  loading: false,
  error: null,
  success: false,
}

export function productDeleteReducer(
  state: ProductDeleteState = productDeleteInit,
  action: ProductDeleteActions
): ProductDeleteState {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      }
    }
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case PRODUCT_DELETE_FAILURE: {
      const { error } = action

      return {
        ...state,
        success: false,
        error,
        loading: false,
      }
    }
    default:
      return state
  }
}

// PRODUCT LIST REDUCER
const productListInit: ProductListState = {
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
}

export function productListReducer(
  state: ProductListState = productListInit,
  action: ProductListActions
): ProductListState {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_LIST_SUCCESS: {
      const { products, totalPages } = action.payload

      return {
        ...state,
        products,
        totalPages,
        loading: false,
      }
    }
    case PRODUCT_LIST_FAILURE: {
      const { error } = action

      return {
        ...state,
        error,
        loading: false,
      }
    }
    default:
      return state
  }
}

// PRODUCT DETAILS REDUCER
const productDetailsInit: ProductDetailsState = {
  product: null,
  loading: false,
  error: null,
}

export function productDetailsReducer(
  state: ProductDetailsState = productDetailsInit,
  action: ProductDetailsActions
): ProductDetailsState {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_DETAILS_SUCCESS: {
      const { product } = action.payload

      return {
        ...state,
        product: product,
        loading: false,
      }
    }
    case PRODUCT_DETAILS_FAILURE: {
      const { error } = action

      return {
        ...state,
        error,
        loading: false,
      }
    }
    case PRODUCT_DETAILS_RESET: {
      return {
        ...state,
        product: null,
        loading: false,
        error: null,
      }
    }
    default:
      return state
  }
}

// PRODUCT UPDATE REDUCER
const productUpdateInit: ProductUpdateState = {
  product: null,
  loading: false,
  success: false,
  error: null,
}

export function productUpdateReducer(
  state: ProductUpdateState = productUpdateInit,
  action: ProductUpdateActions
): ProductUpdateState {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case PRODUCT_UPDATE_SUCCESS: {
      const { product } = action.payload

      return {
        ...state,
        product: product,
        success: true,
        loading: false,
      }
    }
    case PRODUCT_UPDATE_FAILURE: {
      const { error } = action

      return {
        ...state,
        error,
        loading: false,
      }
    }
    case PRODUCT_UPDATE_RESET: {
      return {
        product: null,
        loading: false,
        success: false,
        error: null,
      }
    }
    default:
      return state
  }
}
