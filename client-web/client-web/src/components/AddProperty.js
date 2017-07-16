import React from 'react'
import './AddProperty.css'

import AddNewProperty from './AddNewProperty'
import AddNewRoom from './AddNewRoom'

export default class AddProperty extends React.Component {
  constructor () {
    super()
    this.state = {
      isAddProperty: true,
      propertyId: null,
    }
    this.saveAndNext = this.saveAndNext.bind(this)
  }

  render () {
    return (
      <div className="AddProperty">
        <div className="row p-t-20 p-b-20">
          <div className="col-lg-8 offset-lg-2">
            <h4>Add New Property</h4>
            {this.state.isAddProperty ? <AddNewProperty save={this.saveAndNext} /> : <AddNewRoom />}
          </div>
        </div>
      </div>
    )
  }
  saveAndNext(){
    this.setState({
      isAddProperty: false,
      propertyId: 'wektekw',
    })
  }
}
