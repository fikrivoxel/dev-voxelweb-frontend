import React, {PureComponent} from 'react'
import Header from 'components/dev/Header'
import Home from 'components/dev/Home'

class Devs extends PureComponent {
  render() {
    return (
      <div className='dev'>
        <Header/>
        <Home />
      </div>
    )
  }
}

export default Devs
