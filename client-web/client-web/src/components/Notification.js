import React from 'react'

import './Notification.css'

export default class Notification extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
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
