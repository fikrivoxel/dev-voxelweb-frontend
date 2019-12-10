import React, {PureComponent} from 'react'
import {SERVICES} from 'config/index'
/*global $*/
class Service extends PureComponent {
  state = {
    activeIdx: 0
  }
  constructor(props) {
    super(props)
    this.resize = this.resize.bind(this)
  }
  get headerContent() {
    return document.getElementById('header-dev-content')
  }
  get servicesIconMap() {
    return SERVICES.map((ser, idx) => (
      <div className={`cloud9-item ${ser.classes}`} key={idx}>
        <img src={ser.img} alt={`icon-${idx}`} />
      </div>
    ))
  }
  componentDidMount() {
    this.resize()
    $(this.refs.carousel).Cloud9Carousel({
      yOrigin: 42,
      yRadius: 48,
      autoPlay: 0,
      bringToFront: true,
      onAnimationFinished: () => {
        let item = $(this.refs.carousel).data("carousel")
        let idx = Math.ceil(item.floatIndex())
        this.setState({
          activeIdx: idx
        })
      }
    })
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
          <div className='col-md-6'>
            <div ref='carousel' className='service-dev-carousel'>
              {this.servicesIconMap}
            </div>
            <div className='service-dev-desc'>
              <div className='service-dev-dcontent'>
                a
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Service
