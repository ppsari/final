const initialState = {}

export default (state = initialState, action) => {
  if(action.type === 'Get Request') {
    return action.payload
  }
  return state
}
