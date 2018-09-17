import React, { Component } from 'react'
import './PostDetail.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: define env variables
const DEFAULT_AVATAR = 'https://goo.gl/F65XTo'

class PostDetail extends Component {

  state = {
    isLiked: this.props.isLiked,
    isSaved: this.props.isSaved,
    likes: this.props.post.likes,
    comments: this.props.post.comments,
    comment: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.likes.length !== this.state.likes.length)
      this.setState({ likes: nextProps.post.likes })

    if (nextProps.post.comments.length !== this.state.comments.length)
      this.setState({ comments: nextProps.post.comments })
  }

  handleUserClick = event => {
    event.preventDefault()
    const username = event.currentTarget.dataset.user
    this.props.onUserClick(username)
  }

  handleLikeIconClick = event => {
    event.preventDefault()

    this.setState({ isLiked: !this.state.isLiked })

    const { post } = this.props
    this.props.onToggleLikeClick(post._id)
  }

  handleCommentIconClick = event => {
    event.preventDefault()
    this.refs.addCommentTextarea.select()
  }

  handleSaveIconClick = event => {
    event.preventDefault()



    this.setState({ isSaved: !this.state.isSaved })

    const { post } = this.props
    this.props.onToggleSaveClick(post._id)
  }

  handleCommentChange = event => this.setState({ comment: event.target.value })

  handleAddCommentSubmit = event => {
    event.preventDefault()

    const { post } = this.props

    if (this.state.comment) {
      this.props.onAddCommentSubmit(post._id, this.state.comment)
        .then(() => this.setState({ comment: '' }))
    }
  }

  render() {
    const { post } = this.props

    const createdAtFormated = new Date(post.createdAt).toLocaleDateString('en-EN', {
      month: 'long', day: 'numeric'
    })

    return (
      <section className="PostDetail">
        <section className="PostDetail-imageWrapper">
          <img src={post.imageUrl} className="PostDetail-image" alt={post.caption} />
        </section>
        <section className="PostDetail-body">
          <div className="PostDetail-bodyTop">
            <div className="PostDetail-header">
              <div className="PostDetail-avatarImageWrapper">
                <a href="#/" data-user={post.user.username} onClick={this.handleUserClick}>
                  <img
                    src={post.user.imageUrl ? post.user.imageUrl : DEFAULT_AVATAR}
                    className="PostDetail-avatarImage"
                    alt={post.user.username} />
                </a>
              </div>
              <div className="PostDetail-headerInfo">
                <a
                  href="#/"
                  className="PostDetail-usernameLink"
                  data-user={post.user.username}
                  onClick={this.handleUserClick}
                >
                  <h5 className="PostDetail-username">{post.user.username}</h5>
                </a>
              </div>
            </div>
            <div className="PostDetail-commentsWrapper">
              {
                post.caption &&
                <div className="PostDetail-caption">
                  <a href="#/" className="PostDetail-captionUsernameLink" data-user={post.user.username} onClick={this.handleUserClick}>
                    <span className="PostDetail-captionUsername">{post.user.username} </span>
                  </a>
                  {post.caption}
                </div>
              }
              {
                this.state.comments.length > 0 &&
                <div className="PostDetail-comments">
                  {this.state.comments && this.state.comments.map(comment => (
                    <div className="PostDetail-comment" key={comment._id}>
                      <a href="#/" className="PostDetail-commentUsernameLink" data-user={comment.user.username} onClick={this.handleUserClick}>
                        <span className="PostDetail-commentUsername">{comment.user.username} </span>
                      </a>
                      {comment.description}
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
          <div className="PostDetail-bodyBottom">
            <div className="PostDetail-actions">
              <div className="PostDetail-leftActions">
                <a href="#/" className="PostDetail-actionLikeIconLink" onClick={this.handleLikeIconClick}>
                  {
                    this.state.isLiked ?
                      <FontAwesomeIcon
                        icon={['fas', 'heart']}
                        className="PostDetail-actionLikeIcon PostDetail-actionLikeIcon--marked" /> :
                      <FontAwesomeIcon
                        icon={['far', 'heart']}
                        className="PostDetail-actionLikeIcon" />
                  }
                </a>
                <a href="#/" className="PostDetail-actionAddCommentIconLink" onClick={this.handleCommentIconClick}>
                  <FontAwesomeIcon
                    icon={['far', 'comment']}
                    className="PostDetail-actionAddCommentIcon" />
                </a>
              </div>
              <div className="PostDetail-rightActions">
                <a href="#/" className="PostDetail-actionSaveIconLink" onClick={this.handleSaveIconClick}>
                  {
                    this.state.isSaved ?
                      <FontAwesomeIcon
                        icon={['fas', 'bookmark']}
                        className="PostDetail-actionSaveIcon PostDetail-actionSaveIcon--marked" /> :
                      <FontAwesomeIcon
                        icon={['far', 'bookmark']}
                        className="PostDetail-actionSaveIcon" />
                  }
                </a>
              </div>
            </div>
            <span className="PostDetail-numLikes">{this.state.likes.length} likes</span>
            <time className="PostDetail-creation">{createdAtFormated}</time>
            <div className="PostDetail-addComment">
              <form onSubmit={this.handleAddCommentSubmit}>
                <input
                  type="text"
                  ref="addCommentTextarea"
                  className="PostDetail-addCommentTextarea"
                  placeholder="Add comment"
                  value={this.state.comment}
                  onChange={this.handleCommentChange}
                />
              </form>
            </div>
          </div>
        </section>
      </section>
    )
  }
}

export default PostDetail