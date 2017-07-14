import axios from 'axios'

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

export const editProfile = (data) =>{
  return (dispatch) =>{
    axios.get('')
    .then(response=>{
      dispatch({
        type: 'Edit Profile',
        payload: response.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
