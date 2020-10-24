import React from 'react'
import Routes from './Routes'
import { Container } from 'semantic-ui-react'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <NavBar />
      <Container
        style={{
          minHeight: '75vh',
          width: '100%',
        }}
        vertical="true"
      >
        <Routes />
      </Container>
      <Footer />
    </>
  )
}

export default App
