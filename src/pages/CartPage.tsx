import React, { useState } from 'react'
import { Container, Message } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'

import CartProducts from '../components/CartProducts'
import CartInfo from '../components/CartInfo'
import { removeFromCart } from '../redux/actions/cart'
import { AppState } from '../types'

const CartPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const { inCart: cartProducts } = useSelector((state: AppState) => state.cart)

  const { authedUser } = useSelector((state: AppState) => state.userLogin)

  const handleRemoveFromCart = (productId: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    } else {
      setErrorMessage('Could not remove product')
    }
  }

  return (
    <Container text style={{ margin: '2em' }}>
      {errorMessage && <Message error header="Oops!" content={errorMessage} />}
      <CartProducts
        handleRemoveFromCart={handleRemoveFromCart}
        user={authedUser}
        cartProducts={cartProducts}
      />
      <CartInfo
        cartProducts={cartProducts}
        handleCheckout={() => console.log('checkout')}
      />
    </Container>
  )
}

export default CartPage
