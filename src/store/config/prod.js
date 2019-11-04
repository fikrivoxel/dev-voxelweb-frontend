import {createStore, applyMiddleware} from 'redux'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storageSession  from 'redux-persist/lib/storage/session'
import createRootReducers from 'store/reducers'

const history = createBrowserHistory()
const rootReducer = createRootReducers(history)
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)

const config = {
  key: 'voxel-web-app',
  storage: storageSession
}

const configureStore = function (initialState) {
  let reducers = persistReducer(config, rootReducer)
  return createStore({
    reducers,
    initialState,
    enhancer
  })
}
const configurePeristor = function (store = configureStore()) {
  return persistStore(store)
}

export default { configureStore, configurePeristor, history }
