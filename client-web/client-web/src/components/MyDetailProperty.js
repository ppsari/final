import React from 'react'

export default class MyDetailProperty extends React.Component {
  render () {
    console.log(this.props);
    return (
      <div>
        MyDetailProperty. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
