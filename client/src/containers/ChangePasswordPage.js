import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import ChangePassword from '../components/ChangePassword';

class ChangePasswordPage extends Component {

  state = {
    user: null,
    changePasswordError: '',
    changePasswordSuccess: ''
  }

  async componentDidMount() {
    const { loggedInUsername, token } = this.props

    try {
      const user = await logic.retrieveUser(loggedInUsername, undefined, token)

      this.setState({ user })
    } catch (err) {
      // TODO
    }
  }

  handleChangePasswordSubmit = (password, newPassword) => {
    const { loggedInUsername, token } = this.props

    this.setState({ changePasswordError: '', changePasswordSuccess: '' })

    logic.updateUserPassword(loggedInUsername, password, newPassword, token)
      .then(() => this.setState({ changePasswordSuccess: 'Your password has been updated correctly 👏' }))
      .catch(({ message }) => this.setState({
        changePasswordError: `${message} 😮. Check your fields and try again please`
      }))
  }

  goToEditProfile = event => {
    event.preventDefault()
    this.props.history.push('/accounts/edit')
  }

  onLoginClick = () => this.props.history.push('/accounts/login')

  onRegisterClick = () => this.props.history.push('/accounts/register')

  render() {
    const { user } = this.state
    return (
      <div>
        <div className="header-wrapper">
          <Header
            onHomeClick={this.props.onHomeClick}
            onExploreClick={this.props.onExploreClick}
            onNewPostClick={this.props.onNewPostClick}
            onProfileClick={this.props.onProfileClick}
            onSearch={this.props.onSearch}
            onSearchResultClick={this.props.onSearchResultClick}
            isLoggedIn={this.props.loggedInUsername ? true : false}
            onLoginClick={this.onLoginClick}
            onRegisterClick={this.onRegisterClick}
          />
        </div>
        <div className="main-wrapper">
          <main>
            <section className="edit-profile-wrapper">
              <div className="edit-profile-menu-container">
                <ul className="Menu">
                  <li className="Menu-item">
                    <a href="#/" onClick={this.goToEditProfile} className="Menu-itemLink">Edit profile</a>
                  </li>
                  <li className="Menu-item">
                    <span className="Menu-itemLink is-active">Change password</span>
                  </li>
                </ul>
              </div>
              <div className="edit-profile-container">
                <div>
                  {user && (
                    <ChangePassword
                      username={this.state.user.username}
                      imageUrl={this.state.user.imageUrl}
                      success={this.state.changePasswordSuccess}
                      error={this.state.changePasswordError}
                      onSubmit={this.handleChangePasswordSubmit}
                    />
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(ChangePasswordPage)