import React, { useEffect, useState } from 'react'
import './App.css';
import Post from './Post';
import Logo1 from './images/Logo1.jpg';
import Logo2 from './images/Logo2.jpg';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
                src={Logo2}
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
                src={Logo2}
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
      <div className='app_header' >
        <img className="app_headerImage"
          src={Logo1}
          alt="Logo Will Go Here." 
        />
        <div className="app_auth">
          { user ? (
            <Button className="app_authButtons" onClick={() => auth.signOut()}>Logout</Button>
            ) : (
            <div className="app_loginContainer">
              <Button className="app_authButtons" onClick={()=> setOpenSignIn(true)}>Log In</Button>
              <Button className="app_authButtons" onClick={()=> setOpen(true)}>Sign Up</Button>
            </div>    
            )
          }
        </div>
      </div>
     
      <div className="app_welcome" >
        <h1> {(user?.displayName) ? (`Hey, ${user.displayName}!  Welcome Back to FishID.com!`) : ('Welcome to FishID.com')} </h1>
      </div>
      
      <div className="app_posts">
        { posts.map(({id, post}) => ( 
          <Post key={id} postId={id} username = {post.username} caption={post.caption} imageUrl={post.imageUrl}/> 
          )
        )}
      </div>
      
      {user?.displayName ? ( <ImageUpload username={user.displayName}/> ) : ( <h3>You Need To login to use all our features.</h3> )}

    </div>
  );
}

export default App;
