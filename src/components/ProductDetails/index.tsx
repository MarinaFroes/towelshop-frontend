import React from 'react'
import { Item, Label } from 'semantic-ui-react'

import AddProductToCart from '../AddProductToCart'
import { ProductProps } from '../../types'

const ProductDetails = ({ product }: ProductProps) => {
  const { mediaUrl, name, variant, price } = product

  return (
    <Item.Group>
      {product && (
        <Item>
          <Item.Image size="medium" src={mediaUrl} />
          <Item.Content>
            <Item.Header>{name}</Item.Header>
            <Item.Description>
              <p>€ {price}</p>
              <Label>{variant}</Label>
            </Item.Description>
            <Item.Extra>
              <AddProductToCart product={product} />
            </Item.Extra>
          </Item.Content>
        </Item>
      )}
    </Item.Group>
  )
}

export default ProductDetails
