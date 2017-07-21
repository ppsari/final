import React from 'react'

import './Notification.css'

export default class Notification extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    if(this.props.success){
      return (
        <div className="Notification Success shadow">
          <h5 className="text-center">
            <span className="lnr lnr-checkmark-circle m-r-10" style={{fontSize: 24}}></span>
            <span className="">{this.props.message || 'Request Approved'} </span>
          </h5>
        </div>
      )
    }
    return (
      <div className="Notification shadow">
        <h5 className="text-center">
          <span className="lnr lnr-checkmark-circle m-r-10" style={{fontSize: 24}}></span>
          <span className="">{this.props.count || null} New Request </span>
        </h5>
      </div>
    )
  }
}
