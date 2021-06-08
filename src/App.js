import React, { useEffect, useState } from 'react'
import './App.css';
import Post from './Post';
// import VinnyCarp from './images/VinnyCarp.jpg';
// import JoeCarp from './images/JoeCarp.JPG'
// import carpface from './images/carpface.JPG'
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';

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
  const [ modalStyle ] = useState(getModalStyle)
  const [ posts, setPosts ] = useState([]);
  const [openSignIn, setOpenSignIn ] = useState(false)
  const [ open, setOpen ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [user, setUser ] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged in ...
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe();
    }

  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data()
      })));
    })
  },[]);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
      setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
      setOpenSignIn(false);
  }

  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
            <center>
              <img 
                className="app_headerImage"
                src=""
                alt="Logo Goes Here... hmmm... Now, where did I put that darn logo?"
              />
            </center>
            <Input
              placeholder = "email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder = "username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder = "password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={(event) => signUp(event)}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signup'>
            <center>
              <img 
                className="app_headerImage"
                src=""
                alt="Logo Goes Here... hmmm... Now, where did I put that darn logo?"
              />
            </center>
            <Input
              placeholder = "email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder = "password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={(event) => signIn(event)}> press me </Button>
          </form>
        </div>
      </Modal>
      <div classname='app_header' >
        <img classname="app_headerImage"
          src=""
          alt="Logo Will Go Here." />
      </div>
      { user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
        <div className="app_loginContainer">
          <Button onClick={()=> setOpenSignIn(true)}>Log In</Button>
          <Button onClick={()=> setOpen(true)}>Sign Up</Button>
        </div>    
        )
      }
      
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
