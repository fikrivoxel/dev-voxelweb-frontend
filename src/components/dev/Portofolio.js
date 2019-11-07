import React, {PureComponent} from 'react'
import {
  Carousel,
  CarouselItem
} from 'reactstrap'
import Particel from 'components/dev/portofolio/Particel'
import {PORTOFOLIO} from 'config/index'

class Portofolio extends PureComponent {
  animating = false
  state = {
    activeIdx: 0
  }
  portofolio = PORTOFOLIO

  constructor(props) {
    super(props)
    this.resize = this.resize.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  get previewLogo() {
    return this.portofolio.map((item, i) => {
      return (
        <div className='portofolio-dev-preview' key={i} onClick={() => this.goto(i)}>
          <img src={item.logo} alt={item.logo} style={{width: '100%'}}/>
        </div>
      )
    })
  }

  get slidesDesktop() {
    return this.portofolio.map((item, i) => {
      return (
        <CarouselItem
          onExiting={() => this.animating = true}
          onExited={() => this.animating = false}
          key={i}>
          <img src={item.images.desktop} alt={item.images.desktop} style={{width: '100%'}}/>
        </CarouselItem>
      )
    })
  }

  get slidePhone() {
    return this.portofolio.map((item, i) => {
      return (
        <CarouselItem
          onExiting={() => this.animating = true}
          onExited={() => this.animating = false}
          key={i}>
          <img src={item.images.phone} alt={item.images.phone} style={{width: '100%'}}/>
        </CarouselItem>
      )
    })
  }

  get slideText() {
    return this.portofolio.map((item, i) => {
      return (
        <CarouselItem
          onExiting={() => this.animating = true}
          onExited={() => this.animating = false}
          key={i}>
          <div className='portofolio-dev-desc'>
            {item.desc}
          </div>
        </CarouselItem>
      )
    })
  }

  get headerContent() {
    return document.getElementById('header-dev-content')
  }


  next() {
    if (this.animating) return
    let next = this.state.activeIdx === this.portofolio.length - 1 ? 0 : this.state.activeIdx + 1
    this.setState({
      activeIdx: next
    })
  }

  prev() {
    if (this.animating) return
    let prev = this.state.activeIdx === 0 ? this.portofolio.length - 1 : this.state.activeIdx - 1
    this.setState({
      activeIdx: prev
    })
  }

  goto(idx) {
    if (this.animating) return
    if (idx === this.state.activeIdx) return
    this.setState({
      activeIdx: idx
    })
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
      <div className='portofolio-dev' id='portofolio-dev'>
        <Particel/>
        <div className='portofolio-dev-bg-top' ref='bgtop'/>
        <h1 className='portofolio-dev-title text-center' ref='title'>PORTOFOLIO.</h1>
        <div className='portofolio-dev-content' ref='content'>
          <div className='col-md-3 p-0'>
            <div className='portofolio-dev-left'>
              {this.previewLogo}
            </div>
          </div>
          <div className='col-md-9 p-0'>
            <div className='portofolio-dev-right'>
              <div className='portofolio-dev-right-content'>
                <div className='portofolio-dev-frame'>
                  <div className='deviceContainer portofolio-dev-laptop'>
                    <div className='imac black landscape'>
                      <div className="caseBorder"></div>
                      <div className="case"></div>
                      <div className="reflection"></div>
                      <div className="screen"></div>
                      <div className="stand"></div>
                      <div className="base"></div>
                      <div className="content">
                        <Carousel
                          activeIndex={this.state.activeIdx}
                          next={this.next}
                          previous={this.prev}>
                          {this.slidesDesktop}
                        </Carousel>
                      </div>
                    </div>
                  </div>
                  <div className="deviceContainer portofolio-dev-phone">
                    <div className="androidPhone black portrait">
                      <div className="caseBorder"></div>
                      <div className="case"></div>
                      <div className="reflection"></div>
                      <div className="screen"></div>
                      <div className="camera"></div>
                      <div className="homeButtonBorder"></div>
                      <div className="homeButton"></div>
                      <div className="content centerVH">
                        <Carousel
                          activeIndex={this.state.activeIdx}
                          next={this.next}
                          previous={this.prev}>
                          {this.slidePhone}
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='portofolio-dev-descgroup'>
                  <Carousel
                    activeIndex={this.state.activeIdx}
                    next={this.next}
                    previous={this.prev}>
                    {this.slideText}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Portofolio
