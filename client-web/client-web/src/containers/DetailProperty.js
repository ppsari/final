import React from 'react'
import {connect} from 'react-redux'

import MenuBar from '../components/MenuBar'
import Footer from '../components/Footer'
import prettyMoney from '../helpers/prettyMoney'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

import {getDetailPropertyRent,getDetailPropertySell} from '../actions/index.js'

class DetailProperty extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       id : this.props.match.params.id,
      status : this.props.match.params.status,
      propStatus: "",
      modal: false
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
                <div className="col-6">
                  <span className="italic light">A Few words about this property</span>
                  <h2><span className="extra-bold green">Property</span><span className="light"> Description</span> </h2>
                </div>
              </div>
              <div className="shadow p-r-15">
                <div className="row">
                  <div className="col-8 relative">
                    <img src={this.props.property.image} alt="preview" className="img-responsive" />
                    <div className="price-container">
                      <h5 className="text-right">{prettyMoney(this.props.property.price.amount)}</h5>
                      {this.props.property.status == "rent"
                        ? <p className="text-right m-b-0" style={{marginTop: '-10px'}}><small>/ {this.props.property.price.descr}</small></p>
                        : null
                      }
                    </div>
                  </div>
                  <div className="col-4">
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
                      <button type="button" className="theme-btn btn-style-three btn-same" onClick={this.toggle}><span className="extra-bold">REQUEST</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <h5 className="light m-t-20">Description</h5>
              <p>{this.props.property.descr}</p>
            </div>

            <div className="container">
              <div className="row p-t-20">
                <div className="col-4">
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
                <div className="col-8">
                  <h5 className="light m-t-20">Akses</h5>
                  <div className="row">{this.props.property._accessId.map((access, index) => {
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
              <Input type="textarea" name="text" id="exampleText" placeholder="Your message here"/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Send</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        <Footer />
      </div>
    )
  }
enter(){
 let vr = 'http://aws-website-room-23fnj.s3-website-us-east-1.amazonaws.com/'
   window.open(vr+`?key=${this.state.propStatus}/${this.state.id}`,'_newtab')
  }

  componentDidMount(){
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
    getDetailPropertySell: (id) => dispatch(getDetailPropertySell(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailProperty)
