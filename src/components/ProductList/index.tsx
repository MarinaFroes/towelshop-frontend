import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as QueryString from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Table, Icon, Message } from 'semantic-ui-react'

import { AppState } from '../../types'
import ProductRow from '../ProductRow'
import Pagination from '../Pagination'
import { listProducts } from '../../redux/actions/products'

const ProductList = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { page, name, size, category, variant } = QueryString.parse(
    location.search
  )

  const { products: productList, totalPages } = useSelector(
    (state: AppState) => state.productList
  )

  useEffect(() => {
    dispatch(listProducts({ page, name, size, category, variant }))
  }, [dispatch, page, name, size, category, variant])

  return (
    <div style={{ margin: '2em 0' }}>
      <Header as="h2">
        <Icon name="settings" />
        Product list
      </Header>
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product id</Table.HeaderCell>
            <Table.HeaderCell>Media</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Categories</Table.HeaderCell>
            <Table.HeaderCell>Variant</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productList ? (
            productList.map((product) => (
              <ProductRow key={product._id} product={product} />
            ))
          ) : (
            <Message content="No products" color="teal" />
          )}
        </Table.Body>
      </Table>
      <Pagination totalPages={totalPages} isAdmin={true} />
    </div>
  )
}

export default React.memo(ProductList)
