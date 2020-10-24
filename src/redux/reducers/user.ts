import {
  UserActions,
  UserListState,
  UserDeleteState,
  UserBanUnbanState,
  UserDetailsState,
  UserLoginState,
  UserSignupState,
  UserUpdateProfileState,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_GOOGLE_REQUEST,
  USER_LOGIN_GOOGLE_SUCCESS,
  USER_LOGIN_GOOGLE_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_BAN_REQUEST,
  USER_BAN_SUCCESS,
  USER_BAN_FAILURE,
  USER_UNBAN_REQUEST,
  USER_UNBAN_SUCCESS,
  USER_UNBAN_FAILURE,
  USER_BAN_UNBAN_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_RESET,
} from '../../types'

// USER LOGIN REDUCER
const userLoginInit = {
  loading: false,
  error: null,
  authedUser: null,
}

export function userLoginReducer(
  state: UserLoginState = userLoginInit,
  action: UserActions
): UserLoginState {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_GOOGLE_REQUEST:
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_LOGIN_GOOGLE_SUCCESS:
    case USER_LOGIN_SUCCESS:
      const { authedUser } = action.payload

      return {
        ...state,
        authedUser,
        loading: false,
      }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        authedUser: null,
        loading: false,
      }
    case USER_LOGOUT_FAILURE:
    case USER_LOGIN_GOOGLE_FAILURE:
    case USER_LOGIN_FAILURE: {
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

// USER SIGNUP REDUCER
const userSignupInit = {
  loading: false,
  error: null,
  userInfo: null,
  success: false,
}

export function userSignupReducer(
  state: UserSignupState = userSignupInit,
  action: UserActions
): UserSignupState {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      }
    case USER_SIGNUP_SUCCESS:
      const { userInfo } = action.payload

      return {
        ...state,
        userInfo,
        loading: false,
        success: true,
      }
    case USER_SIGNUP_FAILURE: {
      const { error } = action

      return {
        ...state,
        error,
        loading: false,
        success: false,
      }
    }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userInfo: null,
        loading: false,
        success: false,
      }
    default:
      return state
  }
}

// USER UPDATE REDUCER
const userUpdateInit = {
  loading: false,
  error: null,
  userInfo: null,
  success: false,
}

export function userUpdateProfileReducer(
  state: UserUpdateProfileState = userUpdateInit,
  action: UserActions
): UserUpdateProfileState {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_UPDATE_PROFILE_SUCCESS:
      const { userInfo } = action.payload

      return {
        ...state,
        userInfo,
        loading: false,
        success: true,
      }
    case USER_UPDATE_PROFILE_FAILURE:
      const { error } = action

      return {
        ...state,
        loading: false,
        error,
        userInfo: null,
        success: false,
      }
    case USER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: null,
        success: false,
      }
    default:
      return state
  }
}

// USER LIST REDUCER
const userListInit = {
  loading: false,
  error: null,
  users: [],
}

export function userListReducer(
  state: UserListState = userListInit,
  action: UserActions
): UserListState {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_LIST_SUCCESS:
      const { userList } = action.payload

      return {
        ...state,
        users: userList,
        loading: false,
      }
    case USER_LIST_FAILURE:
      const { error } = action

      return {
        ...state,
        loading: false,
        error: error,
      }
    default:
      return state
  }
}

// USER DELETE REDUCER
const userDeleteInit = {
  loading: false,
  error: null,
  success: false,
}

export function userDeleteReducer(
  state: UserDeleteState = userDeleteInit,
  action: UserActions
): UserDeleteState {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case USER_DELETE_FAILURE:
      const { error } = action

      return {
        ...state,
        loading: false,
        success: false,
        error: error,
      }
    default:
      return state
  }
}

// USER BAN AND UNBAN REDUCER
const userBanUnbanInit = {
  loading: false,
  error: null,
  success: false,
}

export function userBanUnbanReducer(
  state: UserBanUnbanState = userBanUnbanInit,
  action: UserActions
): UserBanUnbanState {
  switch (action.type) {
    case USER_UNBAN_REQUEST:
    case USER_BAN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_UNBAN_SUCCESS:
    case USER_BAN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case USER_UNBAN_FAILURE:
    case USER_BAN_FAILURE:
      const { error } = action

      return {
        ...state,
        loading: false,
        success: false,
        error: error,
      }
    case USER_BAN_UNBAN_RESET:
      return {
        loading: false,
        error: null,
        success: false,
      }
    default:
      return state
  }
}

// USER DETAILS REDUCER
const userDetailsInit = {
  loading: false,
  error: null,
  user: null,
}

export function userDetailsReducer(
  state: UserDetailsState = userDetailsInit,
  action: UserActions
): UserDetailsState {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_DETAILS_SUCCESS:
      const { user } = action.payload

      return {
        ...state,
        user,
        loading: false,
      }
    case USER_DETAILS_FAILURE: {
      const { error } = action

      return {
        ...state,
        error,
        loading: false,
      }
    }
    case USER_DETAILS_RESET: {
      return {
        ...state,
        loading: false,
        error: null,
        user: null,
      }
    }
    default:
      return state
  }
}
