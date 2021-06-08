import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA3uXBpbNw8TLrtArgWbHxCE1mp234ufio",
    authDomain: "fishtagram-85576.firebaseapp.com",
    databaseURL: "https://fishtagram-85576-default-rtdb.firebaseio.com",
    projectId: "fishtagram-85576",
    storageBucket: "fishtagram-85576.appspot.com",
    messagingSenderId: "1007391879660",
    appId: "1:1007391879660:web:19200d3b54d282c15d90c9",
    measurementId: "G-9KN4ZBGQ89"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };