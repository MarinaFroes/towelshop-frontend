import React from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Container, Pagination } from 'semantic-ui-react'
import * as QueryString from 'query-string'

import { ProductPaginationProps } from '../../types'

const ProductPagination = ({ totalPages, isAdmin }: ProductPaginationProps) => {
  const history = useHistory()
  const location = useLocation()

  const parsed = QueryString.parse(location.search, { parseNumbers: true })

  const baseUrl = isAdmin ? '/manage-product' : '/'

  const getUrl = (activePage: string | number | undefined) => {
    const stringified = QueryString.stringify(parsed)
    const regex = /page=[0-9]*/g

    let otherQueries = stringified.replace(regex, '')
    let newUrl = `${baseUrl}?page=${activePage}${
      otherQueries ? `&${otherQueries}` : ''
    }`

    return newUrl
  }

  return (
    <>
      {totalPages > 1 && (
        <Container textAlign="center" style={{ margin: '2em ' }}>
          <Pagination
            activePage={typeof parsed.page === 'number' ? parsed.page : 1}
            totalPages={totalPages}
            onPageChange={(event, data) => {
              data.activePage === 1
                ? history.push(baseUrl)
                : history.push(getUrl(data.activePage))
            }}
          />
        </Container>
      )}
    </>
  )
}

export default ProductPagination
