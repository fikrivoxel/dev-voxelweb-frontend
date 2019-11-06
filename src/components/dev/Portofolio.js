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
        <Particel />
        <div className='portofolio-dev-bg-top' ref='bgtop' />
        <h1 className='portofolio-dev-title text-center' ref='title'>PORTOFOLIO.</h1>
        <div className='portofolio-dev-content' ref='content'>
          <div className='col-md-9 p-0'>
            a
          </div>
        </div>
      </div>
    )
  }
}

export default Portofolio
