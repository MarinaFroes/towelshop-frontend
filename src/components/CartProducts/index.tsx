import React from 'react'
import { useHistory } from 'react-router-dom'
import { Header, Segment, Button, Icon, Item } from 'semantic-ui-react'

import { CartItemProps } from '../../types'

const CartProducts = ({
  cartProducts,
  user,
  handleRemoveFromCart,
}: CartItemProps) => {
  const history = useHistory()

  if (cartProducts.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No products in your cart. Add some!
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => history.push('/')}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => history.push('/login')}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    )
  }

  return (
    <Item.Group divided>
      {cartProducts.map((item) => (
        <Item key={item.productId}>
          {item.mediaUrl ? (
            <Item.Image src={item.mediaUrl} size="tiny" />
          ) : (
            <Item.Image
              src="https://dummyimage.com/300x400/e6e6e6/000.png&text=No+photo+:("
              size="tiny"
            />
          )}
          <Item.Content>
            <Item.Header as="a" href={`/products/${item.productId}`}>
              {item.name}
            </Item.Header>
            <Item.Meta>{`id: ${item.productId}`}</Item.Meta>
            <Item.Description>
              {item.qty} X € {item.price}
            </Item.Description>
            <Item.Extra>
              <Button
                basic
                icon="remove"
                floated="right"
                onClick={() => handleRemoveFromCart(item.productId)}
              />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  )
}

export default CartProducts
