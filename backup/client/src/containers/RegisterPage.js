import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Register from '../components/Register';

class RegisterPage extends Component {

  state = {
    registerError: ''
  }

  goToLogin = event => {
    event.preventDefault()
    this.props.history.push('/accounts/login')
  }

  handleRegisterSubmit = (username, email, password) => {
    logic.register(username, email, password)
      .then(() => logic.authenticate(username, password))
      .then(token => this.props.onRegistered(username, token))
      .then(() => this.props.history.push('/'))
      .catch(({ message }) => this.setState({ registerError: `Upps, ${message}` }))
  }

  render() {
    return (
      <div className="push-t-50">
        <Register onSubmit={this.handleRegisterSubmit} error={this.state.registerError} />
        <section className="block">
          <div className="block-message">Have an account?
            <a href="#/" className="text-link" onClick={this.goToLogin}> Log in</a>
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(RegisterPage)