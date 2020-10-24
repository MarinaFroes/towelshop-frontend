import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'
import * as QueryString from 'query-string'

import Header from '../components/Header'
import Search from '../components/Search'
import LoaderComponent from '../components/LoaderComponent'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import { AppState } from '../types'
import { listProducts } from '../redux/actions/products'

const Home = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { page, name, size, category, variant } = QueryString.parse(
    location.search
  )

  const { productList } = useSelector((state: AppState) => state)
  const { products, totalPages } = productList

  const { loading } = useSelector((state: AppState) => state.productList)

  const { error } = useSelector((state: AppState) => state.productList)

  useEffect(() => {
    dispatch(listProducts({ page, name, size, category, variant }))
  }, [dispatch, page, name, size, category, variant])

  return (
    <>
      <Header
        h1Content="Don't panic. Buy a towel."
        h2Content="The most useful thing an interstellar hitchhiker can have"
      />
      {loading ? (
        <LoaderComponent />
      ) : error ? (
        <Message error header="Oops!" content={error} />
      ) : (
        products && (
          <Container style={{ marginTop: '2em' }}>
            <Search />
            <ProductCard products={products} />
            <Pagination totalPages={totalPages} />
          </Container>
        )
      )}
    </>
  )
}

export default Home
