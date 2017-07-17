const initialState = null

export default (state = initialState, action) => {
  if(action.type === 'GET_PROPERTY_RENT') {
    return action.payload
  }
  return state
}
