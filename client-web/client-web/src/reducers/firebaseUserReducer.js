import { firebaseAuth } from '../config/constants';
const initialState = {
  authed: false,
  loading: false,
  user: null,
}

firebaseAuth().onAuthStateChanged((user) => {
  if (user) {
    initialState.authed = true
    initialState.loading = false
    initialState.user = user
  } else {
    initialState.authed = false
    initialState.loading = false
  }
})

export default (state = initialState, action) => {
  return state
}
