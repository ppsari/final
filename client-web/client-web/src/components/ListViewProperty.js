import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const api = `http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api`

class ListViewProperty extends React.Component {
  constructor(props){
    super(props)
    this.state={
      properties:[],
      status: "",
      propId: ""
    }
  }
  render () {
    return (
      <div className="ListViewProperty">
        {this.state.properties.map((prp,index)=>{
          return <div className="media m-t-20 shadow" key={index}>
            <div className="media-left" style={{minHeight: 124}}>
              <div style={{width: 120, height: 124, overflow: 'hidden'}}>
                <img style={{height: '100%'}} src={prp.image} alt="64x64" />
              </div>
            </div>
            <div className="media-body padding-15">
              <span className="lnr lnr-map-marker m-r-5"></span><span>{prp.city}</span>
              <h5 className="extra-bold">{prp.name}</h5>
              <p className="excerpt">{prp.description}</p>
            </div>
            <div className="media-right padding-15">
              <div className="pull-right">
                <Link to={`/dashboard/property/detail/${prp.status}/${prp._id}`}>
                  <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-primary btn-same">
                    <small>See Detail</small>
                  </button>
                </Link>
                <Link to={`/dashboard/property/add-room/${this.state.property.status}/${this.state.propId}`}>
                  <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same">
                    <small>Add Room</small>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        })}
      </div>
    )
  }
  componentDidMount(){
    let token = JSON.parse(localStorage.getItem(`token`)).token
    axios.get(api+`/propertyRent/owner`,{headers:{token:token}})
    .then(pr=>{
      if(pr.data.length > 0){
        this.setState({
          properties: this.state.properties.concat(pr.data),
          status: pr.data.status,
          propId: pr.data._id
        })
        console.log(this.state.properties);
      }
    })
    axios.get(api+`/propertySell/owner`,{headers:{token:token}})
    .then(ps=>{
      if(ps.data.length > 0){
        this.setState({
          properties: this.state.properties.concat(ps.data),
          status: ps.data.status,
          propId: ps.data._id
        })
      }
    })
  }
}

export default ListViewProperty
