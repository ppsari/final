import React from 'react'
import { Link } from 'react-router-dom'

import './MyDetailProperty.css';

export default class MyDetailProperty extends React.Component {
  render () {
    console.log(this.props);
    return (
      <div>
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <div className="flex-space-between m-b-30">
              <div>
                <h4>Rumah Pondok Indah</h4>
                <small><span className="lnr lnr-map-marker m-r-5"></span><span className="m-r-5">Pondok Indah </span> |  <span className="lnr lnr-home m-l-5 m-r-5"></span>For Rent</small>
              </div>
              <div className="pull-right">
                <Link to='/dashboard/property/detail/:id'>
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
                  <div className="room-grid-view">
                    <div>
                      <img src="http://i.imgur.com/OkuOTW7.jpg" alt="room" className="img-responsive"/>
                    </div>
                    <div className="padding-20">
                      <h6>Ruang Kelas</h6>
                      <p>ada meja, kursi, papan tulis, proyektor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
