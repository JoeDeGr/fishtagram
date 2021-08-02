import React, { useState } from 'react'
import Post from '../components/Post'

function Posts(posts, user) {

    return (
        <> { posts.map(({id, post}) => ( 
            <Post key={id} postId={id} user={user} username = {post.username} caption={post.caption} imageUrl={post.imageUrl}/> 
            )
          )} </>
    )
}

export default Posts
