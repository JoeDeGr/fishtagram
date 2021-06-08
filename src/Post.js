import React from 'react';
import './Post.css';

import Avatar from '@material-ui/core/Avatar';


function Post({username, caption, imageURL}) {
    // const {username, caption, imageURL} = props
    return (
        <div className="post">
            <div className="post_header">
                <Avatar 
                className="post_avatar"
                alt={username}
                src="/static/images/avatar1.jpg"/>
                <h3>{username}</h3>
            </div>
            <img className="post_image" src={imageURL} alt={caption ? caption : "oops... Now where did that go?"}></img>
            <h4 className="post_text"><strong>{username}:</strong> {caption}</h4>
        </div>
    )
}
export default Post
