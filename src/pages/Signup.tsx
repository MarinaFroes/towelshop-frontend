import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Form,
  Icon,
  Message,
  Segment,
  Container,
} from 'semantic-ui-react'

import { AppState, NewUser } from '../types'
import { signupUser } from '../redux/actions/user'

const INITIAL_USER: NewUser = {
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const Signup = () => {
  const [newUser, setNewUser] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const { loading } = useSelector((state: AppState) => state.userSignup)

  const { success } = useSelector((state: AppState) => state.userSignup)

  const { error } = useSelector((state: AppState) => state.userSignup)

  const { authedUser } = useSelector((state: AppState) => state.userLogin)

  useEffect(() => {
    const isUser: boolean = Object.values(newUser).every((el) => Boolean(el))
    isUser && confirmPassword ? setDisabled(false) : setDisabled(true)

    if (success) {
      history.push('/account')
    }
  }, [newUser, confirmPassword, success, history, dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (name === 'confirmPassword') {
      setConfirmPassword(value)
    } else {
      setNewUser((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newUser.password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        signupUser({
          userName: newUser.userName,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password,
        })
      )
    }
  }

  if (authedUser) {
    return <Redirect to="/account" />
  }

  return (
    <Container text style={{ marginTop: '2em' }}>
      <Message
        attached
        icon="setting"
        header="Get started"
        content="Create a new account"
        color="teal"
        style={{
          marginBottom: '1em',
        }}
      />
      <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
        {error && <Message error header="Oops!" content={error} />}
        {message && <Message warning header="Oops!" content={message} />}
        <Segment>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First Name"
              placeholder="Ford"
              name="firstName"
              value={newUser.firstName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              label="Last Name"
              placeholder="Prefect"
              name="lastName"
              value={newUser.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              label="User Name"
              placeholder="fordPrefect"
              name="userName"
              value={newUser.userName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="envelope"
              iconPosition="left"
              label="Email"
              placeholder="fprefect@example.com"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              label="Confirm Password"
              placeholder="Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            icon="signup"
            type="submit"
            color="orange"
            content="Sign up"
            disabled={disabled || loading}
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user? <Link to="/login"> Log in here </Link> instead.
      </Message>
    </Container>
  )
}

export default Signup
