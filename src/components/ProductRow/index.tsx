import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Image, Button, Modal } from 'semantic-ui-react'

import { deleteProduct } from '../../redux/actions/products'
import { ProductRowProps } from '../../types'

const ProductRow = ({ product }: ProductRowProps) => {
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  return (
    <Table.Row>
      <Table.Cell textAlign="center">
        <Image src={product.mediaUrl} size="tiny" />
      </Table.Cell>
      <Table.Cell textAlign="center">{product.name}</Table.Cell>
      <Table.Cell textAlign="center">
        {product.categories.join(', ')}
      </Table.Cell>
      <Table.Cell textAlign="center">{product.variant}</Table.Cell>
      <Table.Cell textAlign="center">{product.size}</Table.Cell>
      <Table.Cell textAlign="center">{product.countInStock}</Table.Cell>
      <Table.Cell textAlign="center">€ {product.price}</Table.Cell>
      <Table.Cell textAlign="center">
        <Button
          icon="trash alternate outline"
          color="red"
          onClick={() => setModal(true)}
        />
        <Modal open={modal} dimmer="blurring">
          <Modal.Header>Confirm delete</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {product.name}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button content="Cancel" onClick={() => setModal(false)} />
            <Button
              negative
              icon="trash"
              labelPosition="right"
              content="Delete"
              onClick={() => dispatch(deleteProduct(product._id))}
            />
          </Modal.Actions>
        </Modal>
        <Link to={`/products/${product._id}/edit`}>
          <Button icon="edit outline" color="grey" />
        </Link>
      </Table.Cell>
    </Table.Row>
  )
}

export default ProductRow
