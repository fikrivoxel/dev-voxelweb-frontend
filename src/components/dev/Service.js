import React, {PureComponent} from 'react'
import {
  Carousel,
  CarouselItem
} from 'reactstrap'
import {SERVICES} from 'config/index'
/*global $*/
class Service extends PureComponent {
  animating = false
  services = SERVICES
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
    return this.services.map((ser, idx) => (
      <div className={`cloud9-item ${ser.classes}`} key={idx}>
        <img src={ser.img} alt={`icon-${idx}`} />
      </div>
    ))
  }
  get caraouselMap() {
    return this.services.map((ser, idx) => (
      <CarouselItem
        onExiting={() => this.animating = true}
        onExited={() => this.animating = false}
        key={idx}>
        {ser.desc}
      </CarouselItem>
    ))
  }
  next() {
    if (this.animating) return
    let next = this.state.activeIdx === this.services.length - 1 ? 0 : this.state.activeIdx + 1
    this.setState({
      activeIdx: next
    })
  }

  prev() {
    if (this.animating) return
    let prev = this.state.activeIdx === 0 ? this.services.length - 1 : this.state.activeIdx - 1
    this.setState({
      activeIdx: prev
    })
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
                <Carousel
                  activeIndex={this.state.activeIdx}
                  interval={false}
                  next={this.next}
                  previous={this.prev}>
                  {this.caraouselMap}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Service
