import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

import './MyDetailProperty.css';

const api = 'http://dev-env.zcwmcsi6ny.us-west-2.elasticbeanstalk.com/api'

class MyDetailProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      property: null
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
            style={{height:200, width: 200,margin:'auto'}}/>
          : <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <div className="flex-space-between m-b-30">
              <div>
                <h4 className="extra-bold">{this.state.property.name}</h4>
                <small><span className="lnr lnr-map-marker m-r-5"></span><span className="m-r-5">{this.state.property.city}</span> |  <span className="lnr lnr-home m-l-5 m-r-5"></span>For <b>{this.state.property.status}</b></small>
              </div>
              <div className="pull-right">
                <Link to='/dashboard/property/edit/:id'>
                  <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same">
                    <small>Edit</small>
                  </button>
                </Link>
                <Link to='/dashboard/property/detail/:id'>
                  <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same">
                    <small>Visit VR</small>
                  </button>
                </Link>
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
                  <small>Category</small>
                  <p><span className="label label-default"><span className="lnr lnr-home m-r-5"></span>{this.state.property._categoryId.name}</span></p>
                </div>
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
              {this.state.property._roomId.map((room,index)=>{
              return <div className="row" key={index}>
                <div className="col-4">
                  <div className="room-grid-view p-b-10">
                    <div className="room-img-container">
                      <img src={room.image} alt="room" />
                    </div>
                    <div className="padding-20">
                      <h6 className="m-b-0">{room.name}</h6>
                      <small>Category: {room.category}</small>
                    </div>
                    <button
                      type="submit"
                      className="btn-round p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same"
                      style={{margin: 'auto'}}
                      onClick={this.toggle} >
                      <small>Detail</small>
                    </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>Ruang Kelas</ModalHeader>
                      <ModalBody>
                        <div className="m-b-20">
                          <img src="http://i.imgur.com/OkuOTW7.jpg" alt="room" className="img-responsive"/>
                        </div>
                        <FormGroup>
                          <Label for="exampleText">Room's Description</Label>
                          <Input type="textarea" name="text" id="exampleText" value={room.descr} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="exampleSelect">Select</Label>
                          <Input type="select" name="select" id="exampleSelect">
                            <option>Ruang Keluarga</option>
                            <option>Kamar Tidur</option>
                            <option>Dapur</option>
                            <option>Ruang Makan</option>
                            <option>Kamar Mandi</option>
                            <option>Kamar Kost</option>
                            <option>Ruang Serba Guna</option>
                          </Input>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Remove</Button>
                        </ModalFooter>
                      </Modal>
                  </div>
                </div>
              </div>
            })}
              <hr />
              <h5>Testimony</h5>
              <p>asli sama kayak foto</p>
              <small>red*****ca</small>
            </div>
          </div>
        </div>
      }
      </div>
    )
  }

  componentWillMount(){
    const propId = this.props.match.params.id
    const propStatus = this.props.match.params.status

    if(propStatus === `rent`){
      axios.get(api+`/propertyRent/${propId}`)
      .then(pr=>{
        this.setState({
          property: pr.data
        })
      })
    } else{
      axios.get(api+`/propertySell/${propId}`)
      .then(ps=>{
        this.setState({
          property: ps.data
        })
      })
    }
  }
}

export default MyDetailProperty
