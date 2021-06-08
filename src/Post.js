import React from 'react';
import './Post.css';
import VinnyCarp from './images/VinnyCarp.jpg';
import Avatar from '@material-ui/core/Avatar';


function Post(props) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar 
                className="post_avatar"
                alt="Vinny"
                src="/static/images/avatar1.jpg"/>
                <h3>Username</h3>
            </div>
            <img className="post_image" src={VinnyCarp} alt="oops... Now where did that go?"></img>
            <h4 className="post_text"><strong>Vinny:</strong> What a Lunker!</h4>
        </div>
    )
}

export default Post
