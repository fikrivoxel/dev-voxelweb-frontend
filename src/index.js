import './libs'


import React from 'react'
import {render} from 'react-dom'
import App from 'App'
import {configureStore, history, configurePeristor} from 'store/config'
import 'styles/app.scss'
import 'particles.js/particles'

const store = configureStore()
const peristor = configurePeristor(store)

render(
  <App store={store} history={history} persistor={peristor} />,
  document.getElementById('root')
)
