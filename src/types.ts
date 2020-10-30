import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'

export type Product = {
  _id: string
  name: string
  description: string
  categories: string[]
  countInStock: number
  variant?: string
  size?: string
  price: number
  mediaUrl?: string
}

export type NewProduct = Omit<Product, '_id'>

export type User = {
  googleId?: string
  image?: string
  _id: string
  userName?: string
  firstName?: string
  lastName?: string
  email: string
  password?: string
  role?: string
  isBanned?: boolean
  token?: string
  createdAt?: Date
  updatedAt?: Date
}

export type NewUser = Omit<User, '_id'>

export type TokenData = {
  id: string
}

export type ProductParams = {
  productId: string
}

export type UserParams = {
  userId: string
}

export type ProductsData = {
  items: Product[]
  totalPages: number
}

export type DecodedData = {
  [key: string]: string
}

export type QueryItems = {
  name: string | string[] | null
  size: string | string[] | null
  variant: string | string[] | null
  page: string | string[] | null
  category: string | string[] | null
}

type CartItemPopulated = {
  _id: string
  quantity: number
  product: Product
}

export type Cart = {
  _id: string
  user: string
  products: CartItemPopulated[]
}

// PROPS TYPES
export type CartInfoProps = {
  cartProducts: CartItemPopulated[] | null
  handleCheckout: () => void
}

export type ProductRowProps = {
  product: Product
}

export type CartItemProps = {
  cartProducts: CartItemPopulated[] | null
  user: User | null
  handleRemoveFromCart: (productId: string) => void
}

export type ProductProps = {
  product: Product
}

export type AccountHeaderProps = {
  user: User
}

export type ProductPaginationProps = {
  totalPages: number
  isAdmin?: boolean
}

export type ProductDescriptionProps = {
  description: string
  productId: string
}

export type ProductCardProps = {
  products: Product[]
}

export type UserRowProps = {
  user: User
  handleChange: (userId: string) => void
}

export type UserListProps = {
  loggedUserId: string
}

export type HeadingProps = {
  mobile?: boolean
  h1Content: string
  h2Content: string
}

// PRODUCT ACTION TYPES
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAILURE = 'PRODUCT_DETAILS_FAILURE'
export const PRODUCT_DETAILS_RESET = 'PRODUCT_DETAILS_RESET'

export const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST'
export const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS'
export const PRODUCT_CREATE_FAILURE = 'PRODUCT_CREATE_FAILURE'
export const PRODUCT_CREATE_RESET = 'PRODUCT_CREATE_RESET'

export const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST'
export const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS'
export const PRODUCT_UPDATE_FAILURE = 'PRODUCT_UPDATE_FAILURE'
export const PRODUCT_UPDATE_RESET = 'PRODUCT_UPDATE_RESET'

export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST'
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS'
export const PRODUCT_DELETE_FAILURE = 'PRODUCT_DELETE_FAILURE'

// USER ACTION TYPES
export const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST'
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE'

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST'
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS'
export const USER_UPDATE_PROFILE_FAILURE = 'USER_UPDATE_PROFILE_FAILURE'
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET'

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST'
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS'
export const USER_DETAILS_FAILURE = 'USER_DETAILS_FAILURE'
export const USER_DETAILS_RESET = 'USER_DETAILS_RESET'

export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE'

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'

export const USER_LOGIN_GOOGLE_REQUEST = 'USER_LOGIN_GOOGLE_REQUEST'
export const USER_LOGIN_GOOGLE_SUCCESS = 'USER_LOGIN_GOOGLE_SUCCESS'
export const USER_LOGIN_GOOGLE_FAILURE = 'USER_LOGIN_GOOGLE_FAILURE'

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'

export const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE'

export const USER_BAN_REQUEST = 'USER_BAN_REQUEST'
export const USER_BAN_SUCCESS = 'USER_BAN_SUCCESS'
export const USER_BAN_FAILURE = 'USER_BAN_FAILURE'

export const USER_UNBAN_REQUEST = 'USER_UNBAN_REQUEST'
export const USER_UNBAN_SUCCESS = 'USER_UNBAN_SUCCESS'
export const USER_UNBAN_FAILURE = 'USER_UNBAN_FAILURE'
export const USER_BAN_UNBAN_RESET = 'USER_BAN_UNBAN_RESET'

// CART ACTION TYPES
export const CART_DETAILS_REQUEST = 'CART_DETAILS_REQUEST'
export const CART_DETAILS_SUCCESS = 'CART_DETAILS_SUCCESS'
export const CART_DETAILS_FAILURE = 'CART_DETAILS_FAILURE'

export const CART_ADD_ITEM_REQUEST = 'CART_ADD_ITEM_REQUEST'
export const CART_ADD_ITEM_SUCCESS = 'CART_ADD_ITEM_SUCCESS'
export const CART_ADD_ITEM_FAILURE = 'CART_ADD_ITEM_FAILURE'

export const CART_REMOVE_ITEM_REQUEST = 'CART_REMOVE_ITEM_REQUEST'
export const CART_REMOVE_ITEM_SUCCESS = 'CART_REMOVE_ITEM_SUCCESS'
export const CART_REMOVE_ITEM_FAILURE = 'CART_REMOVE_ITEM_FAILURE'
export const CART_RESET_SUCCESS = 'CART_RESET_SUCCESS'

// PRODUCT LIST ACTION CREATOR TYPES
export type ProductListRequestAction = {
  type: typeof PRODUCT_LIST_REQUEST
}

export type ProductListSuccessAction = {
  type: typeof PRODUCT_LIST_SUCCESS
  payload: {
    products: Product[]
    totalPages: number
  }
}

export type ProductListFailureAction = {
  type: typeof PRODUCT_LIST_FAILURE
  error: string
}

// PRODUCT DETAILS ACTION CREATOR TYPES
export type ProductDetailsRequestAction = {
  type: typeof PRODUCT_DETAILS_REQUEST
}

export type ProductDetailsSuccessAction = {
  type: typeof PRODUCT_DETAILS_SUCCESS
  payload: {
    product: Product
  }
}

export type ProductDetailsFailureAction = {
  type: typeof PRODUCT_DETAILS_FAILURE
  error: string
}

export type ProductDetailsResetAction = {
  type: typeof PRODUCT_DETAILS_RESET
}

// PRODUCT CREATE ACTION CREATOR TYPES
export type ProductCreateRequestAction = {
  type: typeof PRODUCT_CREATE_REQUEST
}

export type ProductCreateSuccessAction = {
  type: typeof PRODUCT_CREATE_SUCCESS
  payload: {
    product: Product
  }
}

export type ProductCreateFailureAction = {
  type: typeof PRODUCT_CREATE_FAILURE
  error: string
}

export type ProductCreateResetAction = {
  type: typeof PRODUCT_CREATE_RESET
}

// PRODUCT UPDATE ACTION CREATOR TYPES
export type ProductUpdateRequestAction = {
  type: typeof PRODUCT_UPDATE_REQUEST
}

export type ProductUpdateSuccessAction = {
  type: typeof PRODUCT_UPDATE_SUCCESS
  payload: {
    product: Product
  }
}

export type ProductUpdateFailureAction = {
  type: typeof PRODUCT_UPDATE_FAILURE
  error: string
}

export type ProductUpdateResetAction = {
  type: typeof PRODUCT_UPDATE_RESET
}

// PRODUCT DELETE ACTION CREATOR TYPES
export type ProductDeleteRequestAction = {
  type: typeof PRODUCT_DELETE_REQUEST
}

export type ProductDeleteSuccessAction = {
  type: typeof PRODUCT_DELETE_SUCCESS
}

export type ProductDeleteFailureAction = {
  type: typeof PRODUCT_DELETE_FAILURE
  error: string
}

export type ProductUpdateActions =
  | ProductUpdateRequestAction
  | ProductUpdateSuccessAction
  | ProductUpdateFailureAction
  | ProductUpdateResetAction

export type ProductDeleteActions =
  | ProductDeleteRequestAction
  | ProductDeleteSuccessAction
  | ProductDeleteFailureAction

export type ProductCreateActions =
  | ProductCreateRequestAction
  | ProductCreateSuccessAction
  | ProductCreateFailureAction
  | ProductCreateResetAction

export type ProductDetailsActions =
  | ProductDetailsRequestAction
  | ProductDetailsSuccessAction
  | ProductDetailsFailureAction
  | ProductDetailsResetAction

export type ProductListActions =
  | ProductListRequestAction
  | ProductListSuccessAction
  | ProductListFailureAction

export type ProductsActions =
  | ProductDetailsActions
  | ProductListActions
  | ProductCreateActions
  | ProductDeleteActions
  | ProductUpdateActions

export type AsyncAction<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

// USER SIGNUP ACTION CREATOR TYPES
export type UserSignupRequestAction = {
  type: typeof USER_SIGNUP_REQUEST
}

export type UserSignupSuccessAction = {
  type: typeof USER_SIGNUP_SUCCESS
  payload: {
    userInfo: NewUser
  }
}

export type UserSignupFailureAction = {
  type: typeof USER_SIGNUP_FAILURE
  error: string
}

// USER UPDATE PROFILE ACTION CREATOR TYPES
export type UserUpdateRequestAction = {
  type: typeof USER_UPDATE_PROFILE_REQUEST
}

export type UserUpdateSuccessAction = {
  type: typeof USER_UPDATE_PROFILE_SUCCESS
  payload: {
    userInfo: User
  }
}

export type UserUpdateFailureAction = {
  type: typeof USER_UPDATE_PROFILE_FAILURE
  error: string
}

export type UserUpdateResetAction = {
  type: typeof USER_UPDATE_PROFILE_RESET
}

// USER DETAILS ACTION CREATOR TYPES
export type UserDetailsRequestAction = {
  type: typeof USER_DETAILS_REQUEST
}

export type UserDetailsSuccessAction = {
  type: typeof USER_DETAILS_SUCCESS
  payload: {
    user: User
  }
}

export type UserDetailsFailureAction = {
  type: typeof USER_DETAILS_FAILURE
  error: string
}

export type UserDetailsResetAction = {
  type: typeof USER_DETAILS_RESET
}

// USER DETAILS ACTION CREATOR TYPES
export type UserDeleteRequestAction = {
  type: typeof USER_DELETE_REQUEST
}

export type UserDeleteSuccessAction = {
  type: typeof USER_DELETE_SUCCESS
}

export type UserDeleteFailureAction = {
  type: typeof USER_DELETE_FAILURE
  error: string
}

// USER LOGIN AND LOGOUT ACTION CREATOR TYPES
export type LoginInfo = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  message?: string
}

export type LoginRequestAction = {
  type: typeof USER_LOGIN_REQUEST
}

export type LoginSuccessAction = {
  type: typeof USER_LOGIN_SUCCESS
  payload: {
    authedUser: User
  }
}

export type LoginFailureAction = {
  type: typeof USER_LOGIN_FAILURE
  error: string
}

export type LoginGoogleRequestAction = {
  type: typeof USER_LOGIN_GOOGLE_REQUEST
}

export type LoginGoogleSuccessAction = {
  type: typeof USER_LOGIN_GOOGLE_SUCCESS
  payload: {
    authedUser: User
  }
}

export type LoginGoogleFailureAction = {
  type: typeof USER_LOGIN_GOOGLE_FAILURE
  error: string
}

export type LogoutRequestAction = {
  type: typeof USER_LOGOUT_REQUEST
}

export type LogoutSuccessAction = {
  type: typeof USER_LOGOUT_SUCCESS
}

export type LogoutFailureAction = {
  type: typeof USER_LOGOUT_FAILURE
  error: string
}

// USER LIST ACTION CREATOR TYPES
export type UserListRequestAction = {
  type: typeof USER_LIST_REQUEST
}

export type UserListSuccessAction = {
  type: typeof USER_LIST_SUCCESS
  payload: {
    userList: User[]
  }
}

export type UserListFailureAction = {
  type: typeof USER_LIST_FAILURE
  error: string
}

// USER BAN ACTION CREATOR TYPES
export type UserBanRequestAction = {
  type: typeof USER_BAN_REQUEST
}

export type UserBanSuccessAction = {
  type: typeof USER_BAN_SUCCESS
}

export type UserBanFailureAction = {
  type: typeof USER_BAN_FAILURE
  error: string
}

// USER UNBAN ACTION CREATOR TYPES
export type UserUnbanRequestAction = {
  type: typeof USER_UNBAN_REQUEST
}

export type UserUnbanSuccessAction = {
  type: typeof USER_UNBAN_SUCCESS
}

export type UserUnbanFailureAction = {
  type: typeof USER_UNBAN_FAILURE
  error: string
}

export type UserBanUnbanReset = {
  type: typeof USER_BAN_UNBAN_RESET
}

export type UserSignupActions =
  | UserSignupRequestAction
  | UserSignupSuccessAction
  | UserSignupFailureAction

export type UserUpdateActions =
  | UserUpdateRequestAction
  | UserUpdateSuccessAction
  | UserUpdateFailureAction
  | UserUpdateResetAction

export type UserDetailsActions =
  | UserDetailsRequestAction
  | UserDetailsSuccessAction
  | UserDetailsFailureAction
  | UserDetailsResetAction

export type LoginLogoutActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | LoginGoogleRequestAction
  | LoginGoogleSuccessAction
  | LoginGoogleFailureAction

export type UserDeleteActions =
  | UserDeleteRequestAction
  | UserDeleteSuccessAction
  | UserDeleteFailureAction

export type UserListActions =
  | UserListRequestAction
  | UserListSuccessAction
  | UserListFailureAction

export type BanUnbanUserActions =
  | UserBanRequestAction
  | UserBanSuccessAction
  | UserBanFailureAction
  | UserUnbanRequestAction
  | UserUnbanSuccessAction
  | UserUnbanFailureAction
  | UserBanUnbanReset

export type UserActions =
  | LoginLogoutActions
  | UserDetailsActions
  | UserSignupActions
  | UserUpdateActions
  | UserListActions
  | BanUnbanUserActions
  | UserDeleteActions

// CART ADD AND REMOVE ITEM ACTION CREATOR TYPES
export type CartDetailsRequestAction = {
  type: typeof CART_DETAILS_REQUEST
}

export type CartDetailsSuccessAction = {
  type: typeof CART_DETAILS_SUCCESS
  payload: {
    cart: Cart
  }
}

export type CartDetailsFailureAction = {
  type: typeof CART_DETAILS_FAILURE
  error: string
}

export type CartAddItemRequestAction = {
  type: typeof CART_ADD_ITEM_REQUEST
}

export type CartAddItemSuccessAction = {
  type: typeof CART_ADD_ITEM_SUCCESS
  payload: {
    cart: Cart
  }
}

export type CartAddItemFailureAction = {
  type: typeof CART_ADD_ITEM_FAILURE
  error: string
}

export type CartRemoveItemRequestAction = {
  type: typeof CART_REMOVE_ITEM_REQUEST
}

export type CartRemoveItemSuccessAction = {
  type: typeof CART_REMOVE_ITEM_SUCCESS
  payload: {
    cart: Cart
  }
}

export type CartRemoveItemFailureAction = {
  type: typeof CART_REMOVE_ITEM_FAILURE
  error: string
}

export type CartResetSuccessAction = {
  type: typeof CART_RESET_SUCCESS
}

export type CartActions =
  | CartDetailsRequestAction
  | CartDetailsSuccessAction
  | CartDetailsFailureAction
  | CartAddItemRequestAction
  | CartAddItemSuccessAction
  | CartAddItemFailureAction
  | CartRemoveItemRequestAction
  | CartRemoveItemSuccessAction
  | CartRemoveItemFailureAction
  | CartResetSuccessAction
  | LogoutSuccessAction

// PRODUCT STATE TYPES
export type ProductCreateState = {
  loading: boolean
  error: null | string
  product: Product | null
  success: boolean
}

export type ProductDeleteState = {
  loading: boolean
  error: null | string
  success: boolean
}

export type ProductListState = {
  loading: boolean
  error: null | string
  products: Product[]
  totalPages: number
}

export type ProductDetailsState = {
  loading: boolean
  error: null | string
  product: Product | null
}

export type ProductUpdateState = {
  loading: boolean
  error: null | string
  product: Product | null
  success: boolean
}

export type ProductsState = {
  productDelete: ProductDeleteState
  productCreate: ProductCreateState
  productList: ProductListState
  productDetails: ProductDetailsState
  productUpdate: ProductUpdateState
}

// USER STATE TYPES
export type UserLoginState = {
  loading: boolean
  error: null | string
  authedUser: User | null
}

export type UserSignupState = {
  loading: boolean
  error: null | string
  userInfo: NewUser | null
  success: boolean
}

export type UserUpdateProfileState = {
  loading: boolean
  error: null | string
  success: boolean
  userInfo: User | null
}

export type UserBanUnbanState = {
  loading: boolean
  error: null | string
  success: boolean
}

export type UserListState = {
  loading: boolean
  error: null | string
  users: User[]
}

export type UserDeleteState = {
  loading: boolean
  error: null | string
  success: boolean
}

export type UserDetailsState = {
  loading: boolean
  error: null | string
  user: User | null
}

export type UserState = {
  userLogin: UserLoginState
  userSignup: UserSignupState
  userList: UserListState
  userDelete: UserDeleteState
  userUpdateProfile: UserUpdateProfileState
  userBanUnban: UserBanUnbanState
  userDetails: UserDetailsState
}

// CART STATE TYPES
// export type CartDetailsState = {
//   loading: boolean
//   error: null | string
//   inCart: Cart | null
// }

// export type CartAddItemState = {
//   loading: boolean
//   error: null | string
//   success: boolean
// }

// export type CartRemoveItemState = {
//   loading: boolean
//   error: null | string
//   success: boolean
// }

export type CartState = {
  loading: boolean
  error: null | string
  inCart: Cart | null
  success: boolean
}

// APP STATE
export type AppState = {
  productDelete: ProductDeleteState
  productCreate: ProductCreateState
  productList: ProductListState
  productDetails: ProductDetailsState
  productUpdate: ProductUpdateState
  userLogin: UserLoginState
  userSignup: UserSignupState
  userList: UserListState
  userDelete: UserDeleteState
  userUpdateProfile: UserUpdateProfileState
  userBanUnban: UserBanUnbanState
  userDetails: UserDetailsState
  cart: CartState
  // cartDetails: CartDetailsState
  // cartAddItem: CartAddItemState
  // cartRemoveItem: CartRemoveItemState
}
