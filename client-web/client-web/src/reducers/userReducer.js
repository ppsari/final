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
  if(action.type === 'Get User') {
    return action.payload
  }
  else if (action.type === 'LOGIN') {
    return state = action.payload
  }
  return state
}
