import React from 'react'

export default class MyDetailProperty extends React.Component {
  render () {
    return (
      <div>
        MyDetailProperty. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
