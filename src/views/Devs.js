import React, {PureComponent} from 'react'
import Header from 'components/dev/Header'
import Home from 'components/dev/Home'
import Service from 'components/dev/Service'
import Portofolio from 'components/dev/Portofolio'
import ContactUs from 'components/dev/ContactUs'

class Devs extends PureComponent {
  render() {
    return (
      <div className='dev'>
        <Header/>
        <Home />
        <Service />
        <Portofolio />
        <ContactUs />
      </div>
    )
  }
}

export default Devs
