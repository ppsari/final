const initialState = ""

export default (state = initialState, action) => {
  if(action.type === 'Edit Profile') {
    return action.payload
  }
  return state
}
