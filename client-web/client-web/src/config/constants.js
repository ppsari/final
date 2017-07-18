import firebase from 'firebase'
import firebaseui from 'firebaseui'

var config = {
  apiKey: "AIzaSyAmWsU7ZZ6yStXKCiutNHaxCJX7a2xY-fM",
  authDomain: "grayfox-dfa44.firebaseapp.com",
  databaseURL: "https://grayfox-dfa44.firebaseio.com",
  storageBucket: "grayfox-dfa44.appspot.com",
 };
 firebase.initializeApp(config);

// FirebaseUI config.
export const uiConfig = {
 signInSuccessUrl: '/dashboard',
 signInOptions: [
   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
 ],
};

// Initialize the FirebaseUI Widget using Firebase.
export const ui = new firebaseui.auth.AuthUI(firebase.auth());
export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const storageRef = firebase.storage();
