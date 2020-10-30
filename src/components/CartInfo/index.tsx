import React, { useEffect, useState } from 'react'
import { Button, Segment, Divider } from 'semantic-ui-react'

import { CartInfoProps } from '../../types'

const CartInfo = ({ cartProducts, handleCheckout }: CartInfoProps) => {
  const [isCartEmpty, setCartEmpty] = useState(false)
  const [cartAmount, setCartAmount] = useState(0)
  const [cartItems, setCartItems] = useState(0)

  useEffect(() => {
    if (cartProducts) {
      const items = cartProducts.reduce((acc, item) => acc + item.quantity, 0)
      const amount = cartProducts.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      )

      setCartItems(items)
      setCartAmount(amount)
      setCartEmpty(false)
    } else {
      setCartEmpty(true)
    }
  }, [cartProducts])

  return (
    <>
      <Divider />
      <Segment.Group horizontal size="large">
        <Segment>
          <strong>Total items:</strong> {cartItems}{' '}
        </Segment>
        <Segment>
          <strong>Subtotal:</strong> € {cartAmount}
        </Segment>
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={isCartEmpty}
          onClick={handleCheckout}
        />
      </Segment.Group>
    </>
  )
}

export default CartInfo
