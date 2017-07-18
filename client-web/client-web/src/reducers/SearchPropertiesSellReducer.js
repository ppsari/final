const initialState = []

export default (state = initialState, action) => {
  if(action.type === 'SEARCH_DATA_SELL') {
    return action.payload;
  }
  return state
}
