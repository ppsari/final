import React from 'react'

export default class Transaction extends React.Component {
  render () {
    return (
      <div>
        Transaction. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
