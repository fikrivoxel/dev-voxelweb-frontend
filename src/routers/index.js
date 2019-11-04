import React, {PureComponent} from 'react'
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Switch, Route, withRouter} from 'react-router-dom'
import _ from 'lodash'
import {
  removeUser
} from 'store/actions/usersActions'
import routes from 'routers/routes'

class Routers extends PureComponent {
  routes = routes
  urlPick = ['/devs', '/games']

  get routesMap() {
    return this.routes.map((route, idx) => {
      return <Route {...route} key={idx}/>
    })
  }

  get isOld() {
    let {browser, link} = this.props.users
    return !_.isEmpty(browser) && !_.isEmpty(link)
  }

  componentDidMount() {
    this.didMounted()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_.isEqual(prevProps.location, this.props.location)) {
      this.didUpdateLocation()
    }
  }

  didMounted() {
    this.checkisNew()
  }

  didUpdateLocation() {
    this.checkisNew()
  }

  checkisNew() {
    let {location, history, users} = this.props
    if (this.isOld) {
      if (location.pathname === '/') return history.push(`${users.link}`)
      else {
        let rgxLink = new RegExp("^(\\" + users.link + ")", 'i')
        let checkLink = location.pathname.search(rgxLink)
        if (checkLink === -1) {
          let rgxLinkDev = new RegExp("^(\\" + this.urlPick[0] + ")", 'i')
          let rgxLinkGame = new RegExp("^(\\" + this.urlPick[1] + ")", 'i')
          if (users.link === '/devs' && location.pathname.search(rgxLinkGame) !== -1) return history.push(`${users.link}`)
          if (users.link === '/games' && location.pathname.search(rgxLinkDev) !== -1) return history.push(`${users.link}`)
        }
      }
    } else {
      this.props.usersDis.remove()
      if (location.pathname === '/') return
      else {
        let rgxLinkDev = new RegExp("^(\\" + this.urlPick[0] + ")", 'i')
        let rgxLinkGame = new RegExp("^(\\" + this.urlPick[1] + ")", 'i')
        if (location.pathname.search(rgxLinkDev) !== -1) return history.push('/')
        if (location.pathname.search(rgxLinkGame) !== -1) return history.push('/')
      }
    }
  }

  render() {
    return (
      <Switch>
        {this.routesMap}
      </Switch>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    users: state.Users
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    usersDis: bindActionCreators({
      remove: removeUser
    }, dispatch)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Routers)
