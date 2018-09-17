import React, { Component } from 'react'
import './Profile.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: define env variables
const DEFAULT_AVATAR = 'https://goo.gl/F65XTo'

class Profile extends Component {

  handleEditClick = event => {
    event.preventDefault()

    this.props.onEditProfileClick()
  }

  handleLogoutClick = event => {
    event.preventDefault()

    this.props.onLogoutClick()
  }

  handleToggleFollowClick = event => {
    event.preventDefault()

    this.props.onToggleFollowClick()
  }

  _renderProfileActions = () => {
    if (this.props.isEdit) {
      return (
        <div>
          <button
            className="Profile-button button"
            onClick={this.handleEditClick}
          >
            Edit profile
          </button>
          <button
            className="Profile-buttonLogout button"
            onClick={this.handleLogoutClick}
            title="Logout"
          >
            <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          </button>
        </div>
      )
    } else {
      if (this.props.isFollowing) {
        return (
          <button
            className="Profile-button button"
            onClick={this.handleToggleFollowClick}
          >
            Following
          </button>
        )
      } else {
        return (
          <button
            className="Profile-button button is-primary"
            onClick={this.handleToggleFollowClick}
          >
            Follow
          </button>
        )
      }
    }
  }

  render() {
    const { user, stats } = this.props
    return (
      <section className="Profile">
        <div className="Profile-avatarWrapper">
          <img
            src={user.imageUrl ? user.imageUrl : DEFAULT_AVATAR}
            className="Profile-avatarImage"
            alt={user.username}
          />
        </div>
        <div className="Profile-detailWrapper">
          <div className="Profile-detailHeader">
            <h1 className="Profile-username">{user.username}</h1>
            <div className="Profile-actions">
              {this._renderProfileActions()}
            </div>
          </div>
          <div className="Profile-counters">
            <div className="Profile-counter">
              <strong>{stats.posts}</strong> posts
            </div>
            <div className="Profile-counter">
              <strong>{stats.followers}</strong> followers
            </div>
            <div className="Profile-counter">
              <strong>{stats.followings}</strong> followings
            </div>
          </div>
          <h2 className="Profile-name">{user.name}</h2>
          <div className="Profile-biography">{user.biography}</div>
          {user.website && (
            <div className="Profile-website">
              <a href={user.website} target="_blank" className="Profile-websiteLink">{user.website}</a>
            </div>
          )}
        </div>
      </section>
    )
  }
}

export default Profile