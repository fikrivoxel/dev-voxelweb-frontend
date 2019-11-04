export const SET_USER = 'SET_USER'
export const SET_BROWSER_USER = 'SET_BROWSER_USER'
export const SET_LINK_USER = 'SET_LINK_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const setUser = function (payload) {
  return {
    type: SET_USER,
    payload
  }
}
export const setBrowserUser = function (payload) {
  return {
    type: SET_BROWSER_USER,
    payload
  }
}
export const setLinkUser = function (payload) {
  return {
    type: SET_LINK_USER,
    payload
  }
}
export const removeUser = function () {
  return {
    type: REMOVE_USER
  }
}
