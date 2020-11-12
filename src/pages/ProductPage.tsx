import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Segment, Message, Container } from 'semantic-ui-react'

import ProductDetails from '../components/ProductDetails'
import ProductDescription from '../components/ProductDescription'
import LoaderComponent from '../components/LoaderComponent'
import { ProductParams, AppState } from '../types'
import {
  getProductDetails,
  productDetailsReset,
} from '../redux/actions/products'

const ProductPage = () => {
  const { productId } = useParams<ProductParams>()
  const dispatch = useDispatch()

  const { product, loading, error } = useSelector(
    (state: AppState) => state.productDetails
  )

  useEffect(() => {
    dispatch(getProductDetails(productId))

    return () => {
      dispatch(productDetailsReset())
    }
  }, [dispatch, productId])

  return (
    <Container text style={{ marginTop: '2em' }}>
      {loading ? (
        <LoaderComponent />
      ) : error ? (
        <Message error content={error} header="Oops!" />
      ) : (
        product && (
          <Segment>
            <ProductDetails product={product} />
            <ProductDescription
              description={product?.description}
              productId={productId}
            />
          </Segment>
        )
      )}
    </Container>
  )
}

export default ProductPage
