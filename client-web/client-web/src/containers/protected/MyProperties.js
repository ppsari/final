import React from 'react'
import {connect} from 'react-redux'

class MyProperties extends React.Component {
  render () {
    return (
      <div>
        MyProperties. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}

const mapStateToProps = (state) =>{

}

const mapDispatchToProps = (dispatch)=>{
  
}

export default connect (mapStateToProps,mapDispatchToProps)(MyProperties)
