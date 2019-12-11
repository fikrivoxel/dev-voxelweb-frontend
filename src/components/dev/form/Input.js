import React, {PureComponent} from 'react'

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }
  get label() {
    return this.props.label || {
      id: 'label',
      name: 'Hello'
    }
  }
  get register() {
    let valid = {
      required: true
    }
    if (this.label.id === 'email') {
      valid.pattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
      }
    }
    return this.props.form.register(valid)
  }
  validation(state) {
    return state ? 'form-error' : ''
  }
  onFocus() {
    this.refs.label.classList.add('active')
  }
  onBlur(e) {
    if (e.target.value === '') {
      this.refs.label.classList.remove('active')
    }
  }
  render() {
    let {form} = this.props
    return (
      <div className={`input-form ${this.validation(form.errors[this.label.id])}`} ref='group'>
        <input type="text"
               className='form-control'
               id={this.label.id}
               name={this.label.id}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               ref={this.register}/>
        <label htmlFor={this.label.id} className='label-form' ref='label'>
          {this.label.name}
        </label>
      </div>
    )
  }
}

export default Input
