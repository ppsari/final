export const getRentDataAction = (data) => {
  return {
    type: 'GET_DATA_RENT',
    payload: data,
  }
}
export const getSellDataAction = (data) => {
  return {
    type: 'GET_DATA_SELL',
    payload: data,
  }
}
