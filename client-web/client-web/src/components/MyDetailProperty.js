import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

import './MyDetailProperty.css';

export default class MyDetailProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    console.log(this.props);
    return (
      <div>
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <div className="flex-space-between m-b-30">
              <div>
                <h4 className="extra-bold">Rumah Pondok Indah</h4>
                <small><span className="lnr lnr-map-marker m-r-5"></span><span className="m-r-5">Pondok Indah </span> |  <span className="lnr lnr-home m-l-5 m-r-5"></span>For Rent</small>
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
                  <img className="img-responsive" src="https://s-media-cache-ak0.pinimg.com/736x/7f/be/50/7fbe50ec634c65709d7fe6ac267c4e6f--large-garage-plans-house-plans-large-family.jpg" alt="64x64" />
                </div>
                <div className="col-6">
                  <small>Price</small>
                  <h5>Rp 300.000.000.-</h5>
                  <br />
                  <small>Address</small>
                  <p>Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Jakarta 12240, Indonesia</p>
                  <br />
                  <small>Category</small>
                  <p><span className="label label-default"><span className="lnr lnr-home m-r-5"></span>Rumah</span></p>
                </div>
              </div>
              <hr />
              <h5>Detail Room</h5>
              <p>Gedung baru bangun sangat indah sekali</p>
              <hr />
              <h5>List Room</h5>
              <div className="row">
                <div className="col-4">
                  <div className="room-grid-view p-b-10">
                    <div className="room-img-container">
                      <img src="http://i.imgur.com/OkuOTW7.jpg" alt="room" />
                    </div>
                    <div className="padding-20">
                      <h6 className="m-b-0">Ruang Kelas</h6>
                      <small>Category: Other</small>
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
                          <Input type="textarea" name="text" id="exampleText" value="ada meja, kursi, papan tulis, proyektor" />
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
              <hr />
              <h5>Testimony</h5>
              <p>asli sama kayak foto</p>
              <small>red*****ca</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
