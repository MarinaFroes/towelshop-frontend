import {
  CartActions,
  CartState,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAILURE,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAILURE,
  CART_RESET_SUCCESS,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAILURE,
  USER_LOGOUT_SUCCESS,
} from '../../types'

const cartInit = {
  inCart: null,
  error: null,
  loading: false,
  success: false,
}

export function cartReducer(
  state: CartState = cartInit,
  action: CartActions
): CartState {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
    case CART_REMOVE_ITEM_REQUEST:
    case CART_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      }
    case CART_ADD_ITEM_SUCCESS:
    case CART_REMOVE_ITEM_SUCCESS:
      const { cart: updatedCart } = action.payload

      return {
        ...state,
        inCart: updatedCart,
        loading: false,
        error: null,
        success: true,
      }
    case CART_DETAILS_SUCCESS:
      const { cart: cartDetails } = action.payload

      return {
        ...state,
        inCart: cartDetails,
        loading: false,
        error: null,
      }
    case CART_DETAILS_FAILURE:
    case CART_ADD_ITEM_FAILURE:
    case CART_REMOVE_ITEM_FAILURE:
      const { error } = action
      return {
        ...state,
        error,
        loading: false,
        success: false,
      }
    case CART_RESET_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: false,
      }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: false,
        inCart: null,
      }
    default:
      return state
  }
}
