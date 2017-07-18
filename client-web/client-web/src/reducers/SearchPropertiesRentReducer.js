const initialState = []

export default (state = initialState, action) => {
  if(action.type === 'SEARCH_DATA_RENT') {
    return action.payload;
  }
  return state
}
