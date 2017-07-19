import React from 'react'
import './AddProperty.css'

import AddNewProperty from './AddNewProperty'
import TitleSection from './TitleSection'

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
            <TitleSection lightTitle="YOUR" boldTitle="PROPERTIES" />
            <h5>Add New Property</h5>
            <AddNewProperty/>
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
