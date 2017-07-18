import axios from 'axios'
const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api'

export const searchProperty = (prop,city) => {
  return (dispatch) =>{
    if(city === "Select City") {
      axios.get(api+`/propertyRent/searchENull?prop=${prop}`)
      .then((response,err)=>{
        dispatch({
          type: 'GET_DATA_RENT',
          payload: response.data
        })
      })
      axios.get(api+`/propertySell/searchENull?prop=${prop}`)
      .then((response,err)=>{
        dispatch({
          type: 'GET_DATA_SELL',
          payload: response.data
        })
      })
    }
    axios.get(api+`/propertyRent/searchENull?city=${city}&prop=${prop}`)
    .then((response,err)=>{
      dispatch({
        type: 'GET_DATA_RENT',
        payload: response.data
      })
    })
    axios.get(api+`/propertySell/searchENull?city=${city}&prop=${prop}`)
    .then((response,err)=>{
      dispatch({
        type: 'GET_DATA_SELL',
        payload: response.data
      })
    })
  }
}

export const getRentDataAction = () => {
  return (dispatch) =>{
    axios.get(api+`/propertyRent/`)
    .then( (response,err)=>{
      dispatch({
        type: 'GET_DATA_RENT',
        payload: response.data
      })
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

export const getProfile = (id) =>{
  return (dispatch) =>{
    axios.get(api+`/user/${id}`)
    .then((response,err)=>{
      dispatch({
        type:'Get User',
        payload: response.data
      })
    })
  }
}

export const editProfile = (data,id) =>{
  let token = ""
  if(localStorage.getItem('token')){
    token = JSON.parse(localStorage.getItem('token')).token
  }
  return (dispatch) =>{
    axios.put(api+`/user/${id}`,{
      username: data.username,
      name: data.name,
      phone: data.phone,
      password: data.password
    },{
      headers: {token: token}
    })
    .then((response,err)=>{
      console.log(err);
    })
  }
}

export const sendRequest = () =>{

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
