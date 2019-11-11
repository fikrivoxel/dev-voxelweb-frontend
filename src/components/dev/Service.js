import React, {PureComponent} from 'react'

class Service extends PureComponent {
  constructor(props) {
    super(props)
    this.resize = this.resize.bind(this)
  }
  get headerContent() {
    return document.getElementById('header-dev-content')
  }
  componentDidMount() {
    this.resize()
    window.addEventListener('resize', this.resize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }
  resize() {
    this.bgTopHeight()
    this.contentHeight()
  }
  bgTopHeight() {
    this.refs.bgtop.style.height = `${this.headerContent.offsetHeight - 1}px`
  }
  contentHeight() {
    this.refs.content.style.minHeight = `calc(100vh - ${this.headerContent.offsetHeight + this.refs.title.offsetHeight + 30}px)`
  }
  render() {
    return (
      <div className='service-dev' id='service-dev'>
        <div className='service-dev-bg-top' ref='bgtop' />
        <h1 className='service-dev-title text-center' ref='title'>SERVICES.</h1>
        <div className='service-dev-content' ref='content'>
          <div className='col-md-6 p-0'>
            <div className='service-dev-right-content'>
              <img src="/images/service-dev-bg.png" alt="logo" className='service-dev-bg' ref='logo'/>
            </div>
          </div>
          <div className='col-md-6'>a</div>
        </div>
      </div>
    )
  }
}

export default Service
