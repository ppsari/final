import React from 'react'

export default class Dashboard extends React.Component {
  render () {
    return (
      <div>
        Dashboard. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
