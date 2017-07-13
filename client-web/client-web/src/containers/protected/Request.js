import React from 'react'

export default class Request extends React.Component {
  render () {
    return (
      <div>
        Request. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
