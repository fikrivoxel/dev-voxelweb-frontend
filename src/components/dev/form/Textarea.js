import React, {PureComponent} from 'react'

class Textarea extends PureComponent {
  constructor(props) {
    super(props);
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }
  componentDidMount() {
    this.refs.input.addEventListener('focus', this.onFocus)
    this.refs.input.addEventListener('blur', this.onBlur)
  }
  componentWillUnmount() {
    this.refs.input.removeEventListener('focus', this.onFocus)
    this.refs.input.removeEventListener('blur', this.onBlur)
  }
  get label() {
    return this.props.label || {
      id: 'label',
      name: 'Hello'
    }
  }
  onFocus() {
    this.refs.label.classList.add('active')
  }
  onBlur() {
    if (this.refs.input.value === '') {
      this.refs.label.classList.remove('active')
    }
  }
  render() {
    return (
      <div className='input-form' ref='group'>
        <textarea className='form-control' id={this.label.id} ref='input' rows={6} />
        <label htmlFor={this.label.id} className='label-form' ref='label'>
          {this.label.name}
        </label>
      </div>
    )
  }
}

export default Textarea
