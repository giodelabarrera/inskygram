import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import LoginPage from './containers/LoginPage';
import LogoutPage from './containers/LogoutPage';
import WallPage from './containers/WallPage';
import RegisterPage from './containers/RegisterPage';
import ProfilePage from './containers/ProfilePage';
import EditProfilePage from './containers/EditProfilePage';
import ChangePasswordPage from './containers/ChangePasswordPage';
import PostDetailPage from './containers/PostDetailPage';
import ExplorePage from './containers/ExplorePage';
import SavedPage from './containers/SavedPage';
import Modal from 'react-modal';
import CreationPost from './components/CreationPost/CreationPost';
import logic from './logic'
import ModalPostDetail from './containers/ModalPostDetail';

class App extends Component {
  state = {
    loggedInUsername: sessionStorage.getItem('username') || '',
    token: sessionStorage.getItem('token') || '',
    modalContent: '',
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  onLoggedIn = (username, token) => {
    this.setState({ loggedInUsername: username, token })

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('token', token)

    this.props.history.push('/')
  }

  isLoggedIn() {
    return !!this.state.loggedInUsername
  }

  handleLogout = () => {
    this.setState({ loggedInUsername: '', token: '' })

    sessionStorage.clear()

    if (this.props.location.pathname !== '/') this.props.history.push('/')
  }

  redirectToLogin = () => this.props.history.push('/accounts/login')

  onRegistered = (username, token) => this.onLoggedIn(username, token)

  handleCreationSubmit = (image, caption) => {
    const { loggedInUsername, token } = this.state

    return logic.createPost(loggedInUsername, image, caption, token)
      .then(() => {
        this.closeModal()
        this.onHomeClick()
      })
  }

  onErrorCreationPostSubmit = message => {
    if (message === 'invalid token') this.redirectToLogin()
  }

  onHomeClick = () => {
    if (this.props.location.pathname === '/') window.location.reload()
    else this.props.history.push('/')
  }

  onNewPostClick = () => {
    this.setState({
      modalContent: (
        <CreationPost
          onSubmit={this.handleCreationSubmit}
          onError={this.onErrorCreationPostSubmit}
        />
      )
    }, this.openModal())
  }

  onExploreClick = () => {
    if (this.props.location.pathname === '/explore') window.location.reload()
    else this.props.history.push('/explore')
  }

  onUserInModalClick = username => {
    this.closeModal()
    this.props.history.push(`/${username}`)
  }

  onUnauthorizedInModal = () => {
    this.closeModal()
    this.redirectToLogin()
  }

  onPostDetailClick = async (postId) => {
    const { loggedInUsername, token } = this.state

    try {
      this.setState({
        modalContent: (
          <ModalPostDetail
            postId={postId}
            loggedInUsername={loggedInUsername}
            token={token}
            onUserClick={this.onUserInModalClick}
            onUnauthorized={this.onUnauthorizedInModal}
          />
        )
      }, this.openModal())

    } catch (err) { }
  }

  onProfileClick = () => {
    const profileRoute = `/${this.state.loggedInUsername}`

    if (this.props.location.pathname === profileRoute) window.location.reload()
    else this.props.history.push(profileRoute)
  }

  onSearch = query => logic.search(query)

  onSearchResultClick = ({ username }) => this.props.history.push(`/${username}`)

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { loggedInUsername, token } = this.state
    return (
      <div>

        <Switch>
          <Route exact path="/" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : (
            <WallPage
              loggedInUsername={loggedInUsername}
              token={token}
              onHomeClick={this.onHomeClick}
              onExploreClick={this.onExploreClick}
              onNewPostClick={this.onNewPostClick}
              onProfileClick={this.onProfileClick}
              onPostDetailClick={this.onPostDetailClick}
              onSearch={this.onSearch}
              onSearchResultClick={this.onSearchResultClick}
            />
          )} />
          <Route exact path="/explore" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : (
            <ExplorePage
              loggedInUsername={loggedInUsername}
              token={token}
              onHomeClick={this.onHomeClick}
              onExploreClick={this.onExploreClick}
              onNewPostClick={this.onNewPostClick}
              onProfileClick={this.onProfileClick}
              onPostDetailClick={this.onPostDetailClick}
              onSearch={this.onSearch}
              onSearchResultClick={this.onSearchResultClick}
            />
          )} />
          <Route exact path="/accounts/login" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <LoginPage onLoggedIn={this.onLoggedIn} />} />
          <Route exact path="/accounts/logout" render={() => <LogoutPage onLogout={this.handleLogout} />} />
          <Route exact path="/accounts/register" render={() => this.isLoggedIn() ? <Redirect to="/" /> : <RegisterPage onRegistered={this.onRegistered} />} />
          <Route exact path="/accounts/edit" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : (
            <EditProfilePage
              loggedInUsername={loggedInUsername}
              token={token}
              onHomeClick={this.onHomeClick}
              onExploreClick={this.onExploreClick}
              onNewPostClick={this.onNewPostClick}
              onProfileClick={this.onProfileClick}
              onSearch={this.onSearch}
              onSearchResultClick={this.onSearchResultClick}
            />
          )
          } />
          <Route exact path="/accounts/password/change" render={() => !this.isLoggedIn() ? <Redirect to="/accounts/login" /> : (
            <ChangePasswordPage
              loggedInUsername={loggedInUsername}
              token={token}
              onHomeClick={this.onHomeClick}
              onExploreClick={this.onExploreClick}
              onNewPostClick={this.onNewPostClick}
              onProfileClick={this.onProfileClick}
              onSearch={this.onSearch}
              onSearchResultClick={this.onSearchResultClick}
            />
          )
          } />
          <Route path="/p/:id" render={props => (
            <PostDetailPage
              postId={props.match.params.id}
              loggedInUsername={loggedInUsername}
              token={token}
              onHomeClick={this.onHomeClick}
              onExploreClick={this.onExploreClick}
              onNewPostClick={this.onNewPostClick}
              onProfileClick={this.onProfileClick}
              onSearch={this.onSearch}
              onSearchResultClick={this.onSearchResultClick}
            />
          )} />
          <Route path="/:username/saved" render={props => (
            !this.isLoggedIn() || (this.isLoggedIn() && (props.match.params.username !== loggedInUsername)) ?
              <Redirect to="/accounts/login" /> :
              <SavedPage
                username={props.match.params.username}
                loggedInUsername={loggedInUsername}
                token={token}
                onHomeClick={this.onHomeClick}
                onExploreClick={this.onExploreClick}
                onNewPostClick={this.onNewPostClick}
                onProfileClick={this.onProfileClick}
                onPostDetailClick={this.onPostDetailClick}
                onSearch={this.onSearch}
                onSearchResultClick={this.onSearchResultClick}
              />
          )} />
          <Route path="/:username" render={props => (
            <ProfilePage
              username={props.match.params.username}
              loggedInUsername={loggedInUsername}
              token={token}
              onHomeClick={this.onHomeClick}
              onExploreClick={this.onExploreClick}
              onNewPostClick={this.onNewPostClick}
              onProfileClick={this.onProfileClick}
              onPostDetailClick={this.onPostDetailClick}
              onSearch={this.onSearch}
              onSearchResultClick={this.onSearchResultClick}
            />
          )} />
        </Switch>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          {this.state.modalContent}
        </Modal>
      </div>
    )
  }
}

export default withRouter(App)
