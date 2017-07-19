import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import GoogleMapReact from 'google-map-react'

import './MyDetailProperty.css';

const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api'

class MyDetailProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      property: null,
      name: "",
      image: "",
      descr: "",
      index: 0,
      zoom: 18,
      lat: 0,
      lng: 0
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    return (
      <div>
        {(this.state.property === null)
          ? <img
            src='http://testmadina.com/Images/loading1.gif'
            style={{height:200, width: 200,margin:'auto'}}
            alt="load" />
          : (<div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <div className="flex-space-between m-b-30">
              <div>
                <h4 className="extra-bold">{this.state.property.name}</h4>
                <small><span className="lnr lnr-map-marker m-r-5"></span><span className="m-r-5">{this.state.property.city}</span> |  <span className="lnr lnr-home m-l-5 m-r-5"></span>For <b>{this.state.property.status}</b></small>
              </div>
              <div className="pull-right">
                <button onClick={()=>this.visit()} type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same">
                  <small>Visit VR</small>
                </button>
              </div>
            </div>
            <div className="ListViewProperty">
              <div className="row">
                <div className="col-6">
                  <img className="img-responsive" src={this.state.property.image} alt="64x64" />
                </div>
                <div className="col-6">
                  <small>Price</small>
                  {(this.state.property.price.descr)
                  ? <h5>Rp{this.state.property.price.amount}/{this.state.property.price.descr}</h5>
                  : <h5>Rp{this.state.property.price}</h5>
                  }
                  <br />
                  <small>Address</small>
                  <p>{this.state.property.address}</p>
                  <br />
                  <small>Description</small>
                  <p><span className="label label-default"><span className="lnr lnr-home m-r-5"></span>{this.state.property._categoryId.name}</span></p>
                </div>
                {(this.state.property.location)
                ?(<div className="col-md-10 offset-lg-1">
                  <GoogleMapReact
                    defaultOptions={{scrollwheel: false}}
                    style={{width:50, height:250,margin:10}}
                     center={{lat: this.state.lat, lng: this.state.lng}}
                     zoom={this.state.zoom}
                   >
                    <img
                      style={{width:20,height:20}}
                      lat={this.state.lat}
                      lng={this.state.lng}
                      src='http://www.clker.com/cliparts/l/a/V/x/F/r/house-icon-dark-green-hi.png'
                    />
                  </GoogleMapReact></div>)
                :(<h4>No location available</h4>)
              }
              </div>
              <hr />
              <h5>Detail Room</h5>
              <p>{this.state.property.descr}</p>
              <hr />
              <h5>List Room</h5>
              <Link to={`/dashboard/property/add-room/${this.state.property.status}/${this.state.property._id}`}>
                <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same">
                  <small>Add Room</small>
                </button>
              </Link>
              <div className="row" >
              {this.state.property._roomId.map((room,index)=>{
              return <div className="col-4" key={index}>
                  <div className="room-grid-view p-b-10">
                    <div className="room-img-container">
                      <img src={room.image} alt="room" />
                    </div>
                    <div className="padding-20">
                      <h6 className="m-b-0">{room.name}</h6>
                      <small>Category: {room.descr}</small>
                    </div>
                    <button
                      type="submit"
                      className="btn-round p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same"
                      style={{margin: 'auto'}}
                      onClick={()=> this.onEdit(room._id,room.name,room.image,room.descr,index)} >
                      <small>Detail</small>
                    </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>{this.state.name}</ModalHeader>
                      <ModalBody>
                        <div className="m-b-20">
                          <img src={this.state.image} alt="room" className="img-responsive"/>
                        </div>
                        <FormGroup>
                          <Label for="exampleText">Room Name</Label>
                          <Input type="textarea" name="text" id="exampleText" defaultValue={this.state.name} onChange={(e)=>this.setState({name: e.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleText">Room's Description</Label>
                          <Input type="textarea" name="text" id="exampleText" defaultValue={this.state.descr} onChange={(e)=>this.setState({descr: e.target.value})}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleSelect">Room's Image</Label>
                          <Input type="text" name="text" id="exampleText" defaultValue={this.state.image} onChange={(e)=>this.setState({image: e.target.value})}/>
                          {/* <Input type="select" name="select" id="exampleSelect">
                            <option>Ruang Keluarga</option>
                            <option>Kamar Tidur</option>
                            <option>Dapur</option>
                            <option>Ruang Makan</option>
                            <option>Kamar Mandi</option>
                            <option>Kamar Kost</option>
                            <option>Ruang Serba Guna</option>
                          </Input> */}
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={()=> this.edit(this.state.rId,this.state.index)}>Save</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                  </div>
                </div>
              })}
              </div>
              <hr />
              <h5>Testimony</h5>
              <p>asli sama kayak foto</p>
              <small>red*****ca</small>
            </div>
          </div>
        </div>)
      }
      </div>
    )
  }

  visit(){
    const propId = this.props.match.params.id
    const propStatus = this.props.match.params.status[0].toUpperCase()+this.props.match.params.status.substr(1)
    let vr = 'http://vr.room360.ga/'
      window.open(vr+`?key=property${propStatus}/${propId}`,'_newtab')
  }

  edit(rId,index){
    const propStatus = this.props.match.params.status
    const token = JSON.parse(localStorage.getItem('token')).token
    const editedRoom = this.state.property
    let updatedRoom = {
      name: this.state.name,
      descr: this.state.descr,
      image: this.state.image
    }
    editedRoom._roomId[index] = updatedRoom
    if(propStatus === 'rent'){
      axios.put(api+`/roomRent/${rId}`,updatedRoom,{headers:{token:token}})
      .then(rr=>{
        this.setState({
          modal: !this.state.modal,
          property: editedRoom
        })
      })
    } else{
      axios.put(api+`/roomSell/${rId}`,updatedRoom,{headers:{token:token}})
      .then(rs=>{
        this.setState({
          modal: !this.state.modal,
          property: editedRoom
        })
      })
    }
  }

  onEdit(rId,name,image,descr,index){
    this.setState({
      modal: !this.state.modal,
      rId: rId,
      name: name,
      image: image,
      descr: descr,
      index: index
    })
  }

  componentWillMount(){
    const propId = this.props.match.params.id
    const propStatus = this.props.match.params.status
    this.setState({
      status: propStatus
    })
    if(propStatus === `rent`){
      axios.get(api+`/propertyRent/${propId}`)
      .then(pr=>{
        console.log(pr.data);
        this.setState({
          property: pr.data,
          lat: JSON.parse(pr.data.location.lat),
          lng: JSON.parse(pr.data.location.lng)
        })
      })
    } else{
      axios.get(api+`/propertySell/${propId}`)
      .then(ps=>{
        console.log(ps.data);
        this.setState({
          property: ps.data,
          lat: JSON.parse(ps.data.location.lat),
          lng: JSON.parse(ps.data.location.lng)
        })
      })
    }
  }
}

export default MyDetailProperty
