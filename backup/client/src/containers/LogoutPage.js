import { Component } from 'react'

class LogoutPage extends Component {

  componentDidMount() {
    this.props.onLogout()
  }

  render() {
    return null
  }
}

export default LogoutPage