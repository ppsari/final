import axios from 'axios'
const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api'

export const getRentDataAction = () => {
  return (dispatch) =>{
    axios.get(api+`/propertyRent/`)
    .then( (response,err)=>{
      dispatch({
        type: 'GET_DATA_RENT',
        payload: response.data
      })
      console.log(response.data);
      console.log(err)
    })
  }
}
export const getSellDataAction = () => {
  return (dispatch) =>{
    axios.get(api+`/propertySell`)
    .then(response=>{
      dispatch({
        type: 'GET_DATA_SELL',
        payload: response.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
}

export const getDetailPropertyRent = (id) =>{
  return (dispatch) =>{
    axios.get(api+`/propertyRent/${id}`)
    .then(response=>{
      dispatch({
        type: 'GET_PROPERTY_RENT',
        payload: response.data
      })
    })
  }
}

export const getDetailPropertySell = (id) =>{
  return (dispatch) =>{
    axios.get(api+`/propertySell/${id}`)
    .then(response=>{
      dispatch({
        type: 'GET_PROPERTY_SELL',
        payload: response.data
      })
    })
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
    axios.get(api+`/user/${id}`,{
      name: data.name,
      phone: data.phone,
      password: data.password
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

    axios.delete(api+`/request${id}`,{
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

    axios.delete(api+`/request/${id}`,{
      response: 'rejected'
    })
    .then(response=>{
      dispatch(
        console.log(response.data)

      )
    })
  }
}

export const getUserProperties = (id) =>{
  return (dispatch)=>{
    axios.get(api+`/api`)
  }
}
