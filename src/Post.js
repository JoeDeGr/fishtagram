import React, { useState, useEffect } from 'react';
import './Post.css';
import { db } from './firebase'
import Avatar from '@material-ui/core/Avatar';


function Post({username, caption, imageUrl, postId}) {
    const [comments, setComments] = useState([])
    const [comment, setComment ] = useState('')

    useEffect(() => {
        let unsubscribe;

        if(postId) {
            unsubscribe = db
               .collection("posts")
               .doc(postId)
               .collection("comments")
               .onSnapshot((snapshot) => {
                   setComment(snapshot.docs.map((doc) => doc.data()));
               });

        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault()
    }

    return (
        <div className="post">
            <div className="post_header">
                <Avatar 
                className="post_avatar"
                alt={username}
                src="/static/images/avatar1.jpg"/>
                <h3>{username}</h3>
            </div>
            <img className="post_image"  src={imageUrl} alt={caption ? caption : "oops... Now where did that go?"}></img>
            <h4 className="post_text"><strong>{username}:</strong> {caption}</h4>
            <div classname="post_comments">
                {comments.map((comment) => (
                    <p>
                        <b>{comment.username}</b>{comment.text}
                    </p>
                ))}
            </div>
            <form className="post_commentBox">
                <input
                    className="post_input"
                    type="text"
                    placeholder="add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="post_button"
                    type="submit"
                    disabled={!comment}
                    onClick={postComment}
                >submit</button>
            </form>
        </div>
    )
}
export default Post
