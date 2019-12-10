import React, {PureComponent} from 'react'
import {compose} from 'redux'
import useForm from 'react-hook-form'
import Input from 'components/dev/form/Input'
import Textarea from 'components/dev/form/Textarea'

const withUseForm = (Component) => (props) => {
  return <Component {...props} form={useForm()} />
}
class ContactUs extends PureComponent {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(data) {
    console.log(data)
  }
  render() {
    let {form} = this.props
    return (
      <div className='contact-dev' id='contact-dev'>
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
              <form action="#" className='contact-dev-form row' onSubmit={form.handleSubmit(this.onSubmit)}>
                <div className='col-12'>
                  <Input label={{id: 'name', name: 'Your Name'}} form={form}/>
                </div>
                <div className='col-md-6'>
                  <Input label={{id: 'email', name: 'Your Email'}} form={form}/>
                </div>
                <div className='col-md-6'>
                  <Input label={{id: 'country', name: 'Your Country'}} form={form}/>
                </div>
                <div className='col-12'>
                  <Textarea label={{id: 'messages', name: 'Type your message here'}} form={form}/>
                </div>
                <div className='col-12 d-flex mb-3 mb-md-0'>
                  <button type='submit' className='btn-form'>
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

export default compose(
  withUseForm
)(ContactUs)
