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
               ref={form.register({required: true})}/>
        <label htmlFor={this.label.id} className='label-form' ref='label'>
          {this.label.name}
        </label>
      </div>
    )
  }
}

export default Input
