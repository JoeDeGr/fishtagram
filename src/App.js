import React from 'react'
import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">

      <div classname='app_header' >
        <img classname="app_headerImage"
          src=""
          alt="Logo Will Go Here." />
      </div>
      <h1>Welcome to FishID.com!</h1>
      <Post />
      <Post/>
      <Post/>
      <Post/>

    </div>
  );
}

export default App;
