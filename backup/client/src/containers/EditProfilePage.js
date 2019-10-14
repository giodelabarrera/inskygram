import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import EditProfile from '../components/EditProfile';
import EditAvatar from '../components/EditAvatar';

class EditProfilePage extends Component {

  state = {
    user: null,
    editProfileError: '',
    editProfileSuccess: ''
  }

  componentDidMount() {
    const { loggedInUsername, token } = this.props

    logic.retrieveUser(loggedInUsername, undefined, token)
      .then(user => {
        this.setState({ user })
      })
      .catch(err => console.log(err))
  }

  handleEditProfileSubmit = (newEmail, name, website, phoneNumber, gender, biography, privateAccount) => {
    const { loggedInUsername, token } = this.props

    this.setState({ editProfileError: '', editProfileSuccess: '' })

    logic.updateUser(loggedInUsername, newEmail, name, website, phoneNumber, gender, biography, privateAccount, token)
      .then(() => this.setState({ editProfileSuccess: 'Your profile has been updated correctly 👏' }))
      .catch(() => this.setState({
        editProfileError: 'Something has been missing 😮. Check your fields and try again please'
      }))
  }

  handleEditAvatarSubmit = file => {
    const { loggedInUsername, token } = this.props

    return logic.updateUserAvatar(loggedInUsername, file, token)
      .then(() => {
        this.setState({ editProfileSuccess: 'Your avatar has been updated correctly 👏' })
        return true
      })
      .catch(({ message }) => this.setState({
        editProfileError: `${message} 😮. Try again or upload a correct image`
      }))
  }

  goToChangePassword = event => {
    event.preventDefault()
    this.props.history.push('/accounts/password/change')
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
                    <span className="Menu-itemLink is-active">Edit profile</span>
                  </li>
                  <li className="Menu-item">
                    <a href="#/" onClick={this.goToChangePassword} className="Menu-itemLink">Change password</a>
                  </li>
                </ul>
              </div>
              <div className="edit-profile-container">
                <div>
                  {this.state.user && (
                    <EditAvatar
                      username={user.username}
                      imageUrl={user.imageUrl}
                      onSubmit={this.handleEditAvatarSubmit} />
                  )}
                  {this.state.user && (
                    <EditProfile
                      user={this.state.user}
                      success={this.state.editProfileSuccess}
                      error={this.state.editProfileError}
                      onSubmit={this.handleEditProfileSubmit} />
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

export default withRouter(EditProfilePage)