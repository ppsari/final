import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import {acceptRequest,rejectRequest,getRequest} from '../../actions/index.js';
import Loader from '../../components/Loader.js';
import TitleSection from '../../components/TitleSection'

import {request} from '../../helpers/request';


const api = 'https://api.room360.ga/api'

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.toggleClass = this.toggleClass.bind(this)
    this.toggle = this.toggle.bind(this)
    this.state = {
      active: false,
      request: null,
      reason: "",
      isReason: false,
      id:"",
      index: "",
      propertyId: "",
      kind: "",
      modal: false,
    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    request(userId,'delete')
  }
  toggleClass() {
    const currentState = this.state.active;
    this.setState({
      active: !currentState
    })
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    return (
      <div>
        <div className="col-lg-10 offset-lg-1">
          <TitleSection lightTitle="REQUEST" boldTitle="LIST" />
            <div className="table-responsive m-t-30">
              {(this.state.request === null)
              ? <Loader />
              : (<table className="table">
                <tbody>
                  {this.state.request.map((r,index)=>{
                  return <div key={index}>
                  <tr className={this.state.active ? 'active' : null}>
                    <td style={{width: '20%'}}>
                      <div className="image-small">
                        <img className="img-responsive" src={r.connections._propertyId.image} alt="" />
                      </div>
                    </td>
                    <td>
                      <small className="italic">Property Requested</small>
                      <h6><span className="lnr lnr-home green m-r-10"></span><span className="bold">{r.connections._propertyId.name}</span></h6>
                      <h6><span className="lnr lnr-map-marker green m-r-10"></span>{r.connections._propertyId.city}</h6>
                    </td>
                    <td>
                      <small className="italic">Requested by:</small>
                      <h6><span className="lnr lnr-user green m-r-10"></span>{r._userId.name}</h6>
                      <h6><span className="lnr lnr-phone-handset green m-r-10"></span>{r._userId.phone}</h6>
                      <h6><span className="lnr lnr-bubble green m-r-10"></span>
                        <button type="button" onClick={()=> this.see(r.note,r._id)} className="btn-link">See Message</button>
                      </h6>
                    </td>
                    <td className="list-table p-b-0 p-t-25">
                      <button type="submit" className="theme-btn btn-style-one btn-small" onClick={()=> this.accept(r._id,index,r.connections._propertyId._id,r.connections._propertyId.status)} >
                        Accept
                      </button>
                      <button type="submit" className="theme-btn btn-style-three btn-small"  onClick={()=> this.reason(r._id,index,r._propertyId,r.status)}>
                        Reject
                      </button>
                    </td>
                  </tr>
                  <tr style={this.state.active && r._id === this.state.idx ? null : {display: 'none'}} >
                    <td colSpan="4" className="bg-gray">
                      <small className="italic">Message:</small>
                      <p>
                        {r.note}
                      </p>
                    </td>
                  </tr>
                  </div>
                  })}
                  {(this.state.modal === true)
                  ?(<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Reason</ModalHeader>
                    <ModalBody>
                      <FormGroup>
                        <Label for="reason">Reason why you reject</Label>
                        <Input type="textarea" name="text" id="reason" onChange={(e)=>{this.setState({reason: e.target.value})}}/>
                      </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={() => {
                          this.reject(this.state.index)
                          this.toggle()
                        }}>Reject</Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>)
                  :null
                  }
                </tbody>
              </table>)
            }
            </div>
        </div>
      </div>
    )
  }

  reason(id,index){
    console.log('masuk');
    this.setState({
      modal: true,
      id: id,
      index: index
    })
  }

  accept(id,index,propId,kind){
    const token = JSON.parse(localStorage.getItem('token')).token
    this.props.acceptRequest(id,token,propId,kind)
    this.state.request.splice(index,1)
    this.setState({
      request: this.state.request
    })
    console.log(token);
  }

  reject(index){
    const token = JSON.parse(localStorage.getItem('token')).token
    this.props.rejectRequest(this.state.id,token,this.state.reason)
    this.state.request.splice(index,1)
    this.setState({
      isReason: false,
      request: this.state.request
    })

  }

  see(message,id){
    const currentState = this.state.active;
    this.setState({
      active: !currentState,
      message: message,
      idx: id
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
    acceptRequest: (id,token,propId,kind) => dispatch(acceptRequest(id,token,propId,kind)),
    rejectRequest: (id,token,reason,propId,kind) => dispatch(rejectRequest(id,token,reason)),
    getRequest: (token) => dispatch(getRequest(token))
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(Request)
