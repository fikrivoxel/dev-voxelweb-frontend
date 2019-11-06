import React, {PureComponent} from 'react'
import Particel from 'components/dev/portofolio/Particel'

class Portofolio extends PureComponent {
  constructor(props) {
    super(props)
    this.resize = this.resize.bind(this)
  }

  componentDidMount() {
    this.resize()
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  get headerContent() {
    return document.getElementById('header-dev-content')
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
              <div className='portofolio-dev-preview'></div>
              <div className='portofolio-dev-preview'></div>
              <div className='portofolio-dev-preview'></div>
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
                      <div className="content"></div>
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
                      <div className="content centerVH"></div>
                    </div>
                  </div>
                </div>
                <div className='portofolio-dev-desc text-truncate'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit metus pretium elementum tincidunt.
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
