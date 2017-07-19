import React from 'react'

import './Notification.css'

export default class Notification extends React.Component {
  render () {
    return (
      <div className="Notification shadow">
        <h5 className="text-center">
          <span className="lnr lnr-checkmark-circle m-r-10" style={{fontSize: 24}}></span>
          <span className="">1 Request Baru </span>
        </h5>
      </div>
    )
  }
}
