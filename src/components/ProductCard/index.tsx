import React from 'react'
import { Card } from 'semantic-ui-react'

import { Product, ProductCardProps } from '../../types'

const ProductCard = ({ products }: ProductCardProps) => {
  const mapProductsToItems = (products: Product[]) => {
    return products.map((product: Product) => ({
      header: product.name,
      image: product.mediaUrl,
      meta: product.countInStock < 1 ? 'Out of stock' : '',
      extra: `€ ${product.price}`,
      color: 'teal',
      fluid: true,
      childKey: product._id,
      key: product._id,
      href: `/products/${product._id}`,
    }))
  }

  return (
    <Card.Group
      itemsPerRow="3"
      stackable
      centered
      items={mapProductsToItems(products)}
      style={{ marginBottom: '2em' }}
    />
  )
}

export default ProductCard
