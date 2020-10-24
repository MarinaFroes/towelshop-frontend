import { combineReducers } from 'redux'

import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from './products'
import cartReducer from './cart'
import {
  userBanUnbanReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userSignupReducer,
  userUpdateProfileReducer,
} from './user'

const createRootReducer = () =>
  combineReducers({
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userDetails: userDetailsReducer,
    userDelete: userDeleteReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userBanUnban: userBanUnbanReducer,
  })

export default createRootReducer
