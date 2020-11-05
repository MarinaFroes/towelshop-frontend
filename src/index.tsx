import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'

import * as serviceWorker from './serviceWorker'
import makeStore from './redux/store'
import App from './App'
import './index.css'

const store = makeStore()

const WithProvider = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))

serviceWorker.unregister()
