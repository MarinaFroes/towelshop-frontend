import React from 'react'
import { Dimmer, Loader, Image } from 'semantic-ui-react'

const LoaderComponent = () => (
  <>
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </>
)

export default React.memo(LoaderComponent)
