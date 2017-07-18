import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import {acceptRequest,rejectRequest,getRequest} from '../../actions/index.js'

const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api'

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.toggleClass = this.toggleClass.bind(this)
    this.state = {
      active: false,
      request: null,
      reason: "",
      isReason: false,
      id:""
    }
  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({
      active: !currentState
    })
  }

  render () {
    return (
      <div>
        <div className="col-lg-10 offset-lg-1">
          <h4>Request List</h4>
            <div className="table-responsive m-t-30">
              <button onClick={()=> this.tes()}>tes</button>
              {(this.state.request === null)
              ? (
                <img
                src='http://testmadina.com/Images/loading1.gif'
                style={{height:200, width: 200,margin:'auto'}}/>)
              : (<table className="table">
                <tbody>
                  {this.state.request.map((r,index)=>{
                  return <tr className={this.state.active ? 'active' : null} key={index}>
                    <td style={{width: '20%'}}>
                      <div className="image-small">
                        <img className="img-responsive" src={r.connections._propertyId.image} alt="" />
                      </div>
                    </td>
                    <td>
                      <small className="italic">{r.connections._propertyId.name}</small>
                      <h6><span className="lnr lnr-home green m-r-10"></span><span className="bold">Pondok Indah Permai</span></h6>
                      <h6><span className="lnr lnr-map-marker green m-r-10"></span>{r.connections._propertyId.city}</h6>
                    </td>
                    <td>
                      <small className="italic">Requested by:</small>
                      <h6><span className="lnr lnr-user green m-r-10"></span>{r._userId.name}</h6>
                      <h6><span className="lnr lnr-phone-handset green m-r-10"></span>{r._userId.phone}</h6>
                      <h6><span className="lnr lnr-bubble green m-r-10"></span>
                        <button type="button" onClick={()=> this.see(r.note)} className="btn-link">See Message</button>
                      </h6>
                    </td>
                    <td className="list-table p-b-0 p-t-25">
                      <button type="submit" className="theme-btn btn-style-one btn-small" onClick={()=> this.accept(r._id)} >
                        Accept
                      </button>
                      <button type="submit" className="theme-btn btn-style-three btn-small"  onClick={()=> this.reason(r._id)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                  })}
                  {(this.state.isReason === true)
                  ?(<tr style={this.state.active ? null : {display: 'none'}} >
                    <td colSpan="4" className="bg-gray">
                      <input type="text" placeholder="please input your reason if necessary (optional)" onChange={(e)=> this.setState({reason : e.target.value})}/>
                      <button type="submit" className="theme-btn btn-style-three btn-small"  onClick={()=> this.reject(this.state.id)}>
                        Reject
                      </button>
                    </td>
                   </tr>)
                  :(<h1></h1>)
                  }
                  <tr style={this.state.active ? null : {display: 'none'}} >
                    <td colSpan="4" className="bg-gray">
                      <small className="italic">Message:</small>
                      <p>
                        {this.state.message}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>)
            }
            </div>
        </div>
      </div>
    )
  }

  reason(id){
    this.setState({
      isReason: true,
      id: id
    })
  }

  accept(id){
    const token = JSON.parse(localStorage.getItem('token')).token
    this.props.acceptRequest(id,token)
  }

  reject(id){
    const token = JSON.parse(localStorage.getItem('token')).token
    this.props.rejectRequest(id,token,this.state.reason)
    this.setState({
      isReason: false
    })
  }

  see(message){
    const currentState = this.state.active;
    this.setState({
      active: !currentState,
      message: message
    })
  }

  componentWillMount(){
    const token = JSON.parse(localStorage.getItem('token')).token
    axios.get(api+`/request`,{headers:{token:token}})
    .then(response=>{
      console.log(response.data);
      this.setState({
        request: response.data
        })
      })
    }
  }

const mapStateToProps = (s) =>{
  return{
    users_request: s.requests
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    acceptRequest: (id,token) => dispatch(acceptRequest(id,token)),
    rejectRequest: (id,token,reason) => dispatch(rejectRequest(id,token,reason)),
    getRequest: (token) => dispatch(getRequest(token))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Request)
