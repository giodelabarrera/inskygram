import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import Avatar from '../components/Avatar/Avatar';
import ColumnPost from '../components/ColumnPost';
import InfiniteScroll from 'react-infinite-scroller';

class WallPage extends Component {

  state = {
    user: null,
    posts: [],
    loadMore: true
  }

  componentDidMount() {
    const { loggedInUsername, token } = this.props

    logic.retrieveUser(loggedInUsername, undefined, token)
      .then(user => this.setState({ user }))
      .then(() => logic.listUserWall(token, loggedInUsername))
      .then(newPosts => {
        const posts = [...this.state.posts, ...newPosts]
        this.setState({ posts })
      })
      // TODO
      .catch(err => false)
  }

  onUserClick = username => this.props.history.push(`/${username}`)

  onToggleLikeClick = async (postId) => {
    const { loggedInUsername, token } = this.props

    try {
      await logic.toggleLikePost(token, loggedInUsername, postId)

      const postUpdated = await logic.retrievePost(postId, loggedInUsername, token)

      const postsToUpdated = this.state.posts

      const postsUpdated = postsToUpdated.map(post => {
        if (post._id === postUpdated._id) post.likes = postUpdated.likes
        return post
      })
      this.setState({ posts: postsUpdated })

    } catch (err) {
      // TODO
    }
  }

  onToggleSaveClick = async (postId) => {
    const { loggedInUsername, token } = this.props
    try {
      await logic.toggleSavePost(token, loggedInUsername, postId)
    } catch (err) {
      // TODO
    }
  }

  onAddCommentSubmit = async (postId, description) => {
    const { loggedInUsername, token } = this.props

    try {
      await logic.addCommentToPost(token, loggedInUsername, postId, description)
      const postUpdated = await logic.retrievePost(postId, loggedInUsername, token)

      const postsToUpdated = this.state.posts

      const postsUpdated = postsToUpdated.map(post => {
        if (post._id === postUpdated._id) post.comments = postUpdated.comments
        return post
      })
      this.setState({ posts: postsUpdated })

    } catch (err) {
      // TODO
    }
  }

  isLiked = likes => likes.find(like => like.user.username === this.props.loggedInUsername) ? true : false

  isSaved = (post, savedPosts) => savedPosts.find(savedPost => savedPost.post === post._id) ? true : false

  onLoginClick = () => this.props.history.push('/accounts/login')

  onRegisterClick = () => this.props.history.push('/accounts/register')

  handleLoadMore = page => {
    if (this.state.loadMore) {
      const { loggedInUsername, token } = this.props

      logic.listUserWall(token, loggedInUsername, page)
        .then(newPosts => {
          if (newPosts.length === 0) {
            this.setState({ loadMore: false })
          } else {
            const posts = [...this.state.posts, ...newPosts]
            this.setState({ posts })
          }
        })
        .catch(err => false)
    }
  }

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
          <main className="is-eight-quarters grid-gap-30">
            <section>
              {
                this.state.posts.length > 0 ?
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.handleLoadMore}
                    hasMore={this.state.loadMore}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                  >
                    {this.state.posts.map(post => (
                      <ColumnPost
                        key={post._id}
                        post={post}
                        onPostDetailClick={this.onPostDetailClick}
                        onUserClick={this.onUserClick}
                        onToggleLikeClick={this.onToggleLikeClick}
                        onToggleSaveClick={this.onToggleSaveClick}
                        onAddCommentSubmit={this.onAddCommentSubmit}
                        isLiked={this.isLiked(post.likes)}
                        isSaved={this.isSaved(post, this.state.user.savedPosts)}
                      />))}
                  </InfiniteScroll> :
                  (<div>This is very empty <span role="img" aria-label="sad">😔</span>.
                    Upload a photo or follow friends to be able to do what they do
                    <span role="img" aria-label="wink"> 😉</span>
                  </div>)
              }
            </section>
            <section>
              {this.state.user && <Avatar
                username={this.state.user.username}
                name={this.state.user.name}
                imageUrl={this.state.user.imageUrl}
                onUserClick={this.onUserClick}
              />}
            </section>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(WallPage)