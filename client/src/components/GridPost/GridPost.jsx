import React, { Component } from 'react'
import './GridPost.sass'

class GridPost extends Component {

  handlePostDetailClick = event => {
    event.preventDefault()

    this.props.onPostDetailClick(this.props.post._id)
  }

  render() {
    const { post } = this.props
    return (
      <div className="GridPost">
        <a href="#/" className="GridPost-link" onClick={this.handlePostDetailClick}>
          <figure className="GridPost-imageWrapper">
            <img src={post.imageUrl} className="GridPost-image" alt={post.caption} />
          </figure>
        </a>
      </div>
    )
  }
}

export default GridPost