import React, { useEffect, useState } from 'react'
import './App.css';
import Post from './Post';
// import VinnyCarp from './images/VinnyCarp.jpg';
// import JoeCarp from './images/JoeCarp.JPG'
// import carpface from './images/carpface.JPG'
import {db} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import { Button } from '@material-ui/core';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() { 
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [ posts, setPosts ] = useState([]);
  const [ open, setOpen ] = useState(false);
  
  // const signUp = (e) => {
  //   e.preventDefault()

  // }

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data()
      })));
    })
  },[]);

  const signUp = (event) => {
    event.preventDefault()
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} classname={classes.paper}>
          <h2>I am a modal.</h2>
        </div>
      </Modal>
      <div classname='app_header' >
        <img classname="app_headerImage"
          src=""
          alt="Logo Will Go Here." />
      </div>
      
      <Button onClick={()=> setOpen(true)}>Sign Up</Button>

      <h1>Welcome to FishID.com!</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username = {post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    </div>
  );
}

export default App;
