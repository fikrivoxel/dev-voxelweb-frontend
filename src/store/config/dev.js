import {createStore, applyMiddleware, compose} from 'redux'
import {createBrowserHistory} from 'history'
import {routerMiddleware, routerActions} from 'connected-react-router'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'
import storageSession  from 'redux-persist/lib/storage/session'
import createRootReducers from 'store/reducers'
import * as usersActions from 'store/actions/usersActions'
import {NODE_ENV} from 'config/index'

const history = createBrowserHistory()
const rootReducers = createRootReducers(history)
const config = {
  key: 'web-voxel-app',
  storage: storageSession,
  whitelist: ['Users'],
  blacklist: ['*']
}

const configureStore  = function (initState) {
  let middleware = [], enhancers = []
  middleware.push(thunk)
  let logger = createLogger({
    level: 'info',
    collapsed: true
  })
  if (NODE_ENV !== 'test') middleware.push(logger)
  let router = routerMiddleware(history)
  middleware.push(router)
  let actionsCreators = {
    ...usersActions,
    ...routerActions
  }
  let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsCreators
    }) : compose
  enhancers.push(applyMiddleware(...middleware))
  let enhancer = composeEnhancers(...enhancers)
  let reducers = persistReducer(config, rootReducers)
  return createStore(reducers, initState, enhancer)
}

const configurePeristor = function (store) {
  return persistStore(store)
}

export default {configureStore, configurePeristor, history}
