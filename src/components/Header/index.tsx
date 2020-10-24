import React from 'react'
import { Segment, Header as SuiHeader } from 'semantic-ui-react'

import { HeadingProps } from '../../types'
import './Header.css'

const Header = ({ mobile = false, h1Content, h2Content }: HeadingProps) => (
  <Segment color="black" inverted textAlign="center">
    <SuiHeader
      as="h1"
      content={h1Content}
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '2em',
      }}
    />
    <SuiHeader
      as="h2"
      content={h2Content}
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
        marginBottom: mobile ? '1em' : '2em',
      }}
    />
  </Segment>
)

export default React.memo(Header)
