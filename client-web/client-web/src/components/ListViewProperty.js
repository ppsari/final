import React from 'react'
import { Link } from 'react-router-dom'

export default class ListViewProperty extends React.Component {
  render () {
    return (
      <div className="ListViewProperty">
        <div className="media m-t-20 shadow">
          <div className="media-left" style={{minHeight: 124}}>
            <div style={{width: 120, height: 124, overflow: 'hidden'}}>
              <img style={{height: '100%'}} src="https://s-media-cache-ak0.pinimg.com/736x/7f/be/50/7fbe50ec634c65709d7fe6ac267c4e6f--large-garage-plans-house-plans-large-family.jpg" alt="64x64" />
            </div>
          </div>
          <div className="media-body padding-15">
            <span className="lnr lnr-map-marker m-r-5"></span><span>Pondok Indah</span>
            <h5 className="extra-bold">rumah pondok indah</h5>
            <p className="excerpt">rumah bagus diatas bukit banyak bonus seta agswegn rumah bagus diatas bukit banyak bonus seta agswegn</p>
          </div>
          <div className="media-right padding-15">
            <div className="pull-right">
              <Link to='/dashboard/property/detail/:id'>
                <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-primary btn-same">
                  <small>Lihat Detail</small>
                </button>
              </Link>
              <Link to='/dashboard/property/edit/:id'>
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
