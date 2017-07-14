import React from 'react'
import {connect} from 'react-redux'

import {editProfile} from '../store/configureStore.js'

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render () {
    return (
      <div>
        <h3>Name</h3>
        <input type="text" ref="name"/>
        <h3>Phone</h3>
        <input type="text" ref="phone"/>
        <h3>Password</h3>
        <input type="password" ref="password"/>
        <button type="submit" />
      </div>
    )
  }
}

const mapStateToProps = (state)=>{

}

const mapDispatchToProps = (dispatch) =>{
  editProfile: (data) => dispatch(editProfile(data))
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
