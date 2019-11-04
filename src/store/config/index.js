import dev from 'store/config/dev'
import prod from 'store/config/prod'
import {NODE_ENV} from 'config/index'

const selectedConfigureStore = NODE_ENV === 'production' ? prod : dev

export const {configureStore, configurePeristor, history} = selectedConfigureStore
