import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from '../components/Header';
import GridPostList from '../components/GridPostList';
import InfiniteScroll from 'react-infinite-scroller';

class ExplorePage extends Component {

  state = {
    user: null,
    posts: [],
    loadMore: true
  }

  componentDidMount() {
    const { loggedInUsername, token } = this.props

    logic.retrieveUser(loggedInUsername, undefined, token)
      .then(user => this.setState({ user }))
      .then(() => logic.listExplorePosts(token, loggedInUsername))
      .then(newPosts => {
        const posts = [...this.state.posts, ...newPosts]
        this.setState({ posts })
      })
      .catch(err => false)
  }

  onUserClick = username => this.props.history.push(`/${username}`)

  onLoginClick = () => this.props.history.push('/accounts/login')

  onRegisterClick = () => this.props.history.push('/accounts/register')

  handleLoadMore = page => {
    if (this.state.loadMore) {
      const { loggedInUsername, token } = this.props

      logic.listExplorePosts(token, loggedInUsername, page)
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
          <main>
            <h5 className="has-text-gray">Explore</h5>
            {
              <InfiniteScroll
                pageStart={0}
                loadMore={this.handleLoadMore}
                hasMore={this.state.loadMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
              >
                <GridPostList
                  posts={this.state.posts}
                  onPostDetailClick={this.props.onPostDetailClick}
                  onUserClick={this.onUserClick}
                />
              </InfiniteScroll>
            }
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(ExplorePage)