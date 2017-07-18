const initialState = []

export default (state = initialState, action) => {
  if(action.type === 'GET_DATA_RENT') {
    return action.payload;
  }
  return state
}
