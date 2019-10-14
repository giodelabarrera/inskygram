import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'
import Header from '../components/Header';
import Profile from '../components/Profile';
import GridPost from '../components/GridPost';

class ProfilePage extends Component {

  state = {
    user: null,
    stats: null,
    posts: []
  }

  componentDidMount() {
    this.loadProfile(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadProfile(nextProps)
  }

  async loadProfile(props) {
    const { username, loggedInUsername, token } = props

    let user
    let stats
    let posts = []

    try {
      if (loggedInUsername) {
        if (loggedInUsername === username) {
          user = await logic.retrieveUser(username, undefined, token)
          posts = await logic.listUserPosts(username, undefined, token)
        } else {
          const targetUsername = username
          user = await logic.retrieveUser(loggedInUsername, targetUsername, token)
          posts = await logic.listUserPosts(loggedInUsername, targetUsername, token)
        }
      }
      else {
        const targetUsername = username
        user = await logic.retrieveUser(undefined, targetUsername)
        posts = await logic.listUserPosts(undefined, targetUsername)
      }

      stats = await logic.retrieveUserStats(username)
    } catch (err) { }

    if (user) this.setState({ user }, () => this.setState({ posts, stats }))
  }

  onEditProfileClick = () => this.props.history.push(`/accounts/edit`)

  onLogoutClick = () => this.props.history.push(`/accounts/logout`)

  onToggleFollowClick = async () => {
    const { username, loggedInUsername, token } = this.props

    try {
      const targetUsername = username

      await logic.toggleFollowUser(token, loggedInUsername, targetUsername)

      const user = await logic.retrieveUser(loggedInUsername, targetUsername, token)
      const posts = await logic.listUserPosts(loggedInUsername, targetUsername, token)
      const stats = await logic.retrieveUserStats(username)

      this.setState({ user, posts, stats })

    } catch ({ message }) {
      if (message === 'invalid token') this.redirectToLogin()
    }
  }

  onUserPostsClick = username => this.props.history.push(`/${username}`)

  onUserSavedPostsClick = username => this.props.history.push(`/${username}/saved`)

  isEdit = () => this.props.loggedInUsername === this.state.user.username

  isFollowing = () => {
    const { user } = this.state
    const { loggedInUsername } = this.props
    return user.followers.find(follower => follower.user.username === loggedInUsername) ? true : false
  }

  _hasPermissions() {
    const { user } = this.state

    if (user) {
      if (this.isEdit()) {
        return true
      } else {
        if (user.privateAccount) {
          if (this.isFollowing()) return true
        } else {
          return true
        }
      }
    }
    return false
  }

  redirectToLogin = () => this.props.history.push('/accounts/login')

  handleLoginClick = event => {
    event.preventDefault()
    this.props.history.push('/accounts/login')
  }

  handleSavedPostsClick = event => {
    event.preventDefault()
    const { user } = this.state
    this.props.history.push(`/${user.username}/saved`)
  }

  _renderPrivateAccount() {
    const { user } = this.state
    if (user) {
      return (
        <section className="AccountPrivate">
          <div className="AccountPrivate-contentWrapper">
            <div className="AccountPrivate-title">This Account is Private</div>
            <div className="AccountPrivate-body">
              <span>Already follow {this.state.user.username}? </span><br />
              <span>
                <a href="#/" className="text-link" onClick={this.handleLoginClick}>Log in</a>
              </span><br />
              <span>to see their photos</span>
            </div>
          </div>
        </section>
      )
    }
  }

  _renderPosts() {
    return (
      <section className="profile-posts-wrapper">
        <div className="tabs-wrapper">
          <ul className="Tabs">
            <li className="Tabs-item">
              <span href="#/" className="Tabs-itemLink is-active">
                <i className="fas fa-th"></i> Posts
              </span>
            </li>
            {this.isEdit() &&
              <li className="Tabs-item">
                <a href="#/" className="Tabs-itemLink" onClick={this.handleSavedPostsClick}>
                  <i className="far fa-bookmark"></i> Saved
              </a>
              </li>
            }
          </ul>
        </div>
        <div className="is-one-thirds grid-gap-30">
          {this.state.posts && this.state.posts.map(post => (
            <GridPost
              key={post._id}
              post={post}
              onPostDetailClick={this.props.onPostDetailClick}
            />)
          )}
        </div>
      </section>
    )
  }

  onLoginClick = () => this.props.history.push('/accounts/login')

  onRegisterClick = () => this.props.history.push('/accounts/register')

  render() {
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
            {
              this.state.user && this.state.stats && (
                <Profile
                  user={this.state.user}
                  stats={this.state.stats}
                  isEdit={this.isEdit()}
                  isFollowing={this.isFollowing()}
                  onEditProfileClick={this.onEditProfileClick}
                  onToggleFollowClick={this.onToggleFollowClick}
                  onLogoutClick={this.onLogoutClick}
                />
              )
            }
            {this._hasPermissions() ? this._renderPosts() : this._renderPrivateAccount()}
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfilePage)