import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import './MyListProperty.css';

class MyListProperty extends React.Component {
  render () {
    return (
      <div>
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <div className="flex-space-between">
              <h4>Your Properties</h4>
              <Link to='/dashboard/property/add' className="pull-right">
                <button type="submit" className="btn-round m-t-0 p-l-20 p-r-20 p-t-5 p-b-5 btn-primary">
                  Add New
                </button>
              </Link>
            </div>
            <div className="media m-t-20 shadow">
              <div className="media-left">
                <div className="image-container">
                  <img className="img-responsive" src="https://s-media-cache-ak0.pinimg.com/736x/7f/be/50/7fbe50ec634c65709d7fe6ac267c4e6f--large-garage-plans-house-plans-large-family.jpg" alt="64x64" />
                </div>
              </div>
              <div className="media-body">
                <span className="lnr lnr-map-marker m-r-5"></span><span>Pondok Indah</span>
                <h5>rumah pondok indah</h5>
                <p>rumah bagus diatas bukit banyak bonus setan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{

}

const mapDispatchToProps = (dispatch)=>{

}

export default connect (mapStateToProps,mapDispatchToProps)(MyListProperty)
