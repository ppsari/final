import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

import MenuBar from '../components/MenuBar'
import MainBanner from '../components/MainBanner'
import MainSearch from '../components/MainSearch'
import CardView from '../components/CardView'
import Footer from '../components/Footer'


class MyDetailProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    let box = {backgroundColor:'#71b100', color: 'white', minHeight: 460}
    return (
      <div>
        <MenuBar/>
        <div className="containers">
          <div className="col-lg-10 offset-lg-1">
              <div className="table-responsive m-t-30">
              <h4>How to capture 360 image with your smartphone</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <div className="image-small" style={box} >
                          <img src="http://i.imgur.com/d1KZFs5.png" alt="" className="img-responsive"/>
                          <p style={{ padding: 10 }}>1. install and open google street view from google playstore.</p>
                        </div>
                      </td>
                      <td>
                        <div className="image-small" style={box}>
                          <img src="http://i.imgur.com/zeFH16A.png" alt="" className="img-responsive" />
                          <p style={{ padding: 10 }}>2. push the camera icon at the bottom right corner of your screen.</p>
                        </div>
                      </td>
                      <td>
                        <div className="image-small" style={box}>
                          <img src="http://i.imgur.com/DK6pTJd.png" alt="" className="img-responsive" />
                          <p style={{ padding: 10 }}>3. choose camera to open your smartphone camera.</p>
                        </div>
                      </td>
                      <td>
                        <div className="image-small" style={box}>
                          <img src="http://i.imgur.com/wahtvzD.png" alt="" className="img-responsive" />
                          <p style={{ padding: 10 }}>4. point your camera to the dot, till check button turns to green, then press it to process the picture.</p>
                        </div>
                      </td>
                      <td>
                        <div className="image-small" style={box}>
                          <img src="http://i.imgur.com/HYOd5Us.png" alt="" className="img-responsive" />
                          <p style={{ padding: 10 }}>5. done, lets take a look at panoramas folder in your gallery.</p>
                        </div>
                      </td>
                      <td className="list-table p-b-0 p-t-25">

                      </td>
                    </tr>
                    <tr>
                      <td colSpan="6" className="bg-gray">
                        <small className="italic">TIPS : </small>
                        <p>to get the best result use tripod or something to make your phone rotate smoothly, and place your camera lens as the axis.</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  componentWillMount(){
  }
}

export default MyDetailProperty
