import React from 'react'

export default class Profile extends React.Component {
  render () {
    return (
      <div>
        Profile. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
