import React, { Component } from 'react'
import logic from '../logic'
import { withRouter } from 'react-router-dom'
import PostDetail from '../components/PostDetail';

class ModalPostDetail extends Component {

  state = {
    user: null,
    post: null,
  }

  async componentDidMount() {
    const { postId, loggedInUsername, token } = this.props

    try {
      if (loggedInUsername) {
        const user = await logic.retrieveUser(loggedInUsername, undefined, token)

        this.setState({ user })
      }

      const post = await logic.retrievePost(postId, loggedInUsername, token)

      this.setState({ post })

    } catch (err) {
      // TODO
    }
  }

  onToggleLikeClick = async (postId) => {
    const { loggedInUsername, token } = this.props

    if (!loggedInUsername) this.props.onUnauthorized()

    try {
      await logic.toggleLikePost(token, loggedInUsername, postId)

      const postUpdated = await logic.retrievePost(postId, loggedInUsername, token)

      this.setState({ post: postUpdated })

    } catch (err) {
      // TODO
    }
  }

  onToggleSaveClick = async (postId) => {
    const { loggedInUsername, token } = this.props

    if (!loggedInUsername) this.props.onUnauthorized()

    try {
      await logic.toggleSavePost(token, loggedInUsername, postId)
    } catch (err) {
      // TODO
    }
  }

  onAddCommentSubmit = async (postId, description) => {
    const { loggedInUsername, token } = this.props

    if (!loggedInUsername) this.props.onUnauthorized()

    try {
      await logic.addCommentToPost(token, loggedInUsername, postId, description)

      const postUpdated = await logic.retrievePost(postId, loggedInUsername, token)

      this.setState({ post: postUpdated })

    } catch (err) {
      // TODO
    }
  }

  isLiked = likes => likes.find(like => like.user.username === this.props.loggedInUsername) ? true : false

  isSaved = (post, savedPosts) => savedPosts.find(savedPost => savedPost.post === post._id) ? true : false

  render() {
    return (
      <div>
        {
          this.state.post && (
            <PostDetail
              post={this.state.post}
              onUserClick={this.props.onUserClick}
              onToggleLikeClick={this.onToggleLikeClick}
              onToggleSaveClick={this.onToggleSaveClick}
              onAddCommentSubmit={this.onAddCommentSubmit}
              isLiked={this.isLiked(this.state.post.likes)}
              isSaved={this.state.user && this.isSaved(this.state.post, this.state.user.savedPosts)}
            />
          )
        }
      </div>
    )
  }
}

export default withRouter(ModalPostDetail)