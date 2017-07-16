import React from 'react'

export default class AddNewRoom extends React.Component {
  render () {
    return (
      <div>
        <div className="b-a b-grey" style={{borderRadius:15}}>
          <h5 className="text-center bg-gray padding-15" style={{borderRadius: '15px 15px 0 0'}}>Room Detail</h5>
          <div className="padding-15">
            AddNewRoom. This is a protected route. You can only see this if you're authed.
          </div>
        </div>
      </div>
    )
  }
}
