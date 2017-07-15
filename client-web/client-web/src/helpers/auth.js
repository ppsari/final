import { ref, firebaseAuth, uiConfig, ui } from '../config/constants'

export function register (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
  .then(saveUser)
}

export function logout () {
  return console.log('hello');
  // return localStorage.removeItem('user')
}

export function logoutFirebase () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

// The start method will wait until the DOM is loaded.
export function loadUi () {
  return ui.start('#firebaseui-auth-container', uiConfig);
}
