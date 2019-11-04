import {
  SET_USER,
  SET_BROWSER_USER,
  SET_LINK_USER,
  REMOVE_USER
} from 'store/actions/usersActions'

const initState = {
  browser: '',
  link: ''
}

const setUser = function (state, payload) {
  if (Object.keys(payload).some(v => ['browser', 'link'].includes(v))) state = {
    ...state,
    ...payload
  }
  return state
}
const setBrowserUser = function (state, payload) {
  state = {
    ...state,
    browser: payload
  }
  return state
}
const setLinkUser = function (state, payload) {
  if (['dev', 'game'].includes(payload)) state = {
    ...state,
    link: payload
  }
  return state
}
const removeUser = function (state) {
  state = {
    ...state,
    ...initState
  }
  return state
}

export default function(state = initState, actions) {
  let {payload, type} = actions
  switch(type) {
    case SET_USER:
      return setUser(state, payload)
    case SET_BROWSER_USER:
      return setBrowserUser(state, payload)
    case SET_LINK_USER:
      return setLinkUser(state, payload)
    case REMOVE_USER:
      return removeUser(state)
    default:
      return state
  }
}
