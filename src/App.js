import React from 'react';
import * as firebase from "firebase/app";
import './App.css';
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photoURL: ''
  })



  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signedInUser);
      console.log(email,displayName, photoURL);

    })
    .catch(error =>{
      console.log(error);
      console.log(error.message);
    })
  }
  return (
    <div className="App">
      <button onClick={handleSignIn}>Sign in</button>
      {
        user.isSignedIn && <p>Welcome, {user.name}</p>
      }
    </div>
  );
}

export default App;
