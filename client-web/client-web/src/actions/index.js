import axios from 'axios'
const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api/user/'
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
export const loginAction = (data) => {
  return {
    type: 'LOGIN',
    payload: data,
  }
}

export const editProfile = (data,id) =>{
  return (dispatch) =>{
    axios.get(api+`${id}`,{
      response
    })
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

export const acceptRequest = (id) =>{
  return(dispatch)=>{

    axios.delete(api+`${id}`,{
      response: 'approved'
    })
    .then(response=>{
      dispatch(
        console.log(response.data)
      )
    })
  }
}

export const rejectRequest = (id) =>{
  return(dispatch)=>{

    axios.delete(api+`${id}`,{
      response: 'rejected'
    })
    .then(response=>{
      dispatch(
        console.log(response.data)

      )
    })
  }
}
