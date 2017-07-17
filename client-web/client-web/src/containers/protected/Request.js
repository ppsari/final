import React from 'react'
import {connect} from 'react-redux'

import {acceptRequest,rejectRequest} from '../../actions/index.js'

class Request extends React.Component {
  render () {
    return (
      <div>
        Request. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}


const mapStateToProps = (state) =>{

}

const mapDispatchToProps = (dispatch)=>{

  acceptRequest: (id) => dispatch(acceptRequest(id))
  rejectRequest: (id) => dispatch(rejectRequest(id))
}

export default connect (mapStateToProps,mapDispatchToProps)(Request)
