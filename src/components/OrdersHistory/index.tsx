import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Header, Segment, Button, Icon, Message } from 'semantic-ui-react'

import { AppState } from '../../types'

const OrderHistory = () => {
  const history = useHistory()

  const { inCart } = useSelector((state: AppState) => state.cart)

  return (
    <>
      {inCart.length > 0 && (
        <Message warning>
          <Header as="h4">
            You still have products in your cart. Finish your order.
          </Header>
          <Link to="/cart">Go to cart</Link>
        </Message>
      )}
      <Header as="h2">
        <Icon name="boxes" />
        Orders Information
      </Header>
      <Segment textAlign="center" placeholder>
        <Header as="h3">You have no orders yet. Order something!</Header>
        <div>
          <Button color="orange" onClick={() => history.push('/')}>
            View Products
          </Button>
        </div>
      </Segment>
    </>
  )
}

export default OrderHistory
