import React from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'

import { Product, ProductCardProps } from '../../types'

const ProductCard = ({ products }: ProductCardProps) => {
  const history = useHistory()

  return (
    <Card.Group
      itemsPerRow="3"
      stackable
      centered
      style={{ marginBottom: '2em' }}
    >
      {products.map((product: Product) => (
        <Card
          color="teal"
          fluid
          key={product._id}
          onClick={() => history.push(`/products/${product._id}`)}
        >
          <Image src={product.mediaUrl} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>
              {product.countInStock < 1 ? 'Out of stock' : ''}
            </Card.Meta>
            <Card.Description>Variant: {product.variant}</Card.Description>
          </Card.Content>
          <Card.Content extra>€ {product.price}</Card.Content>
        </Card>
      ))}
    </Card.Group>
  )
}

export default ProductCard
