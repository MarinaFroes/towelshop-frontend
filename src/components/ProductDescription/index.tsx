import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Button, Modal } from 'semantic-ui-react'

import { deleteProduct } from '../../redux/actions/products'
import { ProductDescriptionProps, AppState } from '../../types'

const ProductDescription = ({
  description,
  productId,
}: ProductDescriptionProps) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  const { authedUser } = useSelector((state: AppState) => state.userLogin)

  useEffect(() => {
    if (authedUser && authedUser.role === 'admin') {
      setIsAdmin(true)
    }
  }, [dispatch, authedUser])

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProduct(productId))
  }

  return (
    <>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      {isAdmin && (
        <>
          <Button
            icon="trash alternate outline"
            color="red"
            content="Delete product"
            onClick={() => setModal(true)}
          />
          <Modal open={modal} dimmer="blurring">
            <Modal.Header>Confirm delete</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to delete this product?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" onClick={() => setModal(false)} />
              <Button
                negative
                icon="trash"
                labelPosition="right"
                content="Delete"
                onClick={() => handleDeleteProduct(productId)}
              />
            </Modal.Actions>
          </Modal>
        </>
      )}
    </>
  )
}

export default React.memo(ProductDescription)
