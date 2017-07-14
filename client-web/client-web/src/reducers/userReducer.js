const initialState = {
    "_id": "5966bb1ac4dd55460f57048d",
    "email": "user2@gmail.com",
    "phone": "+6285813372797",
    "name": "user2",
    "password": "U2FsdGVkX19IJfJL0T8m\/Rttnqcym+\/UJWe2dlcS5KQ=",
    "username": "Lena",
    "__v": 0
  }

export default (state = initialState, action) => {
  if(action.type === 'CHANGE_EMAIL') {
    return {...state, email: action.payload};
  }
  else if(action.type === 'CHANGE_NAME') {
    return {...state, name: action.payload};
  }
  else if(action.type === 'CHANGE_PASSWORD') {
    return {...state, password: action.payload};
  }
  return state
}
