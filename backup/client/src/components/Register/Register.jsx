import React, { Component } from 'react'
import validator from 'validator'
import './Register.sass'
import logo from '../../logo.png'

class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
    passwordError: '',
  }

  handleEmail = event => this.setState({ email: event.target.value })

  handleUsername = event => this.setState({ username: event.target.value })

  handlePassword = event => this.setState({ password: event.target.value })

  handleSubmit = event => {
    event.preventDefault()

    let isValid = true

    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    })

    if (validator.isEmpty(this.state.username)) {
      this.setState({ usernameError: `Username can't be blank` })
      isValid = false
    }

    if (validator.isEmpty(this.state.email)) {
      this.setState({ emailError: `Email can't be blank` })
      isValid = false

    } else if (!validator.isEmail(this.state.email)) {
      this.setState({ emailError: `Email it must be a valid email` })
      isValid = false
    }

    if (validator.isEmpty(this.state.password)) {
      this.setState({ passwordError: `Password can't be blank` })
      isValid = false
    }

    if (isValid) {
      const { username, email, password } = this.state
      this.props.onSubmit(username, email, password)
    }
  }

  render() {
    return (
      <section className="Register">
        <div className="Register-logoWrapper">
          <img className="Register-logo" src={logo} alt="Inskygram"></img>
        </div>
        <form className="Register-form" onSubmit={this.handleSubmit}>
          <div className="Register-field">
            <input type="text" className="Register-input" name="" placeholder="Username" id="username" onChange={this.handleUsername} />
            {
              this.state.usernameError &&
              <div className="Register-fieldError">{this.state.usernameError}</div>
            }
          </div>
          <div className="Register-field">
            <input type="text" className="Register-input" name="" placeholder="Email" id="email" onChange={this.handleEmail} />
            {
              this.state.emailError &&
              <div className="Register-fieldError">{this.state.emailError}</div>
            }
          </div>
          <div className="Register-field">
            <input type="password" className="Register-input" name="" placeholder="Password" id="password" onChange={this.handlePassword} />
            {
              this.state.passwordError &&
              <div className="Register-fieldError">{this.state.passwordError}</div>
            }
          </div>
          <button type="submit" className="button is-primary is-fullwidth">Register</button>
          {
            this.props.error && <div className="Register-formError">{this.props.error}</div>
          }
        </form>
      </section>
    )
  }
}

export default Register