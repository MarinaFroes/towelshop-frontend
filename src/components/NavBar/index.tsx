import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { useCookies } from 'react-cookie'

import { AppState } from '../../types'
import { logoutUser, loginGoogleUser } from '../../redux/actions/user'

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const { authedUser } = useSelector((state: AppState) => state.userLogin)

  const { inCart } = useSelector((state: AppState) => state.cart)

  useEffect(() => {
    if (cookies && cookies.token && !authedUser) {
      dispatch(loginGoogleUser(cookies.token))
      removeCookie('token')
    }

    if (authedUser && authedUser.role === 'admin') {
      setIsAdmin(true)
    }
  }, [cookies, dispatch, authedUser, removeCookie])

  const isActive = (path: string) => {
    return path === location.pathname
  }

  const handleLogout = () => {
    removeCookie('token')
    localStorage.removeItem('userLogin')

    dispatch(logoutUser())
  }

  return (
    <Menu stackable fluid id="menu" inverted style={{ margin: 0 }}>
      <Link to="/">
        <Menu.Item header active={isActive('/')}>
          <Icon name="home" size="large" />
          TowelShop42
        </Menu.Item>
      </Link>

      <Link to="/our-history">
        <Menu.Item header active={isActive('/our-history')}>
          <Icon name="book" size="large" />
          Our history
        </Menu.Item>
      </Link>

      <Link to="/cart">
        <Menu.Item header active={isActive('/cart')}>
          {inCart.length > 0 ? (
            <Icon.Group size="large">
              <Icon name="cart" />
              <Icon corner="top right" name="circle thin" color="red" />
            </Icon.Group>
          ) : (
            <Icon name="cart" size="large" />
          )}
          Cart
        </Menu.Item>
      </Link>

      {authedUser && isAdmin && (
        <Link to="/manage-product">
          <Menu.Item header active={isActive('/create')}>
            <Icon name="wrench" size="large" />
            Manage products
          </Menu.Item>
        </Link>
      )}
      {authedUser ? (
        <>
          <Menu.Menu position="right">
            <Link to="/account">
              <Menu.Item header active={isActive('/account')}>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>
            <Menu.Item onClick={handleLogout} header>
              <Icon name="sign out" size="large" />
              Logout
            </Menu.Item>
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Menu position="right">
            <Link to="/login">
              <Menu.Item header active={isActive('/login')}>
                <Icon name="sign in" size="large" />
                Login
              </Menu.Item>
            </Link>
            <Link to="/signup">
              <Menu.Item header active={isActive('/signup')} position="right">
                <Icon name="signup" size="large" />
                Signup
              </Menu.Item>
            </Link>
          </Menu.Menu>
        </>
      )}
    </Menu>
  )
}

export default React.memo(NavBar)
