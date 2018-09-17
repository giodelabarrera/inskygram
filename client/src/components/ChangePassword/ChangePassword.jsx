import React, { Component } from 'react'
import validator from 'validator'
import './ChangePassword.sass'

// TODO: define env variables
const DEFAULT_AVATAR = 'https://goo.gl/F65XTo'

class ChangePassword extends Component {

  state = {
    password: '',
    newPassword: '',
    passwordError: '',
    newPasswordError: '',
  }

  handlePasswordChange = event => this.setState({ password: event.target.value })

  handleNewPasswordChange = event => this.setState({ newPassword: event.target.value })

  handleSubmit = event => {
    event.preventDefault()

    let isValid = true

    this.setState({ passwordError: '', newPasswordError: '' })

    if (validator.isEmpty(this.state.password)) {
      this.setState({ passwordError: `Password can't be blank` })
      isValid = false
    }

    if (validator.isEmpty(this.state.newPassword)) {
      this.setState({ newPasswordError: `New password can't be blank` })
      isValid = false
    }

    if (isValid) {
      const { password, newPassword } = this.state

      this.props.onSubmit(password, newPassword)
    }
  }

  render() {
    return (
      <div className="ChangePassword">
        <form className="ChangePassword-form" onSubmit={this.handleSubmit}>
          <div className="ChangePassword-field">
            <div className="ChangePassword-avatarWrapper">
              <img
                className="ChangePassword-avatar"
                src={this.props.imageUrl ? this.props.imageUrl : DEFAULT_AVATAR}
                alt={this.props.username} />
            </div>
            <div className="ChangePassword-userInfo">
              <h1 className="ChangePassword-username">{this.props.username}</h1>
            </div>
          </div>
          <div className="ChangePassword-field">
            <label htmlFor="password" className="ChangePassword-label">Password</label>
            <input type="password" className="ChangePassword-input" value={this.state.password} id="password" onChange={this.handlePasswordChange} />
            {
              this.state.passwordError &&
              <div className="ChangePassword-fieldError">{this.state.passwordError}</div>
            }
          </div>
          <div className="ChangePassword-field">
            <label htmlFor="newPassword" className="ChangePassword-label">New password</label>
            <input type="password" className="ChangePassword-input" value={this.state.newPassword} id="newPassword" onChange={this.handleNewPasswordChange} />
            {
              this.state.newPasswordError &&
              <div className="ChangePassword-fieldError">{this.state.newPasswordError}</div>
            }
          </div>
          <div className="ChangePassword-field">
            <div></div>
            <div>
              <button type="submit" className="button is-primary">Submit</button>
            </div>
          </div>
          {
            this.props.error && <div className="ChangePassword-formFeedback ChangePassword-formFeedback--error">{this.props.error}</div>
          }
          {
            this.props.success && <div className="ChangePassword-formFeedback ChangePassword-formFeedback--success">{this.props.success}</div>
          }
        </form>
      </div>
    )
  }
}

export default ChangePassword