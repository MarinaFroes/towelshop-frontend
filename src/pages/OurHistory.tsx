import React from 'react'
import {
  Container,
  Segment,
  Grid,
  Header as SuiHeader,
  Image,
  Button,
  Message,
} from 'semantic-ui-react'

import Header from '../components/Header'

const OurHistory = () => (
  <>
    <Header
      h1Content="Our history"
      h2Content="A towel is not a product, is a lifestyle."
    />
    <Container>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <SuiHeader as="h3" style={{ fontSize: '2em' }}>
                Why we sell towels
              </SuiHeader>
              <p style={{ fontSize: '1.33em' }}>
                A towel, as{' '}
                <a
                  href="https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Hitchhiker's Guide to the Galaxy
                </a>{' '}
                says, is about the most massively useful thing an interstellar
                hitchhiker can have. Partly it has great practical value. You
                can wrap it around you for warmth as you bound across the cold
                moons of Jaglan Beta; you can lie on it on the brilliant
                marble-sanded beaches of Santraginus V, inhaling the heady sea
                vapours; you can sleep under it beneath the stars which shine so
                redly on the desert world of Kakrafoon; use it to sail a
                miniraft down the slow heavy River Moth; wet it for use in
                hand-to-hand-combat; wrap it round your head to ward off noxious
                fumes or avoid the gaze of the Ravenous Bugblatter Beast of
                Traal (such a mind-bogglingly stupid animal, it assumes that if
                you can't see it, it can't see you — daft as a brush, but very
                very ravenous); you can wave your towel in emergencies as a
                distress signal, and of course dry yourself off with it if it
                still seems to be clean enough.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://res.cloudinary.com/dglvomnoi/image/upload/v1603110077/hhtiufe01piez4ev8ciy.jpg"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button
                size="huge"
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy"
              >
                Read more
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <SuiHeader as="h3" style={{ fontSize: '2em' }}>
                How many towels should I have?
              </SuiHeader>
              <p style={{ fontSize: '1.33em' }}>
                The TowelShop42 team thinks that{' '}
                <a
                  href="https://en.wikipedia.org/wiki/42_(number)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  42{' '}
                </a>
                is the answer to the ultimate question of life, the universe,
                and everything"
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <SuiHeader as="h3" style={{ fontSize: '2em' }}>
                Do you want to know more about towels?
              </SuiHeader>
              <p style={{ fontSize: '1.33em' }}>
                Read about{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Towel_Day"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Towel Day
                </a>
                .
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid container stackable verticalAlign="middle">
          <Grid.Column
            floated="left"
            width={6}
            style={{ paddingBottom: '5em', paddingTop: '5em' }}
          >
            <Image
              bordered
              rounded
              size="large"
              src="https://res.cloudinary.com/dglvomnoi/image/upload/v1603111060/m8nrze7yezcjgrz4cqp2.jpg"
            />
          </Grid.Column>
          <Grid.Column
            width={8}
            style={{ paddingBottom: '5em', paddingTop: '5em' }}
          >
            <SuiHeader as="h3" style={{ fontSize: '2em' }}>
              More reasons to buy a towel
            </SuiHeader>
            <p style={{ fontSize: '1.33em' }}>
              A towel has immense psychological value. For some reason, if a
              strag (strag: non-hitch hiker) discovers that a hitchhiker has his
              towel with him, he will automatically assume that he is also in
              possession of a toothbrush, face flannel, soap, tin of biscuits,
              flask, compass, map, ball of string, gnat spray, wet weather gear,
              space suit etc., etc. Furthermore, the strag will then happily
              lend the hitch hiker any of these or a dozen other items that the
              hitch hiker might accidentally have "lost." What the strag will
              think is that any man who can hitch the length and breadth of the
              galaxy, rough it, slum it, struggle against terrible odds, win
              through, and still knows where his towel is, is clearly a man to
              be reckoned with.
            </p>
          </Grid.Column>
        </Grid>
        <Message style={{ marginBottom: '1em' }}>
          The content of this page was copied from{' '}
          <a href="https://en.wikipedia.org/wiki/Towel_Day">Wikipedia</a>
        </Message>
      </Segment>
    </Container>
  </>
)

export default OurHistory
