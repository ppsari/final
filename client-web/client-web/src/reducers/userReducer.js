const initialState = {
    "_id": null,
    "email": null,
    "phone": null,
    "name": null,
    "username": null,
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
    return state = action.payload
  }
  return state
}
