import React, {PureComponent} from 'react'
import Particle from 'components/dev/home/Particle'

class Home extends PureComponent {
  constructor(props) {
    super(props);
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
    this.refs.content.style.minHeight = `calc(100vh - ${this.headerContent.offsetHeight}px)`
  }
  render() {
    return (
      <div className='homes-dev'>
        <div className='homes-dev-bg-top' ref='bgtop' />
        <div className='homes-dev-content' ref='content'>
          <div className='col-md-6 p-0'>
            <Particle />
          </div>
          <div className='col-md-6'>
            <img src="/images/homes-dev-bg.png" alt="logo" width='100%'/>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
