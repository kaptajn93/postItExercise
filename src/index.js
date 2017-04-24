import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import myApp from './reducers'

let store = createStore(myApp)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
