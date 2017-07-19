import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import prettyMoney from '../helpers/prettyMoney'

const api = `http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api`

class ListViewProperty extends React.Component {
  constructor(props){
    super(props)
    this.state={
      properties:[]
    }
  }
  render () {
    return (
      <div className="ListViewProperty">
        {this.state.properties.map((prp,index)=>{
          console.log(prp);
          return <div className="media m-t-20 shadow" key={index}>
            <div className="media-left" style={{minHeight: 124}}>
              <div style={{width: 120, height: 160, overflow: 'hidden'}}>
                <img style={{height: '100%'}} src={prp.image} alt="64x64" />
              </div>
            </div>
            <div className="media-body padding-15">
              <h5 className="extra-bold">{prp.name}</h5>
              <span className="lnr lnr-map-marker m-r-5 green"></span><span>{prp.city}</span> |
              <span className="lnr lnr-home m-r-5 m-l-5 green"></span><span> For {prp.status}</span><br/>
              <small className="excerpt italic">Price : {prettyMoney(prp.price.amount)}</small><br/>
              <small className="excerpt italic">Posted At : {prp.createdDate.split('T')[0]}</small>
            </div>
            <div className="media-right padding-15">
              <div className="pull-right">
                <Link to={`/dashboard/property/detail/${prp.status}/${prp._id}`}>
                  <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-primary btn-same">
                    <small>See Detail</small>
                  </button>
                </Link>
                <Link to={`/dashboard/property/add-room/${prp.status}/${prp._id}`}>
                  <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same">
                    <small>Add Room</small>
                  </button>
                </Link>
                <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-danger btn-same" onClick={()=>this.deleteProp(prp.status,prp._id,index)}>
                  <small>Delete Room</small>
                </button>
              </div>
            </div>
          </div>
        })}
      </div>
    )
  }

  deleteProp(status,id,index){
    if(window.confirm(`Are you sure you want to delete this property?`)){
      const token = JSON.parse(localStorage.getItem('token')).token
      if(status === 'rent'){
        axios.delete(api+`/propertyRent/${id}`,{headers:{token: token}})
        .then(response=>{
          this.state.properties.splice(index,1)
          this.setState({
            properties: this.state.properties
          })
        })
      } else{
        axios.delete(api+`/propertySell/${id}`,{headers:{token: token}})
        .then(response=>{
          this.state.properties.splice(index,1)
          this.setState({
            properties: this.state.properties
        })
      })
    }
  } else {
    return false
  }

}


  componentDidMount(){
    let token = JSON.parse(localStorage.getItem(`token`)).token
    axios.get(api+`/propertyRent/owner`,{headers:{token:token}})
    .then(pr=>{
      if(pr.data.length > 0){
        this.setState({
          properties: this.state.properties.concat(pr.data)
        })
      }
    })
    axios.get(api+`/propertySell/owner`,{headers:{token:token}})
    .then(ps=>{
      if(ps.data.length > 0){
        this.setState({
          properties: this.state.properties.concat(ps.data)
        })
      }
    })
  }
}

export default ListViewProperty
