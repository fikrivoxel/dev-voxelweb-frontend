import React, {PureComponent} from 'react'
import Input from 'components/dev/form/Input'
import Textarea from 'components/dev/form/Textarea'

class ContactUs extends PureComponent {
  render() {
    return (
      <div className='contact-dev'>
        <h1 className='contact-dev-title text-center' ref='title'>CONTACT US.</h1>
        <div className='contact-dev-content' ref='content'>
          <div className='contact-dev-container'>
            <div className='col-lg-6 p-fix'>
              <div className='contact-dev-left'>
                <h2 className='contact-dev-left-title'>Reach out to us</h2>
                <span className='contact-dev-left-desc'>
                  Just fill in the form below, and Svitla representative will contact you within 24 hours.
                  All inforation provided through this from is kept private
                </span>
              </div>
            </div>
            <div className='col-lg-6 contact-dev-right'>
              <form action="#" className='contact-dev-form row'>
                <div className='col-12'>
                  <Input label={{id: 'name', name: 'Your Name'}} />
                </div>
                <div className='col-md-6'>
                  <Input label={{id: 'name', name: 'Your Email'}} />
                </div>
                <div className='col-md-6'>
                  <Input label={{id: 'name', name: 'Your Country'}} />
                </div>
                <div className='col-12'>
                  <Textarea label={{id: 'name', name: 'Type your message here'}} />
                </div>
                <div className='col-12 d-flex mb-3 mb-md-0'>
                  <button className='btn-form'>
                    <div className='btn-form-span'>Send</div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactUs
