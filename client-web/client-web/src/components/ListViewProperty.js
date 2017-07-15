import React from 'react'
import { Link } from 'react-router-dom'

export default class ListViewProperty extends React.Component {
  render () {
    return (
      <div className="ListViewProperty">
        <div className="media m-t-20 shadow">
          <div className="media-left">
            <div className="image-container">
              <img className="img-responsive" src="https://s-media-cache-ak0.pinimg.com/736x/7f/be/50/7fbe50ec634c65709d7fe6ac267c4e6f--large-garage-plans-house-plans-large-family.jpg" alt="64x64" />
            </div>
          </div>
          <div className="media-body">
            <span className="lnr lnr-map-marker m-r-5"></span><span>Pondok Indah</span>
            <h5>rumah pondok indah</h5>
            <p className="excerpt">rumah bagus diatas bukit banyak bonus seta agswegn rumah bagus diatas bukit banyak bonus seta agswegn</p>
          </div>
          <div className="media-right">
            <div className="pull-right">
              <Link to='/dashboard/property/detail/:id'>
                <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-primary btn-same">
                  <small>Lihat Detail</small>
                </button>
              </Link>
              <Link to='/dashboard/property/detail/:id'>
                <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-line btn-same">
                  <small>Edit</small>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
