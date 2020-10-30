import { Dispatch } from 'redux'
import { decodeToken } from '../../util/authHelpers'

import {
  User,
  AsyncAction,
  UserListActions,
  UserDetailsActions,
  UserUpdateActions,
  UserDeleteActions,
  BanUnbanUserActions,
  NewUser,
  LoginInfo,
  TokenData,
  LoginLogoutActions,
  UserSignupActions,
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
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_RESET,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_GOOGLE_FAILURE,
  USER_LOGIN_GOOGLE_REQUEST,
  USER_LOGIN_GOOGLE_SUCCESS,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
} from '../../types'

const baseUrl = 'http://localhost:3000'

// USER UPDATE ACTIONS
const userUpdateRequestAction = (): UserUpdateActions => {
  return {
    type: USER_UPDATE_PROFILE_REQUEST,
  }
}

const userUpdateSuccessAction = (user: User): UserUpdateActions => {
  return {
    type: USER_UPDATE_PROFILE_SUCCESS,
    payload: {
      userInfo: user,
    },
  }
}

const userUpdateFailureAction = (error: string): UserUpdateActions => {
  return {
    type: USER_UPDATE_PROFILE_FAILURE,
    error,
  }
}

export const userUpdateResetAction = (): UserUpdateActions => {
  return {
    type: USER_UPDATE_PROFILE_RESET,
  }
}

export const updateUser = (updatedUser: User): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userUpdateRequestAction())

    const { userLogin } = getState()

    if (!userLogin || !userLogin.authedUser) {
      throw new Error('401: Login to continue')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(
      `${baseUrl}/api/v1/users/${updatedUser._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      }
    )

    if (response.ok) {
      const userData: User = await response.json()

      dispatch(userUpdateSuccessAction(userData))
    }
  } catch (err) {
    dispatch(userUpdateFailureAction(err))
  }
}

// USER LIST ACTION CREATORS
const userListRequestAction = (): UserListActions => {
  return {
    type: USER_LIST_REQUEST,
  }
}

const userListSuccessAction = (userList: User[]): UserListActions => {
  return {
    type: USER_LIST_SUCCESS,
    payload: {
      userList,
    },
  }
}

const userListFailureAction = (error: string): UserListActions => {
  return {
    type: USER_LIST_FAILURE,
    error,
  }
}

export const listUsers = (): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userListRequestAction())

    const { userLogin } = getState()

    if (
      !userLogin ||
      !userLogin.authedUser ||
      userLogin.authedUser.role !== 'admin'
    ) {
      throw new Error('403: You need to be an admin to get a list of users')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(`${baseUrl}/api/v1/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const usersData: User[] = await response.json()

      dispatch(userListSuccessAction(usersData))
    } else {
      dispatch(userListFailureAction(`${response.status}: Could not get users`))
    }
  } catch (err) {
    dispatch(userListFailureAction(err))
  }
}

// USER DETAILS ACTION CREATORS
const userDetailsRequestAction = (): UserDetailsActions => {
  return {
    type: USER_DETAILS_REQUEST,
  }
}

const userDetailsSuccessAction = (user: User): UserDetailsActions => {
  return {
    type: USER_DETAILS_SUCCESS,
    payload: {
      user,
    },
  }
}

const userDetailsFailureAction = (error: string): UserDetailsActions => {
  return {
    type: USER_DETAILS_FAILURE,
    error,
  }
}

export const userDetailsResetAction = (): UserDetailsActions => {
  return {
    type: USER_DETAILS_RESET,
  }
}

export const getUserDetails = (userId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userDetailsRequestAction())

    const { userLogin } = getState()

    if (!userLogin || !userLogin.authedUser) {
      throw new Error('401: Login to continue')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(`${baseUrl}/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const userData: User = await response.json()

      dispatch(userDetailsSuccessAction(userData))
    } else {
      dispatch(
        userDetailsFailureAction(`${response.status}: Could not get user`)
      )
    }
  } catch (err) {
    dispatch(userDetailsFailureAction(err))
  }
}

// USER BAN ACTION CREATORS
const userBanRequestAction = (): BanUnbanUserActions => {
  return {
    type: USER_BAN_REQUEST,
  }
}

const userBanSuccessAction = (): BanUnbanUserActions => {
  return {
    type: USER_BAN_SUCCESS,
  }
}

const userBanFailureAction = (error: string): BanUnbanUserActions => {
  return {
    type: USER_BAN_FAILURE,
    error,
  }
}

export const userBanUnbanReset = (): BanUnbanUserActions => {
  return {
    type: USER_BAN_UNBAN_RESET,
  }
}

export const banUser = (userId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userBanRequestAction())

    const { userLogin } = getState()

    if (
      !userLogin ||
      !userLogin.authedUser ||
      userLogin.authedUser.role !== 'admin'
    ) {
      throw new Error('403: You need to be an admin to ban/unban users')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(
      `${baseUrl}/api/v1/users/${userId}/ban-user`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.ok) {
      dispatch(userBanSuccessAction())
    } else {
      dispatch(userBanFailureAction(`${response.status}: Could not get user`))
    }
  } catch (err) {
    dispatch(userBanFailureAction(err))
  }
}

// USER UNBAN ACTION CREATORS
const userUnbanRequestAction = (): BanUnbanUserActions => {
  return {
    type: USER_UNBAN_REQUEST,
  }
}

const userUnbanSuccessAction = (): BanUnbanUserActions => {
  return {
    type: USER_UNBAN_SUCCESS,
  }
}

const userUnbanFailureAction = (error: string): BanUnbanUserActions => {
  return {
    type: USER_UNBAN_FAILURE,
    error,
  }
}

export const unbanUser = (userId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userUnbanRequestAction())

    const { userLogin } = getState()

    if (!userLogin || !userLogin.authedUser) {
      throw new Error('401: Login to continue')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(
      `${baseUrl}/api/v1/users/${userId}/unban-user`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response.ok) {
      dispatch(userUnbanSuccessAction())
    } else {
      dispatch(userUnbanFailureAction(`${response.status}: Could not get user`))
    }
  } catch (err) {
    dispatch(userUnbanFailureAction(err))
  }
}

// USER DELETE ACTION CREATORS
const userDeleteRequestAction = (): UserDeleteActions => {
  return {
    type: USER_DELETE_REQUEST,
  }
}

const userDeleteSuccessAction = (): UserDeleteActions => {
  return {
    type: USER_DELETE_SUCCESS,
  }
}

const userDeleteFailureAction = (error: string): UserDeleteActions => {
  return {
    type: USER_DELETE_FAILURE,
    error,
  }
}

export const deleteUser = (userId: string): AsyncAction => async (
  dispatch: Dispatch,
  getState
) => {
  try {
    dispatch(userDeleteRequestAction())

    const { userLogin } = getState()

    if (!userLogin || !userLogin.authedUser) {
      throw new Error('401: Login to continue')
    }

    const { token } = userLogin.authedUser as User

    const response: any = await fetch(`${baseUrl}/api/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      dispatch(userDeleteSuccessAction())
      localStorage.removeItem('userInfo')
    } else {
      dispatch(
        userDeleteFailureAction(`${response.status}: Could not delete user`)
      )
    }
  } catch (err) {
    dispatch(userDeleteFailureAction(err))
  }
}

// USER SIGNUP ACTION CREATORS
const userSignupRequestAction = (): UserSignupActions => {
  return {
    type: USER_SIGNUP_REQUEST,
  }
}

const userSignupSuccessAction = (user: User): UserSignupActions => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: {
      userInfo: user,
    },
  }
}

const userSignupFailureAction = (error: string): UserSignupActions => {
  return {
    type: USER_SIGNUP_FAILURE,
    error,
  }
}

export const signupUser = (user: NewUser): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(userSignupRequestAction())

    const response: any = await fetch(`${baseUrl}/api/v1/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (response.ok) {
      const userData: User = await response.json()

      dispatch(userSignupSuccessAction(userData))
      dispatch(loginSuccessAction(userData))

      localStorage.setItem('userLogin', JSON.stringify(userData))
    }
  } catch (err) {
    dispatch(userSignupFailureAction(err))
  }
}

// USER LOGIN ACTION CREATORS
const loginRequestAction = (): LoginLogoutActions => {
  return {
    type: USER_LOGIN_REQUEST,
  }
}

const loginSuccessAction = (user: User): LoginLogoutActions => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      authedUser: user,
    },
  }
}

const loginFailureAction = (error: string): LoginLogoutActions => {
  return {
    type: USER_LOGIN_FAILURE,
    error,
  }
}

export const loginUser = (user: LoginInfo): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(loginRequestAction())

    const response: any = await fetch(`${baseUrl}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (response.ok) {
      const userData: User = await response.json()

      dispatch(loginSuccessAction(userData))

      localStorage.setItem('userLogin', JSON.stringify(userData))
    } else {
      dispatch(loginFailureAction(`${response.status}: Could not login`))
    }
  } catch (err) {
    dispatch(loginFailureAction(err))
  }
}

const loginGoogleRequestAction = (): LoginLogoutActions => {
  return {
    type: USER_LOGIN_GOOGLE_REQUEST,
  }
}

const loginGoogleSuccessAction = (authedUser: User): LoginLogoutActions => {
  return {
    type: USER_LOGIN_GOOGLE_SUCCESS,
    payload: {
      authedUser,
    },
  }
}

const loginGoogleFailureAction = (error: string): LoginLogoutActions => {
  return {
    type: USER_LOGIN_GOOGLE_FAILURE,
    error,
  }
}

export const loginGoogleUser = (token: string): AsyncAction => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(loginGoogleRequestAction())

    const data: TokenData = decodeToken(token) as TokenData

    const response: any = await fetch(`${baseUrl}/api/v1/users/${data.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const userData: User = await response.json()
      userData.token = token

      dispatch(loginGoogleSuccessAction(userData))

      localStorage.setItem('userLogin', JSON.stringify(userData))
    } else {
      dispatch(loginGoogleFailureAction(`${response.status}: Could not login`))
    }
  } catch (err) {
    dispatch(loginGoogleFailureAction(err))
  }
}

// USER LOGOUT ACTION CREATORS
const logoutRequestAction = (): LoginLogoutActions => {
  return {
    type: USER_LOGOUT_REQUEST,
  }
}

const logoutSucessAction = (): LoginLogoutActions => {
  return {
    type: USER_LOGOUT_SUCCESS,
  }
}

const logoutFailureAction = (error: string): LoginLogoutActions => {
  return {
    type: USER_LOGOUT_FAILURE,
    error,
  }
}

export const logoutUser = (): AsyncAction => async (dispatch: Dispatch) => {
  try {
    dispatch(logoutRequestAction())

    const response: any = await fetch(`${baseUrl}/api/v1/auth/logout`)

    if (response.ok) {
      dispatch(logoutSucessAction())
    } else {
      dispatch(logoutFailureAction(`${response.status}: Could not logout`))
    }
  } catch (err) {
    dispatch(logoutFailureAction(err))
  }
}
