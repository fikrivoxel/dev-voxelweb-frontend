import React, {PureComponent} from 'react'
import Header from 'components/dev/Header'
import Home from 'components/dev/Home'
import Service from 'components/dev/Service'

class Devs extends PureComponent {
  render() {
    return (
      <div className='dev'>
        <Header/>
        <Home />
        <Service />
      </div>
    )
  }
}

export default Devs
