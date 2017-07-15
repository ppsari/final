import React from 'react'

export default class MyDetailRoom extends React.Component {
  render () {
    return (
      <div>
        MyDetailRoom. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
