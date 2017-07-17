const initialState = null

export default (state = initialState, action) => {
  if(action.type === 'GET_PROPERTY_SELL') {
    return action.payload;
  }
  return state
}
