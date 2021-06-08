import React, { useState } from 'react'
import './App.css';
import Post from './Post';
import VinnyCarp from './images/VinnyCarp.jpg';
import JoeCarp from './images/JoeCarp.JPG'
import carpface from './images/carpface.JPG'

function App() {
  const [ posts, setPosts ] = useState([
    {
      username: "Vinny",
      caption: "What a lunker!",
      imageURL: VinnyCarp,
    },
    {
      username: "Joe",
      caption: "Woo!",
      imageURL: JoeCarp,
    },
    {
      username: "Alissa",
      caption: "Winner winner fish dinner!",
      imageURL: carpface,
    }
  ]);
  return (
    <div className="app">

      <div classname='app_header' >
        <img classname="app_headerImage"
          src=""
          alt="Logo Will Go Here." />
      </div>
      <h1>Welcome to FishID.com!</h1>

      {
        posts.map(post => (
          <Post username = {post.username} caption={post.caption} imageURL={post.imageURL}/>
        ))
      }

    </div>
  );
}

export default App;
