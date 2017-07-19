import React from 'react'
import {connect} from 'react-redux'
import GoogleMapReact from 'google-map-react'
import MenuBar from '../components/MenuBar'
import Footer from '../components/Footer'
import prettyMoney from '../helpers/prettyMoney'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

import {getDetailPropertyRent,getDetailPropertySell,sendRequest} from '../actions/index.js'
import './DetailProperty.css'

class DetailProperty extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id : this.props.match.params.id,
      status : this.props.match.params.status,
      propStatus: "",
      modal: false,
      request: "",
      zoom: 17,
      lat: 10,
      lng: 10
    }
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
        <MenuBar />
        { this.props.property == null
          ? (<div className="flex-loader">
              <div className="loader"></div>
            </div>)
          : (<div className="DetailProperty" >
            <div className="container">
              <div className="row p-t-20">
                <div className="col-12 col-md-6">
                  <span className="italic light">A Few words about this property</span>
                  <h2><span className="extra-bold green">Property</span><span className="light"> Description</span> </h2>
                </div>
              </div>
              <div className="shadow p-r-15">
                <div className="row">
                  <div className="col-md-8 col-12 relative">
                    <img src={this.props.property.image} alt="preview" className="img-responsive" />
                    <div className="price-container">
                      <h5 className="text-right">{prettyMoney(this.props.property.price.amount)}</h5>
                      {this.props.property.status === "rent"
                        ? <p className="text-right m-b-0" style={{marginTop: '-10px'}}><small>/ {this.props.property.price.descr}</small></p>
                        : null
                      }
                    </div>
                  </div>
                  <div className="col-md-4 col-12">
                    <div className="descr-content">
                      <div className="m-t-20 m-b-20">
                        <span className="light title-text left-title">{this.props.property.name}</span><br/>
                      </div>
                      <span className="lnr lnr-map-marker m-r-5"></span><span className="m-r-5">{this.props.property.city}</span>|
                      <span className="lnr lnr-home m-l-5 m-r-5"></span>{this.props.property.status}
                      <br/>
                      <h5 className="light m-t-20">Address</h5>
                      <p className="m-t-0">{this.props.property.address}</p>
                      <h5 className="light m-t-20">Owner</h5>
                      <p className="m-t-0">{this.props.property._ownerId.username}</p>
                      <h5 className="light m-t-20">Post On</h5>
                      <p className="m-t-0">{this.props.property.createdDate.split('T')[0]}</p>
                      <div className="absolute-bottom flex-center">
                        <button type="button" onClick={()=> this.enter()} className="theme-btn btn-style-one btn-same"><span className="extra-bold">VISIT</span></button>
                        {(localStorage.getItem('token') && this.props.property._ownerId._id !== JSON.parse(localStorage.getItem('user'))._id)
                      ? <button type="button" className="theme-btn btn-style-three btn-same" onClick={this.toggle}><span className="extra-bold">REQUEST</span></button>
                      : <h6></h6>
                      }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h5 className="light m-t-20">Description</h5>
                  <p>{this.props.property.descr}</p>
                </div>
                <div className='col-md-6 col-12'>
                  <h5 className="light m-t-20">Location On Map</h5>
                  {(this.props.property.location.lat !== "" && this.props.property.location.lng !== "")
                   ?(<div className='col-md-12 col-12'>
                       <GoogleMapReact
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
            </div>
            </div>
            <div className="container">
              <hr />
              <div className="row">
                <div className="col-md-4 col-12 col">
                  <h5 className="light m-t-20">Detail</h5>
                  <div className="b-a b-grey" style={{padding: '20px 20px 20px 10px'}}>
                    <div className="flex-justify">
                      <span><span className="green m-r-10 lnr lnr-checkmark-circle"></span>Building Area :</span>
                      <span>{this.props.property.detail.luasBangunan} m2</span>
                    </div>
                    <div className="flex-justify">
                      <span><span className="green m-r-10 lnr lnr-checkmark-circle"></span>Land Area :</span>
                      <span>{this.props.property.detail.luasTanah} m2</span>
                    </div>
                    <div className="flex-justify">
                      <span><span className="green m-r-10 lnr lnr-checkmark-circle"></span>Floor :</span>
                      <span>{this.props.property.detail.lantai}</span>
                    </div>
                    {this.props.property.detail.perabotan
                      ? (<div className="flex-justify">
                          <span><span className="green m-r-10 lnr lnr-checkmark-circle"></span>Appliance :</span>
                          <span>Yes</span>
                        </div>)
                      : null
                    }
                    {this.props.property.detail.listrik
                      ? (<div className="flex-justify">
                          <span><span className="green m-r-10 lnr lnr-checkmark-circle"></span>Electricity :</span>
                          <span>Yes</span>
                        </div>)
                      : null
                    }
                    <div className="flex-justify">
                      <span><span className="green m-r-10 lnr lnr-checkmark-circle"></span>Facilities :</span>
                      <span>{this.props.property.detail.fasilitas}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-12">
                  <h5 className="light m-t-20">Access</h5>
                  <div className="row p-l-15 p-r-15">{this.props.property._accessId.map((access, index) => {
                      return (<div key={index} className="b-a b-grey col-3 flex-center padding-20">
                        <div className="m-b-20">
                          <img src={access.icon} alt="icon" style={{width: 60}}/>
                          <p className="m-l-10 desc-icon">{access.name}</p>
                        </div>
                      </div>)
                    })}
                  </div>
                </div>
              </div>
            </div>

          </div>)
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            <span className="light">Send Request</span>
          </ModalHeader>
          <ModalBody>
            <div className="text-center">
              <img src="/img/send-request.png" alt="request" />
              <p className="text-center" style={{fontSize: 13, color:'gray'}}>Notify the owner of this property, that you interest in.</p>
            </div>
            <FormGroup>
              <Label for="exampleText">Message</Label>
              <Input type="textarea" name="text" id="exampleText" placeholder="Your message here" onChange={(e)=>this.setState({request:e.target.value})}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=> {
                this.request()
                this.toggle()
              }}>Send</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        <Footer />
      </div>
    )
  }

  componentDidMount(){
    setTimeout(()=>{
      console.log(this.props.property);
      this.setState({
        lat: JSON.parse(this.props.property.location.lat),
        lng: JSON.parse(this.props.property.location.lng)
      })
    },2000)
  }

request(){
  const token = JSON.parse(localStorage.getItem('token')).token
  const message = this.state.request
  const propId = this.props.property._id
  const sellerId = this.props.property._ownerId
  const status = this.props.property.status
  this.props.sendRequest(token,message,propId,sellerId,status)
}

enter(){
 let vr = 'http://vr.room360.ga/'
   window.open(vr+`?key=${this.state.propStatus}/${this.state.id}`,'_newtab')
  }

  componentWillMount(){
    if(this.state.status === 'rent'){
        this.setState({
          propStatus: 'propertyRent'
        })
      this.props.getDetailPropertyRent(this.state.id)
    } else{
      this.setState({
        propStatus: 'propertySell'
      })
      this.props.getDetailPropertySell(this.state.id)
    }
  }


}

const mapStateToProps = (state) =>{
  const st = window.location.href.split('/')[4];
  if(st === 'rent'){
    return{
      property: state.propertyRent
    }
  } else{
    return {
      property: state.propertySell
    }
  }
}


const mapDispatchToProps = (dispatch) =>{
  return {
    getDetailPropertyRent: (id) => dispatch(getDetailPropertyRent(id)),
    getDetailPropertySell: (id) => dispatch(getDetailPropertySell(id)),
    sendRequest: (token,message,propId,sellerId,status) => dispatch(sendRequest(token,message,propId,sellerId,status))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailProperty)
