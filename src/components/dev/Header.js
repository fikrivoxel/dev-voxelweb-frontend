import React, {PureComponent} from 'react'

class Header extends PureComponent {
  state = {
    active: false
  }
  constructor(props) {
    super(props)
    this.clickToggleActive = this.clickToggleActive.bind(this)
    this.checkNavPosition = this.checkNavPosition.bind(this)
    this.scroll = this.scroll.bind(this)
    this.closeClickActive = this.closeClickActive.bind(this)
  }
  componentDidMount() {
    this.checkNavPosition()
    window.addEventListener('resize', this.checkNavPosition)
    window.addEventListener('click', this.closeClickActive)
    window.addEventListener('scroll', this.scroll)
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.active !== this.state.active) {
      this.checkNavPosition()
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.checkNavPosition)
    window.removeEventListener('click', this.closeClickActive)
    window.removeEventListener('scroll', this.scroll)
  }
  scroll() {
    let doc = document.documentElement
    let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    if (top > 100) {
      this.refs.nav.classList.add('scroll')
    } else {
      this.refs.nav.classList.remove('scroll')
    }
  }
  closeClickActive(e) {
    let target = e.target
    if (this.refs.toggle.contains(target)) return
    if (this.refs.nav.contains(target)) return
    this.setState({active: false})
  }
  clickToggleActive() {
    this.setState({
      active: !this.state.active
    })
  }
  checkNavPosition() {
    let winWidth = window.innerWidth
    let heightContainer = this.refs.container.offsetHeight
    if (winWidth < 768) {
      this.refs.nav.style.height = `calc(100vh - ${heightContainer}px)`
      if (this.state.active) {
        this.refs.nav.style.transform = `translateY(${heightContainer}px) translateX(0)`
      } else {
        this.refs.nav.style.transform = `translateY(${heightContainer}px) translateX(100%)`
      }
    } else {
      this.refs.nav.style.transform = `translateY(0) translateX(0)`
      this.refs.nav.style.height = 'auto';
    }
  }
  scrollTo(target) {
    let el = document.getElementById(`${target}-dev`)
    el.scrollIntoView({
      behavior: 'smooth'
    })
  }
  render() {
    return (
      <div className='header-dev'>
        <div className='header-dev-triangle' />
        <div className='header-dev-logo'>
          <img src="/images/logo.png" alt="logo" className='header-dev-img'/>
          <div className='header-dev-logo-content'>
            <div className='header-dev-logo-title'>VOXEL</div>
            <div className='header-dev-logo-subs'>Software</div>
          </div>
        </div>
        <div className={`header-dev-content ${this.state.active ? 'active' : ''}`} ref='content' id='header-dev-content'>
          <div className='header-dev-container' ref='container'>
            <button className={`header-dev-toggle ${this.state.active ? 'active' : ''}`} onClick={this.clickToggleActive} ref='toggle'>
              <div className='menu-icon'>
                <span />
                <span />
                <span />
              </div>
            </button>
            <div className='header-dev-nav' ref='nav'>
              <ul className='header-dev-menu'>
                <li>
                  <button className='header-dev-btn' onClick={() => this.scrollTo('homes')}>
                    Home
                  </button>
                </li>
                <li>
                  <button className='header-dev-btn' onClick={() => this.scrollTo('service')}>
                    Service
                  </button>
                </li>
                <li>
                  <button className='header-dev-btn' onClick={() => this.scrollTo('portofolio')}>
                    Portofolio
                  </button>
                </li>
                <li>
                  <button className='header-dev-btn' onClick={() => this.scrollTo('contact')}>
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
