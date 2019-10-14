import React from 'react'
import GridPost from './GridPost';

const GridPostList = ({ posts, onPostDetailClick, onUserClick }) => {

  if (posts.length > 0) {
    return (
      <section className="is-one-thirds grid-gap-30">
        {posts.map((post) =>
          (
            <GridPost
              key={post._id}
              post={post}
              onPostDetailClick={onPostDetailClick}
              onUserClick={onUserClick}
            />
          ))}
      </section>
    )
  } else {
    return (
      <div>This is very empty <span role="img" aria-label="sad">😔</span>.
      Upload a photo or follow friends to be able to do what they do <span role="img" aria-label="wink">😉</span>
      </div>
    )
  }
}

export default GridPostList