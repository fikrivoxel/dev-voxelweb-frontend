import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'
import Routers from 'routers'

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <PersistGate loading={null} persistor={this.props.persistor}>
          <ConnectedRouter history={this.props.history}>
            <Routers />
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
