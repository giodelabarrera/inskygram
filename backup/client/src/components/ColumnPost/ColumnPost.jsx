import React, { Component } from 'react'
import './ColumnPost.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: define env variables
const DEFAULT_AVATAR = 'https://goo.gl/F65XTo'

class ColumnPost extends Component {

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
      <div className="ColumnPost">
        <section className="ColumnPost-header">
          <div className="ColumnPost-avatarImageWrapper">
            <a href="#/" data-user={post.user.username} onClick={this.handleUserClick}>
              <img src={post.user.imageUrl ? post.user.imageUrl : DEFAULT_AVATAR} className="ColumnPost-avatarImage" alt={post.user.username} />
            </a>
          </div>
          <div className="ColumnPost-headerInfo">
            <a href="#/"
              className="ColumnPost-headerUsernameLink"
              data-user={post.user.username}
              onClick={this.handleUserClick}>
              <h5 className="ColumnPost-username">{post.user.username}</h5>
            </a>
            {/* <span className="ColumnPost-location">Barcelona, Spain</span> */}
          </div>
        </section>
        <section className="ColumnPost-imageWrapper">
          <img src={post.imageUrl} className="ColumnPost-image" alt={post.caption} />
        </section>
        <section className="ColumnPost-body">
          <div className="ColumnPost-actions">
            <div className="ColumnPost-leftActions">
              <a href="#/" className="ColumnPost-actionLikeIconLink" onClick={this.handleLikeIconClick}>
                {
                  this.state.isLiked ?
                    <FontAwesomeIcon
                      icon={['fas', 'heart']}
                      className="ColumnPost-actionLikeIcon ColumnPost-actionLikeIcon--marked" /> :
                    <FontAwesomeIcon
                      icon={['far', 'heart']}
                      className="ColumnPost-actionLikeIcon" />
                }
              </a>
              <a href="#/" className="ColumnPost-actionAddCommentIconLink" onClick={this.handleCommentIconClick}>
                <FontAwesomeIcon
                  icon={['far', 'comment']}
                  className="ColumnPost-actionAddCommentIcon" />
              </a>
            </div>
            <div className="ColumnPost-rightActions">
              <a href="#/" className="ColumnPost-actionSaveIconLink" onClick={this.handleSaveIconClick}>
                {
                  this.state.isSaved ?
                    <FontAwesomeIcon
                      icon={['fas', 'bookmark']}
                      className="ColumnPost-actionSaveIcon ColumnPost-actionSaveIcon--marked" /> :
                    <FontAwesomeIcon
                      icon={['far', 'bookmark']}
                      className="ColumnPost-actionSaveIcon" />
                }
              </a>
            </div>
          </div>
          <span className="ColumnPost-numLikes">{this.state.likes.length} likes</span>
          {
            post.caption &&
            <div className="ColumnPost-caption">
              <a
                href="#/"
                data-user={post.user.username}
                className="ColumnPost-captionUsernameLink"
                onClick={this.handleUserClick}>
                <span className="ColumnPost-captionUsername">{post.user.username} </span>
              </a>
              {post.caption}
            </div>
          }
          {
            this.state.comments.length > 0 &&
            <div className="ColumnPost-comments">
              {this.state.comments && this.state.comments.map(comment => (
                <div className="ColumnPost-comment" key={comment._id}>
                  <a
                    href="#/"
                    data-user={comment.user.username}
                    className="ColumnPost-commentUsernameLink"
                    onClick={this.handleUserClick}>
                    <span className="ColumnPost-commentUsername">{comment.user.username} </span>
                  </a>
                  {comment.description}
                </div>
              ))}
            </div>
          }
          <time className="ColumnPost-creation">{createdAtFormated}</time>
          <div className="ColumnPost-addComment">
            <form onSubmit={this.handleAddCommentSubmit}>
              {/* <textarea
                ref="addCommentTextarea"
                name=""
                className="ColumnPost-addCommentTextarea"
                placeholder="Add comment"
                onChange={this.handleCommentChange}
              ></textarea> */}
              <input
                type="text"
                ref="addCommentTextarea"
                className="ColumnPost-addCommentTextarea"
                placeholder="Add comment"
                value={this.state.comment}
                onChange={this.handleCommentChange}
              />
            </form>
          </div>
        </section>
      </div>
    )
  }
}

export default ColumnPost