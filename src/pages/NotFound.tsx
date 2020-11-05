import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Header, Icon, Segment, Container } from 'semantic-ui-react'

const NotFound = () => {
  const history = useHistory()

  return (
    <Container text>
      <Segment placeholder style={{ margin: '2em' }}>
        <Header icon>
          <Icon name='frown outline' />
          404 - Page not found
        </Header>
        <Segment.Inline>
          <Button color='teal' onClick={() => history.push('/')}>
            Go back to home page
          </Button>
        </Segment.Inline>
      </Segment>
    </Container>
  )
}

export default NotFound
