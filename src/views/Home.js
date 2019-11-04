import React, {PureComponent} from 'react'
import {compose, bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Velocity from 'velocity-animate'
import async from 'async'
import Bowser from 'bowser'
import OnImagesLoaded from 'react-on-images-loaded'
import {
  setUser
} from 'store/actions/usersActions'

class Home extends PureComponent {
  isAnimate = false
  state = {
    imageLoaded: false
  }
  constructor(props) {
    super(props)
    this.toDevs = this.toDevs.bind(this)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.imageLoaded !== this.state.imageLoaded) {
      this.updateImageLoaded()
    }
  }
  get bowser() {
    return Bowser.parse(window.navigator.userAgent)
  }
  async updateImageLoaded() {
    if (this.state.imageLoaded) {
      await this.mountAnimte()
      this.isAnimate = false
    }
  }
  mountAnimte() {
    return new Promise(res => {
      this.isAnimate = true
      async.waterfall([
        (callback) => {
          Promise.all([
            this.mountAnimateDev(),
            this.mountAnimateGames()
          ]).then(() => callback())
        },
        (callback) => {
          this.mountAnimateLogo().then(() => callback())
        }
      ], () => {
        res()
      })
    })
  }
  mountAnimateDev() {
    return new Promise(res => {
      Velocity(this.refs.dev, {
        transform: ["translateY(0)", "translateY(-100%)"]
      }, {
        duration: 1500,
        complete: () => {
          res()
        }
      })
    })
  }
  mountAnimateGames() {
    return new Promise(res => {
      Velocity(this.refs.games, {
        transform: ["translateY(0)", "translateY(100%)"],
      }, {
        duration: 1500,
        complete: () => {
          res()
        }
      })
    })
  }
  mountAnimateLogo() {
    return new Promise(res => {
      Velocity(this.refs.logo, {
        transform: ["rotateZ(360deg) scale(1)", "rotateZ(0) scale(0)"]
      }, {
        duration: 1500,
        complete: () => {
          res()
        }
      })
    })
  }
  unmountAnimate() {
    return new Promise(res => {
      this.isAnimate = true
      async.waterfall([
        (callback) => {
          this.unmountAnimateLogo().then(() => callback())
        },
        (callback) => {
          Promise.all([
            this.unmountAnimateDev(),
            this.unmountAnimateGames()
          ]).then(callback)
        }
      ], () => {
        res()
      })
    })
  }
  unmountAnimateDev() {
    return new Promise(res => {
      Velocity(this.refs.dev, {
        transform: ["translateY(-100%)", "translateY(0)"]
      }, {
        duration: 1500,
        complete: () => {
          res()
        }
      })
    })
  }
  unmountAnimateGames() {
    return new Promise(res => {
      Velocity(this.refs.games, {
        transform: ["translateY(100%)", "translateY(0)"]
      }, {
        duration: 1500,
        complete: () => {
          res()
        }
      })
    })
  }
  unmountAnimateLogo() {
    return new Promise(res => {
      Velocity(this.refs.logo, {
        transform: ["rotateZ(0) scale(0)", "rotateZ(360deg) scale(1)"]
      }, {
        duration: 1500,
        complete: () => {
          res()
        }
      })
    })
  }
  async toDevs() {
    let {browser} = this.bowser
    await this.unmountAnimate()
    this.props.usersDis.sets({
      browser: browser.name + '-' + browser.version,
      link: '/devs'
    })
    this.props.history.push('/devs')
  }
  render() {
    return (
      <OnImagesLoaded onLoaded={() => this.setState({imageLoaded: true})}>
        <div className='home'>
          <div className='home-content'>
            <div className='home-half left' ref='dev'>
              <div className='home-half-skew'>
                <div className='home-dev'>
                  <button type='button' className='home-dev-btn' onClick={this.toDevs}>
                    <div>SOFTWARE</div>
                    <div>Development</div>
                  </button>
                </div>
              </div>
            </div>
            <div className='home-half right' ref='games'>
              <div className='home-half-skew'>
                <div className='home-games'>
                  <button type='button' className='home-games-btn'>
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
            <img src="/images/logo.png" alt="logo" className='home-logo' ref='logo'/>
          </div>
        </div>
      </OnImagesLoaded>
    )
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    usersDis: bindActionCreators({
      sets: setUser
    }, dispatch)
  }
}

export default compose(
  connect(null, mapDispatchToProps)
)(Home)
