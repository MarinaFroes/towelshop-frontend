import React from 'react'
import { Container, Segment, Grid, Header, List, Icon } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: '3em 0em', marginTop: '2em' }}>
      <Container text>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a" href="/our-history">
                  Our history
                </List.Item>
                <List.Item as="a">Terms and conditions</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Pre-Order</List.Item>
                <List.Item as="a">FAQ</List.Item>
                <List.Item as="a">How To Order</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                You can also find us on
              </Header>
              <Icon name="facebook" size="large" />
              <Icon name="twitter" size="large" />
              <Icon name="instagram" size="large" />
              <p>
                Follow TowelShop42 on social medias and sign up our newsletter
                to keep track of our news.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}

export default React.memo(Footer)
