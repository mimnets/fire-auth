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
  const handleSignIn = () => {
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

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo:'',
        email: '',
        password: ''
      }
      setUser(signedOutUser);
    })
    .catch(err => {
      console.log(err.message);
    })
  }

  const handleBlur = (event) => {
    let isFormValid = true;
    console.log(event.target.name);
    console.log(event.target.value);
    if(event.target.name === 'email'){
      const isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const paswordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && paswordHasNumber;
      // console.log(isPasswordValid && paswordHasNumber)
    }
    if (isFormValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = () => {

  }

  return (
    <div className="App">
      { 
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
        <button onClick={handleSignIn}>Sign in</button>}
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt=""/>
          </div>
      }

      <h1>Our Own Authentication System</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <form action="" onSubmit={handleSubmit}>
      <input name="name" type="text" onBlur={handleBlur} placeholder="you name"/>
        <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Write your email address." required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
      <br/>
      <input type="button" value="Submit"/>
      </form>

    </div>
  );
}

export default App;
