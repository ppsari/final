import firebase from 'firebase'
import firebaseui from 'firebaseui'

var config = {
   apiKey: "AIzaSyDrCG8ARJgx5NCMpOPIBykXIEiclYmyhxg",
   authDomain: "vr-project-41e13.firebaseapp.com",
   databaseURL: "https://vr-project-41e13.firebaseio.com",
   projectId: "vr-project-41e13",
   storageBucket: "vr-project-41e13.appspot.com",
   messagingSenderId: "620707099193"
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
