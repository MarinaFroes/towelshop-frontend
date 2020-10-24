import {
  CartState,
  CartActions,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAILURE,
} from '../../types'

const cartStateInit = {
  inCart: [],
  error: null,
  loading: false,
  success: false,
}

export default function cartReducer(
  state: CartState = cartStateInit,
  action: CartActions
): CartState {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      }
    case CART_ADD_ITEM_SUCCESS:
      const item = action.payload
      const existItem = state.inCart.find((i) => i.productId === item.productId)

      if (existItem) {
        item.qty += existItem.qty

        return {
          inCart: state.inCart.map((i) =>
            i.productId === existItem.productId ? item : i
          ),
          loading: false,
          error: null,
          success: true,
        }
      } else {
        return {
          inCart: [...state.inCart, item],
          loading: false,
          error: null,
          success: true,
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        inCart: state.inCart.filter((i) => i.productId !== action.productId),
        loading: false,
        error: null,
        success: true,
      }
    case CART_ADD_ITEM_FAILURE:
      const { error } = action

      return {
        ...state,
        error,
        loading: false,
        success: false,
      }

    default:
      return state
  }
}
