const initialState = {
    "_id": "5966bb1ac4dd55460f57048d",
    "email": "user2@gmail.com",
    "phone": "+6285813372797",
    "name": "user2",
    "password": "U2FsdGVkX19IJfJL0T8m\/Rttnqcym+\/UJWe2dlcS5KQ=",
    "username": "Lena",
    "__v": 0,
    "token": null,
  }

export default (state = initialState, action) => {
  if(action.type === 'Edit Profile') {
    return {...state,
      phone: action.phone,
      name: action.name,
      password: action.password
    };
  }
  else if (action.type === 'LOGIN') {
    return {...state,
      token: action.payload
    };
  }
  return state
}
