import React, { Component } from 'react'
import validator from 'validator';
import './Login.sass'
import logo from '../../logo.png'

class Login extends Component {

  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
  }

  handleUsername = event => this.setState({ username: event.target.value })

  handlePassword = event => this.setState({ password: event.target.value })

  handleSubmit = event => {
    event.preventDefault()

    let isValid = true
    this.setState({ usernameError: '', passwordError: '' })

    if (validator.isEmpty(this.state.username)) {
      this.setState({ usernameError: `Username can't be blank` })
      isValid = false
    }

    if (validator.isEmpty(this.state.password)) {
      this.setState({ passwordError: `Password can't be blank` })
      isValid = false
    }

    if (isValid) {
      const { username, password } = this.state
      this.props.onSubmit(username, password)
    }
  }

  render() {
    return (
      <section className="Login">
        <div className="Login-logoWrapper">
          <img className="Login-logo" src={logo} alt="Inskygram"></img>
        </div>
        <form className="Login-form" onSubmit={this.handleSubmit}>
          <div className="Login-field">
            <input type="text" className="Login-input" name="" id="username" placeholder="Username" onChange={this.handleUsername} />
            {
              this.state.usernameError &&
              <div className="Login-fieldError">{this.state.usernameError}</div>
            }
          </div>
          <div className="Login-field">
            <input type="password" className="Login-input" name="" id="password" placeholder="Password" onChange={this.handlePassword} />
            {
              this.state.passwordError &&
              <div className="Login-fieldError">{this.state.passwordError}</div>
            }
          </div>
          <button type="submit" className="button is-primary is-fullwidth">Log in</button>
          {
            this.props.error && <div className="Login-formError">{this.props.error}</div>
          }
        </form>
      </section>
    )
  }
}

export default Login