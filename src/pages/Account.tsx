import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import AccountHeader from '../components/AccountHeader'
import OrdersHistory from '../components/OrdersHistory'
import UserList from '../components/UserList'
import { getUserDetails, userDetailsResetAction } from '../redux/actions/user'
import { AppState } from '../types'

const Account = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { authedUser } = useSelector((state: AppState) => state.userLogin)

  const { user } = useSelector((state: AppState) => state.userDetails)

  useEffect(() => {
    if (!user && authedUser) {
      dispatch(getUserDetails(authedUser._id))
    }

    if (!authedUser) {
      history.push('/login')
    }
  }, [authedUser, dispatch, user, history])

  useEffect(() => {
    return () => {
      dispatch(userDetailsResetAction())
    }
  }, [dispatch])

  return (
    <>
      {user && (
        <Container style={{ margin: '2em' }}>
          <AccountHeader user={user} />
          {user.role === 'admin' && user._id && (
            <UserList loggedUserId={user._id} />
          )}
          {user.role === 'user' && <OrdersHistory />}
        </Container>
      )}
    </>
  )
}

export default Account
