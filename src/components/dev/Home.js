import React, {PureComponent} from 'react'

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
  resize() {
    this.bgTopHeight()
    this.contentHeight()
  }
  bgTopHeight() {
    let headerContent = document.getElementById('header-dev-content')
    this.refs.bgtop.style.height = `${headerContent.offsetHeight - 1}px`
  }
  contentHeight() {
    let headerContent = document.getElementById('header-dev-content')
    this.refs.content.style.minHeight = `calc(100vh - ${headerContent.offsetHeight}px)`
  }
  render() {
    return (
      <div className='homes-dev'>
        <div className='homes-dev-bg-top' ref='bgtop' />
        <div className='homes-dev-content' ref='content'>
          a
        </div>
      </div>
    )
  }
}

export default Home
