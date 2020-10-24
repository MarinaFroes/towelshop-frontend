import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { ProductProps, AppState } from '../../types'
import { addToCart } from '../../redux/actions/cart'

const AddProductToCart = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState(1)
  const history = useHistory()
  const dispatch = useDispatch()

  const { authedUser } = useSelector((state: AppState) => state.userLogin)

  const { success } = useSelector((state: AppState) => state.cart)

  useEffect(() => {
    if (success) {
      history.push('/cart')
    }
  }, [dispatch, success, history])

  const handleAddProduct = (productId: string, qty: number) => {
    dispatch(addToCart(productId, qty))
  }

  return (
    <Input
      type="number"
      min="1"
      max={product.countInStock}
      placeholder="Quantity"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
      action={
        authedUser && product.countInStock < 1
          ? {
              color: 'grey',
              content: 'Out of stock',
              icon: 'plus cart',
              disabled: true,
            }
          : authedUser
          ? {
              color: 'orange',
              content: 'Add to Cart',
              icon: 'plus cart',
              onClick: () => handleAddProduct(product._id, quantity),
            }
          : {
              color: 'blue',
              content: 'Sign up to purchase',
              icon: 'sign in',
              onClick: () => history.push('/signup'),
            }
      }
    />
  )
}

export default AddProductToCart
