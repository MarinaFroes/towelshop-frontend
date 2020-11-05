import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import { AppState } from '../types'
import { loginUser } from '../redux/actions/user'
import { getCart } from '../redux/actions/cart'
import baseUrl from '../util/baseUrl'

const INITIAL_USER = {
  email: '',
  password: '',
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)

  const history = useHistory()
  const dispatch = useDispatch()

  const { loading, error, authedUser } = useSelector(
    (state: AppState) => state.userLogin
  )

  useEffect(() => {
    const isLoginInfo: boolean = Object.values(loginInfo).every((el) =>
      Boolean(el)
    )
    isLoginInfo ? setDisabled(false) : setDisabled(true)
  }, [loginInfo, dispatch])

  useEffect(() => {
    if (authedUser) {
      dispatch(getCart())
      history.push('/account')
    }
  }, [dispatch, authedUser, history])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    setLoginInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const responseGoogle = async (response: any) => {
    if (response && response.tokenObj) {
      const { id_token } = response.tokenObj

      try {
        const res = await fetch(`${baseUrl}/api/v1/auth/google-authenticate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
          body: id_token,
        })

        if (res.ok) {
          window.location.reload()
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(loginInfo))
  }

  return (
    <Container text style={{ marginTop: '2em' }}>
      <Message
        attached
        icon='privacy'
        header='Welcome back'
        content='Login in with email and password or you gogle account'
        color='blue'
        style={{
          marginBottom: '1em',
        }}
      />
      <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
        {error && <Message error header='Oops!' content={error} />}

        <Segment>
          <Form.Input
            fluid
            icon='envelope'
            iconPosition='left'
            label='Email'
            placeholder='fprefect@example.com'
            name='email'
            type='email'
            value={loginInfo.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            label='Password'
            placeholder='Password'
            type='password'
            name='password'
            value={loginInfo.password}
            onChange={handleChange}
          />
          <Button
            icon='sign in'
            type='submit'
            color='orange'
            content='Login'
            disabled={disabled || loading}
            style={{ marginRight: '2em' }}
          />
          <GoogleLogin
            clientId='924878298620-pc62g9jo64m8p3muloa0r76do7lq3kov.apps.googleusercontent.com'
            buttonText='Login with Google'
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            style={{ margin: '1em' }}
          />
        </Segment>
      </Form>

      <Message attached='bottom' warning>
        <Icon name='help' />
        New user?
        <Link to='/signup'> Sign up here </Link> instead.
      </Message>
    </Container>
  )
}

export default Login
