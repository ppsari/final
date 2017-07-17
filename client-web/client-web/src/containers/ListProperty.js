import React from 'react'
import {connect} from 'react-redux'

class ListProperty extends React.Component {
  render () {
    return (
      <div>
        ListProperty. Not Protected. Anyone can see this.
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  
}

const mapDispatchToProps = (dispatch) =>{

}

export default connect (mapStateToProps,mapDispatchToProps)(ListProperty)
