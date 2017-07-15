import React from 'react'

export default class AddProperty extends React.Component {
  render () {
    console.log(this.props);
    return (
      <div>
        AddProperty. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}
